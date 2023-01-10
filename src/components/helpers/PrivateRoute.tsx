import React from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';

import {authenticationService} from '../../services';

// const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" />;
//   };

  const PrivateRoute = () => {
    const currentUser = authenticationService.currentUserValue;
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };

// const PrivateRoute = ({component: Component, ...rest}: {component: React.FunctionComponent, path: string, exact?: boolean, key?: string}) => (
//     <Route {...rest} element={(props: any) => {
//         const currentUser = authenticationService.currentUserValue;
//         if (!currentUser) {
//             return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
//         }
//         return <Component {...props}/>;
//     }} />
// );

export default PrivateRoute;