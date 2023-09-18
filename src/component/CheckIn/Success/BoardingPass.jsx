import html2canvas from 'html2canvas';
import './BoardingPass.css'
import { Row, Col, Collapse, Button, Radio } from 'antd';
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck, IconLuggage, IconPlaneDeparture } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import imgplane from '../../../assets/plane-icon_yellow.png'

const BoardingPass = () => {
    const qrData = 'Hello!';
    const handleImageDownload = () => {
        const captureElement = document.getElementById('boardingpass');
        html2canvas(captureElement).then((canvas) => {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'screenshot.png';
            link.click();
        });
    };
    return (
        <>
            <div className='main-boardingpass' id='boardingpass'>
                <div className='vivutravel'>
                    <p className='text'>Vivu Travel</p>
                </div>
                <div className='content-main'>
                    <Row className='title'>
                        <p >Thẻ lên tàu bay</p>
                    </Row>
                    <Row className='title'>
                        <Col span={10}>
                            <Row className='city'>
                                <p>TP.HỒ CHÍ MINH</p>
                            </Row>
                            <Row className='code-city'>
                                <p>SGN</p>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <img className='icon' src={imgplane} />
                        </Col>
                        <Col span={10} >
                            <Row className='city' style={{ display: 'flex', justifyContent: 'end', paddingRight: "10px" }}>
                                <p>HÀ NỘI</p>
                            </Row>
                            <Row className='code-city' style={{ display: 'flex', justifyContent: 'end', paddingRight: "10px" }}>
                                <p>HAN</p>
                            </Row>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Row className='city'>
                                <p>KHÁCH HÀNG</p>
                            </Row>
                            <Row className='name-user'>
                                <p>PHAM ,HOANG HUY</p>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <p className='row-1'>NGÀY</p>
                            <p className='row-2'>28/08/2023</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>CHUYẾN BAY</p>
                            <p className='row-2'>VJ136</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>MÃ ĐẶT CHỖ</p>
                            <p className='row-2'>HUYPH</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <p className='row-1'>CỬA</p>
                            <p className='row-2'>15</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>GIỜ RA TÀU BAY</p>
                            <p className='row-2'>10:30</p>
                        </Col>
                        <Col span={6}>
                            <p className='row-1'>SỐ GHẾ</p>
                            <p className='row-2'>7A</p>
                        </Col>
                        <Col span={6}>
                            <p className='row-1'>MÃ VÉ</p>
                            <p className='row-2'>CCCC</p>
                        </Col>
                    </Row>

                    <div className='attention'>
                        <p> Lưu ý: Cửa khời hành sẽ đóng 15 phút trước giờ khởi hành.</p>
                        <p> Hành khách sẽ không được phép lên tàu bay khi cửa khởi hành đóng.</p>
                    </div>
                    <div className='code-qr'>
                        <QRCode value={qrData} />
                    </div>

                </div>
            </div>
            <div className='btn-downs'>
                <Button onClick={handleImageDownload} className='btn-down'>Tải ảnh</Button>
            </div>

        </>
    );
};

export default BoardingPass;