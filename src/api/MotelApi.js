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
    addMotel (data){
      const url= '/user/add-motel';
      return axiosClient.post(url, data);
    },
    deleteMotel (id){
      const url = `/user/delete-motel?id=${id}`
      return axiosClient.delete(url, id)
    }
  };
  
  export default MotelApi;
  