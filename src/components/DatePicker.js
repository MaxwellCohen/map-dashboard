import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();

  return (
    <div >
      <TextField
        labelId={'date-picker-' +props.label }
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </div>
  );
}