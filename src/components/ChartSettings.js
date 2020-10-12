import React, {useState} from 'react';
import BasicTextField from './BasicTextFields';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import NumericEditor from './NumericEditor';

const ChartSettings = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

const onCellValueChanged =(prams) => {
  console.log(prams)
}


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* <BasicTextField label='title' /> */}
      <div>
        <div
          className='ag-theme-alpine'
          style={{ height: 200, width: 400, marginRight: '' }}>
          <AgGridReact
            onGridReady={onGridReady}
            modules={[ClientSideRowModelModule]}
            onCellValueChanged={onCellValueChanged}
            singleClickEdit={true}
            frameworkComponents={{
              numericEditor: NumericEditor
          }}
            rowData={[
              { breakPoint: 0, color: '#00FF00' },
              { breakPoint: 0.5, color: '#ffffff' },
              { breakPoint: 1, color: '#C40401' },
            ]}>
            <AgGridColumn field='breakPoint' sortable={true} editable={true} cellEditor="numericEditor" ></AgGridColumn>
            <AgGridColumn field='color' sortable={true} editable={true}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default ChartSettings;
