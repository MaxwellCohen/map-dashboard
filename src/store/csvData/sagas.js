import { getCSV } from '../../api/api';
import { call, put, takeLatest, all, select, fork } from 'redux-saga/effects';
import * as Actions from './csvData.actions';
import {
  groupData as gd,
  normalizeState,
  convertCSVToJSON,
  buildStateVal,
  processToDisplay,
  filterData,
} from './csvDataTools';
import { updateQuery, getQueryVariable } from '../../utils/queryUtils';

var mapData = require('@highcharts/map-collection/countries/us/us-all.geo.json');
const stateMap = buildStateVal(mapData);

const getData = (state) => state.data;

function* fetchData(action) {
  try {
    yield put({ type: Actions.REQUEST_DATA });
    const url = action.payload.url;
    if (!url) {
      yield put({ type: Actions.LOAD_DATA_SUCCESS, payload: {} });
    }

    const displayField = getQueryVariable('df') || '';
    const aggregationAction = getQueryVariable('a') || '';
    const filteringFuncitons = getQueryVariable('f') || [];

    updateQuery('url', url);
    const { data: apiData } = yield call(getCSV, url);
    const [titles, rawData] = yield call(convertCSVToJSON, apiData);
    const stateKey =
      getQueryVariable('s') ||
      titles.find((t) => normalizeState(stateMap, (rawData[0] || {})[t])) ||
      '';

    const filteredData = yield call(filterData, rawData, filteringFuncitons);

    const groupData = yield call(gd, stateMap, stateKey, filteredData);

    const mapData = yield call(
      processToDisplay,
      displayField,
      null,
      aggregationAction,
      groupData,
    );

    
    yield put({
      type: Actions.LOAD_DATA_SUCCESS,
      payload: {
        url,
        titles,
        rawData,
        filteredData,
        displayField,
        filteringFuncitons,
        aggregationAction,
        groupData,
        mapData,
        stateKey,
        stateMap,
      },
    });
  } catch (e) {
    yield put({ type: Actions.LOAD_DATA_FAILURE, message: e.message });
  }
}

function* updateFilters(action) {
  try {
    const filteringFuncitons = action.payload.filteringFuncitons;
    updateQuery('f', filteringFuncitons);
    const state = yield select(getData);
    if (state.filteringFuncitons.toString() === filteringFuncitons.toString()) {
      return;
    }
    const filteredData = yield call(
      filterData,
      state.rawData,
      filteringFuncitons,
    );
    const groupData = yield call(
      gd,
      state.stateMap,
      state.stateKey,
      filteredData,
    );
    const mapData = yield call(
      processToDisplay,
      state.displayField,
      state.displayField,
      state.aggregationAction,
      groupData,
    );
    
    yield put({
      type: Actions.ADD_FILTERS,
      payload: {
        filteringFuncitons,
        filteredData,
        groupData,
        mapData,
      },
    });
  } catch {}
}

function* groupDataSaga(action) {
  try {
    const stateKey = action.payload.stateKey;
    updateQuery('s', stateKey);
    const state = yield select(getData);
    const groupData = yield call(
      gd,
      state.stateMap,
      stateKey,
      state.filteredData,
    );
    const mapData = yield call(
      processToDisplay,
      state.displayField,
      state.displayField,
      state.aggregationAction,
      groupData,
    );
    
    yield put({
      type: Actions.SET_STATE_AND_GROUP,
      payload: {
        stateKey,
        groupData,
        mapData,
      },
    });
  } catch {}
}

function* setDisplay(action) {
  try {
    const { displayField, aggregationAction } = action.payload;
    yield call(updateQuery, 'df', displayField);
    yield call(updateQuery, 'a', aggregationAction);
    const state = yield select(getData);
    const mapData = yield call(
      processToDisplay,
      displayField,
      state.displayField,
      aggregationAction,
      state.groupData,
      state.mapData,
    );

    
    yield put({
      type: Actions.SET_DISPLAY,
      payload: {
        displayField,
        aggregationAction,
        mapData,
      },
    });
  } catch {}
}

function* mySaga() {
  yield all([
    takeLatest(Actions.LOAD_DATA_SAGA, fetchData),
    takeLatest(Actions.SET_DISPLAY_SAGA, setDisplay),
    takeLatest(Actions.ADD_FILTERS_SAGA, updateFilters),
    takeLatest(Actions.SET_STATE_AND_GROUP_SAGA, groupDataSaga),
  ]);
}

export default mySaga;
