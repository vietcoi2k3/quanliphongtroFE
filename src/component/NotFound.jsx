import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
//Trang hiển thị khi "không tìm thấy trang có url hợp lệ"
const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={()=>navigate('/')}>Back Home</Button>}
            />
        </div>
    )
}

export default NotFound