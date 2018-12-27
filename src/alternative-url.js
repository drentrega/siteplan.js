module.exports = class AlternativeUrl {
  constructor({ language, link }) {
    this.href = link;
    if (language) this.hreflang = language;
  }

  toString() {
    return `<xhtml:link rel="alternate" ${this.hreflang ? `hreflang="${this.hreflang}"` : '' } href="${this.href}"/>`;
  }
}
