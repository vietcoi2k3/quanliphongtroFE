import React, {useState} from 'react';
import { Button, Form, Input, Upload, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ProvinceApi from '../../api/ProvinceApi';
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const { TextArea } = Input;
const options = [
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'Yiminghe',
    label: 'yiminghe',
  },
]
const province = [
  {
    value: "01",
    label: "Thành phố Hà Nội",
  },
  {
    value: "79",
    label: "Thành phố Hồ Chí Minh",
  },
  {
    value: "48",
    label: "Thành phố Đà Nẵng",
  },
]
const PostNews = () => {
  const [districts, setDistricts] = useState([])
  const [ward, setWard] = useState([])
  const navigate = useNavigate()
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const handleChangeSelect = async(source, id) => {
    try{
      if(source == 'province'){
        let dataDistrict = await ProvinceApi.getDistrictByProvince(id)
        setDistricts(dataDistrict.data.results)
        console.log(dataDistrict.data.results)
      }
      if(source == 'district'){
        let dataWard = await ProvinceApi.getWardByDistrict(id)
        setWard(dataWard.data.results)
      }
    }catch(err){
      console.log(err)
    }
  }
  return (<>
    <div className='post-news-container px-6 pb-6'>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 32 }}
        layout="vertical" 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className='text-[22px] font-[500] pt-[12px]'>Khu vực</h1>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Tỉnh/thành phố *"
              name="province"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <Select placeholder='chọn tỉnh/thành phố' style={{ width: '100%' }} options={province} onChange={(e) => handleChangeSelect('province', e)}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Quận/huyện *"
              name="district"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
            >
              <Select placeholder='Chọn quận/huyện' style={{ width: '100%' }} options={districts.map(item => ({value:item.district_id, label:item.district_name}))} onChange={(e) => handleChangeSelect('district', e)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Phường/xã *"
              name="ward"
              rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
            >
              <Select placeholder='Chọn phường/xã' style={{ width: '100%' }} options={ward.map(item => ({value:item.ward_id, label:item.ward_name}))} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Đường/phố *"
              name="street"
              rules={[{ required: true, message: 'Vui lòng chọn đường/phố' }]}
            >
              <Select placeholder='Chọn đường/phố' style={{ width: '100%' }} options={options} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Chuyên mục cho thuê *"
              name="rentalSection"
              rules={[{ required: true, message: 'Vui lòng chọn Chuyên mục cho thuê' }]}
            >
              <Select placeholder='Chọn chuyên mục' style={{ width: '100%' }} options={options} />
            </Form.Item>

          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Giá*"
              name="price"
              rules={[{ required: true, message: 'Vui lòng chọn Giá' }]}
            >
              <Input placeholder='VD: 2 triệu 500 nghìn (nhập 2.5)' addonAfter="Triệu/tháng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Diện tích*"
              name="Acreage"
              rules={[{ required: true, message: 'Vui lòng chọn Diện tích' }]}
            >
              <Input placeholder='Chọn diện tích' addonAfter="m²" />
            </Form.Item>
          </Col>
        </Row>
        <h1 className='text-[22px] font-[500] pt-[12px]'>Thông tin mô tả</h1>
        <Form.Item
          label="Tiêu đề"
          name="tilte"
        >
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
        >
          <TextArea
            autoSize={{ minRows: 6, maxRows: 6 }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <h1 className='text-[22px] font-[500] pt-[12px]'>Hình ảnh/video</h1>

        <Form.Item label="Ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card" maxCount={6}>
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
               <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload ảnh
              </div>

            </button>
          </Upload>
          <span className='py-3'>Tối đa 6 ảnh với tin thường và 16 ảnh với tin Vip</span>
        </Form.Item>
        <Form.Item className="my-4">
          <Button type="primary" style={{ width: '100%' }} htmlType="submit" className='btn-submit'>
            Đăng tin và thanh toán
          </Button>
        </Form.Item>
      </Form>

    </div>

  </>

  )
};
export default PostNews;
