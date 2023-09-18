import { Row, Col, Checkbox, Button } from 'antd';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import './SelectFlyService.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import FormSelectFlyService from '../../FormSelectFlyService/FormSelectFlyService';

const SelectFlyService = () => {
    const navigate = useNavigate();
    return (
        <div className='service-detail'>
            <div className="nav-service-detail">
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>

                    </Col>
                    <Col span={16} className='code-booking-status'>
                        <p>Trạng thái: <span style={{ color: 'green', fontSize: '20px', fontWeight: 700 }}>Đã thanh toán</span></p>
                    </Col>
                </Row>
            </div>
            <div className="main-service-detail">
                <p className='title-services'>Chọn chuyến bay để mua dịch vụ</p>
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
                    <Col span={12} >
                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue-info'
                            onClick={() => { navigate('/my/sevice-detail') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlyService;