import { Row, Col, Button } from 'antd';
import '../SelectFlight/SelectFlight.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import InfoFly from './InfoFly/InfoFly';
import SelectInfoFly from './SelectInfoFly/SelectInfoFly';
import InfoAndStep from './InfoAndStep/InfoAndStep';
import { useState } from 'react';


const SelectFlight = () => {
    const navigate = useNavigate();
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);

    const handleShapeClick = (index) => {
        setSelectedShapeIndex(index);
    };
    const numberChildren = Array.from({ length: 3 });
    return (
        <div className="select-flight">
            <div className="info-flight">
                <InfoAndStep />
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <Row >
                            <Col span={8} >
                            </Col>
                            <Col span={5} className='imgBusinesswhite'>
                                <p className='text-class'>Thương Gia</p>
                            </Col>

                            <Col span={5} className='imgskyboss'>
                                <p className='text-class'>Phổ Thông  </p>
                                <p className='text-class'>Đặc Biệt</p>
                            </Col>

                            <Col span={5} className='imgEco'>
                                <p className='text-class'>Phổ Thông</p>
                            </Col>
                        </Row>
                        {numberChildren.map((_, index) => (
                            <div key={index}>
                                <InfoFly />
                            </div>
                        ))}

                    </Col>
                    <Col span={9} >
                        <SelectInfoFly />
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Row>
                    <Col span={6}>

                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={16} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={8} className='footer-price'><i>1,000,000 </i><span> VND</span>    </Col>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue' onClick={() => { navigate('/select-fight-infor') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectFlight;