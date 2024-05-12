import React, { useEffect, useState } from 'react'
import { Input, Space, Select, Table, Popconfirm, Modal } from 'antd';
import AuthApi from '../../api/AuthApi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MotelApi from '../../api/MotelApi';
import PostNews from './PostNews'
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
        setSearchValue(value)

    }

    // Các biến state và hàm state
    const [dataSource, setDataSource] = useState([])
    const [dataSourceFilter, setDataSourceFilter] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [newsType, setNewsType] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idMotelEdit, setIdMotelEdit] = useState('')
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
            await MotelApi.deleteMotel(key)
            const newData = dataSource.filter((item) => {
                return item.id !== key
            });
            setDataSourceFilter(newData)
            setDataSource(newData);
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    };

    // Lấy dữ liệu từ API khi trang được tải
    const fechData = async () => {
        try {
            setLoading(true)
            let data = await AuthApi.getListUserMotel({ pageIndex: 0, pageSize: 10 })
            setDataSource(data)
            setLoading(false)
            setDataSourceFilter(data)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        fechData()
    }, [])

    // Xử lý thay đổi loại tin đăng
    const handleChangeNewsType = (id) => {
        setNewsType(id)

    };

    useEffect(() => {
        let newDataFiltered = dataSource
        if (searchValue !== "") {
            // Lọc ra dữ liệu khi tìm kiếm
            newDataFiltered = newDataFiltered.filter(item => (item.title.toLowerCase().includes(searchValue.toLowerCase().trim()) || (item.description.toLowerCase().includes(searchValue.toLowerCase().trim()))))
        } 
        if (newsType !== 0) {
            // Lọc ra dữ liệu khi lọc theo loại tin
            console.log({newsType})
            newDataFiltered = newDataFiltered.filter(item => item.typeMotelID === newsType)
        }
        console.log({newsType})
        setDataSourceFilter(newDataFiltered)
        console.log({ newDataFiltered })
    }, [searchValue, newsType])


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
                dataSource.length >= 1 ? (<div className='flex justify-around'>
                    <Popconfirm title="Sure to delete?" style={{ textAlign: 'center' }} onConfirm={() => handleDelete(record.id)}>
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>
                    <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
                </div>) : null,
        },
    ];


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleOpenModalEdit = (id) => {
        setIdMotelEdit(id)
        setIsModalOpen(true);
    }
    return (
        <div className='manage-postings-container'>
            <Modal title="Sửa bài đăng" width={600} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <PostNews id={idMotelEdit} setDataSource={setDataSource} />
            </Modal>
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
            <Table columns={columns} loading={loading} className='pt-4' dataSource={dataSourceFilter} scroll={{ x: 1300 }} />
        </div>
    )
}

export default ManagePostings
