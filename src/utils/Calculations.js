export default class Calculations {
  constructor(arr, key) {
    this.arr = arr;
    this.key = key;
    this.numberData = arr
      .map((a) => parseFloat(a[this.key]))
      .filter((a) => !isNaN(a));
  }

  get average() {
    if (!this.count) {
      return 0
    }
    return this.sum / this.count;
  }

  get count() {
    return this.arr.length;
  }

  get countOfNumbers() {
    return this.numberData.length;
  }

  get max() {
    if (this._max !== undefined) {
      return this._max;
    }
    this._max = Math.max(...this.numberData);
    return this._max;
  }

  get min() {
    if (this._min !== undefined) {
      return this._min;
    }
    this._min = Math.min(...this.numberData);
    return this._min;
  }

  get sum() {
    if (this._sum !== undefined) {
      return this._sum;
    }
    this._sum = this.numberData.reduce((a, b) => a + b, 0);
    return this._sum;
  }

  get range() {
    return this.max - this.min;
  }

  _display() {
    if (this.count === 1) {
      return `${this.sum.toFixed(2)}`
    }
    return `Count: ${this.count} <br> Min: ${this.min.toFixed(2)} <br> Max: ${this.max.toFixed(2)} <br> Sum: ${this.sum.toFixed(2)} <br> Average: ${this.average.toFixed(2)}`
  }
}
