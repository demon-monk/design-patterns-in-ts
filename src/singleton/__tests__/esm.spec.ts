import instance1 from '../esm';
import instance2 from '../esm';

test('esm always give the the exported instance', () => {
  expect(instance1).toBe(instance2);
});
