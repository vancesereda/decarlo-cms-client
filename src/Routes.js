import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import Signup from "./containers/Signup";
import NewPage from './containers/NewPage';
import NotFound from './containers/NotFound';
import Home from './containers/Home';
import Template from './containers/Template';
import AppliedRoute from './components/AppliedRoute'
import RandomPhoto from './components/randomPhoto'

export default ( { childProps } ) => (
    <Switch>
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/" exact component={RandomPhoto} props={childProps} />
        <AppliedRoute path="/new" exact component={NewPage} props={childProps} />
        <AppliedRoute path="/:to" component={Template} props={childProps} />
    </Switch>
)