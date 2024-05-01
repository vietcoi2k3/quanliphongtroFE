import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import './register.css'
// import { useAuth } from '../../AuthContext';
import AuthApi from '../../api/AuthApi';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Register = () => {
    const navigate = useNavigate()

    // const { setAuth } = useAuth();

    const onFinish = async(values) => {
        try {
            const response = await AuthApi.register(values)
            console.log({ response })
            localStorage.setItem('access_token', response.jwttoken);
            // setAuth(true);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid credentials. Please try again.');
        }
    };
    return (<div className='w-[100%] login-container flex justify-center items-center py-8 flex-col'>
        <h1 className='text-[35px] font-[700]'>Đăng ký tài khoản</h1>
        <Form
            name="basic"

            style={{
                width: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
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
        <p>Bạn đã có tài khoản? <Link onClick={() => navigate('/login')}>Đăng nhập</Link></p>
    </div>

    )
};
export default Register;