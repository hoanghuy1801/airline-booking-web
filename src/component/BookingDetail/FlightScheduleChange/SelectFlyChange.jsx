import { Row, Col, Checkbox, Button } from 'antd';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import FormSelectFlyService from '../../FormSelectFlyService/FormSelectFlyService';
import './Change.css'

const SelectFlyChange = () => {
    const navigate = useNavigate();
    return (
        <div className='service-detail'>
            <div className="nav-service-detail">
                <Row>
                    <Col span={24} className='code-booking-change'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>
                    </Col>
                </Row>
            </div>
            <div className="main-service-detail">
                <p className='title-services'>Chọn chuyến bay để thay đổi lịch</p>
                <FormSelectFlyService />
            </div>
            <div className="footer">
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={4}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/my/booking-detail') }} >Quay lại</Button>
                    </Col>
                    <Col span={10} >
                    </Col>
                    <Col span={8}>
                        <Button className='footer-continue-info'
                            onClick={() => { navigate('/my/search-flight-change') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlyChange;