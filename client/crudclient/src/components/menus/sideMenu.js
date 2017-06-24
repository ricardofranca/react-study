import { PrivateRoute } from '../../App';
import { Link } from 'react-router-dom';
import React from 'react';

export const SideMenu = ({ component: Component, exact, path }) => {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link> </li>
        <li><Link to="/clients">Clients</Link> </li>
        <li><Link to="/logout">Logout</Link> </li>
      </ul>


      <PrivateRoute exact path={path} component={Component} />
    </div>
  );
}