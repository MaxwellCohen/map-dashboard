import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Chart from './components/Chart';
import UrlSelector from './components/UrlSelector';
import Grid from './components/Grid';
import DataSelector from './components/DataSelector';
import DateFilter from './components/DateFilter';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          padding: '10px',
          justifyContent: 'space-between',
        }}>
        <div style={{ width: '33%', padding: '10px' }}>
          <div style={{ padding: '10px' }}>
            <UrlSelector />
          </div>
          <div style={{ padding: '10px' }}>
            <DataSelector />
          </div>
          <div style={{ padding: '10px' }}>
            <DateFilter />
          </div>
          {/* <div>Date Filter</div> */}
          {/* <DatePicker /> */}
          {/*
          <div>action</div>
          <div>min color</div>
          <div>min value</div>
          <div>median color</div>
          <div>max color</div>
          <div>max value</div> */}
        </div>
        <div
          style={{ width: '600', height: '400px', border: '1px solid black' }}>
          <Chart />
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <Grid />
      </div>
    </div>
  );
};

export default App;
