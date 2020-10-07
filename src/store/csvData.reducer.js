import * as Actions from './csvData.actions';
const inital_state = {
  titles: [],
  rawData: [],
  stateKey: '',
  groupData: [],
  displayValue: '',
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
      return {
        ...inital_state,
        rawData:action.payload.rawData,
        titles:action.payload.titles,
        data: action.payload.data,
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
      displayValue: action.payload.displayValue,
      displayFunction: action.payload.displayFunction,
      mapData: applyfilters(state.groupData, [...state.filteringFuncitons, action.payload.displayFunction])
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
    if (!acc[key]) {
      acc[key] = [key, []];
    }
    acc[key][1].push(item);
    return acc;
  }, {});
  return Object.values(obj);
};

const normalizeState = (state) => {
  return 'us-' + state.toLowerCase()
}


export const applyfilters = (data, filters) => {
  const mapData = filters.reduce((acc, fn) => {
    return fn(acc);
  }, data);
  console.log(mapData);
  return mapData
};