import * as Actions from './csvData.actions';
import { filterData, groupData, processToDisplay, updateAggregationAction } from './csvDataTools';


const inital_state = {
  url: '',
  titles: [], // list of keys that can be selected
  rawData: [], // the parsed CSV file
  filteredData: [], // any filters run on the data (using filter funciton) also showen in table//
  stateKey: '',
  groupData: [],
  displayField: '',
  aggregationAction: '',
  filteringFuncitons: [],
  mapData: [], //data grouped and agrated 
  loading: false,
};

export default (state = inital_state, action) => {
  switch (action.type) {
    case Actions.REQUEST_DATA:
      return {
        ...inital_state,
        loading: true,
      };
    case Actions.LOAD_DATA_SUCCESS:
      return {
        ...inital_state,
        loading: false,
        ...action.payload
      };
    case Actions.LOAD_DATA_FAILURE: 
    return {
      ...inital_state,
      loading: false
    };
    case Actions.SET_STATE_AND_GROUP:
      return {
        ...state,
        stateKey: action.payload.stateKey,
        groupData: groupData(action.payload.stateKey, state.filteredData),
        mapData: [],
      };
    case Actions.SET_DISPLAY:
      //updateAaggregationAction
      const aggerationOnly =
        state.displayField &&
        state.aggregationAction &&
        action.payload.displayField === state.displayField;
      return {
        ...state,
        displayField: action.payload.displayField,
        aggregationAction: action.payload.aggregationAction,
        mapData: aggerationOnly
          ? updateAggregationAction(
              state.mapData,
              action.payload.aggregationAction,
            )
          : processToDisplay(
              state.groupData,
              action.payload.displayField,
              action.payload.aggregationAction,
            ),
      };
    case Actions.ADD_FILTERS:
      const filteringFuncitons = action.payload.filteringFuncitons;
      const filteredData = filterData(state.rawData, filteringFuncitons);
      const newGroupData = groupData(state.stateKey, filteredData);
      return {
        ...state,
        filteringFuncitons,
        filteredData,
        groupData: newGroupData,
        mapData: processToDisplay(
          newGroupData,
          state.displayField,
          state.aggregationAction,
        ),
      };
    case Actions.APPLY_FILTERS:
      return {
        ...state,
        mapData: action.payload.mapData,
      };
    default:
      return state;
  }
};


