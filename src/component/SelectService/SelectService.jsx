import { Row, Col, Form, Button, Drawer, Divider, Card, Radio, Typography, Select } from 'antd';
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
import { formatCurrency, removeDiacritics } from '../../utils/format';
import { useLanguage } from '../../LanguageProvider/LanguageProvider';
import { getServiceAirline } from '../../services/apiBooking';
const { Title, Text } = Typography;
const { Option } = Select;
const SelectService = () => {
    useEffect(() => {
        feachListService();
    }, []);
    const { getText } = useLanguage();
    const navigate = useNavigate();
    const data = useSelector((state) => state.homePage.homePageInfor);
    const flightSelect = useSelector((state) => state.flightSelect.flightSelect);
    const flightSelectReturn = useSelector((state) => state.flightSelect.flightSelectReturn);
    const totalFlight = useSelector((state) => state.flightSelect.totalflight);
    const totalFlightFomat = formatCurrency(Number(totalFlight));

    const data_passengers = '';
    const myLanguage = useSelector((state) => state.language.language);
    const sourceAirportCity = removeDiacritics(data.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data.destinationAirportCity, myLanguage)

    const [value, setValue] = useState(1);
    const [baggageOptions, setBaggageOptions] = useState([]);
    const [mealOptions, setMealOptions] = useState([]);
    const [defaultBaggageOptions, setDefaultBaggageOptions] = useState([
    ]);
    const [defaultMealOptions, setDefaultMealOptions] = useState([]);

    const feachListService = async () => {
        let res = await getServiceAirline(flightSelect.airline.id, data.seatId);
        setBaggageOptions(res.data.baggageOptions);
        setMealOptions(res.data.mealOptions);
        setDefaultBaggageOptions(res.data.standardOpt.defaultBaggageOptions);
        setDefaultMealOptions(res.data.standardOpt.defaultMealOptions);
    }
    return (
        <div className="select-flight">
            <div className="info-flight">
                <Row>
                    <Col span={18} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {!data.roundTrip ?
                                    <Title level={4}> {getText('ROUND-TRIP')} | {data.adult} {getText('Adults')}, {data.children} {getText('Children')}, {data.baby} {getText('Baby')}</Title>
                                    :
                                    <Title level={4}> {getText('ONE-WAY-FLIGHT')}| {data.adult} {getText('Adults')}, {data.children} {getText('Children')}, {data.baby} {getText('Baby')}</Title>
                                }
                            </span>
                        </Row>
                        <Row>
                            <div>
                                <Title level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500 }}>
                                    {getText('From')}:
                                    <Text type="secondary"
                                        style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30, marginLeft: 10 }}>{sourceAirportCity}</Text>
                                    <Text level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500 }}> {getText('To')}: </Text>
                                    <Text type="secondary"
                                        style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30, marginLeft: 10 }}>{destinationAirportCity}</Text>
                                </Title>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} className='icon-select'>
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
                    <Col xs={24} sm={24} md={24} lg={24} xl={15} className='infor-user-select-flight'>
                        <Service
                            baggageOptions={baggageOptions}
                            mealOptions={mealOptions}
                            defaultBaggageOptions={defaultBaggageOptions}
                            defaultMealOptions={defaultMealOptions}

                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={9} >
                        <SelectInfoFly
                            flightSelect={flightSelect}
                            flightSelectReturn={flightSelectReturn}
                        />
                    </Col>
                </Row>

            </div>
            <div className="footer">
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col xs={11} sm={11} md={11} lg={4} xl={4}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/passengers') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} className='footer-price-form-info'>
                        <Row>
                            <Col span={18} className='footer-price-info' style={{ display: 'flex', justifyContent: 'end' }}>Tổng tiền:
                            </Col>
                            <Col span={6} className='footer-price-info'>{totalFlightFomat}</Col>
                        </Row>
                    </Col>
                    <Col xs={11} sm={11} md={11} lg={6} xl={6}>
                        <Button className='footer-continue-info'
                            onClick={() => handleSelectService()} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectService;