import React, { useState } from "react";
import "./header.css";
import ModalFilter from "./ModalFilter";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCurrent, setFilterCurrent] = useState('')
  const [result, setResult] = useState({
    'loai-nha-dat': {
      name: 'Tất cả',
      value: 'tat-ca'
    },
    'khu-vuc': {
      name: 'Toàn quốc',
      value: 'toan-quoc'
    },
    'khoang-gia': {
      name: 'Tất cả',
      value: '0-20'
    },
    'dien-tich': {
      name: 'Tất cả',
      value: '0-100'
    },
  })

  const handleReset = () => {
    setResult({
      'loai-nha-dat': {
        name: 'Tất cả',
        value: 'tat-ca'
      },
      'khu-vuc': {
        name: 'Toàn quốc',
        value: 'toan-quoc'
      },
      'khoang-gia': {
        name: 'Tất cả',
        value: '0-20'
      },
      'dien-tich': {
        name: 'Tất cả',
        value: '0-100'
      },
    })
  }

  const handleOpenModalFilter = (item) => {
    setFilterCurrent(item)
    setIsModalOpen(true);
  }
  const filters = [
    {
      name: 'Loại nhà đất',
      id: 'loai-nha-dat',
      options: [
        {
          name: 'Tất cả',
          value: 'tat-ca'
        },
        {
          name: 'Cho thuê phòng trọ',
          value: 'cho-thue-phong-tro'
        },
        {
          name: 'Căn hộ cho thuê',
          value: 'can-ho-cho-thue'
        },
        {
          name: 'Ở nguyên căn',
          value: 'o-nguyen-can'
        },
        {
          name: 'Ở ghép',
          value: 'o-ghep'
        },
      ]
    },
    {
      name: 'Khu vực',
      id: 'khu-vuc',
      options: [
        {
          name: 'Toàn quốc',
          value: 'toan-quoc'
        },
        {
          name: 'Hà Nội',
          value: 'ha-noi'
        },
        {
          name: 'Đà Nẵng',
          value: 'da-nang'
        },
        {
          name: 'Thành phố Hồ Chí Minh',
          value: 'thanh-pho-ho-chi-minh'
        },
      ]
    },
    {
      name: 'Khoảng giá',
      id: 'khoang-gia',
      min: 0,
      max: 20,
      options: [
        {
          name: 'Tất cả',
          value: '0-20',
          min: 0,
          max: 20


        },
        {
          name: 'Dưới 1 triệu',
          value: '0-1',
          min: 0,
          max: 1


        },
        {
          name: '1 - 2 triệu',
          value: '1-2',
          min: 1,
          max: 2


        },
        {
          name: '2 - 4 triệu',
          value: '2-4',
          min: 2,
          max: 4


        },
        {
          name: '4 - 6 triệu',
          value: '4-6',
          min: 4,
          max: 6
        },
        {
          name: '6 - 8 triệu',
          value: '6-8',
          min: 6,
          max: 8
        },
        {
          name: '8 - 10 triệu',
          value: '8-10',
          min: 8,
          max: 10
        },
        {
          name: '10 - 15 triệu',
          value: '10-15',
          min: 10,
          max: 15
        },
        {
          name: '15 - 20 triệu',
          value: '15-20',
          min: 15,
          max: 20
        },
        {
          name: 'Trên 20 triệu',
          value: '20-20',
          min: 20,
          max: 20
        },
        {
          name: 'Thoả thuận',
          value: '0-0',
          min: 0,
          max: 0
        },
      ]
    },

    {
      name: 'Diện tích',
      id: 'dien-tich',
      min: 0,
      max: 100,
      options: [
        {
          name: 'Tất cả',
          value: '0-100',
          min: 0,
          max: 100,

        },
        {
          name: 'Dưới 20m²',
          value: '0-20',
          min: 0,
          max: 20,

        },
        {
          name: '20m² - 30m²',
          value: '20-30',
          min: 20,
          max: 30,

        },
        {
          name: '30m² - 40m²',
          value: '30-40',
          min: 30,
          max: 40,

        },
        {
          name: '40m² - 60m²',
          value: '40-60',
          min: 40,
          max: 60,

        },
        {
          name: '60m² - 80m²',
          value: '60-80',
          min: 60,
          max: 80,

        },
        {
          name: '80m² - 100m²',
          value: '80-100',
          min: 80,
          max: 100,

        },
        {
          name: 'Trên 100m²',
          value: '100-100',
          min: 100,
          max: 100,

        },
        {
          name: 'Không xác định',
          value: '0-0',
          min: 0,
          max: 0,

        },
      ]
    },
  ]
  return (
    <div className="header">
      <div
        className="section-1"
        class="flex justify-between py-2.5 px-8 border-b-[1px]"
      >
        <div class="flex">
          <div className="listItem">Cho thuê phòng trọ</div>
          <div className="listItem">Cho thuê nhà ở</div>
          <div className="listItem">Cho thuê căn hộ</div>
          <div className="listItem">Tìm người ở ghép</div>
        </div>
        <div class="flex">
          <div className="listItem">
            <i class="fa-regular fa-bell"></i>
          </div>
          <div className="listItem">
            <i class="fa-solid fa-user-plus"></i>
            <a href="" class="mx-1.5">
              Đăng kí
            </a>
          </div>
          <div className="listItem">
            <i class="fa-solid fa-right-to-bracket"></i>
            <a href="" class="mx-1.5">
              Đăng nhập
            </a>
          </div>
          <div
            className=""
            class="px-[10px] py-[5px] text-lg bg-[var(--red-color-)] text-white rounded-lg"
          >
            <i class="fa-regular fa-pen-to-square"></i>
            <a href="" class="mx-1.5">
              Đăng tin
            </a>
          </div>
        </div>
      </div>
      <div className="section-2" class="flex justify-center shadow">
        {filters.map(item => <div key={item.id} className="listSelect" onClick={() => handleOpenModalFilter(item)}>
          <span class="text-slate-500 text-sm font-medium" >{item.name}<i class="fa-solid fa-chevron-down"></i></span>
          <span>{result[item.id].name}</span>
        </div>)}

        <div onClick={handleReset} class="my-[10px] text-center flex items-center border-[1px] px-[16px] text-lg rounded-lg cursor-pointer"><i class="fa-solid fa-arrows-rotate mr-1"></i><a>Đặt lại</a></div>
      </div>
      <p>{isModalOpen}</p>

      <ModalFilter setResult={setResult} filterCurrent={filterCurrent} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Header;
