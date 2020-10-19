import * as mapSettingsActions  from '../mapSettings/mapSettings.actions';
import * as Actions from './mapOptions.actions';
const initial_state = {
  chart: {
    map: 'countries/us/us-all',
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

export default (state = initial_state, {type, payload}) => {
  switch (type) {
    case mapSettingsActions.CHANGE_MAP:
      const data = (state?.series[0]?.data || []).filter(({path}) => !path)
      return {
        ...state,
        chart: {
          ...state.chart,
          ...payload.chart
        },
        series: makeSeries({...state.series[0], data}, payload.chart || state.chart)
      }

    case Actions.SET_TITLE:
      return {
        ...state,
        title: payload,
      };
    case Actions.SET_COLOR_AXIS_MAX:
      return {
        ...state,
        colorAxis: makeColorAxis(state.colorAxis, payload),
      };
    case Actions.SET_COLOR_AXIS_MIN:
      return {
        ...state,
        colorAxis: makeColorAxis(state.colorAxis, payload),
      };
    case Actions.SET_COLOR_AXIS_STOPS:
      return {
        ...state,
        colorAxis: makeColorAxis(state.colorAxis, payload),
      };
    case Actions.SET_MAP_DATA:
      return {
        ...state,
        colorAxis: makeColorAxis(state.colorAxis, payload.colorAxis),
        series: makeSeries(payload.series, state.chart),
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

const makeSeries = (seriesPayload, chart) => {
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
      mapData: chart.map && window.Highcharts.maps[chart.map],
    },
  ];
};
