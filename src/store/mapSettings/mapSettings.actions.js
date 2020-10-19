export const LOAD_NEW_MAP_SAGA = 'CHANGE_MAP_SAGA';
export const CHANGE_MAP = 'CHANGE_MAP';

export const loadNewMap = (mapInfo) => ({
  type: LOAD_NEW_MAP_SAGA,
  payload: {
    mapInfo
  }
})