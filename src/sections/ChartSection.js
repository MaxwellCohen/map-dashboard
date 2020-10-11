import React from 'react';
import Chart from '../components/Chart';

const ChartSection = () => {
  return (<div
    style={{
      width: '50%',
      padding: '10px',
      border: '1px solid #c4c4c4',
    }}>
    <div style={{ width: '600', height: '400px' }}>
      <Chart />
    </div>
  </div>);
};



export default ChartSection;
