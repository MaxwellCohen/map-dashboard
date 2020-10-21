import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DropDown from '../common/DropDown';
import DatesFilter from './DatesFilter';
import DateFilter from './DateFilter';
import SingleValueFilter from './SingleValueFilter';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { Button } from '@material-ui/core';
import { filterObject } from '../../utils/Filters';
const filterOptions = Object.keys(filterObject);

const displayfilterOptions = (
  dataField,
  filterType,
  filterValues,
  setDataField,
  onFilterValueChange,
) => {
  if (!dataField) {
    return null;
  }
  switch (filterType) {
    case 'dateBetween':
      return (
        <DatesFilter
          dataField={dataField}
          filterValues={filterValues}
          onDataFieldChange={setDataField}
          onFilterValueChange={onFilterValueChange}
        />
      );
    case 'equals':
    case 'greater':
    case 'less':
      return (
        <div
          style={{
            margin: '0px 8px 0 15px ',
            flex: 1,
            alignContent: 'flex-end',
          }}>
          <SingleValueFilter
            filterValues={filterValues}
            onFilterValueChange={onFilterValueChange}
          />
        </div>
      );
    case 'dayOf':
    case 'dateAfter':
    case 'dateBefore':
      return (
        <div style={{ margin: '0px 8px 0 15px ', flex: 1 }}>
          <DateFilter
            filterValues={filterValues}
            onFilterValueChange={onFilterValueChange}
          />
        </div>
      );
    default:
      return null;
  }
};

const FilterItem = ({ filterSettings, onFilterChange, onDelete }) => {
  const { titles } = useSelector(({ data }) => data);
  const [filterType, setFilterType] = useState('');
  const [dataField, setDataField] = useState('');
  const [filterValues, setFilterValues] = useState('');

  useEffect(() => {
    const [
      iFilterType = '',
      iDataFilter = '',
      ...iFieldValues
    ] = filterSettings;
    setFilterType(iFilterType);
    setDataField(iDataFilter);
    setFilterValues(iFieldValues);
  }, [filterSettings]);

  const filterTypeChangeHandler = (v) => {
    setFilterType(v);
    if (v !== filterSettings[0]) {
      const newFilter = [...filterSettings];
      newFilter[0] = v;
      onFilterChange(newFilter);
    }
  };

  const dataFieldChangeHandler = (v) => {
    setDataField(v);
    if (v !== filterSettings[1]) {
      const newFilter = [...filterSettings];
      newFilter[1] = v;
      onFilterChange(newFilter);
    }
  };

  const onFilterValueChange = (v) => {
    if (v.toString() !== filterValues.toString()) {
      setFilterValues(v);
      onFilterChange([filterType, dataField, ...v]);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start',
        flex: 1,
        paddingBottom: 10,
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 3,
          flexGrow: 3,
          marginRight: 8,
        }}>
        <DropDown
          value={filterType}
          values={filterOptions}
          onChange={filterTypeChangeHandler}
          label='Type'
        />
        <DropDown
          value={dataField}
          values={titles}
          onChange={dataFieldChangeHandler}
          label='Field'
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 2,
          flexGrow: 2,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: '8px',
        }}>
        {displayfilterOptions(
          dataField,
          filterType,
          filterValues,
          setDataField,
          onFilterValueChange,
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button onClick={() => onDelete()} style={{ marginBottom: '-8px' }}>
          <DeleteOutlineRoundedIcon  />
        </Button>
      </div>
    </div>
  );
};

export default FilterItem;
