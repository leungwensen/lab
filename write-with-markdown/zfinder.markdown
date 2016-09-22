# Zfinder

[Zfinder](https://github.com/leungwensen/zfinder) is designed to replace the finder.app in Mac (or file explorer in Windows). With the magic of modern Browsers, we can do a lot more.

```css+
<style>
  h1 {
    color: red;
  }
</style>
```

```javascript+
<script>
  alert(1);
</script>
```

## Usage

```shell
npm install -g zfinder
zfinder -r $path/to/root
```

## Features

### file explorer

* content search
* glob search
* context menu
* application list (editors, etc)
* help info;

### static server

* static file server

### file previewer

* markdown previewer
* universal code previewer
* image previewer
* xmind previewer
* media player

### file editor

* [markdown editor](doc/markdown-editor.markdown)

#### math

you can write a math formula using TeX math expression.[^tex-math]

the inline version: $f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$

and the multi-line version:

$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$

* universal code editor
* image editor
* xmind editor

### others

* project dependency tree viewer (local ones and remote ones)
* i18n support
* windows support
* themes
* proxy server

## Thanks to

Zfinder is built on top of all these fantastic projects:

* [Khan/KaTeX](https://github.com/Khan/KaTeX)
* [adrai/flowchart.js](https://github.com/adrai/flowchart.js)
* [avoidwork/filesize.js](https://github.com/avoidwork/filesize.js)
* [chjj/marked](https://github.com/chjj/marked)
* [codemirror/CodeMirror](https://github.com/codemirror/CodeMirror.git)
* [expressjs/serve-static](https://github.com/expressjs/serve-static)
* [isaacs/node-glob](https://github.com/isaacs/node-glob)
* [jshttp/http-errors](https://github.com/jshttp/http-errors)
* [jshttp/mime-types](https://github.com/jshttp/mime-types)
* [knsv/mermaid](https://github.com/knsv/mermaid)
* [moment/moment](https://github.com/moment/moment)
* [pwnall/node-open](https://github.com/pwnall/node-open)
* [senchalabs/connect](https://github.com/senchalabs/connect)
* [sindresorhus/github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
* [substack/minimist](https://github.com/substack/minimist)

## [History](doc/history.markdown)

## [License (MIT License)](doc/license.markdown)


[^tex-math]: writing math formula in pure text.
    and can be convert into MathML format which can be recognized in docx files.

