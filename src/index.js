import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as serviceWorker from './serviceWorker';
import csvDataReducer from './store/csvData/csvData.reducer';
import mapOptions from './store/mapOptions/mapOptions.reducer';
import createSagaMiddleware from 'redux-saga'
import mySaga from './store/csvData/sagas';


const sagaMiddleware = createSagaMiddleware()


const store = createStore(combineReducers({
  data: csvDataReducer,
  options: mapOptions,
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

ReactDOM.render(

    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
