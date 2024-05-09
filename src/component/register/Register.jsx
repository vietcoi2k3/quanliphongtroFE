import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import './register.css'
import AuthApi from '../../api/AuthApi';
import { useAuth } from '../../AuthContext';

// Xử lý khi việc hoàn thành form không thành công
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const { setAuth } = useAuth()

    // Xử lý khi form được hoàn thành và gửi đi
    const onFinish = async (values) => {
        try {
            // Gọi API đăng ký tài khoản
            const response = await AuthApi.register(values)
            // Hiển thị thông báo thành công
            messageApi.open({
                type: 'success',
                content: 'Đăng ký thành công',
            });
            // Cập nhật trạng thái đăng nhập
            setAuth(response)
            // Lưu access token vào local storage
            localStorage.setItem('access_token', response.jwttoken);
            // Chuyển hướng về trang chính
            navigate('/');
        } catch (error) {
            // Hiển thị thông báo lỗi
            messageApi.open({
                type: 'warning',
                content: 'Đăng ký không thành công',
            });
        }
    };

    return (
        <>
            <div className='w-[100%] login-container flex justify-center items-center py-8 flex-col'>
                {/* Component để hiển thị thông báo */}
                {contextHolder}
                <h1 className='text-[35px] font-[700]'>Đăng ký tài khoản</h1>
                {/* Form đăng ký */}
                <Form
                    name="basic"
                    style={{
                        width: 600,
                    }}
                    // Xử lý khi form được hoàn thành và gửi đi
                    onFinish={onFinish}
                    // Xử lý khi việc hoàn thành form không thành công
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên *"
                        name="accountName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ tên',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên đăng nhập *"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đăng nhập',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tạo mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item className="my-4">
                        <Button type="primary" htmlType="submit" className='btn-submit'>
                            Tạo tài khoản
                        </Button>
                    </Form.Item>
                </Form>
                {/* Link để chuyển hướng đến trang đăng nhập */}
                <p>Bạn đã có tài khoản? <Link onClick={() => navigate('/login')}>Đăng nhập</Link></p>
            </div>
        </>
    );
};

export default Register;
