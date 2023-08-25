import { Row, Col, Collapse, Button } from 'antd';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
const CollapseChildren = () => {
    return (
        <>
            <Collapse
                size="large"
                items={[
                    {
                        key: 'index',
                        label: <div style={{ fontSize: '18px', fontWeight: 600 }}>Trẻ em: ÔNG PHAM HOANG HUY </div>,
                        children:
                            <div className='detail-ticket'>
                                <p style={{ color: 'green', fontSize: '16px', fontWeight: 500 }}>Chi tiết chuyến đi </p>
                                <p style={{ color: 'black', fontSize: '16px', fontWeight: 500 }}> HUI <img src={vietjet} /> SGN</p>
                                <Row className='details'>
                                    <Col span={12}>
                                        <h3>Giá vé</h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>236,520 VND</h3>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Vé phổ thông</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>219,000</p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Thuế VAT</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>17,520</p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <h3>Thuế, phí</h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>584,400 VND</h3>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Phụ thu dịch vụ hệ thống (Quốc nội)</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>215,000</p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Phí an ninh soi chiếu</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>20,000</p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Phí sân bay quốc nội</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>100,000</p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Phụ thu quản trị hệ thống</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>215,000</p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Thuế VAT</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>34,400</p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <h3>Dịch vụ</h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>0 VND</h3>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Hành lý xách tay 7Kg</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>0 </p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <p>Hành lý ký gửi </p>
                                    </Col>
                                    <Col span={12}>
                                        <p>0 </p>
                                    </Col>
                                </Row>
                                <Row className='details'>
                                    <Col span={12}>
                                        <h3 style={{ color: 'red', fontSize: '18px' }}>Dịch vụ</h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3 style={{ color: 'red', fontSize: '18px' }}>0 VND</h3>
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
export default CollapseChildren;