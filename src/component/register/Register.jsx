import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import './register.css'
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Register = () => {
    const navigate = useNavigate()
    
    const onFinish = (values) => {
        console.log('Success:', values);
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
                name="username"
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
            <p>Bạn đã có tài khoản? <Link onClick={()=>navigate('/login')}>Đăng nhập</Link></p>
    </div>

    )
};
export default Register;