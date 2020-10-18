export const REQUEST_DATA = 'REQUEST_DATA';
export const LOAD_DATA_SAGA = 'LOAD_DATA_SAGA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';

export const APPLY_FILTERS_SAGA = 'APPLY_FILTERS_SAGA';
export const SET_STATE_AND_GROUP_SAGA = 'SET_STATE_AND_GROUP_SAGA';
export const SET_STATE_AND_GROUP = 'SET_STATE_AND_GROUP';
export const SET_DISPLAY = 'SET_DISPLAY_FIELD';
export const SET_DISPLAY_SAGA = 'SET_DISPLAY_FIELD_SAGA';
export const SET_AGGREGATION_TYPE = 'SET_AGGREGATION_TYPE';
export const SET_DISPLAY_FN = 'SET_DISPLAY_FN';
export const ADD_FILTER_FN = 'ADD_FILTER_FN';
export const ADD_FILTERS = 'ADD_FILTERS';
export const ADD_FILTERS_SAGA = 'ADD_FILTERS_SAGA';

export const loadData = (url) => ({
  type: LOAD_DATA_SAGA,
  payload: {
    url,
  },
});

export const updateFilters = (filteringFuncitons) => ({
  type: ADD_FILTERS_SAGA,
  payload: {
    filteringFuncitons,
  },
});

export const groupData = (stateKey) => ({
  type: SET_STATE_AND_GROUP_SAGA,
  payload: {
    stateKey,
  },
});

export const updateDisplay = (displayField, aggregationAction) => ({
  type: SET_DISPLAY_SAGA,
  payload: {
    displayField,
    aggregationAction,
  },
});
