
import Calculations from '../../utils/Calculations';
import { camelCase } from 'lodash';
import { makeFitler } from '../../utils/Filters';

export const cleanStateVal = (v) => ('' + v).replace(/[^a-z0-9]/gim, '').toUpperCase();
export const buildStateVal = (mapData) => {
  const properties = mapData.features.map(({ properties }) => properties);
  const hcMap = properties.reduce((obj, item) => {
    const hckey = item['hc-key'];
    if (!hckey) return obj;
    const entries = Object.entries(item);
    entries.forEach(([k, i]) => {
      if (
        [
          'labelrank',
          'longitude',
          'latitude',
          'hc-middle-x',
          'hc-middle-x',
          'hc-middle-x',
        ].includes(k)
      )
        return obj;
      i = cleanStateVal(i);
      if (obj[i] === undefined) {
        obj[i] = hckey;
      } else if (obj[i] !== hckey) {
        obj[i] = null;
      }
    });
    return obj;
  }, {});
  return hcMap;
};


export const groupData = (stateMap, stateKey, data) => {
  if (!stateKey) {
    return [];
  }
  const obj = data.reduce((acc, item) => {
    if (!item[stateKey]) {
      return acc;
    }
    const key = normalizeState(stateMap, item[stateKey]);
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

export const normalizeState = (stateMap, state) => {
  try {
    return stateMap[cleanStateVal(state)] || null;
  } catch {
    return null;
  }
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
  displayField,
  oldDisplayField,
  aggregationAction,
  groupedData,
  mapData = [],
) => {
  // do not display if there is no display field or aggregationAction
  if (!aggregationAction || !displayField) {
    return [];
  }
  aggregationAction = camelCase(aggregationAction);

  if (mapData.length && displayField === oldDisplayField) {
    // update only
    return mapData.map(([key, df, calc]) => {
      const displayVal = calc[aggregationAction];
      return [key, displayVal, calc];
    });
  } 

  return groupedData.map(([key, arr]) => {
    const calc = new Calculations(arr, displayField);
    const displayVal = calc[aggregationAction];
    return [key, displayVal, calc];
  });
  
};

export const convertCSVToJSON = (str = '', delimiter = ',') => {
  const titles = str.slice(0, str.indexOf('\n')).split(delimiter).map(str => str.replace(/^"(.+(?="$))"$/, '$1') );
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');
  return [
    titles,
    rows.map((row) => {
      const values = row.split(delimiter);
      return titles.reduce((object, curr, i) => {
        if(values[i]) {
          object[curr] = values[i].replace(/^"(.+(?="$))"$/, '$1');
        }
        return object;
      }, {});
    }),
  ];
};


