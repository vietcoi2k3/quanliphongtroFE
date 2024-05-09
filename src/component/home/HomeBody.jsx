import React, { useState, useEffect } from "react";
import AuthApi from "../../api/AuthApi"; 
import "./home.css";
import MotelArray from "../../commons/motelArray/MotelArray";
import { useNavigate } from 'react-router-dom';

const HomeBody = () => {
  const [topCity, setTopCity] = useState([]); // State để lưu trữ dữ liệu các thành phố nổi bật
  const [topMotel, setTopMotel] = useState([]); // State để lưu trữ dữ liệu các phòng trọ nổi bật
  const navigate = useNavigate()

  // Hàm xử lý khi click vào thành phố
  function handleCityClick(id, area) {
    navigate(`listMotel?lnd=0&kv=${id}&kg=0-0&dt=0-0`); // Điều hướng đến trang danh sách phòng trọ của thành phố đó với query params tương ứng
  }

  // Hàm gọi API để lấy dữ liệu thành phố nổi bật và phòng trọ nổi bật
  const fetchDataCity = async () => {
    try {
      let responseCity = await AuthApi.getCityOutStanding(); // Gọi API lấy dữ liệu các thành phố nổi bật
      let responseMotelTop = await AuthApi.getMotelTop(); // Gọi API lấy dữ liệu các phòng trọ nổi bật
      if (responseCity) {
        setTopCity(responseCity); // Cập nhật state topCity với dữ liệu từ API
      }
      if (responseMotelTop) {
        setTopMotel(responseMotelTop); // Cập nhật state topMotel với dữ liệu từ API
      }
    } catch (err) {
      console.log({ err });
    }
  }
  
  useEffect(() => {
    fetchDataCity(); // Gọi hàm fetchDataCity khi component được render
  }, []);

  return (
    <div className='px-[80px]'>
      <div>
        <h1 className="text-3xl text-center mt-8 font-semibold">
          Cho Thuê Phòng Trọ, Thuê Nhà Trọ Giá Rẻ, Chính Chủ
        </h1>
        <p className="text-center text-slate-500 text-base mt-2">
          Cho thuê phòng trọ, nhà trọ giá rẻ hàng đầu Việt Nam - Cập nhật thông
          tin cho thuê phòng trọ nhanh chóng, chính xác, thông tin xác thực.
        </p>
      </div>
      {/* Phần hiển thị các thành phố nổi bật */}
      <div>
        <h2 className="text-2xl font-semibold mt-12 mb-4">Khu vực nổi bật</h2>
        <div className="grid grid-cols-3 gap-4 cursor-pointer">
          {topCity?.map((city, index) => (
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
      {/* Phần hiển thị các phòng trọ nổi bật */}
      <div>
        <h2 className="text-2xl font-semibold mt-12">Cho thuê phòng trọ nổi bật</h2>
        <div className=" grid grid-cols-4 gap-4 mt-4">
          {topMotel?.map((motel, index) => (
            <MotelArray
              id={motel.id}
              key={index}
              img={motel.imageReturn || 'https://img.thuephongtro.com/images/thumb/2023/11/09/20231109190052-p1fkz.jpg'}
              des={motel.title}
              price={motel.price}
              area={motel.acreage}
              address={motel.address}
              pagination={false}
            />
          ))}
        </div>
      </div>
      {/* Phần thông tin thống kê */}
      <div className="grid grid-cols-2">
        <div className="">
          <h1 className="mt-32 text-center text-2xl font-bold">
            Cho thuê phòng trọ chính chủ, nhanh chóng
          </h1>
          <p className="text-center text-slate-500 text-lg mt-2 font-medium">
            Nền tảng cho thuê nhà trọ, phòng trọ hàng đầu Việt Nam
          </p>
          <div className="grid grid-cols-2 gap-12 mt-4">
            {/* Hiển thị thông tin thống kê */}
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
            {/* Hiển thị thông tin thống kê */}
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
          {/* Nút bắt đầu ngay */}
          <div className="text-center mt-8 ">
            <button onClick={()=>navigate('/user/quan-ly-tin')} className="w-48 h-14 bg-[#0d6efd] text-white text-xl rounded hover:bg-blue-700">Bắt đầu ngay</button>
          </div>
        </div>
        {/* Hình ảnh */}
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

export default HomeBody;
