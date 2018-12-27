const assert = require('assert');

const { Sitemap } = require('../src');
const urls = require('./concerns/urls-generator')

describe('sitemap quantities', () => {
  it('empty sitemap', () => {
    const sm = new Sitemap();
    assert.equal(sm.urlset.length, 0);
  });

  Array.apply(null, { length: 5 })
    .map((_, i) => 2**(10+i))
    .forEach(maxUrls => {
      it(`has ${maxUrls} elements`, () => {
        const sm = new Sitemap({ maxUrls });
        sm.add(urls(maxUrls));
        assert.equal(sm.urlset.length, maxUrls);
      })
    });

  it('cannot overpass max urls', () => {
    const maxUrls = 10;
    const sm = new Sitemap({ maxUrls });
    sm.add(urls(maxUrls));
    sm.add(urls(maxUrls));
    assert.equal(sm.urlset.length, maxUrls);
  });
});
