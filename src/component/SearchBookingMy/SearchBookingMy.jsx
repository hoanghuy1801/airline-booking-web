import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../CheckIn/CheckIn.css'
import diacriticless from 'diacriticless';

const SearchBookingMy = () => {
    const navigate = useNavigate();
    const dispastch = useDispatch();
    const [inputCode, setInputCode] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputFirstName, setInputFirstName] = useState('');

    const handleInputCode = (event) => {
        const value = event.target.value;
        const sanitizedValue = diacriticless(value);
        setInputCode(sanitizedValue.toUpperCase());
    };
    const handleInputLastName = (event) => {
        const value = event.target.value;
        const sanitizedValue = diacriticless(value);
        setInputLastName(sanitizedValue.toUpperCase());
    };
    const handleInputFirstName = (event) => {
        const value = event.target.value;
        const sanitizedValue = diacriticless(value);
        setInputFirstName(sanitizedValue.toUpperCase());
    };
    return (
        <div className='page-search-booking'>
            <Row className='main-search-booking'>
                <Col span={9} className='form-search-checkin'>
                    <p className='title'>CHUYẾN BAY CỦA TÔI</p>
                    <p className='notification'>Bạn muốn xem chuyến bay đã đặt, đổi lịch trình bay hay mua thêm dịch vụ hành lý, chỗ ngồi, suất ăn..., vui lòng điền thông tin bên dưới:</p>
                    <Form>
                        <Form.Item>
                            <label className='lable-form'>Mã đặt chỗ <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                placeholder='Mã đặt chỗ'
                                className='input-form'
                                onChange={handleInputCode}
                                value={inputCode}
                            />
                            <label className='lable-form'>Họ <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                placeholder='Họ'
                                className='input-form'
                                onChange={handleInputLastName}
                                value={inputLastName}
                            />
                            <label className='lable-form'>Tên đệm & tên <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                placeholder='Tên đệm & tên'
                                className='input-form'
                                onChange={handleInputFirstName}
                                value={inputFirstName} />
                        </Form.Item>
                        <Button className='btn-search-booking' onClick={() => { navigate('/my/booking-detail') }} >Tiếp tục</Button>
                    </Form>
                </Col>
                <Col span={15} className='notification-booking'>

                </Col>
            </Row>
        </div >
    );
}
export default SearchBookingMy;