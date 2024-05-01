import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import './login.css'
import AuthApi from '../../api/AuthApi';
// import { useAuth } from '../../AuthContext';
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login = () => {
    // const { setAuth } = useAuth();
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const response = await AuthApi.login({username:values.username, password:values.password});
            console.log({response})
            // localStorage.setItem('accessToken', response.data.accessToken);
            // setAuth(true);
            // history.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid credentials. Please try again.');
        }
    };
    return (<div className='w-[100%] login-container flex justify-center items-center py-8 flex-col'>
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