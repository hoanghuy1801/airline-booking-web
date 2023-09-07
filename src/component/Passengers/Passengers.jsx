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
import { getListService } from '../../services/apiServices';




const Passengers = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(1);




    const [inputLastName, setInputLastName] = useState('');

    const [inputFirstName, setInputFirstName] = useState('');

    const [input, setInput] = useState([{}])

    const dispath = useDispatch();

    const dataSelect = useSelector(state => state.selectfight.data_select);

    const dataSelectReturn = useSelector(state => state.selectfight.data_select_return);

    const data = useSelector(state => state.formsearch.data_booking);

    // const numberBooking = data_homepage.adult + data_homepage.children;

    // const numberadult = Array.from({ length: data_homepage.adult });

    // const numberChildren = Array.from({ length: data_homepage.children });

    // const numberbaby = Array.from({ length: data_homepage.baby });



    const data_passengers = {
        inputLastName: inputLastName,
        inputFirstName: inputFirstName,
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
                <Row>
                    <Col span={16} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {!data.roundTrip ?
                                    <div>CHUYẾN BAY MỘT CHIỀU | {data.adult} Người lớn, {data.children} Trẻ em, {data.baby} Em bé</div>
                                    :
                                    <div>CHUYẾN BAY KHỨ HỒI| {data.adult} Người lớn, {data.children} Trẻ em, {data.baby} Em bé </div>
                                }

                            </span>
                        </Row>
                        <Row style={{ paddingTop: 10 }}>
                            <div>
                                <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm khởi hành </span>
                                <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }} >{data.sourceAirportCity}</span>
                                <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm đến </span>
                                <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }}> {data.destinationAirportCity}</span>
                            </div>
                        </Row>
                    </Col>
                    <Col span={8} className='icon-selcet'>
                        <Row >
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCircle style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconShoppingCart style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>

                    </Col>
                </Row>
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <Passenger />
                    </Col>
                    <Col span={9} >
                        <SelectInfoFly listByCondition={dataSelect.listByCondition}
                            conditionSelect={dataSelect.conditionSelect}
                            adultsPrice={dataSelect.adultsPrice}
                            childrenPrice={dataSelect.childrenPrice}
                            infantPrice={dataSelect.infantPrice}
                            adultsPriceFomat={dataSelect.adultsPriceFomat}
                            childrenPriceFomat={dataSelect.childrenPriceFomat}
                            infantPriceFomat={dataSelect.infantPriceFomat}
                            taxesfightFomat={dataSelect.taxesfightFomat}
                            totalFightFomat={dataSelect.totalFightFomat}

                            listByConditionReturn={dataSelectReturn.listByConditionReturn}
                            conditionSelectReturn={dataSelectReturn.conditionSelectReturn}
                            adultsPriceReturn={dataSelectReturn.adultsPriceReturn}
                            childrenPriceReturn={dataSelectReturn.childrenPriceReturn}
                            infantPriceReturn={dataSelectReturn.infantPriceReturn}
                            adultsPriceFomatReturn={dataSelectReturn.adultsPriceFomatReturn}
                            childrenPriceFomatReturn={dataSelectReturn.childrenPriceFomatReturn}
                            infantPriceFomatReturn={dataSelectReturn.infantPriceFomatReturn}
                            taxesfightFomatReturn={dataSelectReturn.taxesfightFomatReturn} />
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
                            <Col span={6} className='footer-price'>{dataSelect.totalFightFomat}</Col>
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