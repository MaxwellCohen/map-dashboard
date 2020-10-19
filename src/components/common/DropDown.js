import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { startCase } from 'lodash';

export default function DropDown({ values, onChange, label, value }) {
  return (
    <>
      <Autocomplete
        options={values}
        getOptionLabel={(option) => startCase(option)}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        fullWidth={true}
        autoComplete
        includeInputInList
        renderInput={(params) => (
          <TextField {...params} label={label} margin='normal' />
        )}
      />
    </>
  );
}
