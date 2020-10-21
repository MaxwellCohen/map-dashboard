import { getCSV } from '../api/api';
import {
  call,
  put,
  takeLatest,
  all,
  select,
  takeEvery,
} from 'redux-saga/effects';
import * as csvDataActions from './csvData/csvData.actions';
import * as mapSettingActions from './mapSettings/mapSettings.actions';
import * as mapOptionsActions from './mapOptions/mapOptions.actions';
import {
  groupData as gd,
  normalizeState,
  convertCSVToJSON,
  buildStateVal,
  processToDisplay,
  filterData,
} from './csvData/csvDataTools';
import { updateQuery, getQueryVariable } from '../utils/queryUtils';

require('@highcharts/map-collection/countries/us/us-all');

const getData = (state) => state.data;
const getMapName = (state) => state.mapSettings.chart.map;

function* updateUrlLoadData(url) {
  let {
    df: displayField = '',
    a: aggregationAction = '',
    f: filteringFuncitons = [],
    s: stateKey = '',
  } = getQueryVariable();
  updateQuery('url', url);
  yield put({
    type: csvDataActions.UPDATE_DISPLAY_VALUES,
    payload: {
      url,
      displayField,
      aggregationAction,
      filteringFuncitons,
      stateKey,
    },
  });

  return [displayField, aggregationAction, filteringFuncitons, stateKey];
}

function* getfigureOutStateInfo(rawData, titles, stateKey) {
  const map = yield select(getMapName);
  const stateMap = buildStateVal(window.Highcharts.maps[map]);
  if (!stateKey) {
    stateKey =
      titles.find((t) => normalizeState(stateMap, rawData[0][t])) || '';
  }
  yield put({
    type: csvDataActions.UPDATE_DISPLAY_VALUES,
    payload: {
      stateMap,
      stateKey,
    },
  });
  return [stateKey, stateMap];
}

function* groupAndDisplayData(filteredData, displayField, aggregationAction) {
  const { stateMap, stateKey } = yield select(getData);
  let groupData = yield call(gd, stateMap, stateKey, filteredData);

  groupData = yield call(
    processToDisplay,
    displayField,
    aggregationAction,
    groupData,
  );
  return groupData;
}

function* fetchData(action) {
  try {
    yield put({ type: csvDataActions.REQUEST_DATA });
    const url = action.payload.url;
    if (!url) {
      yield put({ type: csvDataActions.LOAD_DATA_SUCCESS, payload: {} });
    }
    let [
      displayField,
      aggregationAction,
      filteringFuncitons,
      stateKey,
    ] = yield updateUrlLoadData(url);

    let stateMap;
    const response = yield call(getCSV, url);
    console.log(response);
    const apiData = response.data;
    let titles, rawData;

    if (Array.isArray(apiData)) {
      rawData = apiData;
      titles = Object.keys(rawData[0]);
    } else {
      [titles, rawData] = yield call(convertCSVToJSON, apiData);
    }

    [stateKey, stateMap] = yield getfigureOutStateInfo(
      rawData,
      titles,
      stateKey,
    );
    const filteredData = yield call(filterData, rawData, filteringFuncitons);
    const groupData = yield groupAndDisplayData(
      filteredData,
      displayField,
      aggregationAction,
    );
    yield put({
      type: csvDataActions.LOAD_DATA_SUCCESS,
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
    console.log(e);
    yield put({ type: csvDataActions.LOAD_DATA_FAILURE, message: e.message });
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
    yield put({
      type: csvDataActions.UPDATE_DISPLAY_VALUES,
      payload: { filteringFuncitons },
    });
    const filteredData = yield call(
      filterData,
      state.rawData,
      filteringFuncitons,
    );

    const groupData = yield groupAndDisplayData(
      filteredData,
      state.displayField,
      state.aggregationAction,
    );

    yield put({
      type: csvDataActions.ADD_FILTERS,
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

    updateQuery('s', stateKey);
    yield put({
      type: csvDataActions.UPDATE_DISPLAY_VALUES,
      payload: {
        stateKey,
      },
    });

    const { filteredData, displayField, aggregationAction } = yield select(
      getData,
    );
    const groupData = yield groupAndDisplayData(
      filteredData,
      displayField,
      aggregationAction,
    );

    yield put({
      type: csvDataActions.SET_STATE_AND_GROUP,
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
      type: csvDataActions.UPDATE_DISPLAY_VALUES,
      payload: {
        displayField,
        aggregationAction,
      },
    });

    let groupData;
    if (state.groupData.length > 0) {
      groupData = yield call(
        processToDisplay,
        displayField,
        aggregationAction,
        state.groupData,
      );
    } else {
      groupData = yield groupAndDisplayData(
        state.filteredData,
        displayField,
        aggregationAction,
      );
    }

    yield put({
      type: csvDataActions.SET_DISPLAY,
      payload: {
        displayField,
        aggregationAction,
        groupData,
      },
    });
  } catch {}
}

function loadMapScript(mapNameJSFile) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://code.highcharts.com/mapdata/${mapNameJSFile}`;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

function* loadNewMap(action) {
  const mapInfo = action.payload.mapInfo;
  if (!mapInfo) {
    yield put({ type: mapSettingActions.CHANGE_MAP, payload: { mapInfo } });
    return;
  }
  updateQuery('map', mapInfo);
  const map = mapInfo[1].replace('.js', '');
  const chart = {
    map,
  };

  if (!window.Highcharts.maps[map]) {
    // need to load map first
    yield call(loadMapScript, mapInfo[1]);
  }
  const newStateMap = buildStateVal(window.Highcharts.maps[map]);
  yield put({
    type: csvDataActions.UPDATE_STATE_MAP,
    payload: { stateMap: newStateMap },
  });
  yield put({
    type: mapSettingActions.CHANGE_MAP,
    payload: { mapInfo, chart },
  });
  const { stateKey } = yield select(getData);
  yield put({
    type: csvDataActions.SET_STATE_AND_GROUP_SAGA,
    payload: { stateKey },
  });
}

function* loadFromURLSetings(action) {
  console.log(getQueryVariable());
  let mapInfo = getQueryVariable('map');
  const queryURL = getQueryVariable('url');
  const min = getQueryVariable('mi');
  const max = getQueryVariable('ma');
  console.log(max);
  const title = getQueryVariable('t');
  const s = getQueryVariable('st');
  if (mapInfo) {
    yield put({ type: csvDataActions.REQUEST_DATA });
    mapInfo = mapInfo.flatMap((i) => i);
    const lastItem = mapInfo.pop();
    mapInfo = [mapInfo.join(','), lastItem];
    yield put({
      type: mapSettingActions.LOAD_NEW_MAP_SAGA,
      payload: { mapInfo },
    });
  }

  if (queryURL) {
    yield put({
      type: csvDataActions.LOAD_DATA_SAGA,
      payload: { url: queryURL },
    });

    if (min) {
      yield put(mapOptionsActions.setColorAxisMin(min));
    }
    if (max) {
      console.log('update Max', max)
      yield put(mapOptionsActions.setColorAxisMax(max));
    }

    if (title) {
      yield put(mapOptionsActions.setTitle(title));
    }
    if (s) {
      console.log(s);
      yield put(mapOptionsActions.setColorAxisStops(s));
    }
  }
}

function* mySaga() {
  yield all([
    takeLatest(csvDataActions.LOAD_DATA_SAGA, fetchData),
    takeLatest(csvDataActions.LOAD_FROM_URL, loadFromURLSetings),
    takeEvery(csvDataActions.SET_DISPLAY_SAGA, setDisplay),
    takeEvery(csvDataActions.APPLY_FILTERS_SAGA, updateFilters),
    takeEvery(csvDataActions.SET_STATE_AND_GROUP_SAGA, groupDataSaga),
    takeEvery(mapSettingActions.LOAD_NEW_MAP_SAGA, loadNewMap),
  ]);
}

export default mySaga;
