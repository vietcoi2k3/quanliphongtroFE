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
    updateUser(data){
      const url = "auth/register";
      return axiosClient.put(url, data)

    }
  };
  
  export default AuthApi;
  