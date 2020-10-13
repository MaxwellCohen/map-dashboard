import { getCSV } from '../../api/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as Actions from './csvData.actions';
import { groupData, normalizeState, convertCSVToJSON } from './csvDataTools';




function* fetchUser(action) {
  try {
    yield put({ type: Actions.REQUEST_DATA });
    const url = action.payload.url;
    const { data: apiData } = yield call(getCSV, url);
    const [titles, rawData] = yield call (convertCSVToJSON, apiData);
    const stateKey =
    titles.find((t) => normalizeState((rawData[0] || {})[t])) || '';
    console.log('loaded')
    yield put({
      type: Actions.LOAD_DATA_SUCCESS,
      payload: {
        url,
        titles: titles,
        rawData: rawData,
        filteredData: rawData,
        groupData: groupData(stateKey, rawData),
        mapData: [],
        stateKey,
      },
    });
  } catch (e) {
    console.log (e)
    yield put({ type: Actions.LOAD_DATA_FAILURE, message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(Actions.LOAD_DATA_SAGA, fetchUser);
}

export default mySaga;