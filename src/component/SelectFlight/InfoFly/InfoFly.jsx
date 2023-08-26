import { Row, Col, Collapse, Button, Radio } from 'antd';
import { IconBrandCitymapper, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import './InfoFly.css'



const InfoFly = () => {
    const navigate = useNavigate();
    return (
        <>
            <p className='title'>Chuyến đi</p>
            <div className='fly-color'>
            </div>
            <div className='select-flight-info'>
                <Row>
                    <Col span={7}>
                        <p className='name-airline'>Bamboo Airways</p>
                    </Col>
                    <Col span={10} >
                        <Row>
                            <Col span={8}>
                                <p className='time-start-fly'>07:10</p>
                                <p className='code-start-fly'>SGN</p>
                            </Col>
                            <Col span={8}>
                                <p className='time-to-fly'>1 giờ 20 phút</p>
                                <IconBrandCitymapper className='icon-fly' />
                                <p className='time-to-fly'>Bay thẳng</p>
                            </Col>
                            <Col span={8} >
                                <p className='time-start-fly'>09:10</p>
                                <p className='code-start-fly'>SGN</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7} >
                        <Row>
                            <p className='price-fly'>900.000 VND/Khách</p>
                        </Row>
                        <Row>
                            <Button className='btn-select'>Chọn</Button>
                        </Row>
                    </Col>
                </Row>

            </div>
        </>
    )
}
export default InfoFly;