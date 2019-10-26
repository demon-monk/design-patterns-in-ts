let _instance: Singleton = null;

export default class Singleton {
  private a = 0;
  public constructor() {
    if (_instance) {
      return _instance;
    }
    this.init();
    _instance = this;
  }

  private init() {
    this.a = 1;
  }
}
