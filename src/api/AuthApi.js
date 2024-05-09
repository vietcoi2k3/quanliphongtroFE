import React from 'react'
import axiosClient from "./AxiosClient" 

// Định nghĩa một object AuthApi chứa các phương thức gọi API liên quan đến xác thực
const AuthApi = {
  // Lấy danh sách thành phố nổi bật
  getCityOutStanding () {
    const url= "auth/get-city-outstanding";
    return axiosClient.get(url);
  },
  // Lấy danh sách các nhà trọ nổi bật
  getMotelTop() {
    const url = "auth/get-motel-top";
    return axiosClient.get(url);
  },
  // Api đăng nhập
  login(data) {
    const url = "auth/login";
    return axiosClient.post(url, data)
  },
  // Api đăng ký
  register(data) {
    const url = "auth/register";
    return axiosClient.post(url, data)
  },
  // Api cập nhật thông tin người dùng
  updateUser: (formData) => {
    const accessToken = localStorage.getItem('access_token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    return axiosClient.put('user/update-user', formData, config);
  },
  // Api thay đổi mật khẩu
  changePassword: (data) => {
    const url = "user/change-password";
    return axiosClient.put(url, data)
  },
  // Api lấy danh sách nhà trọ của 1 người dùng
  getListUserMotel: ({pageSize, pageIndex}) => {
    const url = `/user/get-list-user-motel?pageIndex=${pageIndex}&pageSize=${pageSize}`
    return axiosClient.get(url)
  },
  // Api quên mật khẩu
  forgotPasswod: (username) => {
    const url = `/auth/forgot-email?username=${username}`
    return axiosClient.get(url)
  },
  // Api thanh toán qua VNPAY
  vnPay: (money) => {
    const url =  `/auth/payment/vn-pay?amount=${money}`
    return axiosClient.get(url)
  }
};

export default AuthApi; 
