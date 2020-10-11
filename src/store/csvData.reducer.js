import * as Actions from './csvData.actions';
import stateMap from '../constants/stateMap';
const inital_state = {
  titles: [], // list of keys that can be selected 
  rawData: [], // the parsed CSV file
  filteredData: [], // any filters run on the data (using filter funciton) also showen in table//
  stateKey: '',
  groupData: [],
  displayField: '',
  filteringFuncitons: [],
  displayFunction: null,
  mapData: [], //data grouped and agrated 
  loading: false,
};

export default (state = inital_state, action) => {
  switch (action.type) {
    case Actions.REQUEST_DATA: 
    return {
      ...state,
      loading: true
    };
    case Actions.LOAD_DATA:
    const  titles = action?.payload?.titles || [];
    const rawData = action?.payload?.rawData || [];
    const stateKey = titles.find((t) => normalizeState((rawData[0] || {})[t]) ) || '';
    return {
      ...inital_state,
      rawData,
      filteredData: rawData,
      mapData: [],
      titles,
      stateKey
    }
    case Actions.SET_STATE_AND_GROUP: 
    return {
      ...state,
      stateKey: action.payload.stateKey,
      mapData: [],
    }
    case Actions.SET_DISPLAY_FN: 
    return {
      ...state,
      displayField: action.payload.displayField,
      displayFunction: action.payload.displayFunction,
      mapData: processToDisplay(state.filteredData, state.stateKey, action.payload.displayFunction)
    }
    case Actions.ADD_FILTER_FN:
    const existingFilters = state.filteringFuncitons.filter(({name})=> name !== action.payload.name);
    const filteringFuncitons = [...existingFilters, action.payload];
    const filteredData = filterData(state.rawData, filteringFuncitons)
    return {
      ...state,
      filteringFuncitons,
      filteredData,
      mapData: processToDisplay(filteredData, state.stateKey, state.displayFunction)
    }
    case Actions.APPLY_FILTERS: 
    return {
      ...state,
      mapData: action.payload.mapData,
    }
    default:
      return state;
  }
};


const groupData = (stateKey, data) => {
  if(!stateKey) {
    return [];
  }
  const obj = data.reduce((acc, item) => {
    if (!item[stateKey]) {
      return acc;
    }
    const key = normalizeState(item[stateKey]);
    if(!key) {
      return acc;
    }
    if (!acc[key]) {
      acc[key] = [key, []];
    }
    acc[key][1].push(item);
    return acc;
  }, {});
  return Object.values(obj);
};

const normalizeState = (state) => {
  if(typeof state !== 'string') {
    return null;
  }
  const cleanState = stateMap[state.toLowerCase().replace(/[^a-z]/gmi,'')];
  if(cleanState) {
    return 'us-' + cleanState;
  }
  return null;
}


export const filterData = (rawData, filters) => {
  if (filters.length === 0) {
    return rawData;
  }
  return rawData.filter((value) => {
    const results = filters.map(({fn}) => fn(value)).filter(Boolean);
    return results.length === filters.length;
  } )
}


export const processToDisplay = (data, stateKey, displayFn) => {
  if (!displayFn) {
    return []
  }
  const groupedData = groupData(stateKey, data);
  if (groupedData.length === 0) {
    return [];
  }

  return groupedData.map(([key, arr]) => {
    const displayVal = displayFn(arr);
    return [key, displayVal, arr]
  } )

};
