import { Row, Col, Collapse, Button, Radio } from 'antd';
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import './SelectSeat.css'
import SeatSelector from '../../SelectService/SeatSelector/SeatSelector';

const SelectSeat = () => {
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
                            <IconChecklist style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-container-seat'>
                <Row>
                    <Col span={9} >
                        <p className='text-title'>Chọn hành khách để làm thủ tục</p>
                        <div className='info-user-form'>
                            <div className='info-user'>
                                <p className='text-name' >PHAM HOANG HUY</p>
                                <p className='text-seat'>Seat:</p>
                            </div>
                        </div>
                        <div className='btn'>
                            <Button className='btn-back' onClick={() => navigate('/my/select-fight')} >Trở lại</Button>
                            <Button className='btn-continue' onClick={() => navigate('/my/restricted-baggage')}>Đi tiếp</Button>
                        </div>
                    </Col>
                    <Col span={15} className='view-select-seat'>
                        <div className='title-seats'>
                            <p>Chọn chỗ ngồi</p>
                        </div>
                        <div className='info-seat'>
                            <Row >
                                <Col span={5} style={{ display: 'flex' }}>
                                    <div style={{ backgroundColor: 'red' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế thương gia</span>
                                </Col>
                                <Col span={6} style={{ display: 'flex' }}>
                                    <div style={{ backgroundColor: '#25A006' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế phổ thông đặc biệt</span>
                                </Col>

                                <Col span={4} style={{ display: 'flex' }}>
                                    <div style={{ backgroundColor: ' #208AEC' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế phổ thông</span>
                                </Col>
                                <Col span={4} style={{ display: 'flex' }}>
                                    <div style={{ backgroundColor: '#FBB612 ' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế đang chọn</span>
                                </Col>

                                <Col span={5} style={{ display: 'flex' }}>
                                    <div style={{ backgroundColor: ' #D1D3D4' }} className='information-seat-color'>
                                    </div>
                                    <span>Đã có người</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='seats'>
                            <SeatSelector />
                        </div>

                    </Col>
                </Row>

            </div>
        </div >
    )
}
export default SelectSeat;