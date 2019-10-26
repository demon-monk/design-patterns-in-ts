import Singleton from '../transparent';

test('transparent singleton class should always return the same instance when use new keyword', () => {
  expect(new Singleton()).toBe(new Singleton());
  //   expect(new Singleton(1) === new Singleton(1)).toBe(true);
});
