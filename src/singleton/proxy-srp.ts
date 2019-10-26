let instance: Singleton = null;
class SingletonImpl {
  private a = 0;
  constructor() {
    this.a = 1;
  }
}
export default class Singleton extends SingletonImpl {
  constructor() {
    super();
    if (instance) {
      return instance;
    }
    return (instance = new SingletonImpl());
  }
}
