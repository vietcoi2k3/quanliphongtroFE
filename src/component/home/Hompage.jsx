import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
const Hompage = () => {
  return (<>
  <Header />
  <div className="py-[20px] md:px-20 bg-[#F7FAFC] min-h-[100vh]">
  <Outlet />
  </div>
  <Footer />
    </>
  )
}

export default Hompage