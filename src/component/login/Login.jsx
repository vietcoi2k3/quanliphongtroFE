import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Modal, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import './login.css'
import { useAuth } from '../../AuthContext';
import AuthApi from '../../api/AuthApi';

// Hàm xử lý khi kết thúc đăng nhập không thành công
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setAuth } = useAuth();
    const [checkEmail, setCheckEmail] = useState(false);
    const [loading, setLoading] = useState(false)
    // Hàm xử lý khi người dùng quên mật khẩu
    const forgotPassword = async (values) => {
        const { username } = values;
        setLoading(true)
        try {
            let messageSuccess = await AuthApi.forgotPasswod(username);
            if (messageSuccess) {
                setCheckEmail(true);
            }
            setLoading(false)

        } catch (err) {
            setLoading(false)

            messageApi.open({
                type: 'warning',
                content: 'Username không đúng',
            });
        }
    };

    // Hàm xử lý khi người dùng đăng nhập
    const onFinish = async (values) => {
        try {
            const response = await AuthApi.login({ username: values.username, password: values.password });
            localStorage.setItem('access_token', response.jwttoken);
            localStorage.setItem('user', JSON.stringify(response));
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
            setAuth(response);
            navigate('/');
        } catch (error) {
            messageApi.open({
                type: 'warning',
                content: 'Đăng nhập không thành công',
            });
        }
    };

    // Hàm xử lý khi đóng modal quên mật khẩu
    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (<>
        {contextHolder}
        <div className='w-[100%] login-container flex justify-center items-center py-8 flex-col'>
            <h1 className='text-[35px] font-[700]'>Đăng nhập</h1>
            {/* Modal cho quên mật khẩu */}
            <Modal title="Quên mật khẩu" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} footer={null}>
                {checkEmail ? <Result
                    status="success"
                    title="Vui lòng kiểm tra email của bạn"
                /> : <Form
                    name="basic"
                    onFinish={forgotPassword}
                    autoComplete="off"
                    disabled={loading}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập username',
                            },
                        ]}
                    >
                        <Input className='w-[100%]' />
                    </Form.Item>
                    <Form.Item className='text-end'>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>}
            </Modal>
            {/* Form đăng nhập */}
            <Form
                name="basic"
                style={{
                    width: 600,
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
                {/* Link để mở modal quên mật khẩu */}
                <Link onClick={() => setIsModalOpen(true)}>Quên mật khẩu</Link>

                <Form.Item className="my-4">
                    <Button className='btn-submit' type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <p>Bạn chưa có tài khoản? <Link onClick={() => navigate('/register')}>Đăng ký</Link></p>
        </div>
    </>
    );
};

export default Login;
