import React from 'react'
import axiosClient from "./AxiosClient"

const AuthApi = {
    getCityOutStanding: () => {
      console.log("toi la viet");
      const url= "auth/get-city-outstanding";
      return axiosClient.get(url);
    },
    getMotelTop: () => {
      const url = "auth/get-motel-top";
      return axiosClient.get(url);
    }
  };
  
  export default AuthApi;
  