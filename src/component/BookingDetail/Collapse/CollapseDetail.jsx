import { Row, Col, Collapse, Button } from 'antd';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
const CollapseDetail = () => {
    return (
        <>
            <Collapse
                size="large"
                items={[
                    {
                        showArrow: false,
                        key: 'index',
                        label: <div>
                            <p className='date-fly'> Ngày 22/08/2023</p>
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
                                <Col span={7} className='info-fly'>
                                    <p className='number-fly'>1 hành khách,1 trẻ em, 1 em bé</p>
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
                                <Col span={7} className='info-fly'>
                                    <p className='number-fly' style={{ color: 'green', fontSize: '23px', fontWeight: 700 }}>820,920 VND</p>
                                </Col>
                            </Row>

                        </div>,
                        children:
                            <div>

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
                                <Row>
                                    <Col span={4}>
                                    </Col>
                                    <Col span={20}>
                                        <p className='time-flys' style={{ paddingTop: '20px' }}>
                                            Thời gian: <span style={{ color: 'red' }}>1 giờ 25 phút  </span>
                                            Airbus:  <span style={{ color: 'red' }}>A321  </span>
                                            Khai thác bởi: <span style={{ color: 'red' }}>Vietjet  </span>
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                    },
                ]}
                expandIconPosition='end'
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    backgroundColor: '#F1F1F1',
                    marginTop: '10px'
                }}
            />
        </>
    )
}
export default CollapseDetail;