import React from 'react'
import axiosClient from "./AxiosClient"

const MotelApi = {
    getMotelById (id){
      const url= `auth/get-motel-by-id?id=${id}`;
      return axiosClient.get(url, id);
    },
    paingMotel (data){
      const url= '/auth/paing-motel';
      return axiosClient.post(url, data);
    },
  };
  
  export default MotelApi;
  