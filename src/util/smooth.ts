
export default class Lowpass {
  factor: number;
  history: number[];

  constructor(factor: number) {
    this.factor = factor || 2;
    this.history = []
  }

  update(value: number) {
    this.history.push(value);
    if (this.history.length > this.factor) {
      this.history.splice(0, this.history.length - this.factor);
    }
    const val = this.history.reduce((a, b) => a + b, 0) / this.history.length;
    return val;
  }

}
