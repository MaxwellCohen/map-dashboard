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
  const { groupData, displayField, processing, loading } = useSelector(({ data }) => data);
  const options  = useSelector(({ options }) => options);
  const dispatch = useDispatch();
  useEffect(() => {
    if (groupData.length !== 0) {

      dispatch(Actions.setMapData(groupData, displayField));
    } else {
      dispatch(Actions.setMapData());
    }
  }, [groupData, displayField, dispatch]);
  return (
    <div>
      {( loading) ? <div >downloading data</div> : null}
      {(processing) ? <div >processing data</div> : null}
      <div style={{ display: (processing || loading) ? "none" : "block" }}>
        <HighchartsReact
          immutable={true}
          highcharts={Highcharts}
          options={options}
          constructorType={'mapChart'}
        />
        </div>
    </div>
  );
};

export default Chart;
