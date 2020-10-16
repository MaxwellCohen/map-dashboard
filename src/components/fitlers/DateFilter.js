import React, { useEffect, useState } from 'react';
import DatePicker from '../common/DatePicker';

const SingleValueFilter = ({ filterValues: [value = ''], onFilterValueChange }) => {
  const [internalUrl, setInternalUrl] = useState(value);
  useEffect(() => {
    setInternalUrl(value);
  }, [value]);

  const setValue = (newValue) => {
    if (newValue === value) {
      return;
    }
    setInternalUrl(value);
    onFilterValueChange([newValue]);
  };

  return (
    <DatePicker
      label='value'
      value={internalUrl}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SingleValueFilter;
