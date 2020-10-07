import * as Actions from './csvData.actions';
const inital_state = {
  data: [],
  filteredData: [],
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
        data: action.payload.data,
        loading: false,
        filteredData: [],
      };
    case Actions.APPLY_FILTERS: 
    return {
      ...state,
      filteredData: action.payload.filteredData,
    }
    default:
      return state;
  }
};
