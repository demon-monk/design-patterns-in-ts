export default class Singleton {
  private static _instance: Singleton = null;
  private a = 0;
  public static getInstance() {
    if (Singleton._instance) {
      return Singleton._instance;
    }
    return (Singleton._instance = new Singleton());
  }
  private constructor() {
    this.a = 1;
  }
}
