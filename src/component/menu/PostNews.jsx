import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Upload, Select, Row, Col, InputNumber, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ProvinceApi from '../../api/ProvinceApi';
import MotelApi from '../../api/MotelApi';
import { useForm } from 'antd/lib/form/Form';
import { useAuth } from '../../AuthContext';
import AuthApi from '../../api/AuthApi';

// Xử lý khi form submit thất bại
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const { TextArea } = Input;

// Các tùy chọn cho loại bài đăng
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

// Các tỉnh/thành phố mẫu
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

const PostNews = ({ id, setDataSource }) => {
  const [form] = useForm();
  const { auth } = useAuth()
  // Hàm để chuyển đổi ID tỉnh/thành phố sang mã số tỉnh/thành phố
  const configIDCity = (oldId) => {
    if (oldId === "01") {
      return 1
    } else if (oldId === "79") {
      return 2
    } else if (oldId === "48") {
      return 3
    } else if (oldId === 1) {
      return '01'
    } else if (oldId === 2) {
      return '79'
    } else if (oldId === 3) {
      return '48'
    } else {
      return 0
    }
  }

  // State để lưu trữ danh sách các quận/huyện và phường/xã
  const [districts, setDistricts] = useState([])
  const [ward, setWard] = useState([])

  // Hook để điều hướng đến các đường dẫn trong ứng dụng
  const navigate = useNavigate()

  // State để lưu trữ giá trị hiện tại của quận/huyện được chọn

  // State để quản lý trạng thái loading và hiển thị thông báo
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  // State để lưu trữ hình ảnh được chọn
  const [img, setImg] = useState()

  // State để lưu trữ địa chỉ
  const [address, setAddress] = useState({
    "province": '',
    "district": '',
    "ward": ''
  })
  const fetchDataMotel = async () => {
    try {
      setLoading(true)
      let data = await MotelApi.getMotelById(id)
      console.log(data)
      form.setFieldsValue(data)
      let addressArray = data.address.split(' - ')
      let idProvince = configIDCity(data.cityId)
      let districts = await ProvinceApi.getDistrictByProvince(idProvince)
      let district = districts.data.results.find(item => item.district_name === addressArray[1])
      setDistricts(districts.data.results)
      let wards = await ProvinceApi.getWardByDistrict(district.district_id)
      let ward = wards.data.results.find(item => item.ward_name === addressArray[2])
      setWard(wards.data.results)
      form.setFieldsValue({
        province: idProvince, district: district.district_id, ward: ward.ward_id, street: addressArray[3], typeMotelID: data.typeMotel, imgReturn: [
          {
            uid: '-1',
            name: 'defaultImage.png',
            status: 'done',
            url: data.motelImage,
          },
        ]
      });
      urlToBlob(data.motelImage)
        .then(blob => {
          // Tạo một đối tượng File từ Blob
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          setImg(file)
        })
        .catch(error => {
          console.error('Đã xảy ra lỗi khi tải và xử lý ảnh:', error);
        });
      setLoading(false)


    } catch (err) {
      setLoading(false)
      console.log({ err })
    }
  }
  async function urlToBlob(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.blob();
  }

  useEffect(() => {
    console.log({ id })
    if (id) {
      fetchDataMotel()
    }
  }, [id])

  // Hàm chuyển đổi file ảnh
  const normFile = (e) => {
    console.log(e)
    setImg(e.file)
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Hàm xử lý khi submit form
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
      formData.append("cityEntityID", configIDCity(province));
      formData.append('motelImage', img);
      if (id) {
        formData.append('id', id);
        let response = await MotelApi.updateMotel(formData)
        let data = await AuthApi.getListUserMotel({ pageIndex: 0, pageSize: 10 })
        setDataSource(data)
        messageApi.open({
          type: 'success',
          content: 'Sửa thành công',
        });
      } else {
        if (auth.money < 150000) {
          messageApi.open({
            type: 'warning',
            content: 'Số tiền bạn nạp không đủ, vui lòng nạp thêm tiền để đăng được tin',
          });
        } else {
          let response = await MotelApi.addMotel(formData)
          messageApi.open({
            type: 'success',
            content: 'Thêm thành công',
          });
          navigate('/user/quan-ly-tin')
        }
      }
      setLoading(false)


    } catch (err) {
      console.log(err)
      setLoading(false)
      messageApi.open({
        type: 'error',
        content: 'Thêm thất bại',
      });
    }
  };

  // Hàm xử lý thay đổi giá trị của select
  const handleChangeSelect = async (source, id) => {
    try {
      if (source == 'province') {
        // Cập nhật danh sách xã, phường theo id tỉnh
        let dataDistrict = await ProvinceApi.getDistrictByProvince(id)
        setDistricts(dataDistrict.data.results)
        let provinceOption = province.find(option => option.value === id);
        setAddress(prev => ({ ...prev, "province": provinceOption?.label }))
        //Khi tỉnh thay đổi thì reset giá trị của xã, phường và đường phố
        form.setFieldsValue({ ward: undefined, district: undefined });
      }
      if (source == 'district') {
        // Cập nhật danh đường phố theo id sách xã, phường 

        let dataWard = await ProvinceApi.getWardByDistrict(id)
        setWard(dataWard.data.results)
        let districtOption = districts.find(option => option.district_id === id);
        setAddress(prev => ({ ...prev, "district": districtOption?.district_name }))
        //Khi xã, phường thay đổi thì reset giá trị đường phố
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
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 32 }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Phần nhập thông tin khu vực */}
        <h1 className='text-[22px] font-[500] pt-[12px]'>Khu vực</h1>
        <Row gutter={32}>
          <Col span={12}>
            {/* Chọn tỉnh/thành phố */}
            <Form.Item
              label="Tỉnh/thành phố *"
              name="province"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <Select placeholder='chọn tỉnh/thành phố' style={{ width: '100%' }} options={province} onChange={(e) => handleChangeSelect('province', e)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Chọn quận/huyện */}
            <Form.Item
              label="Quận/huyện *"
              name="district"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
            >
              <Select placeholder='Chọn quận/huyện' style={{ width: '100%' }} options={districts.map(item => ({ value: item.district_id, label: item.district_name }))} onChange={(e) => handleChangeSelect('district', e)} />
            </Form.Item>
          </Col>
        </Row>
        {/* Chọn phường/xã và nhập đường/phố */}
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
        {/* Chọn loại bài đăng */}
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
        {/* Nhập giá và diện tích */}
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
        {/* Phần nhập thông tin mô tả */}
        <h1 className='text-[22px] font-[500] pt-[12px]'>Thông tin mô tả</h1>
        {/* Nhập tiêu đề */}
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
        {/* Nhập mô tả */}
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
        {/* Phần chọn hình ảnh */}
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
        {/* Nút submit */}
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
