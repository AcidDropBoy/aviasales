export default class Api {
  static url = 'https://front-test.beta.aviasales.ru';

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} received ${res.status}`);
    }
    return res.json();
  }

  async getKey() {
    return this.getResource(`${Api.url}/search`);
  }

  async getApiTicket(key) {
    return this.getResource(`${Api.url}/tickets?searchId=${key}`);
  }
}
