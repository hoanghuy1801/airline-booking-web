import { Row, Col, Form, Button } from 'antd';
import './SelectFlightInfor.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckInfoFly from './CheckInfoFly/CheckInfoFly';
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly';
import InfoAndStep from '../SelectFlight/InfoAndStep/InfoAndstep';

const SelectFlightInfor = () => {
    const navigate = useNavigate();
    const data_homepage = useSelector(state => state.formsearch.data_booking);
    return (
        <div className="select-flight">
            <div className="info-flight">
                <InfoAndStep />
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <CheckInfoFly />
                    </Col>
                    <Col span={9} >
                        <SelectInfoFly />
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Row>
                    <Col span={6}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/select-fight') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={16} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={8} className='footer-price'><i>1,000,000 </i><span> VND</span></Col>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue'
                            onClick={() => { navigate('/passengers') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectFlightInfor;