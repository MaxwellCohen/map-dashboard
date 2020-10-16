import React, { useEffect } from 'react';
import BasicTextField from '../common/BasicTextFields';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import NumericEditor from '../cellEditors/NumericEditor';
import ColorEditor from '../cellEditors/ColorEditor';
import * as Actions from '../../store/mapOptions/mapOptions.actions';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getQueryVariable } from '../../utils/queryUtils';
import useChartSettings, {stopObjToArr} from './useChartSettings';


const ChartSettings = () => {
  // const [gridApi, setGridApi] = useState(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  const dispatch = useDispatch();
  const loadedURL = useSelector(({ data }) => data?.url);
  const chartTitle = useSelector(({ options }) => options.title.text);
  const min = useSelector(({ options }) => options.colorAxis.min);
  const max = useSelector(({ options }) => options.colorAxis.max);
  const stopData = useSelector(({ options }) =>
    options.colorAxis.stops.map(([stop, color], i) => ({
      stop,
      color,
      _id: i + stop + color,
    })),
  );

  const [onCellValueChanged, addStop, deleteRow, setTitleHandle, setMinHandle, setMaxHandle] = useChartSettings();


  useEffect(() => {
    const mi = getQueryVariable('mi');
    if (mi && mi !== min && loadedURL) {
      dispatch(Actions.setColorAxisMin(mi));
    }
  }, [min, loadedURL, dispatch]);
  useEffect(() => {
    const ma = getQueryVariable('ma');
    if (ma && ma !== max && loadedURL) {
      dispatch(Actions.setColorAxisMax(ma));
    }
  }, [max, loadedURL, dispatch]);
  useEffect(() => {
    const t = getQueryVariable('t');
    if (t && t !== chartTitle && loadedURL) {
      dispatch(Actions.setTitle(t));
    }
  }, [chartTitle, loadedURL, dispatch]);
  useEffect(() => {
    const s = getQueryVariable('st');
    const st = stopData.map(stopObjToArr);
    if (s && s.toString() !== st.toString() && loadedURL) {
      dispatch(Actions.setColorAxisStops(s));
    }
  }, [stopData, loadedURL, dispatch]);



  function onGridReady(params) {
    // setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  }


  const DeleteButton = () => {
    return (
      <Button style={{ width: '100%' }} >
        Delete
      </Button>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <BasicTextField
        label='title'
        value={chartTitle}
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
        <Button style={{ width: '33%' }} onClick={addStop}>
          Add stop
        </Button>
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
            onCellValueChanged={onCellValueChanged}
            singleClickEdit={true}
            frameworkComponents={{
              numericEditor: NumericEditor,
              colorEditor: ColorEditor,
              deleteButton: DeleteButton,
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
              }}></AgGridColumn>
            <AgGridColumn
              headerName='Delete'
              cellRenderer='deleteButton'
              onCellClicked={deleteRow}
              editable={false}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default ChartSettings;
