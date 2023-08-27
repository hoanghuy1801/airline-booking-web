import { Row, Col, Collapse, Button, Radio } from 'antd';
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck, IconLuggage, IconPlaneDeparture } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import './Success.css'
import BoardingPass from './BoardingPass';


const Success = () => {
    const navigate = useNavigate();
    return (
        <div className="booking-detail" >
            <div className="info-booking-detail">
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>
                    </Col>
                    <Col span={16} className='icon-select'>
                        <Row >
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCheck style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconChecklist style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-success'>
                <div className='container'>

                    <Row >
                        <Col span={15} >
                            <p className='title-success'>Thông tin chuyến bay</p>
                            <Row >
                                <Col span={5} className='info-fly'>
                                    <p className='location'>SGN</p>
                                </Col>
                                <Col span={7} className='info-fly'>
                                    <p className='time-fly'>1 giờ 25 phút</p>
                                </Col>
                                <Col span={5} className='info-fly'>
                                    <p className='location' >HAN</p>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={5} className='info-fly'>
                                    <p className='time'>22:30</p>
                                </Col>
                                <Col span={7} className='info-fly'>
                                    <p className='time-fly'>Bay thẳng</p>
                                </Col>
                                <Col span={5} className='info-fly'>
                                    <p className='time'>22:30</p>
                                </Col>

                            </Row>
                            <Row style={{ paddingTop: '20px' }}>
                                <p className='code-fly'><img src={vietjet} /> Số hiệu chuyến bay: VJ313</p>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <p className='from'>Khởi hành
                                        :</p>
                                </Col>
                                <Col span={20}>
                                    <p className='time-flys'>22:30, 03/08/2023 (Giờ địa phương)</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                </Col>
                                <Col span={20}>
                                    <p className='time-flys' style={{ paddingBottom: '20px' }}>Huế - Sân bay Phú Bài</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <p className='to'>Đến:</p>
                                </Col>
                                <Col span={20}>
                                    <p className='time-flys'>23:55, 03/08/2023 (Giờ địa phương)</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>

                                </Col>
                                <Col span={20}>
                                    <p className='time-flys'>Tp. Hồ Chí Minh - Sân bay Tân Sơn Nhất</p>
                                </Col>
                            </Row>
                            <Row className='form-info-fly'>
                                <Col span={4}>
                                </Col>
                                <Col span={20} >
                                    <p className='time-flys' style={{ paddingTop: '20px' }}>
                                        Thời gian: <span style={{ color: 'red' }}>1 giờ 25 phút  </span>
                                        Airbus:  <span style={{ color: 'red' }}>A321  </span>
                                        Khai thác bởi: <span style={{ color: 'red' }}>Vietjet  </span>
                                    </p>
                                </Col>
                            </Row>
                            <p className='title-instruction'>Hướng dẫn di chuyển tiếp theo</p>
                            <Row>
                                <Col span={6} className='step-1'>
                                    <Row className='form-title-step'>
                                        Bước 1
                                    </Row>
                                    <Row className='form-icon-step'>
                                        <IconLuggage className='icon-step' />
                                    </Row>
                                    <Row className='form-text-step'>
                                        Ký gửi hành lý(nếu có) tại Quầy check-in. Tối thiểu trước 60 phút giờ bay
                                    </Row>
                                </Col>
                                <Col span={3}>
                                </Col>
                                <Col span={6} className='step-1'>
                                    <Row className='form-title-step'>
                                        Bước 2
                                    </Row>
                                    <Row className='form-icon-step'>
                                        <IconUserCheck className='icon-step' />
                                    </Row>
                                    <Row className='form-text-step'>
                                        Kiểm tra an ninh
                                    </Row>
                                </Col>
                                <Col span={3}>
                                </Col>
                                <Col span={6} className='step-1'>
                                    <Row className='form-title-step'>
                                        Bước 1
                                    </Row>
                                    <Row className='form-icon-step'>
                                        <IconPlaneDeparture className='icon-step' />
                                    </Row>
                                    <Row className='form-text-step'>
                                        Đến đúng cửa khởi hành. Tối thiểu 30 phút trước giờ bay
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9} className='boardingpass'>
                            <BoardingPass />
                        </Col>
                    </Row>
                </div>
                <div className='btn'>
                    <Button className='btn-continue' onClick={() => navigate('/')}>Hoàn tất</Button>
                </div>
            </div>
        </div >
    )
}
export default Success;