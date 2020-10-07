import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from './store/csvData.actions';
import Chart from './components/Chart';
import isWithinInterval from 'date-fns/isWithinInterval';
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

const filterDates = (start, end, data) => {
  return data.map((d) => {
    return [
      d[0],
      d[1].filter(({ date }) =>
        isWithinInterval(new Date(date), { start, end }),
      ),
    ];
  });
};

const averageData = (key, data) => {
  let average = (array) =>
    array.reduce((a, b) => a + +b[key], 0) / array.length;
  return data.map((d) => {
    return [d[0], average(d[1]).toFixed(2)];
  });
};

// const min = (data) => {
//   return Math.min(...data.map((d)=> +d[1]))
// }
// const max = (data) => {
//   return Math.max(...data.map((d)=> +d[1]))
// }

const App = () => {
  
  const {data, filteredData, loading } = useSelector(({data})=> data);
  const dispatch = useDispatch();
  useEffect(() => {
    if(data.length !==0 && filteredData.length === 0 ) {
      console.log('data loaded')
      const dateFilter = filterDates.bind(null,
        new Date('2020-09-01'),
        new Date('2020-10-04'),
      );
      const averge = averageData.bind(null,'mean');
      dispatch(Actions.applyfilters(data, [dateFilter, averge]));
    } else if (data.length === 0 && !loading) {
      dispatch(Actions.loadData());
    }
  }, [data, filteredData, dispatch, loading]);

  return (
    <>
    <div style={{display:'flex'}}>
    <div style={{ width: '33%' }}>
      test </div>
      <div style={{  width: '33%' }}>
        <Chart data={filteredData} />
      </div>
      </div>
    </>
  );
};

export default App;
