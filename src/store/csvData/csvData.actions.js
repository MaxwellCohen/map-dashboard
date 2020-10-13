export const REQUEST_DATA = 'REQUEST_DATA';
export const LOAD_DATA_SAGA = 'LOAD_DATA_SAGA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const SET_STATE_AND_GROUP = 'SET_STATE_AND_GROUP';
export const SET_DISPLAY = 'SET_DISPLAY_FIELD';
export const SET_AGGREGATION_TYPE = 'SET_AGGREGATION_TYPE';
export const SET_DISPLAY_FN = 'SET_DISPLAY_FN';
export const ADD_FILTER_FN = 'ADD_FILTER_FN';

export const loadData = (url) => ({
  type: LOAD_DATA_SAGA,
  payload: {
    url,
  },
});

export const updateDisplay = (displayField, aggregationAction) => {
  return {
    type: SET_DISPLAY,
    payload: {
      displayField,
      aggregationAction,
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
