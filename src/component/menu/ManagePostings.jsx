import React, { useEffect, useState } from 'react'
import { Input, Space, Select, Table, Popconfirm } from 'antd';
import AuthApi from '../../api/AuthApi';
import { DeleteOutlined } from '@ant-design/icons'
import MotelApi from '../../api/MotelApi';
const { Search } = Input;
const { Option } = Select;
const optionsDefault = [
    {
        name: 'Tất cả',
        count: 0,
        checked: true,

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
    const onSearch = (value, _e) => {
        if(value == ""){
            setDataSourceFilter(dataSource)
        }else{
            let searchedData = dataSource.filter(item => (item.title.toLowerCase().includes(value.toLowerCase())  || (item.description.toLowerCase().includes(value.toLowerCase()))))
            setDataSourceFilter(searchedData)
        }
    }
    const [options, setOptions] = useState(optionsDefault)
    const [dataSource, setDataSource] = useState([])
    const [dataSourceFilter, setDataSourceFilter] = useState([])
    const loaiNhaDat = [
        {
            name: 'Tất cả',
            value: 0
        },
        {
            name: 'Cho thuê phòng trọ',
            value: 1
        },
        {
            name: 'Căn hộ cho thuê',
            value: 2
        },
        {
            name: 'Ở nguyên căn',
            value: 3
        },
        {
            name: 'Ở ghép',
            value: 4
        },
    ]
    const handleDelete = async (key) => {
        try {
            await MotelApi.deleteMotel(key)
            const newData = dataSource.filter((item) => item.id !== key);
            setDataSource(newData);
        } catch (err) {
            console.log(err)
        }
    };
    const fechData = async () => {
        try {
            let data = await AuthApi.getListUserMotel({ pageIndex: 0, pageSize: 10 })
            setDataSource(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fechData()
    }, [])

    const handleChangeNewsType = (id) => {
        if(id==0){
            setDataSourceFilter(dataSource)
        }else{
            let filterdata = dataSource.filter(item => item.typeMotelID === id)
            setDataSourceFilter(filterdata)
        }
    };

    useEffect(()=>{
        setDataSourceFilter(dataSource)
    },[dataSource])


    const clickBtnOption = (name) => {
        setOptions(prev => prev.map(item => item.name === name ? { ...item, checked: true } : { ...item, checked: false }))
    }
    const ButtonOption = ({ name, count, checked }) => {
        return (<div className='rounded-lg p-2 cursor-pointer text-[14px]' onClick={() => clickBtnOption(name)} style={{ backgroundColor: checked ? '#00008b' : '#ffc0cb', color: checked ? '#fff' : '#000' }}>
            <p>{name} ({count})</p>
        </div>)
    }
    const columns = [
        {
            title: 'Tin đăng',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Diện tích',
            dataIndex: 'acreage',
            key: 'acreage',
            sorter: (a, b) => a.acreage - b.acreage,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Loại tin đăng',
            dataIndex: 'typeMotelID',
            key: 'typeMotelID',
            render: (typeMotelID) => {
                console.log(typeMotelID)
                let nameMotel = loaiNhaDat.find(item => item.value == typeMotelID)
                return <p>{nameMotel?.name}</p>
            },
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" style={{ textAlign: 'center' }} onConfirm={() => handleDelete(record.id)}>
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>
                ) : null,
        },
    ];
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
                    style={{ width: 200 }}
                    onChange={handleChangeNewsType}
                >
                    {loaiNhaDat.map(item => (
                        <Option key={item.value} value={item.value}>{item.name}</Option>
                    ))}
                </Select>
            </Space>
            {/* <Space className='w-[100%] py-4'>

                {options.map(option => <ButtonOption key={option.name} name={option.name} count={option.count} checked={option.checked} />)}
            </Space> */}
            <Table columns={columns} className='pt-4' dataSource={dataSourceFilter} scroll={{
                x: 1300,
            }} />

        </div>
    )
}

export default ManagePostings