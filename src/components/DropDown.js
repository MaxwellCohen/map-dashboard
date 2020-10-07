import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  const [internalValue, setValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);

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

  return (
    <div style={{width: '100%'}}>
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
            <MenuItem value={v} key={v}>{v}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
