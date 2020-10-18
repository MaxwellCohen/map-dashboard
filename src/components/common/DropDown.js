import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { startCase } from 'lodash'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    // marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
}));

export default function DropDown({ values, onChange, label, value }) {
  const classes = useStyles();
  const [internalValue, setValue] = useState(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (internalValue !== value && values.includes(value)) {
      setValue(value)
    }
  }, [value, internalValue, values])

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
//style={{width: '100%'}}
  return (
    <>
      <FormControl className={classes.formControl} >
        <InputLabel id='demo-controlled-open-select-label'>{label}</InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={internalValue}
          style={{width: '100%'}}
          onChange={handleChange}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {values.map((v) => (
            <MenuItem value={v} key={v}>{startCase(v)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
