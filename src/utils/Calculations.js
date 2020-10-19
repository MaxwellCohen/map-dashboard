export default class Calculations {
  constructor(arr, key) {
    this.arr = arr ?? [];
    this.key = key ?? '';
    this.cache = {};
  }

  _changeKey(newKey) {
    if (newKey !== this.key) {
      this.cache = {};
      this.key = newKey;
    }
  }

  _addValue(val) {
    this.arr.push(val)
    this.cache = {};
  }

  get _numberData() {
    if (this.cache.numberData) {
      return this.cache.numberData;
    }
    this.cache.numberData = this.arr
      .map((a) => parseFloat(a[this.key]))
      .filter((a) => !isNaN(a));
    return this.cache.numberData;
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

  get _countOfNumbers() {
    return this._numberData.length;
  }

  get max() {
    if (this.cache.max !== undefined) {
      return this.cache.max;
    }
    this.cache.max = Math.max(...this._numberData);
    return this.cache.max;
  }

  get min() {
    if (this.cache.min !== undefined) {
      return this.cache.min;
    }
    this.cache.min = Math.min(...this._numberData);
    return this.cache.min;
  }

  get sum() {
    if (this.cache.sum !== undefined) {
      return this.cache.sum;
    }
    this.cache.sum = this._numberData.reduce((a, b) => a + b, 0);
    return this.cache.sum;
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
