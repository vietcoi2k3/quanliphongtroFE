import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'
// Trang thông báo nạp tiền thành công
const RechargeSuccess = () => {
    const navigate = useNavigate()
    return (
        <div className='h-[100vh] justify-center flex items-center'>

            <Result
                status="success"
                title="Bạn đã nạp tài khoản thành công"
                extra={[
                    <Button type="primary" key="console" onClick={() => navigate('/')}>
                        Quay về trang chủ
                    </Button>,

                ]}
            />
        </div>
    )
}

export default RechargeSuccess