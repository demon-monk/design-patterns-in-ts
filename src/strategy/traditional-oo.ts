interface Strategy {
  validate(value: string): boolean;
}

// length should be > 1
export class StrategyA implements Strategy {
  validate(value: string) {
    return value.length > 1;
  }
}

// contains at least one "d" char
export class StrategyB implements Strategy {
  validate(value: string) {
    return /d+/.test(value);
  }
}

export class Application {
  value = '';
  validate(strategy: Strategy) {
    return strategy.validate(this.value);
  }
}
