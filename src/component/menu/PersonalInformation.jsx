import React, { useState } from 'react';
import { Button, Form, Input, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  SearchOutlined, UserOutlined, PhoneOutlined, NumberOutlined
} from '@ant-design/icons';
import { useAuth } from '../../AuthContext';
import AuthApi from '../../api/AuthApi';

// Xử lý khi form submit thất bại
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// Component Thông tin cá nhân
const PersonalInformation = () => {

  const [loading, setLoading] = useState(false) 
  const [messageApi, contextHolder] = message.useMessage(); // Hook message để hiển thị thông báo

  const { auth, setAuth } = useAuth() // Hook useAuth để lấy thông tin người dùng và cập nhật thông tin người dùng
  const [img, setImg] = useState() // Trạng thái lưu trữ file ảnh người dùng
  const navigate = useNavigate() // Hook navigate để chuyển hướng trang

  // Hàm xử lý khi người dùng chọn file ảnh
  const normFile = (e) => {
    setImg(e.file)
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Hàm xử lý khi submit form
  const onFinish = async (values) => {
    setLoading(true) 
    const formData = new FormData();
    formData.append("accountName", values.accountName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append('img', img);
    try {
      let response = await AuthApi.updateUser(formData) // Gửi request API để cập nhật thông tin người dùng
      if (response) {
        setAuth({ ...auth, ...response }) // Cập nhật thông tin người dùng trong trạng thái local
        localStorage.setItem('user', JSON.stringify({ ...auth, ...response })); // Lưu thông tin người dùng vào local storage
      }
      setLoading(false) 
      messageApi.open({
        type: 'success',
        content: 'Cập nhật thành công',
      }); // Hiển thị thông báo thành công

    } catch (err) {
      setLoading(false) 
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại',
      }); // Hiển thị thông báo thất bại

      console.log({ err }) // Log lỗi ra console
    }
  };

  return (<>
    {contextHolder} {/* Hook contextHolder để hiển thị thông báo */}
    {/* Form thông tin cá nhân */}
    <h1 className='text-[25px] font-[500] px-[100px] pt-[12px]'>Thông tin cá nhân</h1>
    <div className='changepassword-form__fields'>
      <Form
        name="basic"
        disabled={loading} // Disable form khi đang loading
        initialValues={{
          ...auth, imgReturn: [
            {
              uid: '-1',
              name: 'defaultImage.png',
              status: 'done',
              url: auth.imgReturn,
            },
          ]
        }}
        onFinish={onFinish} // Xử lý khi submit form
        onFinishFailed={onFinishFailed} // Xử lý khi submit form thất bại
        autoComplete="off"

      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên tài khoản',
            },
          ]}
        >
          <Input addonBefore={<NumberOutlined />} />
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="accountName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ và tên',
            },
          ]}
        >
          <Input addonBefore={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng email',
            },
          ]}
        >
          <Input addonBefore={<SearchOutlined />} />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng số điện thoại',
            },
          ]}
        >
          <Input addonBefore={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
        >
          <p onClick={() => navigate('/user/doi-mat-khau')}>Bấm vào đây để thay đổi mật khẩu</p> {/* Link để chuyển đến trang đổi mật khẩu */}
        </Form.Item>
        {/* Upload ảnh đại diện */}
        <Form.Item label="Ảnh đại diện" valuePropName="fileList" name='imgReturn' getValueFromEvent={normFile} rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}>
          <Upload beforeUpload={() => false} listType="picture-card" maxCount={1} >
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <div
                style={{
                }}
              >
                Chọn ảnh khác
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item className="my-4">
          <Button loading={loading} type="primary" style={{ width: '100%' }} htmlType="submit" className='btn-submit'>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>

    </div>

  </>

  )
};
export default PersonalInformation;

