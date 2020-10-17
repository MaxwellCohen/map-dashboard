export default class Calculations {
  constructor(arr, key) {
    this.arr = arr;
    this.key = key;
    this.numberData = arr
      .map((a) => parseFloat(a[this.key]))
      .filter((a) => !isNaN(a));
  }

  average() {
    if (this.count()) {
      return this.sum() / this.count();
    }
  }

  count() {
    return this.arr.length;
  }

  countOfNumbers() {
    return this.numberData.length;
  }

  max() {
    if (this._max !== undefined) {
      return this._max;
    }
    this._max = Math.max(...this.numberData);
    return this._max;
  }

  min() {
    if (this._min !== undefined) {
      return this._min;
    }
    this._min = Math.min(...this.numberData);
    return this._min;
  }

  sum() {
    if (this._sum !== undefined) {
      return this._sum;
    }
    this._sum = this.numberData.reduce((a, b) => a + b, 0);
    return this._sum;
  }
}
