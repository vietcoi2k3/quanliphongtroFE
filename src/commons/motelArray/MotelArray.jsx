import React from "react";
import { useNavigate } from "react-router-dom";
import "./motelArray.css";




const MotelArray = ({ id, img, des,title, price, area, address, pagination }) => {
  const navigate = useNavigate()
  const navigateDetailMotel = () => {
    navigate(`/motel/${id}`)
  }
  return (
    <div className="shadow-lg rounded-md overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1 bg-[#fff]" style={{display:pagination?'flex':'block'}} onClick={navigateDetailMotel}>
      <img
        src={img}
        width={pagination?"220px":"100%"}
        heigh={pagination?"220px":"auto"}
        alt=""
      />
      <div className="px-8 py-4">
        <h1 className="text-blue-800 text-lg font-medium break-words line-clamp-2">{title}</h1>
        <p className="text-green-800 font-medium text-lg">{price} triệu/tháng </p>
        <p className="text-lg font-medium ">
          <i className="fa-solid fa-expand mr-2 text-neutral-500"></i><span className="text-orange-300 ">{area} m2</span>
        </p>
        <p className="text-neutral-500">{address}</p>
        {pagination && <p className="text-neutral-500">{des}</p>}
      </div>
    </div>
  );
};

export default MotelArray;
