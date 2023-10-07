import { Row, Col, Button, Modal, Typography } from 'antd';
import '../SelectFlight/SelectFlight.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import InfoFly from './InfoFly/InfoFly';
import SelectInfoFly from './SelectInfoFly/SelectInfoFly';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import moment from 'moment';
import InfoFlyReturn from './InfoFly/InfoFlyReturn';
import { getListFlight } from '../../services/apiBooking';
import { formatCurrency, formatDate, removeDiacritics, removeVietnameseAccentsAndConvert, } from '../../utils/format';
import { showWaringModal } from '../../utils/modalError';
import { setflightSelect, setflightSelectReturn, settotalflight } from '../../redux/reducers/booking';
import { useLanguage } from '../../LanguageProvider/LanguageProvider';

const { Title, Text } = Typography;
const SelectFlight = () => {
    useEffect(() => {
        feachListFlight();
    }, []);
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { getText } = useLanguage();
    const [hideSelectFightReturn, setHideSelectFightReturn] = useState(false);
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
    const [listFlight, setListFlight] = useState([]);
    const [listFlightReturn, setListFlightReturn] = useState([]);
    const [flightSelect, setFlightSelect] = useState(
        {
            id: "",
            createdAt: "",
            updatedAt: "",
            flightCode: "",
            flightName: "",
            departureTime: "",
            arrivalTime: "",
            status: "",
            airline: {
                id: "",
                airlineCode: "",
                airlineName: "",
                avatarUrl: ""
            },
            aircraft: {
                id: "",
                aircraftCode: "",
                aircraftName: "",
                capacity: 0,
                rowNumbers: 0,
                columnNumbers: 0,
                businessNumber: 0,
                economyNumber: 0,
                premiumEconomyNumber: 0,
                type: ""
            },
            sourceAirport: {
                id: 0,
                airportCode: "",
                airportName: "t",
                visualIndex: 0
            },
            destinationAirport: {
                id: 0,
                airportCode: "",
                airportName: "",
                visualIndex: 0
            },
            flightSeatPrice:
            {
                id: "",
                createdAt: "",
                updatedAt: "",
                infantPrice: "",
                adultPrice: "",
                childrenPrice: "",
                seatClass: "",
                taxService: {
                    id: "",
                    airportFee: "",
                    systemServiceSurcharge: "",
                    systemAdministrationSurcharge: "",
                    securityScreeningFee: "",
                    VATTax: "",
                    totalFee: "",
                    fuelCharge: null,
                    flightType: ""
                }
            }

        }
    );
    const [flightSelectReturn, setFlightSelectReturn] = useState(
        {
            id: "",
            createdAt: "",
            updatedAt: "",
            flightCode: "",
            flightName: "",
            departureTime: "",
            arrivalTime: "",
            status: "",
            airline: {
                id: "",
                airlineCode: "",
                airlineName: "",
                avatarUrl: ""
            },
            aircraft: {
                id: "",
                aircraftCode: "",
                aircraftName: "",
                capacity: 0,
                rowNumbers: 0,
                columnNumbers: 0,
                businessNumber: 0,
                economyNumber: 0,
                premiumEconomyNumber: 0,
                type: ""
            },
            sourceAirport: {
                id: 0,
                airportCode: "",
                airportName: "t",
                visualIndex: 0
            },
            destinationAirport: {
                id: 0,
                airportCode: "",
                airportName: "",
                visualIndex: 0
            },
            flightSeatPrice:
            {
                id: "",
                createdAt: "",
                updatedAt: "",
                infantPrice: "",
                adultPrice: "",
                childrenPrice: "",
                seatClass: "",
                taxService: {
                    id: "",
                    airportFee: "",
                    systemServiceSurcharge: "",
                    systemAdministrationSurcharge: "",
                    securityScreeningFee: "",
                    VATTax: "",
                    totalFee: "",
                    fuelCharge: null,
                    flightType: ""
                }
            }

        }
    );
    const data = useSelector((state) => state.homePage.homePageInfor);
    const totalPeople = data.children + data.adult;
    const total =
        flightSelect.flightSeatPrice.adultPrice * data.adult
        + flightSelect.flightSeatPrice.childrenPrice * data.children
        + flightSelect.flightSeatPrice.infantPrice * data.baby
        + flightSelect.flightSeatPrice.taxService.totalFee * totalPeople

        + flightSelectReturn.flightSeatPrice.adultPrice * data.adult
        + flightSelectReturn.flightSeatPrice.childrenPrice * data.children
        + flightSelectReturn.flightSeatPrice.infantPrice * data.baby
        + flightSelectReturn.flightSeatPrice.taxService.totalFee * totalPeople;
    const totalFomat = formatCurrency(Number(total));

    const handleShapeClick = (index) => {
        setSelectedShapeIndex(index);
    };

    const feachListFlight = async () => {
        let res = await getListFlight(data.sourceAirport, data.destinationAirport, formatDate(data.departureDate), data.seatId, data.adult, data.children, data.baby);
        setListFlight(res.data);
    }

    const handleContinue = async () => {
        if (flightSelect.flightSeatPrice.adultPrice == '') {
            showWaringModal("Bạn ơi", "Bạn chưa chọn chuyến bay")
            return
        }
        if (!data.roundTrip) {
            navigate('/select-fight-infor')
        }
        else {
            if (hideSelectFightReturn == false) {
                dispath(setflightSelect(flightSelect));
                dispath(settotalflight(total));
                let res = await getListFlight(data.destinationAirport, data.sourceAirport, formatDate(data.returnDate), data.seatId, data.adult, data.children, data.baby);
                setListFlightReturn(res.data);
                setHideSelectFightReturn(true)
            } else if (flightSelectReturn.flightSeatPrice.adultPrice == '') {
                showWaringModal("Bạn ơi", "Bạn chưa chọn chuyến bay")
                return
            } else {
                dispath(setflightSelectReturn(flightSelectReturn));
                dispath(settotalflight(total));
                navigate('/select-fight-infor')
            }
        }

    }
    const myLanguage = useSelector((state) => state.language.language);
    const sourceAirportCity = removeDiacritics(data.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data.destinationAirportCity, myLanguage)
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
                            <IconUserCircle style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconShoppingCart style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>

                    </Col>
                </Row>
            </div>
            <div className='mains-container'>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={15} className='infor-user-select-flight'>
                        {hideSelectFightReturn ?
                            <InfoFlyReturn
                                listFlightReturn={listFlightReturn}
                                setFlightSelectReturn={setFlightSelectReturn}
                            />
                            :
                            <InfoFly
                                listFlight={listFlight}
                                setFlightSelect={setFlightSelect}

                            />
                        }
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
                    <Col span={6}>

                    </Col>
                    <Col span={12} className='footer-price-form'>
                        <Row>
                            <Col span={16} className='footer-price'>{getText('Total')}:
                            </Col>
                            <Col span={8} className='footer-price'>{totalFomat}</Col>
                        </Row>
                    </Col>
                    <Col md={24} lg={6} xl={6} className='footer-price-btn'>
                        <Button className='footer-continue-select' onClick={() => handleContinue()} >{getText('Continue')}</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectFlight;