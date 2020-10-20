import React, { useEffect } from 'react';
import Grid from './components/Grid';
import ChartSection from './sections/ChartSection';
import SettingSection from './sections/SettingSection';
import * as Actions from './store/csvData/csvData.actions';
import { useDispatch} from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.loadFromURLSetings());
  }, [dispatch]);

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
