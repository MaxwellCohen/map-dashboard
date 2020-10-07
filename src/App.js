import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from './store/csvData.actions';
import Chart from './components/Chart';
import isWithinInterval from 'date-fns/isWithinInterval';
import DropDown from './components/DropDown';
import UrlSelector from './components/UrlSelector';
import Grid from './components/Grid';
import DataSelector from './components/DataSelector';

const filterDates = (start, end, data) => {
  return data.map((d) => {
    return [
      d[0],
      d[1].filter(({ date }) =>
        isWithinInterval(new Date(date), { start, end }),
      ),
    ];
  });
};


  // useEffect(() => {
  //   if (data.length !== 0 && mapData.length === 0) {
  //     console.log('data loaded');
  //     const dateFilter = filterDates.bind(
  //       null,
  //       new Date('2020-09-01'),
  //       new Date('2020-10-04'),
  //     );
  //
  //     dispatch(Actions.applyfilters(data, [dateFilter, averge]));
  //   }
  // }, [data, mapData, dispatch, loading]);

// const min = (data) => {
//   return Math.min(...data.map((d)=> +d[1]))
// }
// const max = (data) => {
//   return Math.max(...data.map((d)=> +d[1]))
// }

const App = () => {
  const { mapData, titles, stateKey, displayValue } = useSelector(
    ({ data }) => data,
  );





  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-between' }}>
        <div style={{ width: '33%',  padding: '10px' }}>
          <UrlSelector />
          <DataSelector />
         
          {/* <div>Date Filter</div> */}
          {/* <DatePicker /> */}
          {/* <div>value</div>
          <div>action</div>
          <div>min color</div>
          <div>min value</div>
          <div>median color</div>
          <div>max color</div>
          <div>max value</div>
          <div>update</div> */}
        </div>
        <div
          style={{ width: '600', height: '400px', border: '1px solid black' }}>
          <Chart data={mapData} />
        </div>
      </div>
      <div style={{flex: 1}}>
        <Grid />
      </div>
    </div>
  );
};

export default App;
