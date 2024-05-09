import React from 'react'
import axiosClient from "./AxiosClient"
// Định nghĩa một object MotelApi chứa các phương thức gọi API liên quan đến nhà trọ
const MotelApi = {
  // Lấy thông tin trà trọ bằng id
  getMotelById(id) {
    const url= `auth/get-motel-by-id?id=${id}`;
    return axiosClient.get(url);
  },
  // Phân trang danh sách nhà trọ
  paingMotel(data) {
    const url= '/auth/paing-motel';
    return axiosClient.post(url, data);
  },
  // Thêm mới nhà trọ
  addMotel(data) {
    const url= '/user/add-motel';
    return axiosClient.post(url, data);
  },
  // Xoá nhà trọ bằng id
  deleteMotel(id) {
    const url = `/user/delete-motel?id=${id}`
    return axiosClient.delete(url, id)
  }
};

export default MotelApi; // Xuất object MotelApi
