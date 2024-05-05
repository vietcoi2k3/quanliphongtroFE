import React, { useEffect, useState } from 'react'
import { FormOutlined, UserOutlined, CopyOutlined, BarsOutlined, LockOutlined, LogoutOutlined, NumberOutlined } from '@ant-design/icons';
import { Menu, Avatar, Button, InputNumber, Divider, Modal, Input, Form } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './style.css'
import Footer from '../footer/Footer';
import Header from '../header/Header';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Quản lý tin đăng', 'quan-ly-tin', <BarsOutlined />),
    getItem('Đăng tin mới', 'dang-tin-moi', <FormOutlined />),
    getItem('Thông tin cá nhân', 'thong-tin-ca-nhan', <UserOutlined />),
    getItem('Đổi mật khẩu', 'doi-mat-khau', <LockOutlined />),
];
const MenuUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [SelectedKeys, setSelectedKeys] = useState('quan-ly-tin')
    const currentUrl = window.location.href;

    const url = new URL(currentUrl);
    const pathname = url.pathname;

    const handleOk = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        let pathParts = pathname.split('/');
        let lastPathSegment = pathParts[pathParts.length - 1];
        let slug = lastPathSegment;

        if(slug){
            setSelectedKeys(slug)
        }
    },
        [pathname])
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth()
    const onClick = (e) => {
        if (e.key) {
            navigate(e.key)
        }
    };
    const handleLogout = () => {
        localStorage.clear();
        setAuth('')
        navigate("/")
    }
    const onFinish = async (values) => {
        console.log({ values })
        try {

        } catch (err) {
            console.log({ err })
        }
    };
    return (
        <>
            <Modal title="Thanh toán qua VNPay" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Form
                    name="basic"
                    // disabled={loading}
                    initialValues={{
                        ...auth, imgReturn: [
                            {
                                uid: '-1',
                                name: 'defaultImage.png',
                                status: 'done',
                                url: auth.imgReturn,
                            },
                        ]
                    }}
                    onFinish={onFinish}
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
                        <InputNumber className='w-[100%]' placeholder='Tối thiểu 50000' defaultValue={100000} addonAfter="đ" min={0} />
                    </Form.Item>
                </Form>
            </Modal>
            <Header />
            <section className='flex'>
                <div className='w-[320px] p-5'>
                    <div className='flex flex-row'>
                        <Avatar size={60} src={auth.imgReturn} />
                        <h1 className='text-[26px] font-[600] ml-3'>{auth.
                            accountName || 'Người dùng'}</h1>
                    </div>
                    <div className='pb-2 px-2 p-4 bg-[#d9d9d9] my-4'>
                        <div className='flex justify-between w-[100%] rounded-md'>
                            <p>Số dư tài khoản</p>
                            <p className='text-right'>0 đ</p>
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
                    <Button className='w-[100%] text-start border-none' icon={<LogoutOutlined />} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
                <div className='bg-[#F1F1F1] page-manager-right'>
                    {/* <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: 'Trang quản lý',
                        },
                        {
                            title: 'Application Center',
                            href: '',
                        },
                    ]}
                /> */}
                    <div className='max-w-[950px] mx-auto my-5 bg-[#fff]'>
                        <Outlet />
                    </div>
                </div>
            </section>
            <Footer />
        </>

    )
}

export default MenuUser