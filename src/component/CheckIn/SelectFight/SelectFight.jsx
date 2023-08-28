import { Row, Col, Collapse, Button, Checkbox } from 'antd';
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import './SelectFight.css'



const SelectFight = () => {
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
                            <IconUserCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconChecklist style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-container-detail'>
                <p className='title-booking' >Chọn chuyến bay</p>
                <div className='booking-ticket'>
                    <div className='date-select-fly'>
                        <Row>
                            <Col span={18}><p style={{ fontSize: '18px', fontWeight: 500 }}>Chuyến đi</p></Col>
                            <Col span={4}>
                                <p style={{ fontSize: '18px', fontWeight: 500 }}> Chọn làm thủ tục</p>
                            </Col>
                            <Col span={2}>
                                <Checkbox />
                            </Col>
                        </Row>
                    </div>
                    <p className='date-fly'>Ngày 22/08/2023</p>
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
                </div>
                <div className='btn'>
                    <Button className='btn-back' onClick={() => navigate('/checkin')} >Trở lại</Button>
                    <Button className='btn-continue' onClick={() => navigate('/my/select-seat')}>Đi tiếp</Button>
                </div>
            </div>
        </div >
    )
}
export default SelectFight;