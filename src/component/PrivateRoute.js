import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ component: Component }) => {
    const { auth } = useAuth();
    return <Component />;
    // return auth ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

