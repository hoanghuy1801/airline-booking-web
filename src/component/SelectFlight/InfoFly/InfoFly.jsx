import { Row, Col, Form, Button } from 'antd';
import './InfoFly.css'
import imgVeluxe from '../../../assets/wdelux.svg'
import imgEco from '../../../assets/weco.svg'
import imgskyboss from '../../../assets/wskyboss.svg'
import imgBusinesswhite from '../../../assets/businesswhite.svg'
import imgNoflight from '../../../assets/noflight.svg'
import React from 'react';
import { useState } from 'react';
import { floatButtonPrefixCls } from 'antd/es/float-button/FloatButton';

const InfoFly = () => {
    const [isSelectedTG, setIsSelectedTG] = useState(false);
    const [isSelectedPTDB, setIsSelectedPTDB] = useState(false);
    const [isSelectedPT, setIsSelectedPT] = useState(false);
    const handleBoxClickTG = () => {
        setIsSelectedTG(true);
        setIsSelectedPTDB(false);
        setIsSelectedPT(false);
    };
    const handleBoxClickPTDB = () => {
        setIsSelectedTG(false);
        setIsSelectedPTDB(true);
        setIsSelectedPT(false);
    };
    const handleBoxClickPT = () => {
        setIsSelectedTG(false);
        setIsSelectedPTDB(false);
        setIsSelectedPT(true);
    };
    return (
        <>
            <Row className='icon-class'>
                <Col span={8} className='symbol-airline'>
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
                <Col span={5}
                    className='price-airline'
                    onClick={handleBoxClickTG}>
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
                <Col span={5}
                    className={`price-airline ${isSelectedPTDB ? 'selected' : ''}`}
                    onClick={handleBoxClickPTDB}
                >
                    <Row>
                        <Col span={24}>
                            <span className='price'><i>2,000</i></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <span className='price-vnd'><i>000 VND</i></span>
                        </Col>
                    </Row>
                </Col>
                <Col span={5}
                    className={`price-airline ${isSelectedPT ? 'selected' : ''}`}
                    onClick={handleBoxClickPT}
                >
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
            </Row>
        </>
    )
}
export default InfoFly;