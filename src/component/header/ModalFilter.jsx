import React, { useEffect, useState } from 'react';
import { Radio, Modal, Row, Col, Divider, Slider } from 'antd';
import { useNavigate } from 'react-router-dom';

const ModalFilter = ({ filterCurrent, isModalOpen, setIsModalOpen, setResult, result }) => {
    const [value, setValue] = useState(1); // Giá trị radio button được chọn
    const [filterData, setFilterData] = useState(); // Dữ liệu của filter hiện tại
    const [haveSlider, setHaveSlider] = useState(false); // Có hiển thị slider không
    const [selectedFilter, setSelectedFilter] = useState(); // Filter được chọn
    const navigate = useNavigate();

    useEffect(() => {
        // Cập nhật dữ liệu filter khi filter thay đổi
        setFilterData(filterCurrent);
        // Cập nhật giá trị radio button
        setValue(result[filterCurrent.id]?.value);
        // Kiểm tra xem filter có slider không
        setHaveSlider(filterCurrent.id === 'khoang-gia' || filterCurrent.id === 'dien-tich');
    }, [filterCurrent, result]);

    // Xử lý khi người dùng thay đổi radio button
    const onChange = (e) => {
        // Lấy filter được chọn
        let selectedFilter = filterData.options.find(item => item.value === e.target.value);
        // Cập nhật giá trị radio button
        setValue(e.target.value);
        // Cập nhật filter được chọn
        setSelectedFilter(selectedFilter);
    };

    // Xử lý khi người dùng lưu các filter đã chọn
    const handleSave = () => {
        // Cập nhật kết quả filter
        let resultFilter = { ...result, [filterData.id]: selectedFilter };
        // Cập nhật kết quả filter vào state chính
        setResult(resultFilter);
        // Thay đổi URL dựa trên các filter đã chọn
        navigate(`listMotel?lnd=${resultFilter?.["loai-nha-dat"].value}&kv=${resultFilter?.["khu-vuc"].value}&kg=${resultFilter?.["khoang-gia"].value}&dt=${resultFilter?.["dien-tich"].value}`);
        // Đóng modal
        setIsModalOpen(false);
        // Cuộn trang lên đầu
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <Modal title={filterData?.name} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleSave} width={700}>
            <>
                {/* Nếu có slider, hiển thị slider */}
                {haveSlider && <div className="py-6">
                    <h1 className='mb-5 text-[#0d6efd] font-[500] text-center '>Từ {selectedFilter?.min} đến {selectedFilter?.max} <span>
                        {filterData?.id === 'khoang-gia' ? 'Triệu' : 'm²'}</span></h1>
                    <Slider
                        min={filterData?.min}
                        max={filterData?.max}
                        range
                        marks={{ 0: filterData?.min, 100: `${filterData?.max} ${filterData?.id === 'khoang-gia' ? 'Triệu' : 'm²'}` }}
                        value={[selectedFilter?.min, selectedFilter?.max]}
                        tooltip={{ formatter: null }}
                    />
                </div>}
            </>
            {/* Hiển thị các radio button cho người dùng chọn */}
            <Radio.Group onChange={onChange} value={value} className='filter-items !w-[100%]'>
                <Row gutter={[0, 0]}>
                    {filterData?.options?.map((option, index) => (
                        <>
                            <Col key={option.value} lg={haveSlider ? 8 : 24}>
                                <Radio value={option.value}>{option.name}</Radio>
                            </Col>
                            {/* Nếu có slider và đến cuối hàng, thêm divider */}
                            {haveSlider && (index + 1) % 3 === 0 && <Divider />}
                            {/* Nếu không có slider, thêm divider */}
                            {!haveSlider && <Divider />}
                        </>
                    ))}
                </Row>
            </Radio.Group>
        </Modal>
    )
}

export default ModalFilter;
