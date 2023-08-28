import { Row, Col, Collapse, Button } from 'antd';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import InfoFly from '../../SelectFlight/InfoFly/InfoFly';
import SelectInfoFlyChange from './SelectInfoFlyChange';


const SelectFlightChange = () => {
    const navigate = useNavigate();
    return (
        <div className='service-detail'>
            <div className="nav-service-detail">
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>
                    </Col>
                </Row>
            </div>
            <div className="main-service-detail">
                <Row>
                    <Col span={15}>
                        <InfoFly />
                    </Col>
                    <Col span={9}>
                        <SelectInfoFlyChange />
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={4}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/my/search-flight-change') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={18} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={6} className='footer-price'><i>1,000,000 </i><span> VND</span>    </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue'
                            onClick={() => { navigate('/') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlightChange;