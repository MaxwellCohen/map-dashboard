const DELEM = '|#|';

export const getQueryVariable = (variable) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const pairs = vars
    .map((e) => e.split('=').map(decodeURIComponent))
    .map(parseQueryUrlArr);
  const qvm = Object.fromEntries(pairs);
  if (!variable) return qvm;
  return qvm[variable];
};

const parseQueryUrlArr = ([x, val = '']) => {
  if (val.includes(DELEM) || val.includes(',')) {
    val = val.split(DELEM).map((v) => v.split(','));
  }
  return [x, val];
}

export const updateQuery = (key, value) => {
  if (Array.isArray(value)) {
    value = value.join(DELEM);
  }
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(key, value);
  window.history.replaceState(null, null, '?' + queryParams.toString());
};

export const clearQueryUrl = () => {
  window.history.replaceState(null, null, '?');
};
