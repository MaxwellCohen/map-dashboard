import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../store/mapOptions/mapOptions.actions';


export function stopObjToArr({ stop, color }) {
  return [stop, color];
}

const getTableData = (rowData) => {
  let rd = [];
  rowData.api.forEachNode(node => rd.push(node.data));
  return rd.map(stopObjToArr);
}


export default () => {

  const dispatch = useDispatch();
  const stopData = useSelector(({ options }) =>
    options.colorAxis.stops.map(([stop, color], i) => ({
      stop,
      color,
      _id: i + stop + color,
    })),
  );

  const onCellValueChanged = (rowData) => {
    const data = getTableData(rowData);
    dispatch(Actions.setColorAxisStops(data));
  };

  const addStop = () => {
    const data = [...stopData.map(stopObjToArr), [0, '#000']];
    dispatch(Actions.setColorAxisStops(data));
  };
  const deleteRow = (rowData) => {
    rowData.api.applyTransaction({ remove: [rowData.data] })
    const data = getTableData(rowData);
    dispatch(Actions.setColorAxisStops(data));
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

  return [onCellValueChanged, addStop, deleteRow, setTitleHandle, setMinHandle, setMaxHandle];

}