import React, { useState } from 'react';
import BasicTextField from './BasicTextFields';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import NumericEditor from './NumericEditor';
import ColorEditor from './ColorEditor';

const ChartSettings = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [breakPointData, setBreakPointData] = useState([
    { breakPoint: 0, color: '#00FF00' },
    { breakPoint: 0.5, color: '#ffffff' },
    { breakPoint: 1, color: '#C40401' },
  ]);
  const [title, setTitle] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onCellValueChanged = (prams) => {
    const cloneBreakPointData = [...breakPointData];
    cloneBreakPointData[prams.rowIndex] = prams.data;
    setBreakPointData(cloneBreakPointData);
  };

  const setTitleHandle = (v) => {
    setTitle(v)
  }

  const setMinHandle = (v) => {
    setMin(v);
  }
  const setMaxHandle = (v) => {
    setMax(v);
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <BasicTextField
        label='title'
        defaultValue={title}
        onBlur={(e) => setTitleHandle(e.target.value)}
      />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <BasicTextField
          label='Color Axis Min'
          defaultValue={min}
          onBlur={(e) => setMinHandle(e.target.value)}
        />
        <BasicTextField
          label='Color Axis Max'
          defaultValue={max}
          onBlur={(e) => setMaxHandle(e.target.value)}
        />
      </div>
      <div style={{ width: '100%' }}>
        <div className='ag-theme-alpine' style={{ height: 150, width: '100%' }}>
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
            }}
            rowData={breakPointData}>
            <AgGridColumn
              field='breakPoint'
              sortable={true}
              editable={true}
              cellEditor='numericEditor'></AgGridColumn>
            <AgGridColumn
              field='color'
              editable={true}
              cellEditor='colorEditor'
              isPopup={true}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default ChartSettings;
