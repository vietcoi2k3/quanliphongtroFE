import React from 'react'
import axiosClient from "./AxiosClient"

const AuthApi = {
    getCityOutStanding (){
      const url= "auth/get-city-outstanding";
      return axiosClient.get(url);
    },
    getMotelTop(){
      const url = "auth/get-motel-top";
      return axiosClient.get(url);
    },
    login(data){
      const url = "auth/login";
      return axiosClient.post(url, data)
    },
    register(data){
      const url = "auth/register";
      return axiosClient.post(url, data)
    },
    updateUser: (formData) => {
      const accessToken = localStorage.getItem('access_token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
  
      return axiosClient.put('user/update-user', formData, config);
    },
      changePassword: (data) =>{
        const url = "user/change-password";
        return axiosClient.post(url, data)
      }
  };
  
  export default AuthApi;
  