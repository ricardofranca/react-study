import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getReducers } from './api/reducers';
import { SideMenu } from './components/menus/sideMenu';
import Logout from './components/logout';
import ClientList from './components/clients/list';
import createSagaMiddleware from 'redux-saga';
import sagas from './api/sagas';

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
        <Router>
          <Switch>
            {/*<PrivateRoute exact path="/" component={Home} />*/}
            <SideMenu exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/clients" component={ClientList} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
