const Sitemap = require('./sitemap');

module.exports = class SitemapIndex {
  get defaults() {
    return {
      // building params
      maxUrlsPerSitemap: 50 * 1000,
      domain: 'https://www.example.com',
    }
  }

  constructor(params = {}) {
    this.options = {
      ...this.defaults,
      ...params,
    };

    this.sitemaps = [];
  }

  get spaceLeft() {
    return this.sitemaps
      .filter(sitemap => sitemap.completed < 1)
      .reduce((acc, sitemap) => { acc += sitemap.spaceLeft; return acc; }, 0);
  }

  get total() {
    return this.sitemaps.reduce((acc, sitemap) => { acc += sitemap.total; return acc; }, 0);
  }

  hasSpaceFor(n) {
    return this.spaceLeft >= n;
  }

  add(data) {
    return data instanceof Sitemap
      ? this.addSitemap(data)
      : this.addLocations(data);
  }

  addSitemap(sitemap = null) {
    this.sitemaps.push(sitemap || new Sitemap({
      domain: this.options.domain,
      maxUrls: this.options.maxUrlsPerSitemap,
    }));

    return this;
  }

  addLocations(locations = []) {
    while(!this.hasSpaceFor(locations.length)) {
      this.addSitemap();
    }

    let pointer = 0;
    this.sitemaps
      .filter(sitemap => sitemap.spaceLeft)
      .forEach(sitemap => {
        sitemap.add(locations.slice(pointer, pointer + sitemap.spaceLeft));
        pointer += sitemap.spaceLeft;
      });

    return this;
  }
}