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
import { formatCurrency, formatDate } from '../../utils/format';
import { showWaringModal } from '../../utils/modalError';
import { setflightSelect, setflightSelectReturn, settotalflight } from '../../redux/reducers/booking';

const { Title, Text } = Typography;
const SelectFlight = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
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
            flightSeatPrices: [
                {
                    id: "",
                    createdAt: "",
                    updatedAt: "",
                    infantPrice: "",
                    adultPrice: "",
                    childrenPrice: "",
                    seatClass: ""
                }
            ]
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
            flightSeatPrices: [
                {
                    id: "",
                    createdAt: "",
                    updatedAt: "",
                    infantPrice: "",
                    adultPrice: "",
                    childrenPrice: "",
                    seatClass: ""
                }
            ]
        }
    );
    const total = flightSelect.flightSeatPrices[0].adultPrice
        + flightSelect.flightSeatPrices[0].childrenPrice
        + flightSelect.flightSeatPrices[0].infantPrice
        + Number(flightSelectReturn.flightSeatPrices[0].adultPrice)
        + Number(flightSelectReturn.flightSeatPrices[0].childrenPrice)
        + Number(flightSelectReturn.flightSeatPrices[0].infantPrice);
    const totalFomat = formatCurrency(total);

    const handleShapeClick = (index) => {
        setSelectedShapeIndex(index);
    };
    useEffect(() => {
        feachListFlight();
    }, []);
    const data = useSelector((state) => state.homePage.homePageInfor);

    const feachListFlight = async () => {
        let res = await getListFlight(data.sourceAirport, data.destinationAirport, formatDate(data.departureDate), data.seatClass, data.adult, data.children, data.baby);
        setListFlight(res.data);
    }

    const handleContinue = async () => {
        if (flightSelect.flightSeatPrices[0].adultPrice == '') {
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
                let res = await getListFlight(data.destinationAirport, data.sourceAirport, formatDate(data.returnDate), data.seatClass, data.adult, data.children, data.baby);
                setListFlightReturn(res.data);
                setHideSelectFightReturn(true)
            } else if (flightSelectReturn.flightSeatPrices[0].adultPrice == '') {
                showWaringModal("Bạn ơi", "Bạn chưa chọn chuyến bay")
                return
            } else {
                dispath(setflightSelectReturn(flightSelectReturn));
                dispath(settotalflight(total));
                navigate('/select-fight-infor')
            }
        }

    }
    return (
        <div className="select-flight">
            <div className="info-flight">
                <Row>
                    <Col span={18} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {!data.roundTrip ?
                                    <Title level={4}>CHUYẾN BAY MỘT CHIỀU | {data.adult} Người lớn, {data.children} Trẻ em, {data.baby} Em bé</Title>
                                    :
                                    <Title level={4}>CHUYẾN BAY KHỨ HỒI| {data.adult} Người lớn, {data.children} Trẻ em, {data.baby} Em bé</Title>
                                }
                            </span>
                        </Row>
                        <Row>
                            <div>
                                <Title level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500 }}>
                                    Điểm khởi hành:
                                    <Text type="secondary"
                                        style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30, marginLeft: 10 }}>{data.sourceAirportCity}</Text>
                                    <Text level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm đến </Text>
                                    <Text type="secondary"
                                        style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30, marginLeft: 10 }}>{data.destinationAirportCity}</Text>
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
                            <Col span={16} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={8} className='footer-price'>{totalFomat}</Col>
                        </Row>
                    </Col>
                    <Col md={24} lg={6} xl={6} className='footer-price-btn'>
                        <Button className='footer-continue-select' onClick={() => handleContinue()} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectFlight;