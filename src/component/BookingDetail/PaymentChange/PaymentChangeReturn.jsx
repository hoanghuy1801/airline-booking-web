import axios from '../../../utils/awiosCustomize'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, Col, Result, Row, Typography } from 'antd'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { formatCurrency } from '../../../utils/format'
import './PaymentChange.css'
import { putBooking } from '../../../services/apiBooking'
import { postAddService } from '../../../services/apiMyFlight'
const { Text } = Typography
const PaymentChangeReturn = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [success, setSuccess] = useState(true)
    const { getText } = useLanguage()
    const [amount, setAmount] = useState()
    const [bookingCode, setBookingCode] = useState('')
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const selectChangeFly = useSelector((state) => state.myFlight?.selectChangeFly)
    const selectedFlyChange = useSelector((state) => state.myFlight?.selectedFlyChange)
    const totalChange = useSelector((state) => state.myFlight.totalChange)
    const dataPassengers = useSelector((state) => state.myFlight?.dataPassengersService)
    const dataPassengersReturn = useSelector((state) => state.myFlight?.dataPassengersServiceReturn)
    const changeService = useSelector((state) => state.myFlight.changeService)
    useEffect(() => {
        if (location.search) {
            const searchParams = new URLSearchParams(location.search)
            axios.get('api/v1/payment/vnpay-return' + location.search).then(async (res) => {
                if (res.status === 200) {
                    setAmount(searchParams.get('vnp_Amount'))
                    setBookingCode(searchParams.get('vnp_TxnRef'))
                    if (changeService) {
                        const passenger = dataPassengers.map((data) => {
                            const { baggage, meal, seat, ...passenger } = data
                            let serviceOpts = []
                            let seats = []
                            if (seat?.seatId !== '') {
                                seats = [seat]
                            }
                            if (baggage?.serviceOptId === '') {
                                serviceOpts = [...meal]
                            }
                            if (meal?.serviceOptId === '') {
                                serviceOpts = [baggage]
                            } else {
                                serviceOpts = [...meal, baggage]
                            }
                            return {
                                ...passenger,
                                seats,
                                serviceOpts
                            }
                        })

                        const passengersReturn = dataPassengersReturn.map((data) => {
                            const { baggageReturn, mealReturn, seatsReturn, ...passengersReturn } = data
                            let serviceOpts = []
                            let seats = []
                            if (seatsReturn?.seatId !== '') {
                                seats = [seatsReturn]
                            }
                            if (baggageReturn?.serviceOptId === '') {
                                serviceOpts = [...mealReturn]
                            }
                            if (mealReturn?.serviceOptId === '') {
                                serviceOpts = [baggageReturn]
                            } else {
                                serviceOpts = [...mealReturn, baggageReturn]
                            }
                            return {
                                ...passengersReturn,
                                seats,
                                serviceOpts
                            }
                        })

                        const mergedData = passenger.map((item1) => {
                            const matchingItem = passengersReturn.find((item2) => item2.id === item1.id)
                            if (matchingItem) {
                                // Nếu tìm thấy ID giống nhau, gộp thông tin từ cả hai mảng
                                return {
                                    ...item1,
                                    seats: [...item1.seats, ...matchingItem.seats],
                                    serviceOpts: [...item1.serviceOpts, ...matchingItem.serviceOpts]
                                }
                            }
                            return item1
                        })

                        // Thêm các đối tượng không có trong data1 vào mảng gộp
                        passengersReturn.forEach((item2) => {
                            const found = passenger.find((item1) => item1.id === item2.id)
                            if (!found) {
                                mergedData.push(item2)
                            }
                        })
                        const passengers = mergedData.map((item) => {
                            // Tạo một bản sao của đối tượng hiện tại để không làm thay đổi dữ liệu gốc
                            const newItem = { ...item }
                            // Loại bỏ các biến không mong muốn
                            newItem.passengerId = newItem.id // Đổi tên biến "id" thành "passengerId"
                            delete newItem.id
                            delete newItem.address
                            delete newItem.color
                            delete newItem.country
                            delete newItem.createdAt
                            delete newItem.dateOfBirth
                            delete newItem.email
                            delete newItem.firstName
                            delete newItem.gender
                            delete newItem.imageUrl
                            delete newItem.isPasserby
                            delete newItem.lastName
                            delete newItem.passengerCode
                            delete newItem.passengerType
                            delete newItem.phoneNumber
                            delete newItem.seatPrice
                            delete newItem.status
                            delete newItem.taxService
                            delete newItem.updatedAt
                            return newItem
                        })
                        let data = {
                            bookingId: bookingDetails?.id,
                            amountTotal: totalChange,
                            seatTotal: 1,
                            passengers
                        }
                        await postAddService(data)
                    } else {
                        let total = bookingDetails?.amountTotal + totalChange
                        let data = {
                            bookingId: bookingDetails?.id,
                            flightId: selectedFlyChange?.id,
                            flightAwayId: selectChangeFly?.flightAwayDetail?.id,
                            flightReturnId: selectChangeFly?.flightReturnDetail?.id,
                            amountTotal: total
                        }
                        await putBooking(data)
                    }
                } else {
                    setSuccess(false)
                }
            })
        }
    }, [])

    return (
        <>
            <div className='main-payment-return'>
                <div className='info-flight'>
                    <Row>
                        <Col span={24} className='code-booking-change'>
                            <p>
                                Mã đặt chỗ :{' '}
                                <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                    {bookingDetails?.bookingCode}
                                </span>
                            </p>
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
                                                <Text className='booking-code'>
                                                    {' '}
                                                    {bookingDetails?.bookingCode}
                                                </Text>{' '}
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
export default PaymentChangeReturn
