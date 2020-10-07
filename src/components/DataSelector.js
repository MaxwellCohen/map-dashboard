import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropDown from './DropDown';
import * as Actions from '../store/csvData.actions';


const averageData = (key, arr) => {
  let average = (array) =>{
    if( array.length > 0) {
      return array.reduce((a, b) => a + b, 0) / array.length;
    }
  }
    const cleanArr = arr.map((a) => parseFloat(a[key])).filter((a) => !isNaN(a))
    return average(cleanArr).toFixed(2)
};

const DataSelector = () => {
  const { titles, stateKey, displayField } = useSelector(
    ({ data }) => data,
  );
  const dispatch = useDispatch();

  const onStateChange = (v) => {
    dispatch(Actions.groupData(v));
  };
  const onDisplayFieldChange = (v) => {
    const averge = averageData.bind(null, v);
    dispatch(Actions.setDisplayFn(v, averge));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      {titles?.length ? (
        <div style={{ width: '45%' }}>
          <DropDown
            value={stateKey}
            values={titles}
            onChange={onStateChange}
            label='State'
          />
        </div>
      ) : null}
      {stateKey ? (
        <div style={{ width: '45%' }}>
          <DropDown
            style={{ width: '45%' }}
            value={displayField}
            values={titles}
            onChange={onDisplayFieldChange}
            label='Display Field'
          />
        </div>
      ) : null}
    </div>
  );
};

export default DataSelector;
