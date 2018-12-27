const assert = require('assert');

const { Sitemap } = require('../src');

describe('sitemap config', () => {
  describe('constructor params', () => {

    it('basic config set', () => {
      const options = {
        maxUrls: 10,
        domain: 'https://www.drentrega.com',
      }, sm = new Sitemap(options);

      Object.keys(options).forEach(option => {
        assert.strictEqual(sm.options[option], options[option], option);
      });
    });

  });
});
