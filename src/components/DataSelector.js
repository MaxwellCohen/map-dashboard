import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropDown from './DropDown';
import * as Actions from '../store/csvData/csvData.actions';
import Calculations from '../utils/Calculations';
import {get, startCase} from 'lodash'
import { getQueryVariable } from '../utils/queryUtils';

const aggerationOptions = Object.getOwnPropertyNames(Calculations.prototype)
  .filter((k) => k !== 'constructor')
  .map((s) => startCase(s));

const DataSelector = () => {
  const { titles, stateKey, displayField, aggregationAction } = useSelector(({ data }) => data);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlState  = getQueryVariable('s');
    const urlDisplayField = getQueryVariable('df')
    const urlAggregationAction = getQueryVariable('a')
    if (urlState !== stateKey) {
      dispatch(Actions.groupData(stateKey));
    }
    if ((urlDisplayField && urlDisplayField !== displayField) || (urlAggregationAction && urlAggregationAction !== aggregationAction)) {
      dispatch(Actions.updateDisplay(urlDisplayField, urlAggregationAction));
    }
  }, [titles, stateKey, displayField, aggregationAction, dispatch])


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
            label='State Field'
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
  );
};

export default DataSelector;
