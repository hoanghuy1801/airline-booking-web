import { Row, Col, Form } from 'antd';
import { IconPlane } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';
import './Change.css'

const SelectInfoFlyChange = () => {
    const data_homepage = useSelector(state => state.formsearch.data_booking);

    const numberBooking = data_homepage.adult + data_homepage.children;
    return (
        <>
            <Form className='infor-user-select'>
                <div className='title-select'>
                    <span style={{ color: 'white', fontSize: 20, fontWeight: 600, paddingRight: 10 }}>THÔNG TIN ĐẶT CHỖ </span>
                </div>
                <Form.Item>
                    <div className='title-infor'>
                        <span style={{
                            color: 'black', fontSize: 20, fontWeight: 600,
                            paddingLeft: 20,

                        }}>Thông tin hành khách </span>
                    </div>
                    <div style={{ backgroundColor: 'rgb(201, 239, 255)' }}>
                        <span style={{
                            color: 'black', fontSize: 18, fontWeight: 400,
                            paddingLeft: 20,

                        }}>Chuyến đi</span>
                    </div>
                    <span style={{
                        color: 'black', fontSize: 18, fontWeight: 500,
                        paddingLeft: 20,

                    }}>Tp. Hồ Chí Minh (SGN)</span>
                    <span style={{
                        color: 'black', fontSize: 18, fontWeight: 500,
                        paddingLeft: 20,
                    }}>  <IconPlane style={{ width: 25, height: 25, marginRight: 15, paddingTop: 6 }} /> </span>
                    <span style={{
                        color: 'black', fontSize: 18, fontWeight: 500,
                        paddingLeft: 20,

                    }}>Hà Nội (HAN) </span>
                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600,
                                    paddingLeft: 20,
                                }}>Giá vé </span>
                            </Col>
                            <Col span={6}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingRight: 20,
                                }}>x{numberBooking} </span>
                            </Col>
                            <Col span={10}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}>928,800 VND </span></Col>
                        </Row>
                    </div>
                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600,
                                    paddingLeft: 20,
                                }}>Khấu trừ </span>
                            </Col>
                            <Col span={6}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingRight: 20,
                                }}></span>
                            </Col>
                            <Col span={10}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}>928,800 VND </span></Col>
                        </Row>
                    </div>
                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600,
                                    paddingLeft: 20,
                                }}>Phí thay đổi </span>
                            </Col>
                            <Col span={6}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingRight: 20,
                                }}></span>
                            </Col>
                            <Col span={10}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}>928,800 VND </span></Col>
                        </Row>
                    </div>
                </Form.Item>
                <div className='title-select-end'>
                    <Row>
                        <Col span={8}>
                            <span style={{
                                color: 'white', fontSize: 20, fontWeight: 600,
                                paddingLeft: 20,
                            }}>Tổng tiền</span>
                        </Col>
                        <Col span={16}><span style={{
                            color: 'white', fontSize: 20, fontWeight: 600, justifyContent: 'flex-end',
                            display: 'flex',
                            alignItems: 'flex-end',
                            paddingRight: 20,
                        }}>0 VND </span></Col>
                    </Row>
                </div>

            </Form>
        </>
    )
}
export default SelectInfoFlyChange;