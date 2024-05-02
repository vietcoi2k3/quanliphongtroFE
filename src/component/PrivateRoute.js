import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ component: Component }) => {
    const token = localStorage.getItem('access_token');
    return token ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

