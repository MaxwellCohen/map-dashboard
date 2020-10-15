import React, { useEffect, useState } from 'react';
import BasicTextFields from './BasicTextFields';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/csvData/csvData.actions';
import { getQueryVariable } from '../utils/queryUtils';

//'http://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv'
const UrlSelector = () => {
  const dispatch = useDispatch();
  const loadedURL = useSelector(({ data }) => data?.url);
  const [internalUrl, setInternalUrl] = useState(loadedURL);

  useEffect(() => {
    const queryURL = getQueryVariable('url');
    if (queryURL) {
      dispatch(Actions.loadData(queryURL));
    }
  }, [dispatch]);

  useEffect(() => {
    setInternalUrl(loadedURL);
  }, [loadedURL]);

  const setURL = (newUrl) => {
    if (newUrl === loadedURL) {
      return;
    }
    dispatch(Actions.loadData(newUrl));
  };

  return (
    <div style={{ width: '100%' }}>
      <BasicTextFields
        label='Url for a CSV'
        value={internalUrl}
        onChange={(e) => setInternalUrl(e.target.value)}
        onBlur={(e) => setURL(e.target.value)}
      />
    </div>
  );
};

export default UrlSelector;
