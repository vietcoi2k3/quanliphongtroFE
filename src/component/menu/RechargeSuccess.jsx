import React, { useEffect } from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'
import AuthApi from '../../api/AuthApi';
// Trang thông báo nạp tiền thành công
const RechargeSuccess = () => {
    const navigate = useNavigate()
    let currentURL = window.location.href;
    let vnReturn = async () => {
        try {
            let queryString = currentURL.split('?')[1];
            console.log({queryString})
            if(queryString){
                let response = await AuthApi.vnPayReturn(queryString)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        vnReturn()
    }, [])
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