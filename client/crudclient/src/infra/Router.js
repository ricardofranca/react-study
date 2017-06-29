import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import ClientCreate from '../components/clients/create';
import { SideMenu } from '../components/menus/sideMenu';
import Logout from '../components/logout';
import ClientList from '../components/clients/list';
import EditList from '../components/clients/edit';

const MainRouter = function () {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <SideMenu exact path="/" component={Home} />
            <SideMenu path="/clients" component={ClientList} exact />
            <SideMenu path="/clients/create" component={ClientCreate} />
            <SideMenu path="/clients/edit/:id" component={EditList} />
        </Switch>
    );
}

export default MainRouter;