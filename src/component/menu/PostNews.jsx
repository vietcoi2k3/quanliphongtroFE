import React, { useState } from 'react';
import { Button, Form, Input, Upload, Select, Row, Col, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ProvinceApi from '../../api/ProvinceApi';
import MotelApi from '../../api/MotelApi';
import { useForm } from 'antd/lib/form/Form';
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const { TextArea } = Input;
const options = [
  {
    label: 'Tất cả',
    value: 0
  },
  {
    label: 'Cho thuê phòng trọ',
    value: 1
  },
  {
    label: 'Căn hộ cho thuê',
    value: 2
  },
  {
    label: 'Ở nguyên căn',
    value: 3
  },
  {
    label: 'Ở ghép',
    value: 4
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
  const [form] = useForm();

  const [districts, setDistricts] = useState([])
  const [ward, setWard] = useState([])
  const navigate = useNavigate()
  const [districtValue, setDistrictValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [img, setImg] = useState()
  const [address, setAddress] = useState({
    "province": '',
    "district": '',
    "ward": ''
  })
  const normFile = (e) => {
    console.log(e)
    setImg(e.file)
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (values) => {
    try {
      setLoading(true)
      const { title, description, price, typeMotelID, acreage, street, province } = values
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("acreage", acreage);
      formData.append("address", `${address.province} - ${address.district} - ${address.ward} - ${street}`);
      formData.append("typeMotelID", typeMotelID);
      formData.append("cityEntityID", province);
      formData.append('motelImage', img);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      let response = await MotelApi.addMotel(formData)
      setLoading(false)

      messageApi.open({
        type: 'success',
        content: 'Thêm thành công',
      });

    } catch (err) {
      console.log(err)
      setLoading(false)
      messageApi.open({
        type: 'error',
        content: 'Thêm thất bại',
      });
    }
  };
  const handleChangeSelect = async (source, id) => {
    try {
      if (source == 'province') {
        let dataDistrict = await ProvinceApi.getDistrictByProvince(id)
        setDistricts(dataDistrict.data.results)
        let provinceOption = province.find(option => option.value === id);
        setAddress(prev => ({ ...prev, "province": provinceOption?.label }))
        form.setFieldsValue({ ward: undefined, district:undefined });
      }
      if (source == 'district') {
        let dataWard = await ProvinceApi.getWardByDistrict(id)
        setWard(dataWard.data.results)
        let districtOption = districts.find(option => option.district_id === id);
        console.log({ districts })
        setAddress(prev => ({ ...prev, "district": districtOption?.district_name }))
        form.setFieldsValue({ ward: undefined });
      }
      if (source == 'ward') {
        let wardOption = ward.find(option => option.ward_id === id);
        setAddress(prev => ({ ...prev, "ward": wardOption?.ward_name }))
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (<>
    <div className='post-news-container px-6 pb-6'>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        disabled={loading}
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
              <Select placeholder='chọn tỉnh/thành phố' style={{ width: '100%' }} options={province} onChange={(e) => handleChangeSelect('province', e)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Quận/huyện *"
              name="district"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
            >
              <Select value={districtValue} placeholder='Chọn quận/huyện' style={{ width: '100%' }} options={districts.map(item => ({ value: item.district_id, label: item.district_name }))} onChange={(e) => handleChangeSelect('district', e)} />
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
              <Select placeholder='Chọn phường/xã' style={{ width: '100%' }} options={ward.map(item => ({ value: item.ward_id, label: item.ward_name }))} onChange={(e) => handleChangeSelect('ward', e)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Đường/phố *"
              name="street"
              rules={[{ required: true, message: 'Vui lòng chọn đường/phố' }]}
            >
              <Input placeholder='Nhập đường/phố' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Chuyên mục cho thuê *"
              name="typeMotelID"
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
              <InputNumber className='w-[100%]' placeholder='VD: 2 triệu 500 nghìn (nhập 2.5)' addonAfter="Triệu/tháng" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Diện tích*"
              name="acreage"
              rules={[{ required: true, message: 'Vui lòng chọn Diện tích' }]}
            >
              <InputNumber className='w-[100%]' placeholder='Chọn diện tích' addonAfter="m²" min={0} />
            </Form.Item>
          </Col>
        </Row>
        <h1 className='text-[22px] font-[500] pt-[12px]'>Thông tin mô tả</h1>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng thêm tiêu đề' }]}
        >
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng thêm mô tả' }]}
        >
          <TextArea
            autoSize={{ minRows: 6, maxRows: 6 }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <h1 className='text-[22px] font-[500] pt-[12px]'>Hình ảnh/video</h1>

        <Form.Item label="Ảnh" valuePropName="fileList" name='imgReturn' getValueFromEvent={normFile} rules={[{ required: true, message: 'Vui lòng thêm ảnh !' }]}>
          <Upload beforeUpload={() => false} listType="picture-card" maxCount={1}>
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
        </Form.Item>
        <Form.Item className="my-4">
          <Button type="primary" loading={loading} style={{ width: '100%' }} htmlType="submit" className='btn-submit'>
            Đăng tin và thanh toán
          </Button>
        </Form.Item>
      </Form>

    </div>

  </>

  )
};
export default PostNews;
