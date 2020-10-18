import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQueryVariable } from '../../utils/queryUtils';
import FilterItem from './FilterItem';
import * as Actions from '../../store/csvData/csvData.actions';


const FilterList = () => {
  const { titles, filteringFuncitons } = useSelector(({ data }) => data);
  const [internalFilters, setInternalFilters] = useState(filteringFuncitons);
  const dispach = useDispatch();

  useEffect(() => {
    setInternalFilters(filteringFuncitons)
  }, [filteringFuncitons])

  useEffect(()=> {
    const urlFilters  = (getQueryVariable('f')|| []);
    if (urlFilters.length > 0 && urlFilters.toString() !== filteringFuncitons.toString()) {
      dispach(Actions.updateFilters(urlFilters));
    }
    setInternalFilters(urlFilters)
  }, [titles, dispach, filteringFuncitons])


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
      <div style={{ alignSelf:'flex-end', flex: 1 }}>
        <Button onClick={addFitler}>add filter</Button>
      </div>
      {
        internalFilters.map((filter, index) => {
          return <FilterItem key={index} filterSettings={filter} onFilterChange={(f) => filterChangeHandler(index, f)} onDelete={() => onDelete(index)} />
        })
      }

    </div>
  );
};



export default FilterList;
