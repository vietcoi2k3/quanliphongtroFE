import React from 'react'
import axios from 'axios';

const ProvinceApi = {
    getDistrictByProvince (id){
      const url= `https://vapi.vnappmob.com/api/province/district/${id}`;
      return axios.get(url);
    },
    getWardByDistrict (id){
      const url= `https://vapi.vnappmob.com/api/province/ward/${id}`;
      return axios.get(url);
    },
  };
  
  export default ProvinceApi;
  