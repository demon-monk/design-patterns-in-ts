import { Validator, StrategyName, Application } from '../config-driven';

it('should apply both strategies to validation logic simutanouesly', () => {
  const validator = new Validator([StrategyName.ContainAL1D, StrategyName.LenGT1]);
  const application = new Application();
  expect(application.validate(validator)).toBe(false);
  application.value = 'x';
  expect(application.validate(validator)).toBe(false);
  application.value = 'xd';
  expect(application.validate(validator)).toBe(true);
});
