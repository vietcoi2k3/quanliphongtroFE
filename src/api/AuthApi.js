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
        return axiosClient.put(url, data)
      },
      getListUserMotel:({pageSize, pageIndex}) => {
        const url = `/user/get-list-user-motel?pageIndex=${pageIndex}&pageSize=${pageSize}`
        return axiosClient.get(url)
      },
      forgotPasswod:(username) => {
        const url = `/auth/forgot-email?username=${username}`
        return axiosClient.get(url)
      },
      vnPay:(money) => {
        const url =  `/auth/payment/vn-pay?amount=${money}`
        return axiosClient.get(url)
      }
  };
  
  export default AuthApi;
  