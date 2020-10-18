export default class Calculations {
  constructor(arr, key) {
    this.arr = arr;
    this.key = key;
  }

  get _numberData() {
    if (this.__numberData) {
      return this.__numberData;
    }
    this.__numberData = this.arr
      .map((a) => parseFloat(a[this.key]))
      .filter((a) => !isNaN(a));
    return this.__numberData;
  }

  get average() {
    if (!this.count) {
      return 0;
    }
    return this.sum / this.count;
  }

  get count() {
    return this.arr.length;
  }

  get countOfNumbers() {
    return this._numberData.length;
  }

  get max() {
    if (this._max !== undefined) {
      return this._max;
    }
    this._max = Math.max(...this._numberData);
    return this._max;
  }

  get min() {
    if (this._min !== undefined) {
      return this._min;
    }
    this._min = Math.min(...this._numberData);
    return this._min;
  }

  get sum() {
    if (this._sum !== undefined) {
      return this._sum;
    }
    this._sum = this._numberData.reduce((a, b) => a + b, 0);
    return this._sum;
  }

  get range() {
    return this.max - this.min;
  }

  _display() {
    return `
    <br>Average: ${this.average.toFixed(2)}
    <br>Count: ${this.count} 
    <br>Sum: ${this.sum.toFixed(2)}
    <br>Min: ${this.min.toFixed(2)}
    <br>Max: ${this.max.toFixed(2)}
    <br>Range: ${this.range.toFixed(2)}
    `;
  }
}
