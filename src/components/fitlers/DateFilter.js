import React, { useEffect, useState, useCallback } from 'react';
import min from 'date-fns/min';
import max from 'date-fns/max';
import format from 'date-fns/format';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from '../common/DatePicker';
import { conforms } from 'lodash';

const dateArr = (data, field) => {
  return data.map((d) => new Date(d[field])).filter((v) => !isNaN(v.getTime()));
};

const calcMin = (data, field) => {
  const arr = dateArr(data, field);
  return dateFormat(min(arr));
};
const calcMax = (data, field) => {
  const arr = dateArr(data, field);
  return dateFormat(max(arr));
};

const dateFormat = (date) => {
  return format(date, 'yyyy-MM-dd');
};

const DateFilter = ({ dataField, filterValues:[startDate = '', endDate = ''], onDataFieldChange, onFilterValueChange }) => {
  const { rawData } = useSelector(({ data }) => data);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const updateFilter = useCallback(( minVal, maxVal) => {
    const f = [minVal, maxVal];
    onFilterValueChange(f)
  }, [onFilterValueChange]);

  useEffect(() => {
    try {
      const minDateValue = calcMin(rawData, dataField);
      const maxDateValue = calcMax(rawData, dataField);
      setMinDate(minDateValue);
      setMaxDate(maxDateValue);
      if (!startDate || !endDate) {

        updateFilter(minDateValue, maxDateValue);
      }
    } catch (e) {
      setMinDate('');
      setMaxDate('');
    }
  }, [dataField, setMinDate, setMaxDate, onDataFieldChange, rawData, updateFilter, startDate,  endDate]);

  if (!dataField) {
    return null;
  }

  const onStartDateChange = (e) => {
    const date = e.target.value;
    updateFilter(date, endDate);
  };

  const onEndDateChange = (e) => {
    const date = e.target.value;
    updateFilter( startDate, date);
  };

  return (
    <>
      <DatePicker
        label='From'
        min={minDate}
        max={endDate}
        value={startDate}
        onChange={onStartDateChange}
      />
      <DatePicker
        label='To'
        min={startDate}
        max={maxDate}
        value={endDate}
        onChange={onEndDateChange}
      />
    </>
  );
};

DateFilter.defaultProps = {
  filterValues: []
};

export default DateFilter;
