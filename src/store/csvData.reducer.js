import * as Actions from './csvData.actions';
import stateMap from '../constants/stateMap';
const inital_state = {
  titles: [],
  rawData: [],
  stateKey: '',
  groupData: [],
  displayField: '',
  filteringFuncitons: [],
  displayFunction: null,
  mapData: [],
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
    const stateKey = titles.filter((t) => normalizeState((rawData[0] || {})[t]) )[0] || '';

      return {
        ...inital_state,
        rawData,
        titles,
        stateKey,
        data: action.payload.data,
        groupData: groupData(stateKey, rawData),
      };
    case Actions.SET_STATE_AND_GROUP: 
    return {
      ...state,
      stateKey: action.payload.stateKey,
      groupData: groupData(action.payload.stateKey, state.rawData),
    }
    case Actions.SET_DISPLAY_FN: 
    return {
      ...state,
      displayField: action.payload.displayField,
      displayFunction: action.payload.displayFunction,
      mapData: applyfilters(state.groupData,state.filteringFuncitons, action.payload.displayFunction)
    }
    case Actions.ADD_FILTER_FN:
    const existingFilters = state.filteringFuncitons.filter(({name})=> name !== action.payload.name);
    const filteringFuncitons = [...existingFilters, action.payload];
    return {
      ...state,
      filteringFuncitons,
      mapData: applyfilters(state.groupData, filteringFuncitons, state.displayFunction)
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


export const applyfilters = (data, filters, displayFn) => {
  return data.map(([key, arr]) => {
    let filterArr = arr;
    if(filters.length !== 0) {
      filterArr = arr.filter((value) => {
        const results = filters.map(({fn}) => fn(value)).filter(Boolean);
        return results.length === filters.length;
      } )
    }
    const displayVal = displayFn(filterArr);
    return [key, displayVal, filterArr]
  } )

};