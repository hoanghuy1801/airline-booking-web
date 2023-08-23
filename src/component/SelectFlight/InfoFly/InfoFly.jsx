import { Row, Col, Form, Button } from 'antd';
import './InfoFly.css'
import imgVeluxe from '../../../assets/wdelux.svg'
import imgEco from '../../../assets/weco.svg'
import imgskyboss from '../../../assets/wskyboss.svg'
import imgBusinesswhite from '../../../assets/businesswhite.svg'
import imgNoflight from '../../../assets/noflight.svg'
import React from 'react';

const InfoFly = () => {
    return (
        <>
            <Row className='icon-class'>
                <Col span={7} >

                </Col>
                <Col span={4} className='imgBusinesswhite'>
                    <img src={imgBusinesswhite} style={{ width: 110, height: 70, paddingLeft: 20 }} />
                </Col>
                <Col span={4} className='imgskyboss'>
                    <img src={imgskyboss} style={{ width: 110, height: 70, paddingLeft: 20 }} />
                </Col>
                <Col span={4} className='imgVeluxe'>
                    <img src={imgVeluxe} style={{ width: 110, height: 70, paddingLeft: 20 }} />
                </Col>
                <Col span={4} className='imgEco'>
                    <img src={imgEco} style={{ width: 110, height: 70, paddingLeft: 20 }} />
                </Col>
            </Row>
            <Row className='icon-class'>
                <Col span={7} className='symbol-airline'>
                    <Row>
                        <Col span={24}>
                            <span className='code-airline'>VJ198</span>
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={9}>
                                    <span className='clock-airline'>05:25</span>
                                </Col>
                                <Col span={6}>
                                    <span className='code-airline'>Đến</span>
                                </Col>
                                <Col span={9}>
                                    <span className='clock-airline'>07:35</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <span className='code-airline'>Airbus A321</span>

                        </Col>
                    </Row>

                </Col>
                <Col span={4} className='price-airline'>
                    <Row>
                        <Col span={24}>
                            <span className='price'><img src={imgNoflight} /></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <span className='price-vnd'>Hết chỗ</span>
                        </Col>
                    </Row>
                </Col>
                <Col span={4} className='price-airline'>
                    <Row>
                        <Col span={24}>
                            <span className='price'><i>1,250</i></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <span className='price-vnd'><i>000 VND</i></span>
                        </Col>
                    </Row>
                </Col>
                <Col span={4} className='price-airline'>
                    <Row>
                        <Col span={24}>
                            <span className='price'><i>1,000</i></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <span className='price-vnd'><i>000 VND</i></span>
                        </Col>
                    </Row>
                </Col>
                <Col span={4} className='price-airline'>
                    <Row>
                        <Col span={24}>
                            <span className='price'><i>900</i></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <span className='price-vnd'><i>000 VND</i></span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default InfoFly;