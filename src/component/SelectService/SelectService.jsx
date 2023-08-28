import { Row, Col, Form, Button, Drawer, Divider, Card, Radio, InputNumber, Select } from 'antd';
import '../SelectService/SelectService.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import imgFavorite from '../../assets/service/select-service_favorite.svg'
import imgFood from '../../assets/service/select-service_foods.svg'
import imgluggage from '../../assets/service/select-service_luggage.svg'
import imgFavoriteRed from '../../assets/service/favorite-seat_red.svg'
import imgMiy from '../../assets/service/mi-y.jpg'
import { useState } from 'react';
import Service from './Service/Service';
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly';
import InfoAndStep from '../SelectFlight/InfoAndStep/InfoAndStep';
const { Option } = Select;
const SelectService = () => {


    const navigate = useNavigate();

    const data_homepage = useSelector(state => state.formsearch.data_booking);

    const data_passengers = useSelector(state => state.passengers.data_passengers);

    const [value, setValue] = useState(1);
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const DataPassengers = [];
    for (let i = 0; i < data_passengers.inputFirstName.length; i++) {
        DataPassengers.push(data_passengers.inputFirstName[i] + ' ' + data_passengers.inputLastName[i])
    }
    ;
    return (
        <div className="select-flight">
            <div className="info-flight">
                <InfoAndStep />
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <Service />
                    </Col>
                    <Col span={9} >
                        <SelectInfoFly />
                    </Col>
                </Row>

            </div>
            <div className="footer">
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={4}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/passengers') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={18} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={6} className='footer-price'><i>1,000,000 </i><span> VND</span>    </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue'
                            onClick={() => handlePassengers()}> Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectService;