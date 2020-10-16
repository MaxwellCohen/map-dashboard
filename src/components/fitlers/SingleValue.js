import React, { useEffect, useState } from 'react';
import BasicTextFields from '../common/BasicTextFields';

const SingleValue = ({ filterValues: [value = ''], onFilterValueChange }) => {
  const [internalUrl, setInternalUrl] = useState(value);
  useEffect(() => {
    console.log(value)
    setInternalUrl(value);
  }, [value]);

  const setValue = (newValue) => {
    console.log('hi', newValue, value)
    if (newValue === value) {
      return;
    }
    onFilterValueChange([newValue]);
  };

  return (
    
    <BasicTextFields
      label='value'
      value={internalUrl}
      onChange={(e) => setInternalUrl(e.target.value)}
      onBlur={(e) => setValue(e.target.value)}
    />
  );
};

export default SingleValue;
