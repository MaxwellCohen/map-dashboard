import React, { useEffect, useState } from 'react';
import BasicTextFields from './common/BasicTextFields';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/csvData/csvData.actions';
import { getQueryVariable } from '../utils/queryUtils';

//'http://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv'
const UrlSelector = () => {
  const dispatch = useDispatch();
  const loadedURL = useSelector(({ data }) => data?.url);
  const [internalUrl, setInternalUrl] = useState(loadedURL);
  useEffect(() => {
    setInternalUrl(loadedURL);
  }, [loadedURL]);
  
  useEffect(() => {
    const queryURL = getQueryVariable('url');
    if (queryURL) {
      dispatch(Actions.loadData(queryURL));
    }
  }, [dispatch]);



  const setURL = (newUrl) => {
    if (newUrl === loadedURL) {
      return;
    }
    dispatch(Actions.loadData(newUrl));
  };

  return (
    <div style={{ width: '100%' }}>
      <BasicTextFields
        label='CSV Url'
        value={internalUrl}
        onChange={(e) => setInternalUrl(e.target.value)}
        onBlur={(e) => setURL(e.target.value)}
      />
    </div>
  );
};

export default UrlSelector;
