import * as Actions from './mapOptions.actions';

import mapData from '@highcharts/map-collection/countries/us/us-all.geo.json';
const initial_state = {
  chart: {
    map: mapData,
  },
  title: {
    text: '',
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    max: 1,
    stops: [
      [0, '#00FF00'],
      [0.5, '#FFF'],
      [1, '#C40401'],
    ],
  },
  series: [
    {
      name: 'Separators',
      type: 'mapline',
      color: 'silver',
      nullColor: 'silver',
      showInLegend: false,
      enableMouseTracking: false,
    },
  ],
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case Actions.SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case Actions.SET_COLOR_AXIS_MAX:
      return {
        ...state,
        colorAxis: {
          ...state.colorAxis,
          ...action.payload,
        },
      };
    case Actions.SET_COLOR_AXIS_MIN:
      return {
        ...state,
        colorAxis: {
          ...state.colorAxis,
          ...action.payload,
        },
      };
    case Actions.SET_COLOR_AXIS_STOPS:
      return {
        ...state,
        colorAxis: {
          ...state.colorAxis,
          ...action.payload,
        },
      };
    case Actions.SET_MAP_DATA:
      return {
        ...state,
        colorAxis: {
          ...state.colorAxis,
          ...action.payload.colorAxis,
        },
        series: [
          { ...state.series[0] },
          {
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
            ...action.payload.series,
          },
        ],
      };

    default:
      return state;
  }
};
