import React from 'react'
import { Button, Result } from 'antd';

// Trang thông báo nạp tiền thành công
const RechargeSuccess = () => {
    return (
        <div className='h-[100vh] justify-center flex items-center'>

            <Result
                status="success"
                title="Bạn đã nạp tài khoản thành công"
            />
        </div>
    )
}

export default RechargeSuccess