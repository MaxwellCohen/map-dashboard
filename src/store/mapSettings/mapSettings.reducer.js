import * as Actions from './mapSettings.actions';

const initial_state = {
  chart: {
    map: 'countries/us/us-all',
    borderWidth: 1,
  },
  mapInfo:  ["United States of America", "countries/us/us-all.js"],

}

export default (state = initial_state, {type, payload}) => {
  switch(type) {
    case Actions.CHANGE_MAP: 
    return {
      ...state,
      mapInfo: payload.mapInfo,
      chart: {
        ...state.chart,
        ...payload.chart
      }
    }
    default:
      return state;
  }

}