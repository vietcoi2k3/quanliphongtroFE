import React, { useEffect, useState } from 'react'
import { Input, Space, Select, Table, Popconfirm } from 'antd';
import AuthApi from '../../api/AuthApi';
import { DeleteOutlined } from '@ant-design/icons'
import MotelApi from '../../api/MotelApi';

const { Search } = Input;
const { Option } = Select;

// Các tùy chọn mặc định cho việc lọc tin đăng
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
    // Hàm xử lý tìm kiếm bài đăng
    const onSearch = (value, _e) => {
        if(value == ""){
            setDataSourceFilter(dataSource)
        }else{
            let searchedData = dataSource.filter(item => (item.title.toLowerCase().includes(value.toLowerCase())  || (item.description.toLowerCase().includes(value.toLowerCase()))))
            setDataSourceFilter(searchedData)
        }
    }

    // Các biến state và hàm state
    const [options, setOptions] = useState(optionsDefault)
    const [dataSource, setDataSource] = useState([])
    const [dataSourceFilter, setDataSourceFilter] = useState([])

    // Dữ liệu về loại nhà đất
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

    // Xử lý xóa bài đăng
    const handleDelete = async (key) => {
        try {
            await MotelApi.deleteMotel(key)
            const newData = dataSource.filter((item) => item.id !== key);
            setDataSource(newData);
        } catch (err) {
            console.log(err)
        }
    };

    // Lấy dữ liệu từ API khi trang được tải
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

    // Xử lý thay đổi loại tin đăng
    const handleChangeNewsType = (id) => {
        if(id==0){
            setDataSourceFilter(dataSource)
        }else{
            let filterdata = dataSource.filter(item => item.typeMotelID === id)
            setDataSourceFilter(filterdata)
        }
    };

    // Cập nhật lại bộ lọc khi dữ liệu thay đổi
    useEffect(()=>{
        setDataSourceFilter(dataSource)
    },[dataSource])

    // Xử lý sự kiện khi người dùng chọn tùy chọn
    const clickBtnOption = (name) => {
        setOptions(prev => prev.map(item => item.name === name ? { ...item, checked: true } : { ...item, checked: false }))
    }


    // Các cột trong bảng
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
            {/* Ô tìm kiếm và dropdown lọc */}
            <Space wrap>
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{ width: 200 }}
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

            {/* Bảng hiển thị dữ liệu */}
            <Table columns={columns} className='pt-4' dataSource={dataSourceFilter} scroll={{ x: 1300 }} />
        </div>
    )
}

export default ManagePostings
