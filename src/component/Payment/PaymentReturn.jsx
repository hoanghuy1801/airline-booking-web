/* eslint-disable no-unused-vars */
import axios from '../../utils/awiosCustomize'
import { useEffect, useState } from 'react'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { postBooking } from '../../services/apiBooking'
import { Button, Col, Result, Row, Typography } from 'antd'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import { formatCurrency, removeDiacritics } from '../../utils/format'
import './Payment.css'
import moment from 'moment'
const { Title, Text } = Typography
const PaymentReturn = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [success, setSuccess] = useState(true)
    const { getText } = useLanguage()
    const [amount, setAmount] = useState()
    const [bookingCode, setBookingCode] = useState('')
    const data = useSelector((state) => state.homePage.homePageInfor)
    const dataPassengers = useSelector((state) => state.flightSelect.infoPassengers)
    const flightSelect = useSelector((state) => state.flightSelect.flightSelect)
    const flightSelectReturn = useSelector((state) => state.flightSelect.flightSelectReturn)
    const totalFlight = useSelector((state) => state.flightSelect.totalflight)
    const myLanguage = useSelector((state) => state.language.language)
    const sourceAirportCity = removeDiacritics(data.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data.destinationAirportCity, myLanguage)

    useEffect(() => {
        if (location.search) {
            const searchParams = new URLSearchParams(location.search)

            if (searchParams.get('partnerCode')) {
                axios
                    .get('api/v1/payment/momo-return' + location.search)
                    .then((res) => {
                        console.log('duy')
                    })
                    .catch(() => setSuccess(false))
            } else {
                axios
                    .get('api/v1/payment/vnpay-return' + location.search)
                    .then(async (res) => {
                        if (res.status === 200) {
                            setAmount(searchParams.get('vnp_Amount'))
                            setBookingCode(searchParams.get('vnp_TxnRef'))
                            if (!data.roundTrip) {
                                const passengers = dataPassengers.map((data) => {
                                    const { id, baggage, meal, seat, ...passengers } = data
                                    let serviceOpts = []
                                    let seats = []
                                    if (seat?.seatId !== '') {
                                        seats = [seat]
                                    }

                                    if (meal?.serviceOptId !== '') {
                                        serviceOpts = [...meal]
                                    }
                                    if (baggage?.serviceOptId !== '') {
                                        serviceOpts.push(baggage)
                                    }
                                    return {
                                        ...passengers,
                                        seats,
                                        serviceOpts
                                    }
                                })
                                const payment = {
                                    transactionCode: searchParams.get('vnp_TransactionNo'),
                                    orderId: searchParams.get('vnp_TxnRef'),
                                    transactionDate: moment(searchParams.get('vnp_PayDate'), 'YYYYMMDDHHmmss').toDate(),
                                    transactionInfo: searchParams.get('vnp_OrderInfo'),
                                    transactionAmount: searchParams.get('vnp_Amount') / 100,
                                    paymentMethod: 'VNPAY',
                                    paymentTransactionType: 'PAYMENT'
                                }
                                let dataBooking = {
                                    flightAwayId: flightSelect?.id,
                                    flightReturnId: null,
                                    amountTotal: totalFlight,
                                    seatTotal: 1,
                                    seatId: data?.seatId,
                                    journeyType: 'ONE_AWAY',
                                    passengers,
                                    payment
                                }
                                let res = await postBooking(dataBooking)
                                setBookingCode(res.data.bookingCode)
                            } else {
                                const passengers = dataPassengers.map((data) => {
                                    const {
                                        id,
                                        baggage,
                                        meal,
                                        seat,
                                        seatsReturn,
                                        baggageReturn,
                                        mealReturn,
                                        ...passengers
                                    } = data
                                    let serviceOpts = []
                                    let seats = []
                                    if (seat?.seatId !== '') {
                                        seats.push(seat)
                                    }
                                    if (seatsReturn?.seatId !== '') {
                                        seats.push(seatsReturn)
                                    }
                                    if (meal?.serviceOptId !== '') {
                                        serviceOpts.push(...meal)
                                    }
                                    if (mealReturn?.serviceOptId !== '') {
                                        serviceOpts.push(...mealReturn)
                                    }
                                    if (baggage?.serviceOptId !== '') {
                                        serviceOpts.push(baggage)
                                    }
                                    if (baggageReturn?.serviceOptId !== '') {
                                        serviceOpts.push(baggageReturn)
                                    }
                                    return {
                                        ...passengers,
                                        seats,
                                        serviceOpts
                                    }
                                })
                                const payment = {
                                    transactionCode: searchParams.get('vnp_TransactionNo'),
                                    orderId: searchParams.get('vnp_TxnRef'),
                                    transactionDate: moment(searchParams.get('vnp_PayDate'), 'YYYYMMDDHHmmss').toDate(),
                                    transactionInfo: searchParams.get('vnp_OrderInfo'),
                                    transactionAmount: searchParams.get('vnp_Amount') / 100,
                                    paymentMethod: 'VNPAY',
                                    paymentTransactionType: 'PAYMENT'
                                }

                                let dataBooking = {
                                    flightAwayId: flightSelect?.id,
                                    flightReturnId: flightSelectReturn?.id,
                                    amountTotal: totalFlight,
                                    seatId: data?.seatId,
                                    seatTotal: 1,
                                    journeyType: 'RETURN',
                                    passengers,
                                    payment
                                }
                                let res = await postBooking(dataBooking)
                                setBookingCode(res.data.bookingCode)
                            }
                        }
                    })
                    .catch(() => {
                        setSuccess(false)
                    })
            }
        }
    }, [])

    return (
        <>
            <div className='main-payment-return'>
                <div className='info-flight'>
                    <Row>
                        <Col span={18} className='infor-select'>
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
                                            {getText('ONE-WAY-FLIGHT')}| {data.adult} {getText('Adults')},{' '}
                                            {data.children} {getText('Children')}, {data.baby} {getText('Baby')}
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
                                <IconShoppingCart
                                    style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }}
                                />
                                <IconCurrencyDollar
                                    style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }}
                                />
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className='mains-return'>
                    <Row className='payment-return'>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className='infor-user-select-flight'>
                            {success ? (
                                <Result
                                    status='success'
                                    title={
                                        <>
                                            <Text className='title-payment-return'>{getText('SuccessPayment')}</Text>
                                        </>
                                    }
                                    subTitle={
                                        <>
                                            <Text className='text-payment-return'>
                                                {getText('PaymentTotal')} {formatCurrency(Number(amount / 100))}
                                            </Text>
                                            <br />
                                            <Text className='text-payment-return'>
                                                {getText('CodeBooking')}
                                                <Text className='booking-code'> {bookingCode}</Text>{' '}
                                            </Text>
                                        </>
                                    }
                                />
                            ) : (
                                <>
                                    <Result
                                        status='error'
                                        title={
                                            <>
                                                <Text className='title-payment-return'> {getText('ErrorPayment')}</Text>
                                            </>
                                        }
                                        subTitle={
                                            <>
                                                <Text className='text-payment-return'>
                                                    {getText('Error_Notification')}
                                                </Text>
                                            </>
                                        }
                                    />
                                </>
                            )}
                        </Col>
                    </Row>
                    <div className='btn-payment-form'>
                        <Row>
                            <Button className='btn-payment' onClick={() => navigate('/')}>
                                {getText('Back')}
                            </Button>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentReturn
