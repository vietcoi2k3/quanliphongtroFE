import React from 'react'
import { FormOutlined, UserOutlined, CopyOutlined, BarsOutlined, LockOutlined } from '@ant-design/icons';
import { Menu, Avatar, Button, Breadcrumb } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import './style.css'
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
    const navigate = useNavigate()
    const onClick = (e) => {
        if (e.key) {
            navigate(e.key)
        }

    };

    return (
        <section className='flex'>
            <div className='w-[320px] p-5'>
                <div className='flex flex-row justify-between'>
                    <Avatar size={60} icon={<UserOutlined />} />
                    <h1 className='text-[26px] font-[600] ml-3'>Nguyễn Ngọc Huyền</h1>
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
                    <Button type="primary" style={{ width: '100%' }}>Nạp tiền</Button>
                </div>
                <Menu
                    onClick={onClick}
                    style={{
                        width: 280,
                    }}
                    defaultSelectedKeys={['quan-ly-tin']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
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
    )
}

export default MenuUser