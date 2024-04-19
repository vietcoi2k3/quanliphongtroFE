import React from "react";
import "./motelArray.css";




const MotelArray = ({img,des,price,area,address}) => {
  return (
    <div className="shadow-lg rounded-md overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1">
      <img
        src={img}
        width="100%"
        alt=""
      />
      <div className="px-8 py-4">
        <h1 className="text-blue-800 text-lg font-medium break-words line-clamp-2">{des}</h1>
        <p className="text-green-800 font-medium text-lg">{price} triệu/tháng </p>
        <p className="text-lg font-medium ">
          <i className="fa-solid fa-expand mr-2 text-neutral-500"></i><span className="text-orange-300 ">{area} m2</span>
        </p>
        <p className="text-neutral-500">{address}</p>
      </div>
    </div>
  );
};

export default MotelArray;
