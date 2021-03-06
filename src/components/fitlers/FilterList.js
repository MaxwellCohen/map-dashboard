import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterItem from './FilterItem';
import * as Actions from '../../store/csvData/csvData.actions';


const FilterList = () => {
  const { filteringFuncitons } = useSelector(({ data }) => data);
  const [internalFilters, setInternalFilters] = useState(filteringFuncitons || []);
  const dispach = useDispatch();

  useEffect(() => {
    setInternalFilters(filteringFuncitons || [])
  }, [filteringFuncitons])

  const addFitler = () => {
    setInternalFilters((c) => [...c, []]);
  }

  const filterChangeHandler = (index, f) => {
    const cf = [...internalFilters]
    cf[index] = f;
    dispach(Actions.updateFilters(cf));
  }

  const onDelete = (index) => {
    const cf = [...internalFilters]
    cf.splice(index, 1)
    dispach(Actions.updateFilters(cf));
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {
        internalFilters.map((filter, index) => {
          return <FilterItem key={index} filterSettings={filter} onFilterChange={(f) => filterChangeHandler(index, f)} onDelete={() => onDelete(index)} />
        })
      }
      <div style={{ alignSelf:'flex-end', flex: 1 }}>
        <Button onClick={addFitler}>add filter</Button>
      </div>
    </div>
  );
};



export default FilterList;
