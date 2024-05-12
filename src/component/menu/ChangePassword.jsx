import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import AuthApi from '../../api/AuthApi';

// Hàm xử lý khi kết thúc đăng nhập không thành công
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const ChangePassword = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    // Hàm xử lý khi người dùng thay đổi mật khẩu
    const onFinish = async (values) => {
        try {
            const { oldPassword, newPassword, reNewPassword } = values;
            if (newPassword !== reNewPassword) {
                // Hiển thị thông báo nếu nhập lại mật khẩu không khớp
                messageApi.open({
                    type: 'warning',
                    content: 'Password nhập lại không đúng',
                });
            } else {
                // Gửi yêu cầu thay đổi mật khẩu đến server
                await AuthApi.changePassword({
                    "oldPassword": oldPassword,
                    "newPassword": newPassword
                });
                // Hiển thị thông báo thành công nếu thay đổi mật khẩu thành công
                messageApi.open({
                    type: 'success',
                    content: 'Đổi mật khẩu thành công',
                });
            }
        } catch (err) {
            // Hiển thị thông báo nếu thay đổi mật khẩu không thành công
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
                {/* Trường nhập mật khẩu cũ */}
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
                {/* Trường nhập mật khẩu mới */}
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
                {/* Trường nhập lại mật khẩu mới */}
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
                {/* Nút submit để thực hiện thay đổi mật khẩu */}
                <Form.Item className="my-4">
                    <Button type="primary" style={{ width: '100%', backgroundColor:'#ff0000' }} htmlType="submit" className='btn-submit'>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>
    );
};

export default ChangePassword;
