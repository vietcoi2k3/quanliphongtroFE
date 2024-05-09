import React from 'react'
import axios from 'axios'; 

// Định nghĩa một object ProvinceApi chứa các phương thức gọi API liên quan đến tỉnh/thành phố
const ProvinceApi = {
  // Lấy danh sách quận/huyện theo mã tỉnh/thành phố
  getDistrictByProvince(id) {
    const url= `https://vapi.vnappmob.com/api/province/district/${id}`;
    return axios.get(url);
  },
  // Lấy danh sách phường/xã theo mã quận/huyện
  getWardByDistrict(id) {
    const url= `https://vapi.vnappmob.com/api/province/ward/${id}`;
    return axios.get(url);
  },
};

export default ProvinceApi; // Xuất object ProvinceApi
