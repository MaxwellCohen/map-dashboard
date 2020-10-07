
import {getData} from '../api/googleSheetsApi';

export const REQUEST_DATA = 'REQUEST_DATA';
export const LOAD_DATA = 'LOAD_DATA';
export const APPLY_FILTERS ='APPLY_FILTERS';

export const loadData = () => async(dispatch) => {
  dispatch({type:REQUEST_DATA})
  console.log('loading data')
  const {data: apiData} = await getData();
  const alldata = prepDataData(convertCSVToJSON(apiData))
  dispatch({
    type: LOAD_DATA,
    payload: {
      data: alldata,
    }
  })
}


export const applyfilters = (data, filters) => {
  const filteredData = filters.reduce((acc, fn) => {
    return fn(acc);
  }, data)
  console.log(filteredData)
  return {
    type: APPLY_FILTERS,
    payload: {
      filteredData
    }
  }
}



export const convertCSVToJSON  = (str, delimiter = ',') => {
  const titles = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');
  return rows.map(row => {
      const values = row.split(delimiter);
      return titles.reduce((object, curr, i) => (object[curr] = values[i], object), {})
  });
};

const prepDataData = (data)=> {
  const obj = data.reduce((acc, item) => {
    if( !item.region) {
      return acc
    }
    const key = 'us-' + item.region.toLowerCase();
    if(!acc[key]) {
      acc[key] = [key, []]
    }
    acc[key][1].push(item)
    return acc;
  }, {})
  return Object.values(obj)
};