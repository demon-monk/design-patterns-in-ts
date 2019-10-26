# 策略模式

目的：做一件事，有不同的做法，以达到不一样的效果。将不同的做法封装成满足同一接口的不同算法。不同的算法满足 LSP，应用层应跟具体的策略实现解耦。

## 传统 OO

![](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuShCAqajIajCJbK8BYbAB4bDhrIevb8eIyp9J07oD3IvQhcuadCIYulXyeveV2SkBhYKWgvkZHrS1YxkX2RE1JFJiQ0W9pCviIGpFu-B2ua3L8-at24rBmNeLW00)

## JavaScript

因为函数在 Java，C++等语言中是无法单独传递的，所以“策略”会被封装到类里。策略（算法）最简练的形式应该是被封装到函数中。在 TypeScript（JavaScript）中，函数是一等公民，所以其中的策略模式可以简化。

```ts
type Strategy = (value: string) => boolean;
export const strategies = {
  A: (value: string) => value.length > 1,
  B: (value: string) => /d+/.test(value),
};
```

其中所有策略都以函数的形式存储，在使用策略的调用方只需要提供一个`Strategy`类型的回调参数就行了。

## Context

策略在某些时刻是可以叠加的。就上面验证字符串的例子而言，完全可以将验证通过的条件改为两条策略同时通过，或者有一条通过即可通过。在业务层我们希望能用配置的方法增加或者删除策略，而非每次需求改变都去改动已有(或增加新)的策略类。此时就需要一层逻辑通过配置数据去组合策略。这一层通常被成为 Context。

```ts
export enum StrategyName {
  LenGT1 = 'length greater than 1',
  ContainAL1D = 'contains at lease one d char',
}
export const strategies = {
  [StrategyName.LenGT1]: (value: string) => value.length > 0,
  [StrategyName.ContainAL1D]: (value: string) => /d+/.test(value),
};

export class Validator {
  constructor(private config: StrategyName[]) {}
  validate(value: string) {
    return this.config.map(strategyName => strategies[strategyName](value)).reduce((prev, curr) => prev && curr, true);
  }
}
```

## 总结

- 传统 OOP 中，策略以类的形式出现完全是因为函数不能直接传递。在 TypeScript/JavaScript 中无此限制，策略模式退化成回调函数会更简单。

- 为了是策略能够自由组合，对已有策略类的改动封闭，对策略类的动态组合开发。在策略模式中可以增加一层 Context，用来通过配置的方式通过已有的“元策略”生成组合策略。
