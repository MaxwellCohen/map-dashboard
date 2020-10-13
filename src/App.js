import React from 'react';
import Grid from './components/Grid';
import ChartSection from './sections/ChartSection';
import SettingSection from './sections/SettingSection';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{textAlign: 'center'}}> 
      <h1>US State Data Mapping Tool</h1>
      </div>
      <div
        style={{
          display: 'flex',
          padding: '10px',
          justifyContent: 'space-between',
          height: '422px'
        }}>
        <SettingSection />
        <ChartSection />
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <Grid />
      </div>
    </div>
  );
};

export default App;
