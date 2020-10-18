import React, { useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import * as Actions from '../store/mapOptions/mapOptions.actions';
import proj4 from 'proj4';
import { useSelector, useDispatch } from 'react-redux';

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}
const Highcharts = window.Highcharts;

const Chart = () => {
  const { mapData, displayField } = useSelector(({ data }) => data);
  const options  = useSelector(({ options }) => options);
  const dispatch = useDispatch();
  useEffect(() => {
    if (mapData.length !== 0) {
      dispatch(Actions.setMapData(mapData, displayField));
    } else {
      dispatch(Actions.setMapData())
    }
  }, [mapData, displayField, dispatch]);

  return (
    <>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'mapChart'}
        />
    </>
  );
};

export default Chart;
