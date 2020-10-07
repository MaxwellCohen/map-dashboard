import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropDown from './DropDown';
import * as Actions from '../store/csvData.actions';


const averageData = (key, data) => {
  let average = (array) =>
    array.reduce((a, b) => a + +b[key], 0) / array.length;
  return data.map((d) => {
    return [d[0], average(d[1]).toFixed(2), d[1]];
  });
};

const DataSelector = () => {
  const { titles, stateKey, displayValue } = useSelector(
    ({ data }) => data,
  );
  const dispatch = useDispatch();

  const onStateChange = (v) => {
    dispatch(Actions.groupData(v));
  };
  const onDisplayValueChange = (v) => {
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
            value={displayValue}
            values={titles}
            onChange={onDisplayValueChange}
            label='Display Value'
          />
        </div>
      ) : null}
    </div>
  );
};

export default DataSelector;
