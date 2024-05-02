import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const user = JSON.parse(localStorage.getItem('user'));;
        if (accessToken) {
            // setAuth(true);
            console.log('Setting auth to true...');
        }
        if(user){
            setAuth(user)
        }
    }, []);

    console.log('Rendering AuthProvider with auth:', auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

