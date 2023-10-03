import { Row, Col, Collapse, Button } from 'antd';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import './ServiceDetail.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import Service from '../../SelectService/Service/Service';
import TotalService from './TotalService';

const ServiceDetail = () => {
    useEffect(() => {
        feachListService();
    }, []);
    const navigate = useNavigate();
    const [baggageOptions, setBaggageOptions] = useState([]);
    const [mealOptions, setMealOptions] = useState([]);
    const [standardBaggageOptions, setStandardBaggageOptions] = useState([]);
    const [standardMealOptions, setStandardMealOptions] = useState([]);
    const feachListService = async () => {
        let res = await getListService(dataSelect.conditionSelect.airlineId, dataSelect.conditionSelect.seatPriceDto.seatClass);
        setBaggageOptions(res.data.baggageOptions);
        setMealOptions(res.data.mealOptions);
        setStandardBaggageOptions(res.data.standardOptDto.standardBaggageOptions);
        setStandardMealOptions(res.data.standardOptDto.standardMealOptions);
    }
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
                <Row>
                    <Col span={15}>
                        <Service
                            baggageOptions={baggageOptions}
                            mealOptions={mealOptions}
                            standardBaggageOptions={standardBaggageOptions}
                            standardMealOptions={standardMealOptions} />
                    </Col>
                    <Col span={9}>
                        <TotalService />
                    </Col>
                </Row>
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
                        <Row>
                            <Col span={18} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={6} className='footer-price'><i>1,000,000 </i><span> VND</span>    </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue'
                            onClick={() => { navigate('/my/sevice-detail') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default ServiceDetail;