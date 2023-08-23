import { Row, Col, Button } from 'antd';
import '../SelectFlight/SelectFlight.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import InfoFly from './InfoFly/InfoFly';
import SelectInfoFly from './SelectInfoFly/SelectInfoFly';
import InfoAndStep from './InfoAndStep/InfoAndstep';


const SelectFlight = () => {
    const navigate = useNavigate();


    return (
        <div className="select-flight">
            <div className="info-flight">
                <InfoAndStep />
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <InfoFly />
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