const AlternativeUrl = require('./alternative-url');
const Frequencies = require('./concerns/frequencies');

module.exports = class Location {
  constructor({ domain, path, modifiedAt, updateFrequency, priority, mobile, alternatives = [] }) {
    this.loc = `${domain}${path}`;
    this.alternatives = [];

    if (mobile) this.mobile = mobile;
    if (modifiedAt) this.lastmod = (new Date(modifiedAt)).toISOString();
    if (priority && priority >= 0 && priority <= 1) this.priority = priority;
    if (updateFrequency && Object.values(Frequencies).includes(updateFrequency)) this.changefreq = updateFrequency;

    [].concat(alternatives).forEach(alternative => this.alternatives.push(new AlternativeUrl(alternative)));
  }

  toString() {
    return [
      '<url>',
      ['loc', 'priority', 'changefreq', 'lastmod'].map(elem => this[elem] ? `<${elem}>${this[elem]}</${elem}>` : '').join(''),
      this.mobile ? '<mobile:mobile/>' : '',
      this.alternatives.map(alternative => alternative.toString()).join(''),
      `</url>`,
    ].join('');
  }
}
