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

export class Application {
  public value = '';
  validate(validator: Validator) {
    return validator.validate(this.value);
  }
}
