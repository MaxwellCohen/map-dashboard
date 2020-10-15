import isWithinInterval from 'date-fns/isWithinInterval';

const filterObject = {
  'dateBetween': (field, start, end) => {
    start = new Date(start);
    end = new Date(end);
    return (item) => {
    const date = new Date(item[field]);
    if (isNaN(date.getTime())) {
      return false;
    }
    return isWithinInterval(date, { start, end });
  }}

}


// const defaultFilter = () => () => true;

export const makeFitler = (name, ...props) => {
  const fnMaker = filterObject[name];
  if (fnMaker) {
    return fnMaker(...props);
  }
  return null

}