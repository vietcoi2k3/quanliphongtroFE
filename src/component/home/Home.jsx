import React, { useState, useEffect } from "react";
import AuthApi from "../../api/AuthApi";
import "./home.css";
import MotelArray from "../../commons/motelArray/MotelArray";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [topCity, setTopCity] = useState([]);
  const [topMotel, setTopMotel] = useState([]);
  const navigate = useNavigate();

  function handleCityClick(id, area) {
    navigate(`/listMotel-${id}`);
  }

  useEffect(() => {
    const fetchDataCity = async () => {
      try {
        let response = await AuthApi.getCityOutStanding()
        console.log(response)
        setTopCity(response)
      } catch (err) {
        console.log({ err })
      }
    }
    fetchDataCity()
  }, []);

  useEffect(() => {
    AuthApi.getMotelTop()
      .then((response) => setTopMotel(response))
      .catch((error) => console.error("Error fetching top motels:", error));
  }, []);

  return (
    <div className="py-[20px] md:px-20 xl:px-72">
      <div>
        {" "}
        <h1 className="text-3xl text-center mt-8 font-semibold">
          Cho Thuê Phòng Trọ, Thuê Nhà Trọ Giá Rẻ, Chính Chủ
        </h1>
        <p className="text-center text-slate-500 text-base mt-2">
          Cho thuê phòng trọ, nhà trọ giá rẻ hàng đầu Việt Nam - Cập nhật thông
          tin cho thuê phòng trọ nhanh chóng, chính xác, thông tin xác thực.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mt-12 mb-4">Khu vực nổi bật</h2>
        <div className="grid grid-cols-3 gap-4 cursor-pointer">
          {topCity.map((city, index) => (
            <div className="relative" key={index} onClick={() => handleCityClick(city.id)}>
              <img
                src={city.cityImage}
                alt=""
                width={"100%"}
                className="h-[100%] overflow-hidden rounded shadow-inner"
              />
              <p className="absolute bottom-6 left-6 text-white text-xl font-bold">
                {city.cityName}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mt-12">Cho thuê phòng trọ nổi bật</h2>
        <div className=" grid grid-cols-4 gap-4 mt-4">
          {topMotel.map((motel, index) => (
            <MotelArray
              key={index}
              img={motel.motelImage}
              des={motel.title}
              price={motel.price}
              area={motel.acreage}
              address={motel.address}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="">
          <h1 className="mt-32 text-center text-2xl font-bold">
            Cho thuê phòng trọ chính chủ, nhanh chóng
          </h1>
          <p className="text-center text-slate-500 text-lg mt-2 font-medium">
            Nền tảng cho thuê nhà trọ, phòng trọ hàng đầu Việt Nam
          </p>
          <div className="grid grid-cols-2 gap-12 mt-4">
            <div className="h-[250px] shadow-lg	cursor-pointer transition-transform transform hover:-translate-y-2 mt-4 border-2 text-center">
              <div className="h-[50%] w-[40%] bg-[#f0f3f5] rounded-full mt-4 mx-[auto] overflow-hidden">
                <img
                  src="https://thuephongtro.com/assets/images/call-center.svg"
                  alt=""
                  width={"100%"}
                  className="h-[70%] mt-4"
                />
              </div>
              <h1 className="text-2xl font-bold mt-4">80.000+</h1>
              <p className="text-lg">người dùng</p>
            </div>
            <div className="h-[250px] shadow-lg	cursor-pointer transition-transform transform hover:-translate-y-2 mt-4 border-2 text-center">
              <div className="h-[50%] w-[40%] bg-[#f0f3f5] rounded-full mt-4 mx-[auto] overflow-hidden">
                <img
                  src="https://thuephongtro.com/assets/images/for-rent.svg"
                  alt=""
                  width={"100%"}
                  className="h-[70%] mt-4"
                />
              </div>
              <h1 className="text-2xl font-bold mt-4">81.564+</h1>
              <p className="text-lg"> phòng trọ cho thuê</p>
            </div>
          </div>
          <div className="text-center mt-8 ">
            <button className="w-48 h-14 bg-[var(--blue-color-)] text-white text-xl rounded hover:bg-blue-700">Bắt đầu ngay</button>
          </div>
        </div>
        <div className="">
          <img
            src="https://thuephongtro.com/assets/images/select-house.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
