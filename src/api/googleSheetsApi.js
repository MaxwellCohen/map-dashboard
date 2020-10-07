import axios from 'axios';

//1M9zNpdPOUT8--VDQ0F14lZnhMSVmLSJQ5Pf0sGDB1fU/1/public/values?alt=json

const api = axios.create({
  baseURL: 'https://spreadsheets.google.com/feeds/cells',
});

export const getPage = (workBookid, sheetID = 1) => {
  return api.get(`${workBookid}/${sheetID}/public/values?alt=json`);
};

export const getData = () => {
  return axios.get(
    "https://cors-anywhere.herokuapp.com/http://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv",
    {
      headers: {'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers":"Access-Control-Allow-Headers"}
    },
  );
};

export default api;

// https://sheets.googleapis.com/v4/spreadsheets/1M9zNpdPOUT8--VDQ0F14lZnhMSVmLSJQ5Pf0sGDB1fU?includeGridData=false

// https://sheets.googleapis.com/v4/spreadsheets/1M9zNpdPOUT8--VDQ0F14lZnhMSVmLSJQ5Pf0sGDB1fU/values/RtLiveData!D2:D?majorDimension=COLUMNS&valueRenderOption=FORMULA
