# 单例模式

> 目的：保证某个类的实例唯一，并提供一个全局访问点。

## 传统 OO

```ts
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
```

### 问题

- **不透明**：调用者必须要知道它所依赖的类是个单例类，并使用这个单例类所提供的静态接口去获取/创建对象。
- **解决方案**：传统的 OO 采用 [MONOSTATE](https://www.simplethread.com/the-monostate-pattern/) 方式去解决不透明的问题，但是引入的问题是实质上创建了多个实例。而 Javascript 可以使用闭包，可以同时满足单例和透明的需求。

## 对调用者透明的单例

> 通过将模块内的局部变量打入构造函数的闭包中，实现在构造函数中对唯一实例的判断，进而实现单例模式。

```ts
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
```

### 问题

- 构造函数中既要完成对对单例是否存在的判断，又要负责创建对象。**违反了 [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle)**。

## 使用 proxy 子类来分离创建实例和返回实例的职责

> 使用传统 OO 的继承思想是一种常见的分离职责的方式。

```ts
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
```

### 问题

- 一个简单的单例要两个类，太麻烦了。

## 使用 ES Module

> ES Module 的 [live-binding](https://demon-monk.github.io/ESM-live-binding/) 会使所有模块导出项和引用项保持同一个引用，即同一个实例。TypeScript 原生支持 ESM，实现单例的最简单模式是在模块中生成实例，并只导出该实例。

```ts
class Singleton {
  private a = 0;
  constructor() {
    this.a = 1;
  }
}

export default new Singleton();
```

### 问题

- **不能使用延迟创建技术**。所有的单例对象的创建工作发生在 [ES Module 的初始化 Evaluate 阶段](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)。

## 其他方式

使用传统的 ES5 采用闭包实现单例其实也非常简单。但是相对于使用 ES6 提供的 class 关键字创建类，进而创建实例的方式，在语法上略显晦涩，可读性不是很高，且无法保证类型安全，这里就不一一列举了。有兴趣可以参考[JavaScript 设计模式与开发实践](https://book.douban.com/subject/26382780/)这本书第四章。

## 总结

前几中实现单例的方式本质上都是在 ES6 class 关键字和 JavaScript 闭包的加持下，对传统 OO 单例的模仿。对于有延迟创建的需求，可以使用这几种方式实现。其他都推荐直接使用 ESM，最简单明了。
