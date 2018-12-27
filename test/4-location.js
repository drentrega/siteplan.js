const assert = require('assert');

const Location = require('../src/location');

describe('location', () => {
  const data = {
    domain: 'https://drentrega.github.io',
    path: '/siteplan',
    priority: 0.5,
    modifiedAt: (new Date()).toISOString(),
    updateFrequency: 'daily',
    mobile: true,
  },
  url = new Location(data),
  compiled = url.toString();

  ['loc', 'priority', 'lastmod', 'changefreq', 'mobile'].forEach(key => {
    it(`attribute ${key} is set`, () => {
      assert.ok(url[key]);
    });

    it(`attribute ${key} was rendered`, () => {
      assert.ok(compiled.match(key));
    });
  });
});
