import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'

// Định nghĩa component Homepage
const Hompage = () => {
  return (
    <>
      {/* Hiển thị header */}
      <Header />
      {/* Phần nội dung chính của trang, sử dụng Outlet để render các route con */}
      <div className="py-[20px] md:px-20 bg-[#F7FAFC] min-h-[100vh]">
        <Outlet />
      </div>
      {/* Hiển thị footer */}
      <Footer />
    </>
  )
}

export default Hompage 
