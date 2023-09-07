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
import { useState, useEffect } from 'react';
import Service from './Service/Service';
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly';
import { getListService } from '../../services/apiServices';

const { Option } = Select;
const SelectService = () => {
    useEffect(() => {
        feachListService();
    }, []);
    const navigate = useNavigate();
    const data = useSelector(state => state.formsearch.data_booking);

    const data_passengers = useSelector(state => state.passengers.data_passengers);

    const dataSelect = useSelector(state => state.selectfight.data_select);
    const dataSelectReturn = useSelector(state => state.selectfight.data_select_return);

    const [value, setValue] = useState(1);
    const [baggageOptions, setBaggageOptions] = useState([]);
    const [mealOptions, setMealOptions] = useState([]);
    const [standardBaggageOptions, setStandardBaggageOptions] = useState([]);
    const [standardMealOptions, setStandardMealOptions] = useState([]);

    const feachListService = async () => {
        let res = await getListService(dataSelect.conditionSelect.airlineId, dataSelect.conditionSelect.seatPriceDto.seatClass);
        setBaggageOptions(res.data.baggageOptions);
        setMealOptions(res.data.mealOptions);
        setStandardBaggageOptions(res.data.standardOptDto.standardBaggageOptions);
        setStandardMealOptions(res.data.standardOptDto.standardMealOptions);
    }

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const DataPassengers = [];
    for (let i = 0; i < data_passengers.inputFirstName.length; i++) {
        DataPassengers.push(data_passengers.inputFirstName[i] + ' ' + data_passengers.inputLastName[i])
    }


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
                            <IconShoppingCart style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>

                    </Col>
                </Row>
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <Service
                            baggageOptions={baggageOptions}
                            mealOptions={mealOptions}
                            standardBaggageOptions={standardBaggageOptions}
                            standardMealOptions={standardMealOptions}

                        />
                    </Col>
                    <Col span={9} >
                        <SelectInfoFly
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
                            onClick={() => { navigate('/passengers') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={18} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={6} className='footer-price'> {dataSelect.totalFightFomat}</Col>
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