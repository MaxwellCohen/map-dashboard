import axios from 'axios';


export const getCSV = (url) => {
  const validURL = isValidHttpUrl(url);
  if (!validURL) {
    return Promise.reject('invalid url');
  }
  return axios.get(
     `https://map-dashboard-cors.herokuapp.com/${url}`,
    //  `http://localhost:8080/${url}`,
    {
      headers: {'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers":"Access-Control-Allow-Headers"}
    },
  );
};


function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}