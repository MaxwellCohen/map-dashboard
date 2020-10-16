const DELEM = '|#|';

export const getQueryVariable = (variable) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      let val = decodeURIComponent(pair[1]);
      if (val.includes(DELEM) || val.includes(',')) {
        val = val.split(DELEM).map((v) => v.split(','))
      }
      return val
    }
  }
};

export const updateQuery = (key, value) => {
  if (Array.isArray(value)) {
    value = value.join(DELEM);
  }


  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(key, value);
  window.history.replaceState(null, null, '?' + queryParams.toString());
}