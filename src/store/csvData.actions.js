import { getCSV } from '../api/googleSheetsApi';

export const REQUEST_DATA = 'REQUEST_DATA';
export const LOAD_DATA = 'LOAD_DATA';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const SET_STATE_AND_GROUP = 'SET_STATE_AND_GROUP';
export const SET_DISPLAY_FN = 'SET_DISPLAY_FN';
export const ADD_FILTER_FN = 'ADD_FILTER_FN';

export const loadData = (url) => async (dispatch) => {
  dispatch({ type: REQUEST_DATA });
  console.log('loading data');
  const { data: apiData } = await getCSV(url);
  const [titles, rawData] = convertCSVToJSON(apiData);
  dispatch({
    type: LOAD_DATA,
    payload: {
      titles: titles,
      rawData: rawData,
    },
  });
};

export const setDisplayFn = (displayField, fn) => {
  return {
    type: SET_DISPLAY_FN,
    payload: {
      displayField,
      displayFunction: fn,
    },
  };
};

export const addFilter = (filterFn, filterName) => {
  return {
    type: ADD_FILTER_FN,
    payload: {
      fn: filterFn,
      name: filterName,
    },
  };
};

export const groupData = (stateKey) => {
  return {
    type: SET_STATE_AND_GROUP,
    payload: {
      stateKey,
    },
  };
};

export const convertCSVToJSON = (str, delimiter = ',') => {
  const titles = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');
  return [
    titles,
    rows.map((row) => {
      const values = row.split(delimiter);
      return titles.reduce(
        (object, curr, i) => ((object[curr] = values[i]), object),
        {},
      );
    }),
  ];
};
