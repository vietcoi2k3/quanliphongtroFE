import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MessageOutlined,UserOutlined, TagOutlined, EnvironmentOutlined, CompressOutlined, BorderlessTableOutlined, PhoneOutlined } from '@ant-design/icons';
import './detailMotel.css'
import MotelApi from '../../api/MotelApi';
import { Divider, Image, Col, Row, Statistic, Card, Space, Avatar , Button} from 'antd';
import MotelArray from '../../commons/motelArray/MotelArray';
const DetailMotel = () => {
  const { idMotel } = useParams();
  const [dataMotel, setDataMotel] = useState()
  const [dataMotelSameArea, setDataMotelSameArea] = useState([])
  const fetchData = async () => {
    try {
      if (idMotel) {
        let data = await MotelApi.getMotelById(idMotel)
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
        const dataSameArea= await MotelApi.paingMotel(query)
        setDataMotelSameArea(dataSameArea.motelDTOList)
        console.log(data)
        setDataMotel(data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>

    <Row gutter={16} className='detail-motel-container'>
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
                src={dataMotel?.imageReturn} />
            </div>
            <h2 className='title-section'>Thông tin mô tả</h2>
            <p>{dataMotel?.description}</p>
            <Divider />
            <h2 className='title-section'>Đặc điểm tin đăng</h2>
            <Row gutter={16}>
              <Col span={6} className='flex justify-between'>
                <Statistic title="Ngày cập nhật" value={'01/05/2024'} />
                <Divider type='vertical' className='h-[100%]' />
              </Col>
              <Col span={6} className='flex justify-between'>
                <Statistic title="Ngày hết hạn" value={'08/05/2024'} />
                <Divider type='vertical' className='h-[100%]' />
              </Col>
              <Col span={6} className='flex justify-between'>
                <Statistic title="08/05/2024" value={'VIP 3'} />
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
      <Col span={8}>
        <Card>
          <div className='flex flex-row items-center'>
            <Avatar size={60} className='mr-3' icon={<UserOutlined />} />
            <div>
            <h1 className='text-[26px] font-[600] mb-1'>Ngọc Huyền</h1>
            <p className='text-[#919191]'>Ngày tham gia: 04/01/2014</p>
            </div>
          </div>
          <Divider className='my-3'/>
          <Button  className='w-[100%] mb-1 bg-[#F2F8FE] text-[#0d6efd]' icon={<MessageOutlined />}>
          Nhắn zalo
      </Button>
          <Button className='w-[100%] ' type="primary" icon={<PhoneOutlined />}>
          0562314568
      </Button>
        </Card>
      </Col>

    </Row>
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
    </div>

  )
}

export default DetailMotel