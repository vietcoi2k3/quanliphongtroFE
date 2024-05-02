import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import './login.css'
import { useAuth } from '../../AuthContext';
import AuthApi from '../../api/AuthApi';
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const { setAuth } = useAuth()
    const onFinish = async (values) => {
        try {
            const response = await AuthApi.login({ username: values.username, password: values.password });
            localStorage.setItem('access_token', response.jwttoken);
            localStorage.setItem('user', JSON.stringify(response));
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
            navigate('/')
        } catch (error) {
            messageApi.open({
                type: 'warning',
                content:'Đăng nhập không thành công',
            });
        }
    };
    return (<div className='w-[100%] login-container flex justify-center items-center py-8 flex-col'>
        {contextHolder}
        <h1 className='text-[35px] font-[700]'>Đăng nhập</h1>
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
                label="Tên đăng nhập/ Email *"
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
                label="Mật khẩu *"
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

            <Form.Item
                name="remember"
                valuePropName="checked"
                style={{ marginBottom: '0px' }}
            >
                <Checkbox>Nhớ tài khoản</Checkbox>
            </Form.Item>
            <Link>Quên mật khẩu</Link>

            <Form.Item className="my-4">
                <Button className='btn-submit' type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
        <p>Bạn chưa có tài khoản? <Link onClick={() => navigate('/register')}>Đăng ký</Link></p>
    </div>

    )
};
export default Login;