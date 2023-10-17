import { Row, Col, Button, Typography } from 'antd'
import '../SelectFlight/SelectFlight.css'
import { useNavigate } from 'react-router-dom'
import InfoFly from './InfoFly/InfoFly'
import SelectInfoFly from './SelectInfoFly/SelectInfoFly'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react'
import InfoFlyReturn from './InfoFly/InfoFlyReturn'
import { getListFlight } from '../../services/apiBooking'
import { formatCurrency, formatDate, removeDiacritics } from '../../utils/format'
import { showWaringModal } from '../../utils/modalError'
import { setflightSelect, setflightSelectReturn, settotalflight } from '../../redux/reducers/booking'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import { Spin } from 'antd'
const { Title, Text } = Typography
const SelectFlight = () => {
    const [loading, setLoading] = useState(true)
    const [listFlight, setListFlight] = useState([])
    useEffect(() => {
        feachListFlight()
    }, [])
    const navigate = useNavigate()
    const dispath = useDispatch()
    const { getText } = useLanguage()
    const [hideSelectFightReturn, setHideSelectFightReturn] = useState(false)
    const totalService = 0
    const totalServiceReturn = 0
    const [listFlightReturn, setListFlightReturn] = useState([])
    const [flightSelect, setFlightSelect] = useState({
        id: '',
        createdAt: '',
        updatedAt: '',
        flightCode: '',
        flightName: '',
        departureTime: '',
        arrivalTime: '',
        status: '',
        airline: {
            id: '',
            airlineCode: '',
            airlineName: '',
            avatarUrl: ''
        },
        aircraft: {
            id: '',
            aircraftCode: '',
            aircraftName: '',
            capacity: 0,
            rowNumbers: 0,
            columnNumbers: 0,
            businessNumber: 0,
            economyNumber: 0,
            premiumEconomyNumber: 0,
            type: ''
        },
        sourceAirport: {
            id: 0,
            airportCode: '',
            airportName: 't',
            visualIndex: 0
        },
        destinationAirport: {
            id: 0,
            airportCode: '',
            airportName: '',
            visualIndex: 0
        },
        flightSeatPrice: {
            id: '',
            createdAt: '',
            updatedAt: '',
            infantPrice: '',
            adultPrice: '',
            childrenPrice: '',
            seatClass: '',
            taxService: {
                id: '',
                airportFee: '',
                systemServiceSurcharge: '',
                systemAdministrationSurcharge: '',
                securityScreeningFee: '',
                VATTax: '',
                totalFee: '',
                fuelCharge: null,
                flightType: ''
            }
        }
    })
    const [flightSelectReturn, setFlightSelectReturn] = useState({
        id: '',
        createdAt: '',
        updatedAt: '',
        flightCode: '',
        flightName: '',
        departureTime: '',
        arrivalTime: '',
        status: '',
        airline: {
            id: '',
            airlineCode: '',
            airlineName: '',
            avatarUrl: ''
        },
        aircraft: {
            id: '',
            aircraftCode: '',
            aircraftName: '',
            capacity: 0,
            rowNumbers: 0,
            columnNumbers: 0,
            businessNumber: 0,
            economyNumber: 0,
            premiumEconomyNumber: 0,
            type: ''
        },
        sourceAirport: {
            id: 0,
            airportCode: '',
            airportName: 't',
            visualIndex: 0
        },
        destinationAirport: {
            id: 0,
            airportCode: '',
            airportName: '',
            visualIndex: 0
        },
        flightSeatPrice: {
            id: '',
            createdAt: '',
            updatedAt: '',
            infantPrice: '',
            adultPrice: '',
            childrenPrice: '',
            seatClass: '',
            taxService: {
                id: '',
                airportFee: '',
                systemServiceSurcharge: '',
                systemAdministrationSurcharge: '',
                securityScreeningFee: '',
                VATTax: '',
                totalFee: '',
                fuelCharge: null,
                flightType: ''
            }
        }
    })
    const data = useSelector((state) => state.homePage.homePageInfor)
    const totalPeople = data.children + data.adult
    const total =
        flightSelect.flightSeatPrice.adultPrice * data.adult +
        flightSelect.flightSeatPrice.childrenPrice * data.children +
        flightSelect.flightSeatPrice.infantPrice * data.baby +
        flightSelect.flightSeatPrice.taxService.totalFee * totalPeople +
        totalService +
        totalServiceReturn +
        flightSelectReturn.flightSeatPrice.adultPrice * data.adult +
        flightSelectReturn.flightSeatPrice.childrenPrice * data.children +
        flightSelectReturn.flightSeatPrice.infantPrice * data.baby +
        flightSelectReturn.flightSeatPrice.taxService.totalFee * totalPeople
    const totalFomat = formatCurrency(Number(total))

    const feachListFlight = async () => {
        try {
            setLoading(true) // Bắt đầu hiển thị Spinner
            const res = await getListFlight(
                data.sourceAirport,
                data.destinationAirport,
                formatDate(data.departureDate),
                data.seatId,
                data.adult,
                data.children,
                data.baby
            )
            setListFlight(res.data) // Lưu kết quả từ API vào biến data
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false) // Dừng hiển thị Spinner khi API hoàn thành
        }
    }

    const handleContinue = async () => {
        if (flightSelect.flightSeatPrice.adultPrice == '') {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotSelectFlight')}`, `${getText('Close')}`)
            return
        }
        if (!data.roundTrip) {
            dispath(settotalflight(total))
            dispath(setflightSelectReturn(flightSelectReturn))
            dispath(setflightSelect(flightSelect))
            navigate('/select-fight-infor')
        } else {
            if (hideSelectFightReturn == false) {
                dispath(setflightSelect(flightSelect))
                dispath(settotalflight(total))
                let res = await getListFlight(
                    data.destinationAirport,
                    data.sourceAirport,
                    formatDate(data.returnDate),
                    data.seatId,
                    data.adult,
                    data.children,
                    data.baby
                )
                setListFlightReturn(res.data)
                setHideSelectFightReturn(true)
            } else if (flightSelectReturn.flightSeatPrice.adultPrice == '') {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotSelectFlight')}`, `${getText('Close')}`)
                return
            } else {
                dispath(setflightSelectReturn(flightSelectReturn))
                dispath(settotalflight(total))
                navigate('/select-fight-infor')
            }
        }
    }
    const myLanguage = useSelector((state) => state.language.language)
    const sourceAirportCity = removeDiacritics(data.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data.destinationAirportCity, myLanguage)
    return (
        <div className='select-flight'>
            <div className='info-flight'>
                <Row>
                    <Col span={18} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {data.roundTrip ? (
                                    <Title level={4}>
                                        {getText('ROUND-TRIP')} | {data.adult} {getText('Adults')}, {data.children}{' '}
                                        {getText('Children')}, {data.baby} {getText('Baby')}
                                    </Title>
                                ) : (
                                    <Title level={4}>
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
                                        type='secondary'
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
                                        type='secondary'
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
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} className='icon-select'>
                        <Row>
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
                    {loading ? ( // Kiểm tra biến trạng thái để hiển thị Spinner
                        <Col xs={24} sm={24} md={24} lg={24} xl={15} style={{ paddingTop: 200 }}>
                            <Row className='col-spin'>
                                <Spin size='large' className='spin' />
                            </Row>
                            <Row className='col-spin'>
                                <Text className='search-spin'>{getText('searchSpin')}</Text>
                            </Row>
                        </Col>
                    ) : (
                        <Col xs={24} sm={24} md={24} lg={24} xl={15} className='infor-user-select-flight'>
                            {hideSelectFightReturn ? (
                                <>
                                    {listFlightReturn.length != 0 ? (
                                        <InfoFlyReturn
                                            listFlightReturn={listFlightReturn}
                                            setFlightSelectReturn={setFlightSelectReturn}
                                        />
                                    ) : (
                                        <div className='no-flight'>
                                            <Text className='text-NotificationFlight'>{getText('NotFlight')}</Text>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {listFlight.length != 0 ? (
                                        <InfoFly listFlight={listFlight} setFlightSelect={setFlightSelect} />
                                    ) : (
                                        <div className='no-flight'>
                                            <Text className='text-NotificationFlight'>{getText('NotFlight')}</Text>
                                        </div>
                                    )}
                                </>
                            )}
                        </Col>
                    )}

                    <Col xs={24} sm={24} md={24} lg={24} xl={9}>
                        <SelectInfoFly
                            flightSelect={flightSelect}
                            flightSelectReturn={flightSelectReturn}
                            totalService={totalService}
                            totalServiceReturn={totalServiceReturn}
                        />
                    </Col>
                </Row>
            </div>
            <div className='footer'>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12} className='footer-price-form'>
                        <Row>
                            <Col span={16} className='footer-price'>
                                {getText('Total')}:
                            </Col>
                            <Col span={8} className='footer-price'>
                                {totalFomat}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={24} lg={6} xl={6} className='footer-price-btn'>
                        <Button className='footer-continue-select' onClick={() => handleContinue()}>
                            {getText('Continue')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlight
