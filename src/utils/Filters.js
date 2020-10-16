import { isSameDay, isWithinInterval, isBefore, isAfter } from 'date-fns';
import { memoize } from 'lodash';

const determinType = memoize((value) => {
  let type = 'string';
  const numberValue = parseFloat(value);
  const dateValue = new Date(value);

  if (numberValue.toString() === value.toString()) {
    type = 'number';
    value = numberValue;
  } else if (!isNaN(dateValue.valueOf())) {
    type = 'date';
    value = dateValue;
  }
  return [type, value];
});

const parseData = (type, value) => {
  switch (type) {
    case 'string':
      return '' + value;
    case 'date':
      return new Date(value);
    case 'number':
      return parseFloat(value);
    default:
      return value;
  }
};

const baseCompare = (value, field, numCompare, dateCompare, defaultCompare) => (
  item,
) => {
  if (!value) {
    return () => true;
  }
  const [type, userValue] = determinType(value);
  const iv = parseData(type, item[field]);
  switch (type) {
    case 'number':
      return numCompare(iv, userValue);
    case 'date':
      return dateCompare(iv, userValue);
    default:
      return defaultCompare(iv, userValue);
  }
};

const dateBetween = (field, startDate, endDate) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  return (item) => {
    const date = new Date(item[field]);
    if (isNaN(date.getTime())) {
      return false;
    }
    return isWithinInterval(date, { start: startDate, end: endDate });
  };
};

const equals = (field, value) => {
  const numCompare = memoize((iv, v) => iv === v);
  const dateCompare = memoize((iv, v) => isSameDay(new Date(iv), v));
  const defaultCompare = memoize((iv, v) => iv === v);
  return baseCompare(value, field, numCompare, dateCompare, defaultCompare);
};
const greater = (field, value) => {
  const numCompare = memoize((iv, v) => iv >= v);
  const dateCompare = memoize((iv, v) => isAfter(new Date(iv), v));
  const defaultCompare = memoize((iv, v) => iv >= v);
  return baseCompare(value, field, numCompare, dateCompare, defaultCompare);
};

const less = (field, value) => {
  const numCompare = memoize((iv, v) => iv <= v);
  const dateCompare = memoize((iv, v) => isBefore(new Date(iv), v));
  const defaultCompare = memoize((iv, v) => iv <= v);
  return baseCompare(value, field, numCompare, dateCompare, defaultCompare);
};

export const filterObject = {
  equals,
  greater,
  less,
  dayOf: equals,
  dateAfter: greater,
  dateBefore: less,
  dateBetween,
};

export const makeFitler = (name, ...props) => {
  const fnMaker = filterObject[name];
  if (fnMaker) {
    return fnMaker(...props);
  }
  return null;
};
