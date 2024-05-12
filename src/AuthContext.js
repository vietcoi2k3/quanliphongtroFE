import React, { createContext, useContext, useState, useEffect } from 'react';

// Tạo context cho việc quản lý trạng thái xác thực
const AuthContext = createContext(null);

// Hook để sử dụng context trạng thái xác thực
export const useAuth = () => useContext(AuthContext);

// Provider để cung cấp trạng thái xác thực cho toàn bộ ứng dụng
export const AuthProvider = ({ children }) => {
    // Sử dụng useState để lưu trữ trạng thái xác thực
    const [auth, setAuth] = useState(false);

    // Sử dụng useEffect để kiểm tra trạng thái xác thực khi ứng dụng được tải lần đầu

    useEffect(() => {
        // Kiểm tra xem có access token được lưu trong localStorage không
        console.log("hello")
        const accessToken = localStorage.getItem('access_token');
        // Lấy thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));;
        
        // Nếu có thông tin người dùng, cập nhật trạng thái xác thực với thông tin người dùng
        if(user){
            setAuth(user)
        }
    }, []);


    // Trả về Provider với giá trị context là trạng thái xác thực và setter của nó
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
