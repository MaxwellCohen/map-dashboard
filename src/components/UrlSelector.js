import React, { useEffect, useState } from 'react';
import BasicTextFields from './BasicTextFields';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/csvData.actions';

const UrlSelector = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('http://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv');
  const onblur = (e) => {
    console.log(e.target.value)
    setUrl(e.target.value)
    dispatch(Actions.loadData(e.target.value));
  } 

  return (
    <div style={{width: '100%'}}>
      <BasicTextFields label='Url for a CSV' value={url} onBlur={onblur} />
    </div>
  );
};

export default UrlSelector;
