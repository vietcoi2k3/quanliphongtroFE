import React, {useState} from 'react'
import { Input, Space, Select, Table, Tag } from 'antd';
const { Search } = Input;

const optionsDefault = [
    {
        name: 'Tất cả',
        count: 0,
        checked: true
    },
    {
        name: 'Đã cho thuê',
        count: 0,
        checked: false
    },
    {
        name: 'Hết hạn',
        count: 0,
        checked: false
    },
]

const ManagePostings = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const [options, setOptions] = useState(optionsDefault)
    const handleChangeNewsType = (value) => {
        console.log(`selected ${value}`);
    };
    const handleChangeVipType = (value) => {
        console.log(`selected ${value}`);
    };

    
    const clickBtnOption = (name) => {
        setOptions(prev => prev.map(item => item.name === name ? {...item, checked:true}:{...item, checked:false}))
    }
    const ButtonOption = ({ name, count, checked }) => {
        return(<div className='rounded-lg p-2 cursor-pointer' onClick={()=>clickBtnOption(name)} style={{backgroundColor:checked?'#00008b':'#ffc0cb', color:checked?'#fff':'#000'}}>
            <p>{name} ({count})</p>
        </div>)
    }
    const columns = [
        {
            title: 'Tin đăng',
            dataIndex: 'news',
            key: 'news',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Loại tin đăng',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const data = [];
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
            <Space className='w-[100%] py-4'>
                
            {options.map(option => <ButtonOption key={option.name} name={option.name} count={option.count} checked={option.checked} />)}
            </Space>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default ManagePostings