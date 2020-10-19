import * as Actions from './csvData.actions';

const inital_state = {
  url: '',
  titles: [], // list of keys that can be selected
  rawData: [], // the parsed CSV file
  filteredData: [], // any filters run on the data (using filter funciton) also showen in table//
  stateKey: '',
  stateMap: {},
  groupData: [],
  displayField: '',
  aggregationAction: '',
  filteringFuncitons: [],
  loading: false,
  processing: false,
};

export default (state = inital_state, { type, payload }) => {
  switch (type) {
    case Actions.REQUEST_DATA:
      return updateState(inital_state, {}, true);
    case Actions.LOAD_DATA_SUCCESS:
      return updateState(inital_state, payload, false);
    case Actions.LOAD_DATA_FAILURE:
      return updateState(inital_state, {}, false);
    case Actions.SET_STATE_AND_GROUP:
      return updateState(state, payload);
    case Actions.SET_DISPLAY:
      return updateState(state, payload);
    case Actions.ADD_FILTERS:
      return updateState(state, payload);
    case Actions.UPDATE_DISPLAY_VALUES: 
      return updateState(state, payload, state.loading, true);
    default:
      return state;
  }
};

const updateState = (is = {}, p = {}, loading = false, processing = false) => {
  return {
    ...is,
    ...p,
    loading,
    processing
  };
};
