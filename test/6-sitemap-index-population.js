const assert = require('assert');

const { SitemapIndex } = require('../src');
const urls = require('./concerns/urls-generator');

describe('sitemap-index quantities', () => {
  describe('total of index file tree', () => {
    Array.apply(null, { length: 5 })
      .map((_, i) => 2**(10+i))
      .forEach(numberOfUrls => {
        it(`has ${numberOfUrls} elements`, () => {
          const smi = new SitemapIndex({ maxUrlsPerSitemap: numberOfUrls });
          smi.add(urls(numberOfUrls));
          assert.equal(smi.total, numberOfUrls);
        })
      });
  });

  describe('allocation of new sitemaps', () => {
    const maxUrlsPerSitemap = 1024;

    Array.apply(null, { length: 5 })
      .map((_, i) => 2**(10+i)+1)
      .forEach(numberOfUrls => {
        const expectedSitemapsNumber = parseInt(numberOfUrls / maxUrlsPerSitemap) + (numberOfUrls % maxUrlsPerSitemap ? 1 : 0);

        it(`has should have ${expectedSitemapsNumber} sitemaps`, () => {
          const smi = new SitemapIndex({ maxUrlsPerSitemap });
          smi.add(urls(numberOfUrls));
          assert.equal(smi.sitemaps.length, expectedSitemapsNumber);
        })
      });
  });
});
