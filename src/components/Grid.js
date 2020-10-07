import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const Grid = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const { rawData,   titles} = useSelector(({ data }) => data);
    const onGridReady = (params) => {
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
      
    }

    const updateRows =() => {
      if (gridApi) {

        gridApi.sizeColumnsToFit();
      }
    }

    return (
        <div className="ag-theme-alpine" style={ { height: 400, width: '95%', margin: '0px 10px' } }>
            <AgGridReact
               defaultColDef={{ resizable: true }}
               onGridReady={onGridReady}
               onRowDataChanged={updateRows}
                rowData={rawData}>
                  {titles.map(v  => 
                    <AgGridColumn key={v} field={v} sortable={true} filter={true} skipHeaderOnAutoSize={true} suppressSizeToFit={false}></AgGridColumn>
                  ) }
                
            </AgGridReact>
        </div>
    );
};

export default Grid;