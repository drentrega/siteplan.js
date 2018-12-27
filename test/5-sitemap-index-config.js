const assert = require('assert');

const { SitemapIndex } = require('../src');

describe('sitemap-index config', () => {
  describe('constructor params', () => {
    const options = {
      maxUrlsPerSitemap: 100,
      domain: 'https://drentrega.github.io',
    }, sm = new SitemapIndex(options);

    Object.keys(options).forEach(option => {
      it(`option ${option} set`, () => {
        assert.strictEqual(sm.options[option], options[option], option)
      });
    });
  });
});
