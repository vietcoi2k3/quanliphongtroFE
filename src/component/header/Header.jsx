import React, { useEffect, useState } from "react";
import "./header.css";
import { AppstoreOutlined } from '@ant-design/icons';
import ModalFilter from "./ModalFilter";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../AuthContext'

const filters = [
  {
    name: 'Loại nhà đất',
    id: 'loai-nha-dat',
    options: [
      {
        name: 'Tất cả',
        value: 0
      },
      {
        name: 'Cho thuê phòng trọ',
        value: 1
      },
      {
        name: 'Căn hộ cho thuê',
        value: 2
      },
      {
        name: 'Ở nguyên căn',
        value: 3
      },
      {
        name: 'Ở ghép',
        value: 4
      },
    ]
  },
  {
    name: 'Khu vực',
    id: 'khu-vuc',
    options: [
      {
        name: 'Toàn quốc',
        value: 0
      },
      {
        name: 'Hà Nội',
        value: 1
      },
      {
        name: 'Đà Nẵng',
        value: 3
      },
      {
        name: 'Thành phố Hồ Chí Minh',
        value: 2
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
        value: '0-0',
        min: 0,
        max: 0


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
        value: '20-100',
        min: 20,
        max: 100
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
        value: '0-0',
        min: 0,
        max: 0,

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
        max: 1000,

      }
    ]
  },
]

const Header = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  let location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCurrent, setFilterCurrent] = useState('')
  const [displayModalFilter, setDisplayModalFilter] = useState('')


  const queryParams = new URLSearchParams(location.search);
  const lnd = queryParams.get('lnd');
  const kv = queryParams.get('kv');
  const kg = queryParams.get('kg');
  const dt = queryParams.get('dt');

  const [result, setResult] = useState({
    'loai-nha-dat': {
      name: 'Tất cả',
      value: 0
    },
    'khu-vuc': {
      name: 'Toàn quốc',
      value: 0
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

  useEffect(() => {
    // if(lnd || kv || kg || dt){
    //   let resultDefault = result
    //   filters.find(filter => filter.id == "khu-vuc")
    //   let 
    //   result["khu-vuc"] = .options
    //   let optionFind = filters.find(filter => filter.id == item.)
    // }
    if (location.pathname.includes('/user/')) {
      setDisplayModalFilter(false)
    } else {
      setDisplayModalFilter(true)
    }
  }, [location]);


  const handleReset = () => {
    navigate(`listMotel?lnd=0&kv=0&kg=0-0&dt=0-0`);
    setResult({
      'loai-nha-dat': {
        name: 'Tất cả',
        value: 0
      },
      'khu-vuc': {
        name: 'Toàn quốc',
        value: 0
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

  return (
    <div className="header">
      <div
        className="section-1 flex justify-between py-2.5 px-8 border-b-[1px]"
      >
        <div className="flex">
          <div className="listItem">Cho thuê phòng trọ</div>
          <div className="listItem">Cho thuê nhà ở</div>
          <div className="listItem">Cho thuê căn hộ</div>
          <div className="listItem">Tìm người ở ghép</div>
        </div>
        <div className="flex">
          <div className="listItem">
            <i className="fa-regular fa-bell"></i>
          </div>
          {auth ? <div className="listItem flex">
          <AppstoreOutlined className="text-[25px]" />
            <a href="" className="mx-1.5" onClick={() => navigate('/user/quan-ly-tin')}>
              Trang quản lý
            </a>
          </div> : <><div className="listItem">
            <i className="fa-solid fa-user-plus"></i>
            <a href="" className="mx-1.5" onClick={() => navigate('/register')}>
              Đăng kí
            </a>
          </div>
              <div className="listItem">
                <i className="fa-solid fa-right-to-bracket"></i>
                <a href="#" className="mx-1.5" onClick={() => navigate('/login')}>
                  Đăng nhập
                </a>
              </div></>}

            <div
              className="px-[10px] py-[5px] text-lg bg-[var(--red-color-)] text-white rounded-lg"
            >
              <i className="fa-regular fa-pen-to-square"></i>
              <a href="" className="mx-1.5" onClick={() => navigate('/user/quan-ly-tin')}>
                Đăng tin
              </a>
            </div>
          </div>
        </div>
        {displayModalFilter && <><div className="section-2 flex justify-center shadow">
          {filters.map(item => <div key={item.id} className="listSelect" onClick={() => handleOpenModalFilter(item)}>
            <span className="text-slate-500 text-sm font-medium" >{item.name}<i className="fa-solid fa-chevron-down"></i></span>
            <span>{result[item.id].name}</span>
          </div>)}

          <div onClick={handleReset} className="my-[10px] text-center flex items-center border-[1px] px-[16px] text-lg rounded-lg cursor-pointer"><i className="fa-solid fa-arrows-rotate mr-1"></i><a>Đặt lại</a></div>
        </div>
          <ModalFilter result={result} setResult={setResult} filterCurrent={filterCurrent} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /></>}

      </div>
      );
};

      export default Header;
