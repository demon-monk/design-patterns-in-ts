import { StrategyA, StrategyB, Application } from '../traditional-oo';

it('should test the value length of application more than 1', () => {
  const strategyA = new StrategyA();
  const app = new Application();
  expect(app.validate(strategyA)).toBe(false);
  app.value = 'length';
  expect(app.validate(strategyA)).toBe(true);
});

it('should test value of application contains at least one d char', () => {
  const strategyB = new StrategyB();
  const app = new Application();
  expect(app.validate(strategyB)).toBe(false);
  app.value = 'length';
  expect(app.validate(strategyB)).toBe(false);
  app.value = 'xdx';
  expect(app.validate(strategyB)).toBe(true);
});
