import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropDown from './common/DropDown';
import * as Actions from '../store/csvData/csvData.actions';
import Calculations from '../utils/Calculations';
import MapSelector from './mapSelector';

const aggerationOptions = Object.getOwnPropertyNames(
  Calculations.prototype,
).filter((k) => k !== 'constructor' && !k.startsWith('_'));

const DataSelector = () => {
  const { titles, stateKey, displayField, aggregationAction } = useSelector(
    ({ data }) => data,
  );
  const dispatch = useDispatch();

  const onStateChange = (v) => {
    dispatch(Actions.groupData(v));
  };
  const onDisplayFieldChange = (df) => {
    dispatch(Actions.updateDisplay(df, aggregationAction));
  };
  const onAggregationActionChange = (a) => {
    dispatch(Actions.updateDisplay(displayField, a));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <MapSelector />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {titles?.length ? (
          <div style={{ width: '30%' }}>
            <DropDown
              value={stateKey}
              values={titles}
              onChange={onStateChange}
              label='Location Key'
            />
          </div>
        ) : null}
        {stateKey ? (
          <>
            <div style={{ width: '30%' }}>
              <DropDown
                value={displayField}
                values={titles}
                onChange={onDisplayFieldChange}
                label='Display Field'
              />
            </div>
            <div style={{ width: '30%' }}>
              <DropDown
                value={aggregationAction}
                values={aggerationOptions}
                onChange={onAggregationActionChange}
                label='Aggregation'
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DataSelector;
