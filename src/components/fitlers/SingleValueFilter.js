import React, { useEffect, useState } from 'react';
import BasicTextFields from '../common/BasicTextFields';

const SingleValueFilter = ({ filterValues: [value = ''], onFilterValueChange }) => {
  const [internalVal, setInternalVal] = useState(value);
  useEffect(() => {
    setInternalVal(value);
  }, [value]);

  const setValue = (newValue) => {
    setInternalVal(newValue);
  };

  const updateFilter = () => {
    onFilterValueChange([internalVal]);
  };

  return (
    <BasicTextFields
      label='value'
      value={internalVal}
      onChange={(e) => setValue(e.target.value)}
      onBlur={updateFilter}
    />
  );
};

export default SingleValueFilter;
