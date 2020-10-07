import React, { useCallback, useEffect, useState } from 'react';
import BasicTextFields from './BasicTextFields';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/csvData.actions';

const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
};

//'http://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv'
const UrlSelector = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(getQueryVariable('url') || '');
  const setURL = useCallback(
    (newUrl) => {
      console.log(newUrl)
      if (url === newUrl){
        return;
      }

      setUrl(newUrl);
      dispatch(Actions.loadData(newUrl));

      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('url', newUrl);
      window.history.replaceState(null, null, '?' + queryParams.toString());
    },
    [setUrl, dispatch, url],
  );

  useEffect(() => {
    const queryURL = getQueryVariable('url');
    if (queryURL) {
      dispatch(Actions.loadData(queryURL));
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <BasicTextFields
        label='Url for a CSV'
        defaultValue={url}
        onBlur={(e) => setURL(e.target.value)}
      />
    </div>
  );
};

export default UrlSelector;
