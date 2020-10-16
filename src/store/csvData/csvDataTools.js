import stateMap from '../../constants/stateMap';
import Calculations from '../../utils/Calculations';
import { camelCase } from 'lodash';
import { makeFitler } from '../../utils/Filters';

export const groupData = (stateKey, data) => {
  if (!stateKey) {
    return [];
  }
  const obj = data.reduce((acc, item) => {
    if (!item[stateKey]) {
      return acc;
    }
    const key = normalizeState(item[stateKey]);
    if (!key) {
      return acc;
    }
    if (!acc[key]) {
      acc[key] = [key, []];
    }
    acc[key][1].push(item);
    return acc;
  }, {});
  return Object.values(obj);
};

export const normalizeState = (state) => {
  if (typeof state !== 'string') {
    return null;
  }
  const cleanState = stateMap[state.toLowerCase().replace(/[^a-z]/gim, '')];
  if (cleanState) {
    return 'us-' + cleanState;
  }
  return null;
};
export const filterData = (rawData, filterData) => {
  if (filterData.length === 0) {
    return rawData;
  }
  const filters = filterData.map((fd) => makeFitler(...fd)).filter(Boolean)
  return rawData.filter((value) => {
    const result =  filters.every((fn) => fn(value));
    return result;
  });
};

export const processToDisplay = (
  groupedData,
  displayField,
  aggregationAction,
) => {
  if (!aggregationAction || !displayField) {
    return [];
  }

  aggregationAction = camelCase(aggregationAction);
  return groupedData.map(([key, arr]) => {
    const calc = new Calculations(arr, displayField);
    const displayVal = calc[aggregationAction]();
    return [key, displayVal, calc];
  });
};

export const updateAggregationAction = (mapData, aggregationAction) => {
  if (!aggregationAction || !Array.isArray(mapData)) {
    return [];
  }

  aggregationAction = camelCase(aggregationAction);
  return mapData.map(([key, df, calc]) => {
    const displayVal = calc[aggregationAction]();
    return [key, displayVal, calc];
  });
};

export const convertCSVToJSON = (str = '', delimiter = ',') => {
  const titles = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');
  return [
    titles,
    rows.map((row) => {
      const values = row.split(delimiter);
      return titles.reduce((object, curr, i) => {
        object[curr] = values[i];
        return object;
      }, {});
    }),
  ];
};
