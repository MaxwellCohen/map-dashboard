
import { startCase } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewMap } from '../store/mapSettings/mapSettings.actions';
import DropDown from './common/DropDown';
const Highcharts = window.Highcharts;
const listOfMaps = Object.entries(Highcharts.mapDataIndex).flatMap(([mapGroup, maps]) => {
  if (mapGroup !== 'version') {
    return Object.entries(maps);
  }
  return [];
});

const MapSelector = () => {
  const {mapInfo} = useSelector(({mapSettings}) => mapSettings);
  const dispatch = useDispatch();
  
  const updateMap = (v) => {
    dispatch(loadNewMap(v));
  }
  const diplayfn = (option) => startCase(option[0])

  return <DropDown 
    value={mapInfo}
    values={listOfMaps}
    label='Map Type'
    onChange={updateMap}
    getOptionLabel={diplayfn}
    getOptionSelected={diplayfn}
  />
};

export default MapSelector;

