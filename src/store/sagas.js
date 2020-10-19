import { getCSV } from '../api/api';
import {
  call,
  put,
  takeLatest,
  all,
  select,
  takeEvery,
} from 'redux-saga/effects';
import * as Actions from './csvData/csvData.actions';
import {
  groupData as gd,
  normalizeState,
  convertCSVToJSON,
  buildStateVal,
  processToDisplay,
  filterData,
} from './csvData/csvDataTools';
import { updateQuery, getQueryVariable } from '../utils/queryUtils';

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

    let {
      df: displayField = '',
      a: aggregationAction = '',
      f: filteringFuncitons = [],
      s: stateKey = '',
    } = getQueryVariable();

    updateQuery('url', url);

    yield put({
      type: Actions.UPDATE_DISPLAY_VALUES,
      payload: {
        url,
        displayField,
        aggregationAction,
        filteringFuncitons,
        stateKey,
      },
    });

    const { data: apiData } = yield call(getCSV, url);
    const [titles, rawData] = yield call(convertCSVToJSON, apiData);
    stateKey =
      stateKey ||
      titles.find((t) => normalizeState(stateMap, (rawData[0])[t])) ||
      '';

    const filteredData = yield call(filterData, rawData, filteringFuncitons);

    let groupData = yield call(gd, stateMap, stateKey, filteredData);

    groupData = yield call(
      processToDisplay,
      displayField,
      aggregationAction,
      groupData,
    );

    yield put({
      type: Actions.LOAD_DATA_SUCCESS,
      payload: {
        url,
        titles,
        displayField,
        rawData,
        filteredData,
        filteringFuncitons,
        aggregationAction,
        groupData,
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

    const state = yield select(getData);
    if (state.filteringFuncitons.toString() === filteringFuncitons.toString()) {
      return;
    }
    updateQuery('f', filteringFuncitons);
    yield put({type: Actions.UPDATE_DISPLAY_VALUES, payload: {filteringFuncitons}});
    const filteredData = yield call(
      filterData,
      state.rawData,
      filteringFuncitons,
    );
    let groupData = yield call(
      gd,
      state.stateMap,
      state.stateKey,
      filteredData,
    );
    groupData = yield call(
      processToDisplay,
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
      },
    });
  } catch {}
}

function* groupDataSaga(action) {
  try {
    const stateKey = action.payload.stateKey;
    const state = yield select(getData);
    updateQuery('s', stateKey);
    yield put({
      type: Actions.UPDATE_DISPLAY_VALUES,
      payload: {
        stateKey,
      },
    });

    let groupData = yield call(
      gd,
      state.stateMap,
      stateKey,
      state.filteredData,
    );
    groupData = yield call(
      processToDisplay,
      state.displayField,
      state.aggregationAction,
      groupData,
    );

    yield put({
      type: Actions.SET_STATE_AND_GROUP,
      payload: {
        stateKey,
        groupData,
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

    yield put({
      type: Actions.UPDATE_DISPLAY_VALUES,
      payload: {
        displayField,
        aggregationAction,
      },
    });

    const groupData = yield call(
      processToDisplay,
      displayField,
      aggregationAction,
      state.groupData,
    );

    yield put({
      type: Actions.SET_DISPLAY,
      payload: {
        displayField,
        aggregationAction,
        groupData,
      },
    });
  } catch {}
}

function* mySaga() {
  yield all([
    takeLatest(Actions.LOAD_DATA_SAGA, fetchData),
    takeEvery(Actions.SET_DISPLAY_SAGA, setDisplay),
    takeEvery(Actions.APPLY_FILTERS_SAGA, updateFilters),
    takeEvery(Actions.SET_STATE_AND_GROUP_SAGA, groupDataSaga),
  ]);
}

export default mySaga;
