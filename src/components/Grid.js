import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function useDragColumnChange(cb) {
  const columnOrderRef = useRef([]);
  const onDragStarted = (e) => {
    columnOrderRef.current = e.columnApi.getColumnState().map((c) => c.colId);
  };
  const onDragStopped = (e) => {
    const newColumnOrder = e.columnApi.getColumnState().map((c) => c.colId);
    const sameOrder = columnOrderRef.current.every(
      (c, i) => c === newColumnOrder[i],
    );

    if (!sameOrder) {
      cb(e);
    }
  };

  return { onDragStarted, onDragStopped };
}

const Grid = () => {
  const [gridApi, setGridApi] = useState(null);
  const { onDragStarted, onDragStopped } = useDragColumnChange((e) =>
    console.log('Saving new column order!'),
  );
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  const { filteredData, titles } = useSelector(({ data }) => data);
  const onGridReady = (params) => {
    setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  };

  const updateRows = () => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
      console.log(gridApi);
    }
  };

  return (
    <div
      className='ag-theme-alpine'
      style={{ height: 400, width: '100%', marginRight: '' }}>
      <AgGridReact
        onGridReady={onGridReady}
        onRowDataChanged={updateRows}
        onDragStarted={onDragStarted}
        onDragStopped={onDragStopped}
        defaultColDef={{
          initialWidth: 100,
          sortable: true,
          resizable: true,
        }}
        columnDefs={titles.map((v) => ({
          headerName: v,
          field: v,
        }))}
        rowData={filteredData}>
      </AgGridReact>
    </div>
  );
};

export default Grid;
