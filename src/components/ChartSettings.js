import React, { useState } from 'react';
import BasicTextField from './BasicTextFields';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import NumericEditor from './NumericEditor';
import ColorEditor from './ColorEditor';
import * as Actions from '../store/mapOptions/mapOptions.actions';
import { useSelector, useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button";




const ChartSettings = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const dispatch = useDispatch();
  const title = useSelector(({ options }) => options.title.text);
  const min = useSelector(({ options }) => options.colorAxis.min);
  const max = useSelector(({ options }) => options.colorAxis.max);
  const stopData = useSelector(({ options }) =>
    options.colorAxis.stops.map(([stop, color], i) => ({
      stop,
      color,
      _id: i+stop+color
    })),
  );

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onCellValueChanged = (prams) => {
    const cloneStopData = stopData.map((e) => ({...e}));
    cloneStopData[prams.rowIndex] = {...prams.data};
    const data = cloneStopData.map(({ stop, color }) => [
      stop,
      color,
    ]);
    dispatch(Actions.setColorAxisStops(data))
  };

  const addStop = () => {
    const data = [...stopData.map(({ stop, color }) => [
      stop,
      color,
    ]), [0, '#000']];
    dispatch(Actions.setColorAxisStops(data))
  };
  const deleteRow = (rowData) => {
    const data = stopData.filter((r)=> r !== rowData.data).map(({ stop, color }) => [
      stop,
      color,
    ])
    dispatch(Actions.setColorAxisStops(data))
  };

  const setTitleHandle = (v) => {
    dispatch(Actions.setTitle(v));
  };

  const setMinHandle = (v) => {
    dispatch(Actions.setColorAxisMin(v));
  };
  const setMaxHandle = (v) => {
    dispatch(Actions.setColorAxisMax(v));
  };


  const DeleteButton = (data) => {
    return <Button  style={{width:'100%'}} onClick={()=> deleteRow(data)}>Delete</Button>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <BasicTextField
        label='title'
        value={title}
        onChange={(e) => setTitleHandle(e.target.value)}
      />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <BasicTextField
          label='Color Axis Min'
          value={min}
          onChange={(e) => setMinHandle(e.target.value)}
        />
        <BasicTextField
          label='Color Axis Max'
          value={max}
          onChange={(e) => setMaxHandle(e.target.value)}
        />
         <Button  style={{width:'33%'}} onClick={addStop}>Add stop</Button>
      </div>
      <div style={{ width: '100%' }}>
        <div className='ag-theme-alpine' style={{ height: 300, width: '100%' }}>
          <AgGridReact
            defaultColDef={{
              flex: 1,
              minWidth: 100,
              filter: true,
              editable: true,
            }}
            onGridReady={onGridReady}
            modules={[ClientSideRowModelModule]}
            onCellValueChanged={onCellValueChanged}
            singleClickEdit={true}
            frameworkComponents={{
              numericEditor: NumericEditor,
              colorEditor: ColorEditor,
              deleteButton: DeleteButton
            }}
            immutableData
            getRowNodeId={(data) => data._id}
            rowData={stopData}>
            <AgGridColumn
              field='stop'
              sortable={true}
              editable={true}

              cellEditor='numericEditor'></AgGridColumn>
            <AgGridColumn
              flex={2}
              field='color'
              editable={true}
              cellEditor='colorEditor'
              
              cellStyle={(prams) => {
                return {
                  backgroundColor: prams?.value,
                  color: 'white',
                  textShadow:
                    '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                  letterSpacing: '2px',
                };
              }}
              ></AgGridColumn>
            <AgGridColumn
              headerName="Delete"
              cellRenderer='deleteButton'
              editable={false}
              ></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default ChartSettings;
