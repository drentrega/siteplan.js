# @dre/siteplan

A easier way to generate sitemaps!

## Install

```bash
$ npm i -g @dre/aws-env
```

## Usage

### Sitemap

```javascript
const { Sitemap } = require('../src');

const options = {
  domain: 'https://drentrega.github.io',
  maxUrls: 10 * 1000,
};

const sm = new Sitemap(options);
sm.add({ path: '/' })
  .add({ path: '/about-us' })
  .toString();

/*
'<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" >
  <url>
    <loc>https://drentrega.github.io/</loc>
  </url>
  <url>
    <loc>https://drentrega.github.io/about-us</loc>
  </url>
</urlset>'
*/
```
