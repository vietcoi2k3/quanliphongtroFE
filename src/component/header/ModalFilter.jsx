import React, { useEffect, useState } from 'react'
import { Radio, Modal, Row, Col, Divider, Slider } from 'antd';
const ModalFilter = ({ filterCurrent, isModalOpen, setIsModalOpen, setResult }) => {
    const [value, setValue] = useState(1);
    const [filterData, setFilterData] = useState()
    const [haveSlider, setHaveSlider] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState()
    useEffect(() => {
        setFilterData(filterCurrent)
        setHaveSlider(filterCurrent.id === 'khoang-gia' || filterCurrent.id === 'dien-tich')
    }, [filterCurrent])
    const onChange = (e) => {
        let selectedFilter = filterData.options.find(item => item.value === e.target.value)
        setValue(e.target.value);
        setSelectedFilter(selectedFilter)
    };
    const handleSave = () => {
        setResult(prev => {
            return{
                ...prev,
                [filterData.id]:selectedFilter
            }
        })
        setIsModalOpen(false)
    }
    return (
        <Modal title={filterData?.name} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleSave} width={700}>
            <>
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
                </div>
                }
            </>
            <Radio.Group onChange={onChange} value={value} className='filter-items !w-[100%]'>
                <Row gutter={[0, 0]}>
                    {filterData?.options?.map((option, index) => (<><Col key={option.value} lg={haveSlider ? 8 : 24}>
                        <Radio value={option.value}>{option.name}</Radio>
                    </Col>
                        {haveSlider && (index + 1) % 3 === 0 && <Divider />}
                        {!haveSlider && <Divider />}
                    </>))}

                </Row>
            </Radio.Group>
        </Modal>
    )
}

export default ModalFilter