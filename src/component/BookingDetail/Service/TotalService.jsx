import { Row, Col, Form } from 'antd';
import { IconPlane } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';
import './TotalService.css'

const TotalService = () => {
    return (
        <>
            <Form className='infor-user-select'>
                <div className='title-select'>
                    <span style={{ color: 'white', fontSize: 20, fontWeight: 600, paddingRight: 10 }}>THÔNG TIN ĐẶT DỊCH VỤ </span>
                </div>
                <Form.Item>
                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600,
                                    paddingLeft: 20,
                                }}>Dịch vụ </span>
                            </Col>
                            <Col span={16}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}>0 VND </span></Col>
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
export default TotalService;