import React from 'react'
import { Input, Space, Select } from 'antd';
const { Search } = Input;
const ManagePostings = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const handleChangeNewsType = (value) => {
        console.log(`selected ${value}`);
    };
    const handleChangeVipType = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='manage-postings-container'>
            <Space wrap>

                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{
                        width: 200,
                    }}
                />
                <Select
                placeholder='Lọc theo loại tin'
                    style={{
                        width: 200,
                    }}
                    onChange={handleChangeNewsType}
                    options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'Yiminghe',
                            label: 'yiminghe',
                        },
                    ]}
                />
            </Space>
        </div>
    )
}

export default ManagePostings