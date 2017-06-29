import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';

import './App.css';
import { reducers } from './api/reducers';
import sagas from './api/sagas';
import MainRouter from './infra/Router';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    reducers.auth(undefined, { type: 'IS_AUTHENTICATED' }) ? (
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
  componentWillMount() {
    const sagaMiddleware = createSagaMiddleware();
    this.history = createHistory();
    const routerReduxMiddleware = routerMiddleware(this.history);
    const middlewares = [
      routerReduxMiddleware,
      sagaMiddleware,
    ];

    const combReducers = combineReducers({ ...reducers, router: routerReducer });
    this.store = createStore(combReducers, applyMiddleware(...middlewares));

    sagaMiddleware.run(sagas);
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <MainRouter />
        </ConnectedRouter>
      </Provider>

    );
  }
}

export default App;
