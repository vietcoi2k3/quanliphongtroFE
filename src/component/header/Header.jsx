import React, { useEffect, useState } from "react";
import "./header.css";
import { AppstoreOutlined } from '@ant-design/icons';
import ModalFilter from "./ModalFilter";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../AuthContext'
import Logo from '../../assets/logo.jpg'
import { Space } from "antd";
// Danh sách các bộ lọc
const filters = [
  {
    name: 'Loại nhà đất', // Các lựa chọn cho loại nhà đất
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
    name: 'Khu vực',// Các lựa chọn cho khu vực
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
    name: 'Khoảng giá',// Các lựa chọn cho khoảng giá
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
    name: 'Diện tích', // Các lựa chọn cho diện tích
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

  //Lấy thông tin loai nha dat, khu vuc, khoang gia, dien tich thông qua url 
  const queryParams = new URLSearchParams(location.search);
  const lnd = queryParams.get('lnd');
  const kv = queryParams.get('kv');
  const kg = queryParams.get('kg');
  const dt = queryParams.get('dt');

  //Định nghĩa state để cập nhật kết quả bộ lọc
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
      value: '0-0'
    },
    'dien-tich': {
      name: 'Tất cả',
      value: '0-0'
    },
  })

  useEffect(() => {
    const selectedFilters = {};
    if (lnd && kv && kg && dt) {
      // Xác định bộ lọc nào đang được chọn từ url
      // và cập nhật giá trị tương ứng
      filters.forEach(filter => {
        switch (filter.id) {
          case 'loai-nha-dat':
            selectedFilters['loai-nha-dat'] = filter.options.find(option => option.value === parseInt(lnd));
            break;
          case 'khu-vuc':
            selectedFilters['khu-vuc'] = filter.options.find(option => option.value === parseInt(kv));
            break;
          case 'khoang-gia':
            selectedFilters['khoang-gia'] = filter.options.find(option => option.value === kg);
            break;
          case 'dien-tich':
            selectedFilters['dien-tich'] = filter.options.find(option => option.value === dt);
            break;
          default:
            break;
        }
      });
      setResult(selectedFilters)
    }
    // Khi ở trnag quản lý người dùng thì ẩn bộ lọc, ngược lại ở trang home thì hiển thị bộ lọc
    if (location.pathname.includes('/user/')) {
      setDisplayModalFilter(false)
    } else {
      setDisplayModalFilter(true)
    }
  }, [location]);

  // Đặt lại giá trị của các bộ lọc và đường dẫn URL
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
        value: '0-0'
      },
      'dien-tich': {
        name: 'Tất cả',
        value: '0-0'
      },
    })
  }

  const handleOpenModalFilter = (item) => {
    //Lưu thông tin bộ lọc hiện tại được chọn để render ra modal
    setFilterCurrent(item)
    // Mở modal để chọn bộ lọc
    setIsModalOpen(true);
  }

  return (
    <div className="header">
      {/* Phần đầu trang */}
      <div
        className="section-1 flex justify-between py-2.5 px-8 border-b-[1px]"
      >
        <div className="flex">
          <div onClick={() => navigate('/')}><img className="w-[auto] h-[50px] cursor-pointer" src={Logo} /></div>
          <Space>
            <div className="listItem" onClick={() => navigate(`/listMotel?lnd=1&kv=0&kg=0-0&dt=0-0`)}>Cho thuê phòng trọ</div>
            <div className="listItem" onClick={() => navigate(`/listMotel?lnd=2&kv=0&kg=0-0&dt=0-0`)}>Cho thuê căn hộ</div>
            <div className="listItem" onClick={() => navigate(`/listMotel?lnd=3&kv=0&kg=0-0&dt=0-0`)}>Cho thuê nhà ở</div>
            <div className="listItem" onClick={() => navigate(`/listMotel?lnd=4&kv=0&kg=0-0&dt=0-0`)}>Tìm người ở ghép</div>
          </Space>
        </div>
        <Space>
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
            className="px-[10px] py-[5px] bg-[var(--red-color-)] text-white rounded-lg"
          >
            <i className="fa-regular fa-pen-to-square"></i>
            <a href="" className="mx-1.5 text-[14px]" onClick={() => navigate('/user/quan-ly-tin')}>
              Đăng tin
            </a>
          </div>
        </Space>
      </div>
      {/* Modal chọn bộ lọc */}
      {displayModalFilter && <><div className="section-2 flex justify-center shadow">
        {/* Danh sách các bộ lọc */}
        {filters.map(item => <div key={item.id} className="listSelect" onClick={() => handleOpenModalFilter(item)}>
          <span className="text-slate-500 text-sm font-medium" >{item.name}<i className="fa-solid fa-chevron-down"></i></span>
          <span>{result[item.id].name}</span>
        </div>)}
        {/* Nút đặt lại bộ lọc */}
        <div onClick={handleReset} className="my-[10px] text-center flex items-center border-[1px] px-[16px] rounded-lg cursor-pointer"><i className="fa-solid fa-arrows-rotate mr-1"></i><a>Đặt lại</a></div>
      </div>
        <ModalFilter result={result} setResult={setResult} filterCurrent={filterCurrent} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /></>}

    </div>
  );
};

export default Header;
