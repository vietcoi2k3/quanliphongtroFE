import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import AuthApi from '../../api/AuthApi';
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const ChangePassword = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const {oldPassword, newPassword, reNewPassword} = values
            if (newPassword !== reNewPassword) {
                messageApi.open({
                    type: 'warning',
                    content: 'Password nhập lại không đúng',
                });
            }else{
                await AuthApi.changePassword({
                    "oldPassword": oldPassword,
                    "newPassword": newPassword
                })
                messageApi.open({
                    type: 'success',
                    content: 'Đổi mật khẩu thành công',
                });
            }
        } catch (err) {
            console.log(err)
            messageApi.open({
                type: 'warning',
                content: 'Đổi mật khẩu không thành công',
            });
        }
    };
    return (<>
        {contextHolder}
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
                    <Button type="primary" style={{ width: '100%' }} htmlType="submit" className='btn-submit'>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
            <p>Bạn quên mật khẩu ? <Link onClick={() => navigate('/login')}>Bấm vào đây để khôi phục</Link></p>
        </div>

    </>

    )
};
export default ChangePassword;
