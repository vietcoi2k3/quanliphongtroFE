import React, { useEffect, useState } from 'react'
import { Radio, Modal, Row, Col, Divider, Slider } from 'antd';

import { useNavigate } from 'react-router-dom';

const ModalFilter = ({ filterCurrent, isModalOpen, setIsModalOpen, setResult, result }) => {
    const [value, setValue] = useState(1);
    const [filterData, setFilterData] = useState()
    const [haveSlider, setHaveSlider] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setFilterData(filterCurrent)
        setValue(result[filterCurrent.id]?.value)
        setHaveSlider(filterCurrent.id === 'khoang-gia' || filterCurrent.id === 'dien-tich')
    }, [filterCurrent, result])
    const onChange = (e) => {
        let selectedFilter = filterData.options.find(item => item.value === e.target.value)
        setValue(e.target.value);
        setSelectedFilter(selectedFilter)
    };
    const handleSave = () => {
        let resultFilter = { ...result, [filterData.id]: selectedFilter }
        setResult(resultFilter)
        console.log({ resultFilter })
        navigate(`listMotel?lnd=${resultFilter?.["loai-nha-dat"].value}&kv=${resultFilter?.["khu-vuc"].value}&kg=${resultFilter?.["khoang-gia"].value}&dt=${resultFilter?.["dien-tich"].value}`)

        setIsModalOpen(false)
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
          });
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