import { Row, Col, Button, Typography } from 'antd'
import '../Passengers/Passengers.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly'
import Passenger from './Passenger/Passenger'
import { formatCurrency, removeDiacritics } from '../../utils/format'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import { showWaringModal } from '../../utils/modalError'
import { setInfoPassengers } from '../../redux/reducers/booking'

const { Title, Text } = Typography
const Passengers = () => {
    const navigate = useNavigate()
    const { getText } = useLanguage()

    const dispath = useDispatch()

    const data = useSelector((state) => state.homePage.homePageInfor)
    const flightSelect = useSelector((state) => state.flightSelect.flightSelect)
    const flightSelectReturn = useSelector((state) => state.flightSelect.flightSelectReturn)
    const totalFlight = useSelector((state) => state.flightSelect.totalflight)
    const totalFlightFomat = formatCurrency(Number(totalFlight))
    const totalService = 0
    const totalServiceReturn = 0
    const myLanguage = useSelector((state) => state.language.language)
    const sourceAirportCity = removeDiacritics(data.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data.destinationAirportCity, myLanguage)

    const [formDataList, setFormDataList] = useState(data.adult)
    const [formDataListChildren, setFormDataListChildren] = useState(data.children)
    const [formDataListBaby, setFormDataListBaby] = useState(data.baby)

    let initialFormState = {
        id: '',
        gender: 'MALE',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        country: '',
        phoneNumber: '',
        email: '',
        address: '',
        passengerType: 'ADULT',
        seat: {
            seatId: '',
            flightId: '',
            seatCode: null,
            seatClass: '',
            seatPrice: 0
        },
        baggage: {
            serviceOptId: '',
            flightId: '',
            servicePrice: 0
        },
        meal: {
            serviceOptId: '',
            flightId: '',
            quantity: 0,
            servicePrice: 0
        },
        seatsReturn: {
            seatId: '',
            flightId: '',
            seatCode: null,
            seatClass: '',
            seatPrice: 0
        },
        baggageReturn: {
            serviceOptId: '',
            flightId: '',
            servicePrice: 0
        },
        mealReturn: {
            serviceOptId: '',
            flightId: '',
            quantity: 0,
            servicePrice: 0
        }
    }
    let initialFormStateChildren = {
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        gender: 'MALE',
        passengerType: 'CHILD',
        seat: {
            seatId: '',
            flightId: '',
            seatCode: null,
            seatClass: '',
            seatPrice: 0
        },
        baggage: {
            serviceOptId: '',
            flightId: '',
            servicePrice: 0
        },
        meal: {
            serviceOptId: '',
            flightId: '',
            quantity: 0,
            servicePrice: 0
        },
        seatsReturn: {
            seatId: '',
            flightId: '',
            seatCode: null,
            seatClass: '',
            seatPrice: 0
        },
        baggageReturn: {
            serviceOptId: '',
            flightId: '',
            servicePrice: 0
        },
        mealReturn: {
            serviceOptId: '',
            flightId: '',
            quantity: 0,
            servicePrice: 0
        }
    }
    let initialFormStateBaby = {
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        gender: 'MALE',
        passengerType: 'INFANT',
        seat: {
            seatId: '',
            flightId: '',
            seatCode: null,
            seatClass: '',
            seatPrice: 0
        },
        baggage: {
            serviceOptId: '',
            flightId: '',
            servicePrice: 0
        },
        meal: {
            serviceOptId: '',
            flightId: '',
            quantity: 0,
            servicePrice: 0
        },
        seatsReturn: {
            seatId: '',
            flightId: '',
            seatCode: null,
            seatClass: '',
            seatPrice: 0
        },
        baggageReturn: {
            serviceOptId: '',
            flightId: '',
            servicePrice: 0
        },
        mealReturn: {
            serviceOptId: '',
            flightId: '',
            quantity: 0,
            servicePrice: 0
        }
    }
    const [formData, setFormData] = useState(Array.from({ length: formDataList }, () => ({ ...initialFormState })))
    const [formDataChildren, setFormDataChildren] = useState(
        Array.from({ length: formDataListChildren }, () => ({ ...initialFormStateChildren }))
    )
    const [formDataBaby, setFormDataBaby] = useState(
        Array.from({ length: formDataListBaby }, () => ({ ...initialFormStateBaby }))
    )

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }
    const validatePhone = (phoneNumber) => {
        return String(phoneNumber)
            .toLowerCase()
            .match(/^\d{10}$/)
    }
    const formInforPassengers = formData.concat(formDataChildren, formDataBaby)
    const handlePassengers = () => {
        for (let i = 0; i < formData.length; i++) {
            const isValiEmail = validateEmail(formData[i].email)
            const isValiPhone = validatePhone(formData[i].phoneNumber)
            if (
                formData[i].gender == '' ||
                formData[i].firstName == '' ||
                formData[i].lastName == '' ||
                formData[i].dateOfBirth == null ||
                formData[i].country == ''
            ) {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotInfo')}`, `${getText('Close')}`)
                return
            } else if (!isValiPhone) {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPhoneFomat')}`, `${getText('Close')}`)
                return
            } else if (!isValiEmail) {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotEmailFomat')}`, `${getText('Close')}`)
                return
            }
        }
        for (let i = 0; i < formDataChildren.length; i++) {
            if (
                formDataChildren[i].gender == '' ||
                formDataChildren[i].firstName == '' ||
                formDataChildren[i].lastName == '' ||
                formDataChildren[i].dateOfBirth == null
            ) {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotInfoChildren')}`, `${getText('Close')}`)
                return
            }
        }
        for (let i = 0; i < formDataBaby.length; i++) {
            if (
                formDataBaby[i].gender == '' ||
                formDataBaby[i].firstName == '' ||
                formDataBaby[i].lastName == '' ||
                formDataBaby[i].dateOfBirth == null
            ) {
                showWaringModal(`${getText('HeyFriend')}`, `${getText('NotInfoBaby')}`, `${getText('Close')}`)
                return
            }
        }
        dispath(setInfoPassengers(formInforPassengers))
        navigate('/select-service')
    }
    return (
        <div className='select-flight'>
            <div className='info-flight'>
                <Row>
                    <Col span={18} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {data.roundTrip ? (
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
                            <IconUserCircle style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconShoppingCart style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='mains-container'>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={15} className='infor-user-select-flight'>
                        <Passenger
                            formData={formData}
                            setFormData={setFormData}
                            formDataChildren={formDataChildren}
                            setFormDataChildren={setFormDataChildren}
                            formDataBaby={formDataBaby}
                            setFormDataBaby={setFormDataBaby}
                        />
                    </Col>
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
                    <Col span={2}></Col>
                    <Col xs={11} sm={11} md={11} lg={4} xl={4}>
                        <Button
                            className='footer-back'
                            onClick={() => {
                                navigate('/select-fight-infor')
                            }}
                        >
                            {getText('Back')}
                        </Button>
                    </Col>
                    <Col span={12} className='footer-price-form-info'>
                        <Row>
                            <Col
                                span={18}
                                className='footer-price-info'
                                style={{ display: 'flex', justifyContent: 'end' }}
                            >
                                {getText('Total')}:
                            </Col>
                            <Col span={6} className='footer-price-info'>
                                {totalFlightFomat}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={11} sm={11} md={11} lg={6} xl={6}>
                        <Button className='footer-continue-info' onClick={() => handlePassengers()}>
                            {getText('Continue')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Passengers
