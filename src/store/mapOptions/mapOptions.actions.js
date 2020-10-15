import { updateQuery } from '../../utils/queryUtils';

export const SET_TITLE = 'SET_TITLE';
export const SET_COLOR_AXIS_MIN = 'SET_COLOR_AXIS_MIN';
export const SET_COLOR_AXIS_MAX = 'SET_COLOR_AXIS_MAX';
export const SET_COLOR_AXIS_STOPS = 'SET_COLOR_AXIS_STOPS';
export const SET_MAP_DATA = 'SET_MAP_DATA';
export const setTitle = (text) => {
  updateQuery('t', text)
  return {
    type: SET_TITLE,
    payload: {
      text,
    },
  };
};
export const setColorAxisMin = (min) => {
  updateQuery('mi', min)
  return {
    type: SET_COLOR_AXIS_MIN,
    payload: {
      min,
    },
  };
};
export const setColorAxisMax = (max) => {
  updateQuery('ma', max)
  return {
    type: SET_COLOR_AXIS_MAX,
    payload: {
      max,
    },
  };
};
export const setColorAxisStops = (stops) => {
  stops = stops.sort((a, b) => (+a[0] > +b[0]) ? 1 : -1)
  updateQuery('st', stops)
  return {
    type: SET_COLOR_AXIS_STOPS,
    payload: {
      stops: [...stops],
    },
  };
};

export const setMapData = (data = [], name = null) => {
  const valArray = (data|| []).map((v) => v[1]);
  return {
    type: SET_MAP_DATA,
    payload: {
      series: {
        data:[...data],
        name,
      },
      colorAxis: {
        min: Math.min(...valArray),
        max: Math.max(...valArray),
      },
    },
  };
};
