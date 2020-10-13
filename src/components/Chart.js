import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import * as Actions from '../store/mapOptions/mapOptions.actions';
import proj4 from 'proj4';
import { useSelector, useDispatch } from 'react-redux';

highchartsMap(Highcharts);
if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}

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
      {options ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'mapChart'}
        />
      ) : null}
    </>
  );
};

export default Chart;
