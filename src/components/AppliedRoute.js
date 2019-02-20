import React from "react";
import { Route } from "react-router-dom";
import EditPage from '../containers/EditPage'
export default ({ component: C, props: cProps, ...rest }) => 
<Route {...rest} render={props => <C {...props} {...cProps} />} />
