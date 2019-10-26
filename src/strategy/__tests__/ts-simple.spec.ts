import { strategies, Application } from '../ts-simple';

it('should test the value length of application more than 1', () => {
  const app = new Application();
  expect(app.validate(strategies.A)).toBe(false);
  app.value = 'length';
  expect(app.validate(strategies.A)).toBe(true);
});

it('should test value of application contains at least one d char', () => {
  const app = new Application();
  expect(app.validate(strategies.B)).toBe(false);
  app.value = 'length';
  expect(app.validate(strategies.B)).toBe(false);
  app.value = 'xdx';
  expect(app.validate(strategies.B)).toBe(true);
});
