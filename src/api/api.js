import axios from 'axios';


export const getCSV = (url) => {
  return axios.get(
    // `https://cors-anywhere.herokuapp.com/${url}`,
     `http://localhost:8080/${url}`,
    {
      headers: {'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers":"Access-Control-Allow-Headers"}
    },
  );
};


