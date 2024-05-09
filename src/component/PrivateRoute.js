import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ component: Component }) => {
    // Nếu trong localStorage có access_token thì người dùng có thể truy cập vào Component được bảo vệ còn không thì chuyển sang trang yêu cầu người dungg phải login
    const token = localStorage.getItem('access_token');
    return token ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

