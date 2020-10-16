import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function BasicTextFields(props) {

  return (
    <TextField style={{width: '100%', paddingBottom: '10px'}} {...props} />
    
  );
}
