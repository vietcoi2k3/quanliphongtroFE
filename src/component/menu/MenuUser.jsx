import React, { useEffect, useState } from 'react'
import { FormOutlined, UserOutlined, CopyOutlined, BarsOutlined, LockOutlined, LogoutOutlined, NumberOutlined } from '@ant-design/icons';
import { Menu, Avatar, Button, InputNumber, Divider, Modal, Input, Form } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './style.css'
import Footer from '../footer/Footer';
import Header from '../header/Header';
import AuthApi from '../../api/AuthApi';

// Hàm tạo mục menu
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// Các mục menu
const items = [
    getItem('Quản lý tin đăng', 'quan-ly-tin', <BarsOutlined />),
    getItem('Đăng tin mới', 'dang-tin-moi', <FormOutlined />),
    getItem('Thông tin cá nhân', 'thong-tin-ca-nhan', <UserOutlined />),
    getItem('Đổi mật khẩu', 'doi-mat-khau', <LockOutlined />),
];

const MenuUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [SelectedKeys, setSelectedKeys] = useState('quan-ly-tin')
    const [loading, setLoading] = useState(false)
    const [money, setMoney] = useState(0)
    const currentUrl = window.location.href;

    const url = new URL(currentUrl);
    const pathname = url.pathname;

    const handleOk = () => {
        setIsModalOpen(false);
    };

    // Lấy đoạn path cuối cùng trong URL
    useEffect(() => {
        let pathParts = pathname.split('/');
        let lastPathSegment = pathParts[pathParts.length - 1];
        let slug = lastPathSegment;

        if (slug) {
            setSelectedKeys(slug)
        }
    }, [pathname])

    const navigate = useNavigate()
    const { auth, setAuth } = useAuth()

    // Xử lý sự kiện khi chọn mục trong menu
    const onClick = (e) => {
        if (e.key) {
            navigate(e.key)
        }
    };

    // Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.clear();
        setAuth('')
        navigate("/")
    }

    // Xử lý gửi yêu cầu nạp tiền
    const onFinish = async () => {
        try {
            let response = await AuthApi.vnPay(money)
            console.log(response)
            if(response.code === "ok"){
                navigate(`/${response.paymentUrl}`)
            }
            setIsModalOpen(false)
        } catch (err) {
            setIsModalOpen(false)
            console.log({ err })
        }
    };

    return (
        <>
            {/* Modal nạp tiền */}
            <Modal title="Thanh toán qua VNPay" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} footer={[
                <Button key="back" onClick={() => setIsModalOpen(false)}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={onFinish}>
                    Gửi
                </Button>,

            ]}>
                <Form
                    name="basic"
                    disabled={loading}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Số tiền"
                        name="money"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số tiền',
                            },
                        ]}
                    >
                        <InputNumber className='w-[100%]' value={money} onChange={setMoney} placeholder='Tối thiểu 50000' defaultValue={100000} addonAfter="đ" min={0} />
                    </Form.Item>
                </Form>
            </Modal>

            <Header />

            <section className='flex'>
                {/* Menu người dùng */}
                <div className='w-[320px] p-5'>
                    <div className='flex flex-row'>
                        <Avatar size={60} src={auth.imgReturn} />
                        <h1 className='text-[26px] font-[600] ml-3'>{auth.accountName || 'Người dùng'}</h1>
                    </div>
                    <div className='pb-2 px-2 p-4 bg-[#d9d9d9] my-4'>
                        <div className='flex justify-between w-[100%] rounded-md'>
                            <p>Số dư tài khoản</p>
                            <p className='text-right'>{auth?.money}</p>
                        </div>
                        <div className='bg-[#fff] my-3 rounded-lg p-3'>
                            <p>Mã tài khoản</p>
                            <div className='flex justify-between'>
                                <p>114634</p>
                                <CopyOutlined />
                            </div>
                        </div>
                        <Button type="primary" style={{ width: '100%' }} onClick={() => setIsModalOpen(true)}>Nạp tiền</Button>
                    </div>
                    {/* Menu dọc */}
                    <Menu
                        onClick={onClick}
                        style={{
                            width: 280,
                        }}
                        defaultSelectedKeys={['quan-ly-tin']}
                        selectedKeys={[SelectedKeys]}
                        mode="inline"
                        items={items}
                    />
                    <Divider />
                    {/* Nút đăng xuất */}
                    <Button className='w-[100%] text-start border-none' icon={<LogoutOutlined />} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
                <div className='bg-[#F1F1F1] page-manager-right'>
                   
                    <div className='max-w-[950px] mx-auto my-5 bg-[#fff] min-h-[100vh]'>
                        <Outlet />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default MenuUser
