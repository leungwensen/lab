const fs = require('fs');
const path = require('path');
const XMLLite = require('xml-lite');
const puppeteer = require('puppeteer');

const str = fs.readFileSync('./resources/N8book.xml', 'utf8');
const doc = XMLLite.parseFromString(str);

const pages = XMLLite.findNodes(doc, {
  tagName: 'PAGE',
});

function getMeta(dom, name, type) {
  const metaDom = XMLLite.findChildNode(dom, {
    tagName: name,
  });
  switch (type) {
    case 'url':
      return `./${metaDom.textContent}`;
    case 'int':
      return parseInt(metaDom.textContent, 10);
    default:
      return metaDom.textContent;
  }
}

function processItem(item) {
  return {
    type: getMeta(item, 'TYPE'),
    file: getMeta(item, 'FILE', 'url'),
    width: getMeta(item, 'WIDTH', 'int'),
    height: getMeta(item, 'HEIGHT', 'int'),
    x: getMeta(item, 'X', 'int'),
    y: getMeta(item, 'Y', 'int'),
  }
}

function processPage(page) {
  const meta = {
    title: getMeta(page, 'TITLE'),
    width: getMeta(page, 'WIDTH', 'int'),
    height: getMeta(page, 'HEIGHT', 'int'),
    items: XMLLite.findChildNodes(page, {
      tagName: 'ITEM',
    }).map(item => processItem(item))
  };
  console.log(meta);
  const svgStr = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${meta.width}" height="${meta.height}" version="1.1"
  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- clips -->
  ${
    meta.items
      .filter(item => item.type === 'clip')
      .map(item => `<image href="${item.file}" x="${item.x}" y="${item.y}" width="${item.width}" height="${item.height}"/>`)
      .join('\n  ')
  }
  <!-- images -->
  ${
    meta.items
      .filter(item => item.type === 'image')
      .map(item => `<image href="${item.file}" x="${item.x}" y="${item.y}" width="${item.width}" height="${item.height}"/>`)
      .join('\n  ')
  }
</svg>`;
  console.log(svgStr);
  const distSvg = `./resources/${meta.title}.svg`;
  fs.writeFileSync(distSvg, svgStr, 'utf8');
  console.log(`file wrote: ${meta.title}.svg`);

  (async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file://${path.join(__dirname, distSvg)}`);
    await page.screenshot({
      path: `./resources/pack/${meta.title}.png`,
      fullPage: true,
    });
    await browser.close();
  })();
}

pages.forEach((page, index) => {
  console.log(`the ${index + 1}th page`);
  processPage(page);
})
