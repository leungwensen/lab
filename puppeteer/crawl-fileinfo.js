/* eslint-disable no-unused-vars */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const download = require('download');
const {
  each,
  isNil,
  mix,
  values,
} = require('../lib/utils');

const categoriesPathname = path.resolve(__dirname, '../assets/filetypes/categories.json');
const categoryByIdPathname = path.resolve(__dirname, '../assets/filetypes/category-by-id.json');
const softwareCategoriesPathname = path.resolve(__dirname, '../assets/filetypes/software-categories.json');
const softwareCategoryByIdPathname = path.resolve(__dirname, '../assets/filetypes/software-category-by-id.json');
const programByIdPathname = path.resolve(__dirname, '../assets/filetypes/program-by-id.json');
const programsPathname = path.resolve(__dirname, '../assets/filetypes/programs.json');
const path2extension = path.resolve(__dirname, './extensions/uBlock.chromium');
const extensionByIdPathname = path.resolve(__dirname, '../assets/filetypes/extension-by-id.json');
const extensionsPathname = path.resolve(__dirname, '../assets/filetypes/extensions.json');
const appIconsPath = path.resolve(__dirname, '../assets/filetypes/app-icons.json');
const fileIconsPath = path.resolve(__dirname, '../assets/filetypes/file-icons.json');

const ICON_STATUS = {
  NOT_LOADED: 'not_loaded',
  LOADED: 'loaded',
};

(async () => {
  async function crawlingCategories() {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: [
        `--disable-extensions-except=${path2extension}`,
        `--load-extension=${path2extension}`,
      ],
    });
    const page = await browser.newPage();
    await page.goto('https://fileinfo.com/browse/');
    const categorySelector = '.category a';
    await page.waitForSelector(categorySelector);
    const categories = await page.evaluate((selector) => {
      function getCategoryIdByAnchor(anchor) {
        const parts = anchor.href.split('/');
        return parts[parts.length - 1];
      }
      const anchors = Array.from(document.querySelectorAll(selector));
      return anchors.map((anchor) => {
        const id = getCategoryIdByAnchor(anchor);
        return {
          id,
          title: anchor.textContent.trim(),
          href: id === 'data' ? `${anchor.href}files-all` : `${anchor.href}-all`,
        };
      });
    }, categorySelector);
    console.log('>>>>>>>>>> done crawling categories!');

    async function crawlCategory(index) {
      const link = categories[index];
      console.log(`>>>>>>>>>> crawling categories: ${link.id} ${link.href}`);
      await page.goto(link.href);
      console.log('start waiting for selectors');
      await page.waitForSelector('table tr td a');
      console.log('getting extra meta');
      const extraMeta = await page.evaluate(() => {
        const icon = document.querySelector('.circle a');
        let description = document.querySelector('#left p');
        if (!description) {
          description = document.querySelector('#left h4');
        }
        const anchors = Array.from(document.querySelectorAll('table tr td a'));
        return {
          icon: icon.innerHTML,
          description: description.textContent,
          extensions: anchors.map((anchor) => {
            const parts = anchor.href.split('/');
            const id = parts[parts.length - 1];
            return {
              id,
              title: anchor.textContent.trim(),
              href: anchor.href,
            };
          }),
        };
      });
      mix(link, extraMeta);
      if (index < categories.length - 1) await crawlCategory(index + 1);
    }

    await crawlCategory(0);

    fs.writeFileSync(categoriesPathname, JSON.stringify(categories, null, 2), 'utf8');
    console.log('>>>>>>>>>> filetypes written');

    await browser.close();
  }
  // await crawlingCategories();

  async function generateCategoryById() {
    const categories = JSON.parse(fs.readFileSync(categoriesPathname, 'utf8'));
    const categoryById = {};
    categories.forEach((category) => {
      categoryById[category.id] = category;
    });
    console.log('>>>>>>>>>> saving category-by-id.json');
    await fs.promises.writeFile(categoryByIdPathname, JSON.stringify(categoryById, null, 2), 'utf8');
  }
  // await generateCategoryById();

  async function savingCategoryIcons() {
    const categories = JSON.parse(fs.readFileSync(categoriesPathname, 'utf8'));
    async function saveIcon(index) {
      const category = categories[index];
      const {
        icon,
        id,
      } = category;
      console.log(`>>>>>>>>>> saving icon for ${id}`);
      const filename = path.resolve(__dirname, `../assets/icons/${id}.svg`);
      await fs.promises.writeFile(filename, icon.replace(/\n/g, ''), 'utf8');
      if (index < categories.length - 1) await saveIcon(index + 1);
    }
    await saveIcon(0);
  }
  // await savingCategoryIcons();

  async function crawlingExtensions() {
    const categories = JSON.parse(fs.readFileSync(categoriesPathname, 'utf8'));
    const extensionById = {};
    try {
      mix(
        extensionById,
        JSON.parse(fs.readFileSync(extensionByIdPathname, 'utf8')),
      );
    } catch (e) {
      console.error(e);
    }
    categories.forEach((category) => {
      const { extensions } = category;
      extensions.forEach((extension) => {
        const { id } = extension;
        if (extensionById[id]) {
          // console.log('duplicated', extensionById[id], extension);
        } else {
          extensionById[id] = extension;
        }
      });
    });
    // filter first
    const extensions = values(extensionById).filter(extension => isNil(extension.filetypes));
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: [
        `--disable-extensions-except=${path2extension}`,
        `--load-extension=${path2extension}`,
      ],
    });
    const page = await browser.newPage();

    async function crawlExtension(index) {
      const extension = extensions[index];
      const { id, href } = extension;
      console.log(`>>>>>>>>>> crawling extension: ${id} ${href}`);
      await page.goto(href);
      console.log('start waiting for selectors');
      await page.waitForSelector('.fileinfo');
      console.log('getting extra meta');
      const filetypes = await page.evaluate(() => {
        function getCategoryIdByAnchor(anchor) {
          const parts = anchor.href.split('/');
          return parts[parts.length - 1];
        }
        return Array.from(document.querySelectorAll('#main section.ext')).map((fileType) => {
          const nameDom = fileType.querySelector('[itemprop=name]');
          let name;
          if (nameDom) {
            name = nameDom.textContent;
          } else {
            name = fileType.querySelector('h2').textContent
              .trim()
              .replace(/^File\s+Type\s+\d+/, '')
              .trim();
          }
          console.log(`name: ${name}`);
          const iconAnchor = fileType.querySelector('.fileIcon');
          const icon = window.getComputedStyle(iconAnchor).backgroundImage;
          const iconHref = icon.trim().replace(/url\("/, '').replace(/"\)$/, '');
          console.log(`icon: ${icon}`);
          const headerInfos = Array.from(fileType.querySelectorAll('.headerInfo tr'));
          console.log(headerInfos);
          const developer = headerInfos[0].querySelectorAll('td')[1].textContent;
          console.log(developer);
          // const popularity = headerInfos[1].querySelector('[itemprop=ratingValue]').textContent;
          // console.log(popularity);
          const category = getCategoryIdByAnchor(headerInfos[2].querySelector('a'));
          console.log(category);
          const format = headerInfos[3].querySelectorAll('td')[1].textContent;
          console.log(format);
          return {
            name,
            icon: iconHref,
            developer,
            // popularity,
            category,
            format,
          };
        });
      });
        // console.log('>>>>>>>>>> get filetypes', filetypes);
      mix(extension, {
        filetypes,
      });
      // next
      if (index < extensions.length - 1) await crawlExtension(index + 1);
    }
    try {
      await crawlExtension(0);
    } catch (e) {
      console.error(e);
    }

    fs.writeFileSync(
      extensionsPathname,
      JSON.stringify(values(extensionById), null, 2), 'utf8',
    );
    fs.writeFileSync(
      extensionByIdPathname,
      JSON.stringify(extensionById, null, 2), 'utf8',
    );
    console.log('>>>>>>>>>> filetypes written');

    await browser.close();
  }
  // await crawlingExtensions();

  async function crawlingSoftwareCategories() {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: [
        `--disable-extensions-except=${path2extension}`,
        `--load-extension=${path2extension}`,
      ],
    });
    const page = await browser.newPage();
    await page.goto('https://fileinfo.com/software/browse');
    const categorySelector = '.category a';
    await page.waitForSelector(categorySelector);
    const categories = await page.evaluate((selector) => {
      function getCategoryIdByAnchor(anchor) {
        const parts = anchor.href.split('/');
        return parts[parts.length - 1];
      }
      const anchors = Array.from(document.querySelectorAll(selector));
      return anchors.map((anchor) => {
        const id = getCategoryIdByAnchor(anchor);
        return {
          id,
          title: anchor.textContent.trim(),
          href: anchor.href,
        };
      });
    }, categorySelector);
    console.log('>>>>>>>>>> done crawling categories!');

    async function crawlCategory(index) {
      const link = categories[index];
      console.log(`>>>>>>>>>> crawling categories: ${link.id} ${link.href}`);
      await page.goto(link.href);
      console.log('start waiting for selectors');
      await page.waitForSelector('table tr td a');
      console.log('getting extra meta');
      const extraMeta = await page.evaluate(() => {
        const icon = document.querySelector('.circle a');
        let description = document.querySelector('#left p');
        if (!description) {
          description = document.querySelector('#left h2');
        }
        const anchors = Array.from(document.querySelectorAll('table tr td a'));
        return {
          icon: icon.innerHTML,
          description: description.textContent,
          programs: anchors.map((anchor) => {
            const parts = anchor.href.split('/');
            const id = parts[parts.length - 1];
            return {
              id,
              title: anchor.textContent.trim(),
              href: anchor.href,
            };
          }),
        };
      });
      mix(link, extraMeta);
      if (index < categories.length - 1) await crawlCategory(index + 1);
    }

    await crawlCategory(0);

    fs.writeFileSync(softwareCategoriesPathname, JSON.stringify(categories, null, 2), 'utf8');
    console.log('>>>>>>>>>> filetypes written');

    await browser.close();
  }
  // await crawlingSoftwareCategories();

  async function generateSoftwareCategoryById() {
    const categories = JSON.parse(fs.readFileSync(softwareCategoriesPathname, 'utf8'));
    const categoryById = {};
    categories.forEach((category) => {
      categoryById[category.id] = category;
    });
    console.log('>>>>>>>>>> saving software-category-by-id.json');
    await fs.promises.writeFile(softwareCategoryByIdPathname, JSON.stringify(categoryById, null, 2), 'utf8');
  }
  // await generateSoftwareCategoryById();

  async function savingSoftwareCategoryIcons() {
    const categories = JSON.parse(fs.readFileSync(softwareCategoriesPathname, 'utf8'));
    async function saveIcon(index) {
      const category = categories[index];
      const {
        icon,
        id,
      } = category;
      console.log(`>>>>>>>>>> saving icon for ${id}`);
      const filename = path.resolve(__dirname, `../assets/icons/${id}.svg`);
      await fs.promises.writeFile(filename, icon.replace(/\n/g, ''), 'utf8');
      if (index < categories.length - 1) await saveIcon(index + 1);
    }
    await saveIcon(0);
  }
  // await savingSoftwareCategoryIcons();

  async function crawlingSoftware() {
    const softwareCategories = JSON.parse(fs.readFileSync(softwareCategoriesPathname, 'utf8'));
    const programById = {};
    try {
      mix(
        programById,
        JSON.parse(fs.readFileSync(programByIdPathname, 'utf8')),
      );
    } catch (e) {
      console.error(e);
    }
    softwareCategories.forEach((category) => {
      const { programs } = category;
      programs.forEach((program) => {
        const { id } = program;
        if (programById[id]) {
          // console.log('duplicated', programById[id], program);
        } else {
          programById[id] = program;
        }
      });
    });
    const programs = values(programById).filter(program => isNil(program.primaryFiletype));
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: [
        `--disable-extensions-except=${path2extension}`,
        `--load-extension=${path2extension}`,
      ],
    });
    const page = await browser.newPage();

    async function crawlProgram(index) {
      const program = programs[index];
      const { id, href } = program;
      console.log(`>>>>>>>>>> crawling program: ${id} ${href}`);
      await page.goto(href);
      console.log('start waiting for selectors');
      await page.waitForSelector('#main .supported');
      console.log('getting extra meta');
      const extraMeta = await page.evaluate(() => {
        function getIdByAnchor(anchor) {
          if (!anchor) return '';
          const parts = anchor.href.split('/');
          return parts[parts.length - 1];
        }
        function getBackgroundImageUrlByDom(dom) {
          if (!dom) return '';
          return window.getComputedStyle(dom).backgroundImage
            .trim().replace(/url\("/, '').replace(/"\)$/, '');
        }
        const company = document.querySelectorAll('#left h5 a')[1].textContent;
        console.log(`company: ${company}`);
        const icon = getBackgroundImageUrlByDom(document.querySelector('.swIcon'));
        console.log(`icon: ${icon}`);
        const version = document.querySelector('.vNum').textContent;
        console.log(`version: ${version}`);
        const platforms = Array.from(document.querySelectorAll('.osIcon')).map((osIcon) => {
          const iconHref = getBackgroundImageUrlByDom(osIcon);
          const platformName = osIcon.getAttribute('title');
          return {
            id: platformName.substring(0, 3).toLowerCase(),
            icon: iconHref,
            title: platformName,
          };
        });
        console.log(`platforms: ${JSON.stringify(platforms)}`);
        const trs = document.querySelectorAll('.swHeader .headerInfo tr');
        const license = trs[2].querySelectorAll('td')[1].textContent;
        console.log(`license: ${license}`);
        const category = trs[3].querySelectorAll('td')[1].textContent;
        console.log(`category: ${category}`);
        const homepageAnchor = document.querySelector('.headerLink tr a');
        const homepage = homepageAnchor ? homepageAnchor.href : '';
        console.log(`homepage: ${homepage}`);
        const features = Array.from(document.querySelectorAll('.features ul li')).map(li => li.textContent);
        console.log(`features: ${features}`);
        const primaryFiletype = getIdByAnchor(document.querySelector('.primary a'));
        console.log(`primaryFiletype: ${primaryFiletype}`);
        const supportedFiletypes = Array.from(document.querySelectorAll('.extList1 tr td a')).map(a => getIdByAnchor(a));
        console.log(`supportedFiletypes: ${supportedFiletypes}`);
        const updated = document.querySelector('.swDate').textContent.replace('Updated: ', '').trim();
        console.log(`updated: ${updated}`);
        return {
          company,
          icon,
          version,
          platforms,
          license,
          category,
          homepage,
          features,
          primaryFiletype,
          supportedFiletypes,
          updated,
        };
      });
      mix(program, extraMeta);
      // next
      if (index < programs.length - 1) await crawlProgram(index + 1);
    }

    try {
      await crawlProgram(0);
    } catch (e) {
      console.error(e);
    }

    fs.writeFileSync(
      programsPathname,
      JSON.stringify(values(programById), null, 2), 'utf8',
    );
    fs.writeFileSync(
      programByIdPathname,
      JSON.stringify(programById, null, 2), 'utf8',
    );
    console.log('>>>>>>>>>> programs written');

    await browser.close();
  }
  // await crawlingSoftware();

  async function generatePlatformById() {
    const content = await fs.promises.readFile(programByIdPathname, 'utf8');
    const programById = JSON.parse(content);
    const programs = values(programById);
    const platformById = {};
    programs.forEach((program) => {
      const { platforms } = program;
      platforms.forEach((platform) => {
        const { id } = platform;
        if (!platformById[id]) {
          platformById[id] = platform;
        }
      });
    });
    console.log(platformById);

    fs.writeFileSync(
      path.resolve(__dirname, '../assets/filetypes/platform-by-id.json'),
      JSON.stringify(platformById, null, 2), 'utf8',
    );
    console.log('>>>>>>>>>> platformById written');
  }
  // await generatePlatformById();

  async function clearingCategoriesMeta() {
    const categoryContent = await fs.promises.readFile(categoryByIdPathname, 'utf8');
    const categoryById = JSON.parse(categoryContent);
    const softwareCategoryContent = await fs.promises.readFile(softwareCategoryByIdPathname, 'utf8');
    const softwareCategoryById = JSON.parse(softwareCategoryContent);
    each(categoryById, (category, id) => {
      // category.icon = `icons/common/${id}.svg`;
      category.extensions = category.extensions.map(ext => ext.id);
    });
    each(softwareCategoryById, (category, id) => {
      category.programs = category.programs.map(sw => sw.id);
      // category.description = category.description.replace(/\n/g, '');
      // category.icon = `icons/common/${id}.svg`;
    });

    fs.writeFileSync(
      categoryByIdPathname,
      JSON.stringify(categoryById, null, 2), 'utf8',
    );
    fs.writeFileSync(
      categoriesPathname,
      JSON.stringify(values(categoryById), null, 2), 'utf8',
    );
    console.log('categories meta written');

    fs.writeFileSync(
      softwareCategoryByIdPathname,
      JSON.stringify(softwareCategoryById, null, 2), 'utf8',
    );
    fs.writeFileSync(
      softwareCategoriesPathname,
      JSON.stringify(values(softwareCategoryById), null, 2), 'utf8',
    );
    console.log('software categories meta written');
  }
  await clearingCategoriesMeta();

  async function clearingProgramsMeta() {
    const content = await fs.promises.readFile(programByIdPathname, 'utf8');
    const programById = JSON.parse(content);

    const appIcons = {};
    try {
      mix(
        appIcons,
        JSON.parse(fs.readFileSync(appIconsPath, 'utf8')),
      );
    } catch (e) {
      console.log(e);
    }
    const notLoadedUrls = [];
    each(appIcons, (status, icon) => {
      if (status === ICON_STATUS.NOT_LOADED) notLoadedUrls.push(icon);
    });

    async function downloadImage(index) {
      const url = notLoadedUrls[index];
      const parts = url.split('/');
      const filename = parts[parts.length - 1];
      try {
        const data = await download(url);
        fs.writeFileSync(path.resolve(__dirname, `../assets/icons/apps/${filename}`), data);
        appIcons[url] = ICON_STATUS.LOADED;
        console.log(`downloaded! ${url}`);
      } catch (e) {
        console.error(e);
      }
      if (index < notLoadedUrls.length - 1) await downloadImage(index + 1);
    }
    await downloadImage(0);

    // each(programById, (program) => {
    //   // const { icon } = program;
    //   // const parts = icon.split('/');
    //   // program.icon = `icons/apps/${parts[parts.length - 1]}`;
    //   // if (!appIcons[icon]) {
    //   //   appIcons[icon] = ICON_STATUS.NOT_LOADED;
    //   // }
    //   // program.platforms = program.platforms.map(platform => platform.id);
    // });

    fs.writeFileSync(
      appIconsPath,
      JSON.stringify(appIcons, null, 2), 'utf8',
    );
    console.log('app icons meta written');

    // fs.writeFileSync(
    //   programsPathname,
    //   JSON.stringify(values(programById), null, 2), 'utf8',
    // );
    // fs.writeFileSync(
    //   programByIdPathname,
    //   JSON.stringify(programById, null, 2), 'utf8',
    // );
    // console.log('>>>>>>>>>> programs written');
  }
  // await clearingProgramsMeta();

  async function clearingExtensionsMeta() {
    const content = await fs.promises.readFile(extensionByIdPathname, 'utf8');
    const extensionById = JSON.parse(content);

    const fileIcons = {};
    try {
      mix(
        fileIcons,
        JSON.parse(fs.readFileSync(fileIconsPath, 'utf8')),
      );
    } catch (e) {
      console.log(e);
    }
    const notLoadedUrls = [];
    each(fileIcons, (status, icon) => {
      if (status === ICON_STATUS.NOT_LOADED) notLoadedUrls.push(icon);
    });

    async function downloadImage(index) {
      const url = notLoadedUrls[index];
      const parts = url.split('/');
      const filename = parts[parts.length - 1];
      try {
        const data = await download(url);
        fs.writeFileSync(path.resolve(__dirname, `../assets/icons/files/${filename}`), data);
        fileIcons[url] = ICON_STATUS.LOADED;
        console.log(`downloaded! ${url}`);
      } catch (e) {
        console.error(e);
      }
      if (index < notLoadedUrls.length - 1) await downloadImage(index + 1);
    }
    await downloadImage(0);

    // each(extensionById, (extension) => {
    //   const { filetypes } = extension;
    //   filetypes.forEach((filetype) => {
    //     // const { icon } = filetype;
    //     // const parts = icon.split('/');
    //     // filetype.icon = `icons/files/${parts[parts.length - 1]}`;
    //     // if (!fileIcons[icon]) {
    //     //   fileIcons[icon] = ICON_STATUS.NOT_LOADED;
    //     // }
    //   });
    //   // const { filetypes } = extension;
    //   // filetypes.forEach((filetype) => {
    //   //   filetype.format = filetype.format.replace(/\n/g, '');
    //   // });
    // });

    fs.writeFileSync(
      fileIconsPath,
      JSON.stringify(fileIcons, null, 2), 'utf8',
    );
    console.log('file icons meta written');

    // fs.writeFileSync(
    //   extensionsPathname,
    //   JSON.stringify(values(extensionById), null, 2), 'utf8',
    // );
    // fs.writeFileSync(
    //   extensionByIdPathname,
    //   JSON.stringify(extensionById, null, 2), 'utf8',
    // );
    // console.log('>>>>>>>>>> filetypes written');
  }
  // await clearingExtensionsMeta();
})();
