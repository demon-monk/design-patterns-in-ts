import Singleton from '../proxy-srp';

test('proxied Singleton class should always return the same instance when use new keyword', () => {
  expect(new Singleton()).toBe(new Singleton());
});
