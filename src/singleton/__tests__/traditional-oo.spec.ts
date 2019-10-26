import Singleton from '../traditional-oo';

test('traditional OO singleton class should always get the same instance', () => {
  expect(Singleton.getInstance()).toBe(Singleton.getInstance());
});
