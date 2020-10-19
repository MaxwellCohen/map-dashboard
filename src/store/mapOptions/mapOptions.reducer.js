import * as Actions from './mapOptions.actions';
import mapData from '@highcharts/map-collection/countries/us/us-all.geo.json';
const initial_state = {
  chart: {
    map: mapData,
    borderWidth: 1,
  },
  animation: {
    duration: 1000
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    floating: true,
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
  plotOptions: {
    mapline: {
      showInLegend: false,
      enableMouseTracking: false,
    },
  },
  series: [],
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
        colorAxis: makeColorAxis(state.colorAxis, action.payload),
      };
    case Actions.SET_COLOR_AXIS_MIN:
      return {
        ...state,
        colorAxis: makeColorAxis(state.colorAxis, action.payload),
      };
    case Actions.SET_COLOR_AXIS_STOPS:
      return {
        ...state,
        colorAxis: makeColorAxis(state.colorAxis, action.payload),
      };
    case Actions.SET_MAP_DATA:
      return {
        ...state,
        colorAxis: makeColorAxis(state.colorAxis, action.payload.colorAxis),
        series: makeSeries(action.payload.series),
      };
    default:
      return state;
  }
};

const makeColorAxis = (stateColorAxis, payloadColorAxis) => {
  return {
    ...stateColorAxis,
    ...payloadColorAxis,
  };
}

const makeSeries = (seriesPayload) => {
  return [
    {
      dataLabels: {
        enabled: true,
        format: '{point.name}',
      },
      keys: ['hc-key', 'value', 'calc'],
      joinBy:'hc-key',
      tooltip: {
        headerFormat: '',
        pointFormatter: function () {
          return `<h2>${this.name}</h2><br>${this.calc._display()}`;
        },
      },
      ...seriesPayload,
    },
  ];
};
