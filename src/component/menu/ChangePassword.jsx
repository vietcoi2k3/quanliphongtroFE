import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const ChangePassword = () => {
    const navigate = useNavigate()
    
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (<>
        <h1 className='text-[25px] font-[500] px-[100px] pt-[12px]'>Đổi mật khẩu</h1>
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
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu cũ',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Nhập lại mật khẩu mới"
                name="reNewPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập lại mật khẩu mới',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item className="my-4">
                <Button type="primary" style={{width:'100%'}} htmlType="submit" className='btn-submit'>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
            <p>Bạn quên mật khẩu ? <Link onClick={()=>navigate('/login')}>Bấm vào đây để khôi phục</Link></p>
        </div>

    </>

    )
};
export default ChangePassword;
