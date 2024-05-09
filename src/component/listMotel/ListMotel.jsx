import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import MotelApi from '../../api/MotelApi';
import MotelArray from '../../commons/motelArray/MotelArray';
import { Pagination, Spin } from 'antd';
const ListMotel = () => {
  // Lấy thông tin bộ lọc thông qua link url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lnd = queryParams.get('lnd');
  const kv = queryParams.get('kv');
  const kg = queryParams.get('kg');
  const dt = queryParams.get('dt');

  // State để lưu trữ dữ liệu danh sách phòng trọ, tổng số lượng phòng trọ và số trang hiện tại
  const [motelData, setMoelData] = useState([])
  const [total, setTotal] = useState([])
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchApi = async () => {
    try {
      setLoading(true)
      let query = {
        "typeMotelId": +lnd,
        "cityEntityId": +kv,
        "priceCeil": +kg.split("-")[1],
        "priceFloor": +kg.split("-")[0],
        "acreageCeil": +dt.split("-")[1],
        "acreageFloor": +dt.split("-")[0],
        "pageSize": 10,
        "pageIndex": current - 1
      }
      // Trả về danh sách của nhà trọ theo bộ lọc và phân trang
      const data = await MotelApi.paingMotel(query)
      if (data.motelDTOList) {
        setTotal(data.totalMotel)
        setMoelData(data.motelDTOList)
      }
      setLoading(false)

    } catch (err) {
      setLoading(false)

      console.log(err.message)
    }
  }
  // Gọi là hàm fetchApi() mỗi khi lọc và phân trang
  useEffect(() => {
    fetchApi()
  }, [lnd, kv, kg, dt, current])
  // Effect hook để thiết lập trang hiện tại về 1 khi tổng số lượng nhà trọ thay đổi
  useEffect(() => {
    setCurrent(1)
  }, [total])
  // Hàm xử lý khi chuyển trang
  const onChangePage = (page) => {
    setCurrent(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <div className='flex justify-center'>
      <Spin spinning={loading}>
          {/* Hiển thị dữ liệu danh sách nhà trọ nếu có */}
        {motelData.length > 0 ? <div className=" grid gap-4 mt-4 w-[800px]">
          {motelData?.map((motel, index) => (
            <MotelArray
              key={index}
              id={motel.id}
              img={motel.imageReturn || 'https://img.thuephongtro.com/images/thumb/2023/11/09/20231109190052-p1fkz.jpg'}
              des={motel.description}
              title={motel.title}
              price={motel.price}
              area={motel.acreage}
              address={motel.address}
              pagination={true}
            />
          ))}
          {!loading && <Pagination current={current} onChange={onChangePage} total={total} showSizeChanger={false} />}
        </div> 
        : <img src='https://okinaga.com.vn/images/not-found.png' />}{/* Hiển thị ảnh "not found" nếu không có dữ liệu danh sách nhà trọ */}

      </Spin>
    </div>
  )
}

export default ListMotel