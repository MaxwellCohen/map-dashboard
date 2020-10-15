import React, { useEffect, useState } from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import min from 'date-fns/min';
import max from 'date-fns/max';
import format from 'date-fns/format';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/csvData/csvData.actions';
import DropDown from './DropDown';
import DatePicker from './DatePicker';
import { getQueryVariable } from '../utils/queryUtils';

const filterDates = (field, start, end, item) => {
  const date = new Date(item[field]);
  if (isNaN(date.getTime())) {
    return false;
  }

  return isWithinInterval(date, { start, end });
};

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

const DateFilter = () => {
  const dispatch = useDispatch();
  const { titles, rawData } = useSelector(({ data }) => data);
  const [dateField, setDateField] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(()=> {
    const [dFilter]  = (getQueryVariable('f')|| []);
    if(dFilter) {
      console.log(dFilter)
      setDateField(dFilter[1]);
      setStartDate(dFilter[2]);
      setEndDate(dFilter[3]); 
    }
    
  }, [titles])


  if (!titles?.length) {
    return null;
  }

  const onDateFieldChange = (v) => {
    try {
      const minDateValue = calcMin(rawData, v);
      const maxDateValue = calcMax(rawData, v);
      setDateField(v);
      setMinDate(minDateValue);
      setStartDate(minDateValue);
      setMaxDate(maxDateValue);
      setEndDate(maxDateValue);
      updateFilter(v, minDateValue, maxDateValue);
    } catch (e) {
      setDateField('');
      setMinDate('');
      setStartDate('');
      setMaxDate('');
      setEndDate('');
    }
  };

  const onStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    updateFilter(dateField, date, endDate);
  };

  const onEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);
    updateFilter(dateField, startDate, date);
  };

  const updateFilter = (field, minVal, maxVal) => {
    const f = ['dateBetween', field, minVal, maxVal];
    dispatch(Actions.updateFilters([f]));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
      }}>
      <div style={{ width: '45%', alignSelf: 'center' }}>
        <DropDown
          value={dateField}
          values={titles}
          onChange={onDateFieldChange}
          label='Date Field'
        />
      </div>
      {dateField ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
        </div>
      ) : null}
    </div>
  );
};

export default DateFilter;
