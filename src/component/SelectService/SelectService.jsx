import { Row, Col, Button, Typography } from 'antd'
import '../SelectService/SelectService.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Service from './Service/Service'
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly'
import { formatCurrency, removeDiacritics } from '../../utils/format'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import { getServiceAirline } from '../../services/apiBooking'
const { Title, Text } = Typography

const SelectService = () => {
    useEffect(() => {
        feachListService()
    }, [])
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const data = useSelector((state) => state.homePage.homePageInfor)
    const flightSelect = useSelector((state) => state.flightSelect.flightSelect)
    const flightSelectReturn = useSelector((state) => state.flightSelect.flightSelectReturn)
    const totalFlight = useSelector((state) => state.flightSelect.totalflight)
    const totalFlightFomat = formatCurrency(Number(totalFlight))

    const data_passengers = ''
    const myLanguage = useSelector((state) => state.language.language)
    const sourceAirportCity = removeDiacritics(data.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data.destinationAirportCity, myLanguage)

    const [value, setValue] = useState(1)
    const [baggageOptions, setBaggageOptions] = useState([])
    const [mealOptions, setMealOptions] = useState([])
    const [seatOptions, setSeatOptions] = useState({
        seatsInBooking: [],
        id: '',
        aircraftCode: '',
        aircraftName: '',
        capacity: 0,
        rowNumbers: 0,
        columnNumbers: 0,
        type: '',
        ECONOMY: {
            seatNumber: 0,
            servicePrice: ''
        },
        BUSINESS: {
            seatNumber: 0,
            servicePrice: ''
        },
        PREMIUM_ECONOMY: {
            seatNumber: 0,
            servicePrice: ''
        }
    })
    const [defaultBaggageOptions, setDefaultBaggageOptions] = useState([])
    const [defaultMealOptions, setDefaultMealOptions] = useState([])

    const feachListService = async () => {
        try {
            let res = await getServiceAirline(flightSelect.id, flightSelect.airline.id, data.seatId)
            setBaggageOptions(res.data.baggageOptions)
            setMealOptions(res.data.mealOptions)
            setDefaultBaggageOptions(res.data.defaultOpt.defaultBaggageOptions)
            setDefaultMealOptions(res.data.defaultOpt.defaultMealOptions)
            setSeatOptions(res.data.seatOptions)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="select-flight">
            <div className="info-flight">
                <Row>
                    <Col span={18} className="infor-select">
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {!data.roundTrip ? (
                                    <Title level={4}>
                                        {' '}
                                        {getText('ROUND-TRIP')} | {data.adult} {getText('Adults')}, {data.children}{' '}
                                        {getText('Children')}, {data.baby} {getText('Baby')}
                                    </Title>
                                ) : (
                                    <Title level={4}>
                                        {' '}
                                        {getText('ONE-WAY-FLIGHT')}| {data.adult} {getText('Adults')}, {data.children}{' '}
                                        {getText('Children')}, {data.baby} {getText('Baby')}
                                    </Title>
                                )}
                            </span>
                        </Row>
                        <Row>
                            <div>
                                <Title level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500 }}>
                                    {getText('From')}:
                                    <Text
                                        type="secondary"
                                        style={{
                                            color: 'red',
                                            fontSize: 18,
                                            fontWeight: 500,
                                            paddingRight: 30,
                                            marginLeft: 10
                                        }}
                                    >
                                        {sourceAirportCity}
                                    </Text>
                                    <Text level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500 }}>
                                        {' '}
                                        {getText('To')}:{' '}
                                    </Text>
                                    <Text
                                        type="secondary"
                                        style={{
                                            color: 'red',
                                            fontSize: 18,
                                            fontWeight: 500,
                                            paddingRight: 30,
                                            marginLeft: 10
                                        }}
                                    >
                                        {destinationAirportCity}
                                    </Text>
                                </Title>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} className="icon-select">
                        <Row>
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCircle style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconShoppingCart style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="mains-container">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={15} className="infor-user-select-flight">
                        <Service
                            baggageOptions={baggageOptions}
                            mealOptions={mealOptions}
                            defaultBaggageOptions={defaultBaggageOptions}
                            defaultMealOptions={defaultMealOptions}
                            seatOptions={seatOptions}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={9}>
                        <SelectInfoFly flightSelect={flightSelect} flightSelectReturn={flightSelectReturn} />
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Row>
                    <Col span={2}></Col>
                    <Col xs={11} sm={11} md={11} lg={4} xl={4}>
                        <Button
                            className="footer-back"
                            onClick={() => {
                                navigate('/passengers')
                            }}
                        >
                            {getText('Back')}
                        </Button>
                    </Col>
                    <Col span={12} className="footer-price-form-info">
                        <Row>
                            <Col
                                span={18}
                                className="footer-price-info"
                                style={{ display: 'flex', justifyContent: 'end' }}
                            >
                                {getText('Total')}:
                            </Col>
                            <Col span={6} className="footer-price-info">
                                {totalFlightFomat}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={11} sm={11} md={11} lg={6} xl={6}>
                        <Button className="footer-continue-info" onClick={() => navigate('/payment-methods')}>
                            {getText('Continue')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectService
