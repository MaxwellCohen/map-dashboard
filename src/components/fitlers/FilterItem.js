import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DropDown from '../common/DropDown';
import DateFilter from './DateFilter';
import SingleValue from './SingleValue';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { Button } from '@material-ui/core';

const filterOptions = ['dateBetween', 'equals', 'greater', 'less'];

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
  };

  const dataFieldChangeHandler = (v) => {
    setDataField(v);
  };

  const onFilterValueChange = (v) => {
    if (v.toString() !== filterValues.toString()) {
      setFilterValues(v);
      onFilterChange([filterType, dataField, ...v]);
    }
  };

  const displayfilterOptions = () => {
    if (!dataField) {
      return null;
    }
    switch (filterType) {
      case 'dateBetween':
        return (
          <DateFilter
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
        <div style={{margin: '0px 8px 0 15px ', flex: 1,
        }}>
          <SingleValue
            filterValues={filterValues}
            onFilterValueChange={onFilterValueChange}
          />
          </div>
        );
      default:
        return null;
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
          flex: 1,
          marginRight:8
        }}>
        <div>
          <DropDown
            value={filterType}
            values={filterOptions}
            onChange={filterTypeChangeHandler}
            label='Filter type'
          />
        </div>
        <div>
          <DropDown
            value={dataField}
            values={titles}
            onChange={dataFieldChangeHandler}
            label='Data Field'
          />
        </div>
      </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 2,
          flexGrow: 2,
        }}>{displayfilterOptions()}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button onClick={() => onDelete()} style={{ marginBottom: '-8px' }}>
          <DeleteOutlineRoundedIcon style={{ padding: 0 }} />
        </Button>
      </div>
    </div>
  );
};

export default FilterItem;
