import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../CheckIn/CheckIn.css'
import diacriticless from 'diacriticless';

const CheckIn = () => {
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
        <div className='page-checkin'>
            <Row className='main-checkin'>
                <Col span={9} className='form-search-checkin'>
                    <p className='title'>CHECK-IN</p>
                    <p className='notification'>Sẵn sàng cho chuyến bay vui vẻ, thoải mái, bạn có thể làm thủ tục chuyến bay trực tuyến nhanh chóng và đơn giản.</p>
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
                        <Button className='btn-checkin' onClick={() => { navigate('/select-fight-infor') }} >Tiếp tục</Button>
                    </Form>
                </Col>
                <Col span={15} className='notification-checkin'>
                    <p className='notification-header'>Quý khách có thể tự làm thủ tục chuyến bay thông qua chức năng làm thủ tục trực tuyến (Online Check-in) tại trang web của Vietjet hoặc ứng dụng Vietjet trên thiết bị di động. Đây là tính năng tiện lợi, nhanh gọn để Quý khách có thể dễ dàng thực hiện mọi lúc mọi nơi từ 24 tiếng đến 60 phút trước giờ bay.</p>
                    <p className='notification-title'>I. Các chuyến bay khai thác bởi Vietjet</p>
                    <p className='notification-item-small'>1. Chuyến bay nội địa:</p>
                    <ul className='notification-ul'>
                        <li>Áp dụng các chuyến bay xuất phát từ tất cả các sân bay tại Việt Nam</li>
                        <li>Thời gian áp dụng: Từ 24 tiếng đến 60 phút trước giờ khởi hành</li>
                    </ul>
                    <p className='notification-item-small'>2. Chuyến bay quốc tế:</p>
                    <p className='notification'>Áp dụng các chuyến bay xuất phát từ:</p>
                    <ul className='notification-ul'>
                        <li>Australia: Sân bay Melbourne (MEL), Sydney (SYD), Brisbane (BNE)</li>
                        <li>Ấn Độ: Sân bay New Delhi (DEL), Ahmedabad (AMD), Mumbai (BOM), Cochin (COK)</li>
                        <li>Nhật Bản: Sân bay Narita (NRT), Haneda (HND), Fukuoka (FUK), Kansai (KIX), Nagoya Chubu (NGO)</li>
                        <li>Hàn Quốc: Sân bay Incheon (ICN)</li>
                        <li>Malaysia: Sân bay Kuala Lumpur (KUL)</li>
                        <li>Singapore: Sân bay Changi (SIN)</li>
                        <li>Thái Lan: Sân bay Bangkok (BKK), Phuket (HKT)</li>
                        <li>Indonesia: Sân bay Jakarta (CGK)</li>
                        <li>Hồng Kông: Sân bay Hồng Kông (HKG)</li>
                        <li>Việt Nam:
                            <ul className='notification-ul-li'>
                                <li>Sân bay Nội Bài (HAN)</li>
                                <li>Sân bay Tân sơn nhất (SGN) - Singapore (SIN), </li>
                                <li>Sân bay Tân sơn nhất (SGN) - Sân bay quốc tế Kuala Lumpur (KUL), </li>
                                <li>Sân bay Tân sơn nhất (SGN) - Sân bay quốc tế Ngurah Rai (DPS), </li>
                            </ul>
                        </li>
                        <p className='notification'>Thời gian áp dụng: </p>
                        <li>Từ 24 tiếng đến 90 phút trước giờ khởi hành (Chuyến bay Quốc tế xuất phát từ sân bayTân Sơn Nhất: từ 24 tiếng đến 3 tiếng trước giờ khởi hành)</li>
                        <p className='notification'>Quy định chung: </p>
                        <li>Quý khách cần chuẩn bị đầy đủ giấy tờ du lịch, còn hạn, phù hợp quy định Xuất/Nhập cảnh và lưu trú.</li>
                        <li>Quý khách làm thủ tục trực tuyến (Online Check-in) và in ra Thẻ lên tàu bay dưới dạng khổ giấy A4 trước khi ra sân bay. Thẻ lên tàu bay định dạng điện tử lưu trên thiết bị di động (điện thoại, máy tính bảng, email,...) đều không có giá trị sử dụng trên các chuyến bay Quốc tế.</li>
                        <li>Tại sân bay: Quý khách có mặt tại quầy phục vụ khách Online Check-in trước giờ khởi hành 60 phút để nhân viên xác thực thông tin: Giấy tờ du lịch, Giấy tờ xuất/nhập cảnh và các giấy tờ khác theo quy định từ Nhà chức trách, Cơ quan xuất/nhập cảnh trước khi Quý khách vào khu vực xuất cảnh bên trong. Quy định này áp dụng bao gồm cả Quý khách không có hành lý ký gửi.</li>
                        <li>Quý khách ký gửi hành lý (nếu có): Quầy ký gửi hành lý đóng 60 phút trước giờ khởi hành.</li>
                    </ul>
                    <p className='notification-item-small'>3. Lưu ý: Làm thủ tục trực tuyến không áp dụng đối với</p>
                    <ul className='notification-ul'>
                        <li>Hành khách đi cùng trẻ sơ sinh (nhỏ 2 tuổi) hoặc hành khách mang thai.</li>
                        <li>ành khách bị hạn chế khả năng di chuyển hoặc cần hỗ trợ đặc biệt.</li>
                    </ul>
                </Col>
            </Row>
        </div >
    );
}
export default CheckIn;