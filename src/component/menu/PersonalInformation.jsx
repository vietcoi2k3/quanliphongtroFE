import React from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined, PlusOutlined, UserOutlined, PhoneOutlined, NumberOutlined, EnvironmentOutlined } from '@ant-design/icons';
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const PersonalInformation = () => {
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
  return (<>
    <h1 className='text-[25px] font-[500] px-[100px] pt-[12px]'>Thông tin cá nhân</h1>
    <div className='changepassword-form__fields'>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"

      >
        <Form.Item
          label="Mã tài khoản"
          name="code"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mã tài khoản',
            },
          ]}
        >
          <Input addonBefore={<NumberOutlined />} />
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="name"
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
          label="Địa chỉ liên hệ"
          name="address"
        >
          <Input addonBefore={<EnvironmentOutlined />} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
        >
          <p onClick={() => navigate('/user/doi-mat-khau')}>Bấm vào đây để thay đổi mật khẩu</p>
        </Form.Item>
        <Form.Item label="Ảnh đại diện" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card" maxCount={1}>
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
          <Button type="primary" style={{ width: '100%' }} htmlType="submit" className='btn-submit'>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>

    </div>

  </>

  )
};
export default PersonalInformation;
