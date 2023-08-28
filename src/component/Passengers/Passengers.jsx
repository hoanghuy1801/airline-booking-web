import { Row, Col, Form, Button, Radio, Collapse, Input, DatePicker, Select } from 'antd';
import '../Passengers/Passengers.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import diacriticless from 'diacriticless';
import { useDispatch } from "react-redux";
import { Data_Passengers } from '../../redux/action/PassengersAction';
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly';
import Passenger from './Passenger/Passenger';
import InfoAndStep from '../SelectFlight/InfoAndStep/InfoAndStep';



const Passengers = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(1);

    const [inputLastName, setInputLastName] = useState('');

    const [inputFirstName, setInputFirstName] = useState('');

    const [input, setInput] = useState([{}])

    const dispath = useDispatch();

    const data_homepage = useSelector(state => state.formsearch.data_booking);

    const numberBooking = data_homepage.adult + data_homepage.children;

    const numberadult = Array.from({ length: data_homepage.adult });

    const numberChildren = Array.from({ length: data_homepage.children });

    const numberbaby = Array.from({ length: data_homepage.baby });

    // const removeDiacritics = (str) => {
    //     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // };

    // const newinputLastName = removeDiacritics(inputLastName);

    // const newinputFirstName = removeDiacritics(inputFirstName);

    const data_passengers = {
        inputLastName: inputLastName,
        inputFirstName: inputFirstName
    }

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const handlePassengers = () => {
        dispath(Data_Passengers(data_passengers))
        navigate('/select-service')
    }


    const handleInputLastName = (index, event) => {
        const newValues = [...inputLastName];
        newValues[index] = event.target.value;
        setInputLastName(newValues);

    };

    const handleInputFirstName = (index, event) => {
        const newValues = [...inputFirstName];
        newValues[index] = event.target.value;
        setInputFirstName(newValues);
    };

    return (
        <div className="select-flight">
            <div className="info-flight">
                <InfoAndStep />

            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <Passenger />
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
                            onClick={() => { navigate('/select-fight-infor') }} >Quay lại</Button>
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
export default Passengers;