import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, ...rest }) => {
    let logged = isLogged();

    let authorized = (rest.private && !logged) ? false : true;

    if (!authorized) {
        return <Navigate to="/signin" />;
    }

    return children;
}