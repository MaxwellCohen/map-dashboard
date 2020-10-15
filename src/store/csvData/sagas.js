import { getCSV } from '../../api/api';
import { call, put, takeLatest,all } from 'redux-saga/effects';
import * as Actions from './csvData.actions';
import { groupData, normalizeState, convertCSVToJSON } from './csvDataTools';
import { updateQuery } from '../../utils/queryUtils';




function* fetchUser(action) {
  try {
    yield put({ type: Actions.REQUEST_DATA });
    const url = action.payload.url;
    updateQuery('url', url)
    const { data: apiData } = yield call(getCSV, url);
    const [titles, rawData] = yield call (convertCSVToJSON, apiData);
    const stateKey =
    titles.find((t) => normalizeState((rawData[0] || {})[t])) || '';
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
    yield put({ type: Actions.LOAD_DATA_FAILURE, message: e.message });
  }
}

function* mySaga() {
  yield all([takeLatest(Actions.LOAD_DATA_SAGA, fetchUser)]);
}

export default mySaga;