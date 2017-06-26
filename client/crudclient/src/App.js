import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import './App.css';
import { getReducers } from './api/reducers';
import sagas from './api/sagas';
import MainRouter from './infra/Router';

const sagaMiddleware = createSagaMiddleware();

const listOfReducers = getReducers();
const reducers = combineReducers(listOfReducers);
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    listOfReducers.auth(undefined, { type: 'IS_AUTHENTICATED' }) ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}

export default App;
