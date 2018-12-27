const Location = require('./location');

module.exports = class Sitemap {
  get defaults() {
    return {
      // file structure
      'xml.version': '1.0',
      'xml.encoding': 'UTF-8',

      'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      'xmlns.xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns.news': 'http://www.google.com/schemas/sitemap-news/0.9',
      'xmlns.xhtml': 'http://www.w3.org/1999/xhtml',
      'xmlns.mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
      'xmlns.image': 'http://www.google.com/schemas/sitemap-image/1.1',
      'xmlns.video': 'http://www.google.com/schemas/sitemap-video/1.1',

      'xsi.schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',

      // building params
      maxUrls: 50 * 1000,
      domain: 'https://www.example.com',

      // hook
      callback: () => {},
    }
  }

  get completed() {
    return this.urlset.length/this.options.maxUrls;
  }

  get spaceLeft() {
    return this.options.maxUrls - this.urlset.length;
  }

  get total() {
    return this.urlset.length;
  }

  constructor(params = {}) {
    this.options = {
      ...this.defaults,
      ...params,
    };

    this.urlset = [];
  }

  add(urls) {
    [].concat(urls)
      .slice(0, this.options.maxUrls - this.urlset.length)
      .forEach(url => this.urlset.push(new Location({ ...url, domain: this.domain })));

    return this;
  }

  push(urls) { return this.add(urls); }

  toString() {
    return [
      `<?xml version="${this.options['xml.version']}" encoding="${this.options['xml.encoding']}" ?>`,
      [
        '<urlset',
        `xmlns="${this.options['xmlns']}"`,
        `xmlns:xsi="${this.options['xmlns.xsi']}"`,
        `xmlns:news="${this.options['xmlns.news']}"`,
        `xmlns:xhtml="${this.options['xmlns.xhtml']}"`,
        `xmlns:mobile="${this.options['xmlns.mobile']}"`,
        `xmlns:image="${this.options['xmlns.image']}"`,
        `xmlns:video="${this.options['xmlns.video']}"`,
        '>',
      ].join(' '),
      this.urlset.map(url => url.toString()).join(''),
      `</urlset>`,
    ].join('');
  }
}
