
import Calculations from '../../utils/Calculations';
import { camelCase } from 'lodash';
import { makeFitler } from '../../utils/Filters';

export const cleanStateVal = (v) => ('' + v).replace(/[^a-z0-9]/gim, '').toUpperCase();
//.replace(/COUNTY|CITYOF|CITY/gmi, '');
export const buildStateVal = (mapData) => {
  const properties = mapData.features.map(({ properties }) => properties);
  const hcMap = properties.reduce((obj, item) => {
    const hckey = item['hc-key'];
    if (!hckey) return obj;
    const entries = Object.entries(item);
    entries.forEach(([k, i],idx) => {
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
        if(k === 'name' && item['hc-group'] === 'admin2') {
          obj[i + 'COUNTY'] = hckey;
        }
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
    const key = normalizeState(stateMap, item[stateKey]);
    if (!key) {
      return acc;
    }
    if (!acc[key]) {
      acc[key] = [key,null, new Calculations()];
    }
    acc[key][2]._addValue(item);
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
  if (filters.length === 0) {
    return rawData;
  }
  return rawData.filter((value) => filters.every((fn) => fn(value)));
};

export const processToDisplay = (
  displayField,
  aggregationAction,
  groupedData,
) => {
  aggregationAction = camelCase(aggregationAction);
  return groupedData.map(([key, ov, calc]) => {
    if (aggregationAction && displayField) {
      calc._changeKey(displayField)
      return [key, calc[aggregationAction], calc];
    } else {
      return [key, null, calc];
    }
  });
  
};

export const strCleanup = str => str.replace(/^"(.+(?="$))"$/, '$1')

export const convertCSVToJSON = (str = '', delimiter = /\t|,/) => {
  const titles = str.slice(0, str.indexOf('\n')).split(delimiter).map(strCleanup);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');
  return [
    titles,
    rows.map((row) => {
      const values = row.split(delimiter);
      return titles.reduce((object, curr, i) => {
        if(values[i]) {
          object[curr] = strCleanup(values[i])
        }
        return object;
      }, {});
    }),
  ];
};


