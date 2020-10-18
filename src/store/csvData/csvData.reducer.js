import * as Actions from './csvData.actions';
import { filterData, groupData, processToDisplay } from './csvDataTools';


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
  mapData: [], //data grouped and agrated 
  loading: false,
};

export default (state = inital_state, {type, payload}) => {
  switch (type) {
    case Actions.REQUEST_DATA:
      return {
        ...inital_state,
        loading: true,
      };
    case Actions.LOAD_DATA_SUCCESS:
      return {
        ...inital_state,
        loading: false,
        ...payload
      };
    case Actions.LOAD_DATA_FAILURE: 
    return {
      ...inital_state,
      loading: false
    };
    case Actions.SET_STATE_AND_GROUP:
      return {
        ...state,
        stateKey: payload.stateKey,
        groupData: groupData(state.stateMap, payload.stateKey, state.filteredData),
        mapData: [],
      };
    case Actions.SET_DISPLAY:
      return {
        ...state,
        displayField: payload.displayField,
        aggregationAction: payload.aggregationAction,
        mapData: processToDisplay(
          payload.displayField,
          state.displayField,
          payload.aggregationAction,
          state.groupData, state.mapData),
      };
    case Actions.ADD_FILTERS:
      const filteringFuncitons = payload.filteringFuncitons;
      const filteredData = filterData(state.rawData, filteringFuncitons);
      const newGroupData = groupData(state.stateMap, state.stateKey, filteredData);
      const mapData = processToDisplay(state.displayField, state.displayField, state.aggregationAction, newGroupData);
      return {
        ...state,
        filteringFuncitons,
        filteredData,
        groupData: newGroupData,
        mapData
      };
    default:
      return state;
  }
};


