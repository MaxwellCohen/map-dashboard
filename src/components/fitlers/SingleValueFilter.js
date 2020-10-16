import React, { useEffect, useState } from 'react';
import BasicTextFields from '../common/BasicTextFields';

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
    <BasicTextFields
      label='value'
      value={internalUrl}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SingleValueFilter;
