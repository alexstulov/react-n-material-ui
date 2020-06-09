import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {authenticationService} from '../../services';

const PrivateRoute = ({component: Component, ...rest}: {component: any, path: string, exact?: boolean, key?: string}) => (
    <Route {...rest} render={(props) => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
        }
        return <Component {...props}/>;
    }} />
);

export default PrivateRoute;