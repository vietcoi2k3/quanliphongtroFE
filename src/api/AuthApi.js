import React from 'react'
import axiosClient from "./AxiosClient"

const AuthApi = {
    getCityOutStanding: () => {
      const url= "auth/get-city-outstanding";
      console.log({url})
      return axiosClient.get(url);
    },
    getMotelTop: () => {
      const url = "auth/get-motel-top";
      return axiosClient.get(url);
    }
  };
  
  export default AuthApi;
  