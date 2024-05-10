import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MessageOutlined, UserOutlined, TagOutlined, EnvironmentOutlined, CompressOutlined, BorderlessTableOutlined, PhoneOutlined } from '@ant-design/icons';
import './detailMotel.css'
import MotelApi from '../../api/MotelApi';
import { Divider, Spin, Col, Row, Statistic, Card, Space, Avatar, Button } from 'antd';
import MotelArray from '../../commons/motelArray/MotelArray';
const DetailMotel = () => {
  const { idMotel } = useParams();
  const [dataMotel, setDataMotel] = useState()
  const [loading, setLoading] = React.useState(false);
  const [dataMotelSameArea, setDataMotelSameArea] = useState([])
  // Hàm fetchData để lấy dữ liệu danh sách trọ từ API
  const fetchData = async () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });
      setLoading(true)
      if (idMotel) {
        // Lấy thông tin chi tiết của nhà trọ dựa trên id
        let data = await MotelApi.getMotelById(idMotel)
        // Tạo query để lấy danh sách nhà trọ theo khu vực
        let query = {
          "typeMotelId": 0,
          "cityEntityId": data.cityEntityID,
          "priceCeil": 0,
          "priceFloor": 0,
          "acreageCeil": 0,
          "acreageFloor": 0,
          "pageSize": 8,
          "pageIndex": 1
        }
        console.log({data})
        // Lấy danh sách nhà trọ cùng khu vực
        const dataSameArea = await MotelApi.paingMotel(query)
        // Lưu danh sách nhà trọ cùng khu vực vào state
        setDataMotelSameArea(dataSameArea.motelDTOList)
         // Lưu thông tin chi tiết của nhà trọ vào state
        setDataMotel(data)
      }
      setLoading(false)
      
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  // Gọi hàm fetchData khi idMotel thay đổi
  useEffect(() => {
    fetchData()
  }, [idMotel])
  return (
    <div className='detail-motel-container'>
      <Spin spinning={loading}> {/* Hiển thị spin khi đang loading */}
       {/* Phần chi tiết của Motel */}
        <Row gutter={16}>
          <Col span={16}>
            <Card bordered={false}>
              <content>
                <h1 className='title'>{dataMotel?.title}</h1>
                <p className='mb-2'><EnvironmentOutlined /> Địa chỉ:{dataMotel?.address}</p>
                <Space className='w-[100%] gap-4'>
                  <p className='text-[18px] font-[700] text-[#38a343]'><TagOutlined /> {dataMotel?.price} Triệu/tháng</p>
                  <p className='text-[#f1a428] font-[700]'><CompressOutlined /> {dataMotel?.acreage}m²</p>
                  <p><BorderlessTableOutlined />{dataMotel?.id}</p>
                </Space>
                <Divider />
                <div className='w-[100%] text-center mb-3'>
                  <img width={500}
                    src={dataMotel?.motelImage} />
                </div>
                <h2 className='title-section'>Thông tin mô tả</h2>
                <p>{dataMotel?.description}</p>
                <Divider />
                <h2 className='title-section'>Đặc điểm tin đăng</h2>
                <Row gutter={16}>
                  <Col span={6} className='flex justify-between'>
                    <Statistic title="Ngày cập nhật" value={dataMotel?.dateRelease || '01/05/2024'} />
                    <Divider type='vertical' className='h-[100%]' />
                  </Col>
                  <Col span={6} className='flex justify-between'>
                    <Statistic title="Ngày hết hạn" value={dataMotel?.dateExpried ||'08/05/2024'} />
                    <Divider type='vertical' className='h-[100%]' />
                  </Col>
                  <Col span={6} className='flex justify-between'>
                    <Statistic title="Loại tin" value={'Tin thường'} />
                    <Divider type='vertical' className='h-[100%]' />
                  </Col>
                  <Col span={6} className='flex justify-between'>
                    <Statistic title="Mã tin" value={dataMotel?.id} />
                  </Col>
                </Row>
                <Divider />
                <p>Bạn đang xem nội dung tin đăng "<i>{dataMotel?.title}</i>". Mọi thông tin liên quan đến tin đăng này chỉ mang tín chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để chúng tôi xử lý.</p>
              </content>
            </Card>
          </Col>
          {/* Thông tin người đăng và liên hệ */}
          <Col span={8}>
            <Card>
              <div className='flex flex-row items-center'>
                <Avatar size={60} className='mr-3' icon={<UserOutlined />} />
                <div>
                  <h1 className='text-[26px] font-[600] mb-1'>{dataMotel?.accountName || ' Nguyễn Văn A'}</h1>
                  <p className='text-[#919191]'>Ngày tham gia: 04/01/2014</p>
                </div>
              </div>
              <Divider className='my-3' />
              <Button className='w-[100%] mb-1 bg-[#F2F8FE] text-[#0d6efd]' icon={<MessageOutlined />}>
                Nhắn zalo
              </Button>
              <Button className='w-[100%] ' type="primary" icon={<PhoneOutlined />}>
              {dataMotel?.phoneNumber || ' 0562314568'}
               
              </Button>
            </Card>
          </Col>

        </Row>
        {/* Danh sách một vài nhà trọ cùng khu vực */}
        <h2 className='title-section mt-10 mb-3'>Tin đăng cùng khu vực</h2>
        <div className=" grid grid-cols-4 gap-4 mt-4">
          {dataMotelSameArea?.map((motel, index) => (
            <MotelArray
              id={motel.id}
              key={index}
              img={motel.imageReturn}
              des={motel.title}
              price={motel.price}
              area={motel.acreage}
              address={motel.address}
              pagination={false}
            />
          ))}
        </div>
      </Spin>

    </div>

  )
}

export default DetailMotel