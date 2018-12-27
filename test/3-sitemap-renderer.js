const assert = require('assert');

const { Sitemap } = require('../src');
const urls = require('./concerns/urls-generator');

describe('sitemap renderer', () => {
  it('a empty sitemap', () => {
    const sm = new Sitemap();
  });

  it('a empty sitemap', () => {
    const sm = new Sitemap({ maxUrls: 5 });
    sm.add(urls(1000))
  });
});
