type Strategy = (value: string) => boolean;
export const strategies = {
  A: (value: string) => value.length > 0,
  B: (value: string) => /d+/.test(value),
};

export class Application {
  value = '';
  validate(strategy: Strategy) {
    return strategy(this.value);
  }
}
