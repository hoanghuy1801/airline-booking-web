import { Row, Col, Drawer, Button, Form, Input, Collapse, Typography, Modal } from 'antd'
import '../BookingDetail/BookingDetail.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CollapseDetail from './Collapse/CollapseDetail'
import { useSelector } from 'react-redux'
import { CaretRightOutlined } from '@ant-design/icons'
import { changeStatus, convertGender } from '../../utils/utils'
import vietjet from '../../assets/vietjet.svg'
import {
    calculateTimeDifference,
    convertString,
    formatCurrency,
    formatDateString,
    formatTime
} from '../../utils/format'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import { InputOTP } from 'antd-input-otp'
import { showErrorModal, showSuccessModal, showWaringModal } from '../../utils/modalError'
import { postSendPhoneOTP, postVerifyPhoneOTPCancel } from '../../services/apiAuth'
import { openNotification } from '../../utils/Notification'
import { patchBooking } from '../../services/apiBooking'
const { TextArea } = Input
const { Text } = Typography
const BookingDetail = () => {
    const [isCounting, setIsCounting] = useState(false)
    const { getText } = useLanguage()
    const [form] = Form.useForm()
    const [inputNumberPhone, setInputNumberPhone] = useState()
    const [reason, setReason] = useState('')
    const [timeLeft, setTimeLeft] = useState(120)
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleInputChange = (e) => {
        setInputNumberPhone(e.target.value)
    }
    const [openCaneclFight, setOpenCaneclFight] = useState(false)
    const navigate = useNavigate()
    const showDrawerCaneclFight = () => {
        setOpenCaneclFight(true)
    }
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const flightReturnDetail = useSelector((state) => state.myFlight.bookingDetails?.flightReturnDetail)
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const language = useSelector((state) => state.language.language)
    const passengerAwaysDetail = useSelector(
        (state) => state.myFlight.bookingDetails?.flightAwayDetail?.passengerAwaysDetail
    )
    const passengerReturnsDetail = useSelector(
        (state) => state.myFlight.bookingDetails?.flightReturnDetail?.passengerReturnsDetail
    )
    const addReturnToPassengers = (passengers, returns) => {
        return passengers.map((passenger) => {
            const matchingReturn = returns.find((r) => r.id === passenger.id)
            if (matchingReturn) {
                // Tạo một đối tượng mới với thuộc tính "return"
                return { ...passenger, return: matchingReturn }
            } else {
                return passenger // Không tìm thấy return, trả về nguyên bản
            }
        })
    }

    let aduls = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'ADULT')
    let childs = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'CHILD')
    let infants = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'INFANT')
    let updatedAduls = aduls
    let updatedChilds = childs
    let updatedInfants = infants
    if (passengerReturnsDetail !== undefined) {
        let adultsReturn = passengerReturnsDetail.filter(
            (passengerReturnsDetail) => passengerReturnsDetail.passengerType === 'ADULT'
        )
        let childsReturn = passengerReturnsDetail.filter(
            (passengerReturnsDetail) => passengerReturnsDetail.passengerType === 'CHILD'
        )
        let infantsReturn = passengerReturnsDetail.filter(
            (passengerReturnsDetail) => passengerReturnsDetail.passengerType === 'INFANT'
        )
        updatedAduls = addReturnToPassengers(aduls, adultsReturn)
        updatedChilds = addReturnToPassengers(childs, childsReturn)
        updatedInfants = addReturnToPassengers(infants, infantsReturn)
    }

    const handleFinish = async (values) => {
        const { otp } = values
        if (!otp || otp.includes(undefined) || otp.includes(''))
            return form.setFields([
                {
                    name: 'otp',
                    errors: [`${getText('NotValidOTP')}`]
                }
            ])
        try {
            await postVerifyPhoneOTPCancel(bookingDetails.id, convertString(otp))
            let dataCancel = {
                bookingId: bookingDetails.id,
                note: reason
            }
            await patchBooking(dataCancel)
            openNotification('success', `${getText('Notification')}`, `${getText('SendRefundSuccess')}`)
            setIsModalOpen(false)
        } catch (error) {
            showErrorModal(`${getText('Notification')}`, `${getText('NotOTP')}`, `${getText('Close')}`)
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
        setIsCounting(true)
    }
    const validatePhone = (phoneNumber) => {
        return String(phoneNumber)
            .toLowerCase()
            .match(/^\d{10}$/)
    }
    function isPhoneNumberExists(phoneNumber) {
        // Sử dụng phương thức some() để kiểm tra xem số điện thoại có tồn tại trong dữ liệu hay không
        return passengerAwaysDetail.some((customer) => customer.phoneNumber === phoneNumber)
    }
    const handleRefund = async () => {
        setTimeLeft(120)
        const isValiPhone = validatePhone(inputNumberPhone)
        if (!isValiPhone) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPhoneFomat')}`, `${getText('Close')}`)
            return
        }
        if (reason === '') {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotInfo')}`, `${getText('Close')}`)
            return
        }
        if (!isPhoneNumberExists(inputNumberPhone)) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotPhoneRefund')}`, `${getText('Close')}`)
            return
        }

        try {
            await postSendPhoneOTP(bookingDetails?.id, inputNumberPhone)
        } catch (error) {
            showWaringModal('ADMIN', 'API ERROR', `${getText('Close')}`)
        }
        showModal()
    }
    useEffect(() => {
        if (isCounting && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        } else if (timeLeft <= 0) {
            setIsCounting(false)
        }
    }, [timeLeft, isCounting])
    const hanldeSentOTP = async () => {
        if (timeLeft == 0) {
            await postSendPhoneOTP(bookingDetails?.id, inputNumberPhone)
            setTimeLeft(120)
            setIsCounting(true)
            showSuccessModal(`${getText('Notification')}`, `${getText('AgainOTP')}`, `${getText('Close')}`)
        } else {
            showWaringModal(
                `${getText('Notification')}`,
                `${getText('TryAgain')} ${getText('after')} ${timeLeft} ${getText('second')}`,
                `${getText('Close')}`
            )
        }
    }
    return (
        <div className='booking-detail' style={{ paddingBottom: '100px' }}>
            <div className='info-booking-detail'>
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} className='code-booking'>
                        <Text style={{ fontSize: '16px', fontWeight: 700 }}>
                            {getText('BOOKING_CODE')} :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {bookingDetails?.bookingCode}
                            </span>
                        </Text>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} className='code-booking-status'>
                        <Text style={{ fontSize: '16px', fontWeight: 700 }}>
                            {getText('STATUS')}:{' '}
                            <span style={{ color: 'green', fontSize: '20px', fontWeight: 700 }}>
                                {' '}
                                {changeStatus(bookingDetails?.status, language)}
                            </span>
                        </Text>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} className='code-booking-status'>
                        <Text style={{ fontSize: '18px', fontWeight: 700 }}>
                            {getText('Total')}:{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {formatCurrency(bookingDetails?.amountTotal)}
                            </span>
                        </Text>
                    </Col>
                </Row>
            </div>
            <div className='main-container-detail'>
                <Text className='title-booking'>{getText('Flight-Information')}</Text>
                <CollapseDetail />
                <Text className='title-booking'>{getText('Ticket_price_details')}</Text>
                <div className='detail-booking-passengers'>
                    {updatedAduls.map((index) => {
                        const serviceOption = index?.serviceOpts
                        const fightReturn = index?.return
                        const serviceOptionReturn = fightReturn?.serviceOpts
                        const baggageOptions = serviceOption.filter(
                            (item) => item.bookingService.serviceOption.optionType === 'BAGGAGE_OPT'
                        )
                        const mealOptions = serviceOption.filter(
                            (item) => item.bookingService.serviceOption.optionType === 'MEAL_OPT'
                        )
                        const totalOptionbaggagePrice = baggageOptions.reduce(
                            (total, item) => total + item.bookingService.serviceOption.optionPrice,
                            0
                        )
                        const totalOptionMealPrice = mealOptions.reduce(
                            (total, item) => total + item.bookingService.serviceOption.optionPrice,
                            0
                        )
                        //Return
                        let totalOptionbaggagePriceReturn = 0
                        let totalOptionMealPriceReturn = 0
                        if (index?.return !== undefined) {
                            const baggageOptionsReturn = serviceOptionReturn.filter(
                                (item) => item.bookingService.serviceOption.optionType === 'BAGGAGE_OPT'
                            )
                            const mealOptionsReturn = serviceOptionReturn.filter(
                                (item) => item.bookingService.serviceOption.optionType === 'MEAL_OPT'
                            )
                            totalOptionbaggagePriceReturn = baggageOptionsReturn.reduce(
                                (total, item) => total + item.bookingService.serviceOption.optionPrice,
                                0
                            )
                            totalOptionMealPriceReturn = mealOptionsReturn.reduce(
                                (total, item) => total + item.bookingService.serviceOption.optionPrice,
                                0
                            )
                        }
                        return (
                            <div key={index}>
                                <Collapse
                                    size='large'
                                    items={[
                                        {
                                            key: 'index',
                                            label: (
                                                <div style={{ fontSize: '18px', fontWeight: 600 }}>
                                                    {getText('adult')}: {convertGender(index?.gender, language)}{' '}
                                                    {index?.lastName} {index?.firstName}
                                                </div>
                                            ),
                                            children: (
                                                <div className='detail-ticket'>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Text
                                                                style={{
                                                                    color: 'green',
                                                                    fontSize: '16px',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {getText('Trip_details')}:{' '}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    color: 'black',
                                                                    fontSize: '16px',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {' '}
                                                                {flightAwayDetail?.sourceAirport?.airportCode}{' '}
                                                                <img src={vietjet} />{' '}
                                                                {flightAwayDetail?.destinationAirport?.airportCode}
                                                            </Text>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {' '}
                                                                        {getText('TicketPrice')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(
                                                                            index?.seat?.seatPrice +
                                                                                index?.seat?.taxPrice
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text> {getText('Ticket')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {' '}
                                                                        {formatCurrency(index?.seat?.seatPrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text> {getText('VAT')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {' '}
                                                                        {formatCurrency(index?.seat?.taxPrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {getText('TaxesAndFees')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(index?.taxService?.totalFee)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('System_service_surcharge')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(
                                                                            index?.taxService
                                                                                ?.systemAdministrationSurcharge
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('Security_screening_fee')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(
                                                                            index?.taxService?.securityScreeningFee
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('Domestic_airport_fees')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(index?.taxService?.airportFee)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>
                                                                        {getText('System_administration_surcharge')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(
                                                                            index?.taxService?.systemServiceSurcharge
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('VAT')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {' '}
                                                                        {formatCurrency(index?.taxService?.VATTax)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {getText('service')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(
                                                                            totalOptionbaggagePrice +
                                                                                totalOptionMealPrice +
                                                                                (index?.seatServicePrice !== undefined
                                                                                    ? index?.seatServicePrice
                                                                                    : 0)
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('seat')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {index?.seatServicePrice !== undefined
                                                                            ? formatCurrency(index?.seatServicePrice)
                                                                            : formatCurrency(0)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('signed_luggage')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(totalOptionbaggagePrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('Hot_Meal')} </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>{formatCurrency(totalOptionMealPrice)}</Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text
                                                                        style={{
                                                                            color: 'red',
                                                                            fontSize: '18px',
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {getText('Total')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text
                                                                        style={{
                                                                            color: 'red',
                                                                            fontSize: '18px',
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {formatCurrency(
                                                                            totalOptionbaggagePrice +
                                                                                totalOptionMealPrice +
                                                                                (index?.seatServicePrice !== undefined
                                                                                    ? index?.seatServicePrice
                                                                                    : 0) +
                                                                                index?.taxService?.totalFee +
                                                                                index?.seat?.seatPrice +
                                                                                index?.seat?.taxPrice
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        {index?.return === undefined ? (
                                                            ''
                                                        ) : (
                                                            <Col span={12}>
                                                                <Text
                                                                    style={{
                                                                        color: 'green',
                                                                        fontSize: '16px',
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {getText('Return_trip_details')}:{' '}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        fontSize: '16px',
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {flightReturnDetail?.sourceAirport?.airportCode}{' '}
                                                                    <img src={vietjet} />{' '}
                                                                    {
                                                                        flightReturnDetail?.destinationAirport
                                                                            ?.airportCode
                                                                    }
                                                                </Text>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('TicketPrice')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.seatPrice +
                                                                                          fightReturn?.seat?.taxPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text> {getText('Price')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {' '}
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.seatPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('VAT')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.taxPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('TaxesAndFees')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {fightReturn?.taxService?.totalFee !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService?.totalFee
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>
                                                                            {getText('System_service_surcharge')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService
                                                                                ?.systemAdministrationSurcharge !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.systemAdministrationSurcharge
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('Security_screening_fee')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService
                                                                                ?.securityScreeningFee !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.securityScreeningFee
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('Domestic_airport_fees')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService?.airportFee !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.airportFee
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>
                                                                            {getText('System_administration_surcharge')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService
                                                                                ?.systemServiceSurcharge !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.systemServiceSurcharge
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('VAT')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {' '}
                                                                            {fightReturn?.taxService?.VATTax !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService?.VATTax
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('service')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn +
                                                                                    totalOptionMealPriceReturn +
                                                                                    (fightReturn?.seatServicePrice !==
                                                                                    undefined
                                                                                        ? fightReturn?.seatServicePrice
                                                                                        : 0)
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>ghế</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.seatServicePrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seatServicePrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('signed_luggage')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('Hot_Meal')} </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {formatCurrency(totalOptionMealPriceReturn)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text
                                                                            style={{
                                                                                color: 'red',
                                                                                fontSize: '18px',
                                                                                fontWeight: 700
                                                                            }}
                                                                        >
                                                                            {getText('Total')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text
                                                                            style={{
                                                                                color: 'red',
                                                                                fontSize: '18px',
                                                                                fontWeight: 700
                                                                            }}
                                                                        >
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn +
                                                                                    totalOptionMealPriceReturn +
                                                                                    (fightReturn?.seatServicePrice !==
                                                                                    undefined
                                                                                        ? fightReturn?.seatServicePrice
                                                                                        : 0) +
                                                                                    fightReturn?.taxService?.totalFee +
                                                                                    fightReturn?.seat?.seatPrice +
                                                                                    fightReturn?.seat?.taxPrice
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        )}
                                                    </Row>
                                                </div>
                                            )
                                        }
                                    ]}
                                    expandIconPosition='end'
                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                    style={{
                                        backgroundColor: '#F1F1F1',
                                        marginTop: '10px'
                                    }}
                                />
                            </div>
                        )
                    })}
                    {updatedChilds.map((index) => {
                        const serviceOption = index?.serviceOpts
                        const fightReturn = index?.return
                        const serviceOptionReturn = fightReturn?.serviceOpts
                        const baggageOptions = serviceOption.filter(
                            (item) => item.bookingService.serviceOption.optionType === 'BAGGAGE_OPT'
                        )
                        const mealOptions = serviceOption.filter(
                            (item) => item.bookingService.serviceOption.optionType === 'MEAL_OPT'
                        )
                        const totalOptionbaggagePrice = baggageOptions.reduce(
                            (total, item) => total + item.bookingService.serviceOption.optionPrice,
                            0
                        )
                        const totalOptionMealPrice = mealOptions.reduce(
                            (total, item) => total + item.bookingService.serviceOption.optionPrice,
                            0
                        )
                        //Return
                        let totalOptionbaggagePriceReturn = 0
                        let totalOptionMealPriceReturn = 0
                        if (index?.return !== undefined) {
                            const baggageOptionsReturn = serviceOptionReturn.filter(
                                (item) => item.bookingService.serviceOption.optionType === 'BAGGAGE_OPT'
                            )
                            const mealOptionsReturn = serviceOptionReturn.filter(
                                (item) => item.bookingService.serviceOption.optionType === 'MEAL_OPT'
                            )
                            totalOptionbaggagePriceReturn = baggageOptionsReturn.reduce(
                                (total, item) => total + item.bookingService.serviceOption.optionPrice,
                                0
                            )
                            totalOptionMealPriceReturn = mealOptionsReturn.reduce(
                                (total, item) => total + item.bookingService.serviceOption.optionPrice,
                                0
                            )
                        }
                        return (
                            <div key={index}>
                                <Collapse
                                    size='large'
                                    items={[
                                        {
                                            key: 'index',
                                            label: (
                                                <div style={{ fontSize: '18px', fontWeight: 600 }}>
                                                    {getText('children')}: {convertGender(index?.gender, language)}{' '}
                                                    {index?.lastName} {index?.firstName}
                                                </div>
                                            ),
                                            children: (
                                                <div className='detail-ticket'>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Text
                                                                style={{
                                                                    color: 'green',
                                                                    fontSize: '16px',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {getText('Trip_details')}:{' '}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    color: 'black',
                                                                    fontSize: '16px',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {' '}
                                                                {flightAwayDetail?.sourceAirport?.airportCode}{' '}
                                                                <img src={vietjet} />{' '}
                                                                {flightAwayDetail?.destinationAirport?.airportCode}
                                                            </Text>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {' '}
                                                                        {getText('TicketPrice')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(
                                                                            index?.seat?.seatPrice +
                                                                                index?.seat?.taxPrice
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text> {getText('Ticket')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {' '}
                                                                        {formatCurrency(index?.seat?.seatPrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text> {getText('VAT')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {' '}
                                                                        {formatCurrency(index?.seat?.taxPrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {getText('TaxesAndFees')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(index?.taxService?.totalFee)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('System_service_surcharge')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(
                                                                            index?.taxService
                                                                                ?.systemAdministrationSurcharge
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('Security_screening_fee')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(
                                                                            index?.taxService?.securityScreeningFee
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('Domestic_airport_fees')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(index?.taxService?.airportFee)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>
                                                                        {getText('System_administration_surcharge')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(
                                                                            index?.taxService?.systemServiceSurcharge
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('VAT')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {' '}
                                                                        {formatCurrency(index?.taxService?.VATTax)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {getText('service')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(
                                                                            totalOptionbaggagePrice +
                                                                                totalOptionMealPrice +
                                                                                (index?.seatServicePrice !== undefined
                                                                                    ? index?.seatServicePrice
                                                                                    : 0)
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('seat')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {index?.seatServicePrice !== undefined
                                                                            ? formatCurrency(index?.seatServicePrice)
                                                                            : formatCurrency(0)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('signed_luggage')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(totalOptionbaggagePrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('Hot_Meal')} </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>{formatCurrency(totalOptionMealPrice)}</Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text
                                                                        style={{
                                                                            color: 'red',
                                                                            fontSize: '18px',
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {getText('Total')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text
                                                                        style={{
                                                                            color: 'red',
                                                                            fontSize: '18px',
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {formatCurrency(
                                                                            totalOptionbaggagePrice +
                                                                                totalOptionMealPrice +
                                                                                (index?.seatServicePrice !== undefined
                                                                                    ? index?.seatServicePrice
                                                                                    : 0) +
                                                                                index?.taxService?.totalFee +
                                                                                index?.seat?.seatPrice +
                                                                                index?.seat?.taxPrice
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        {index?.return === undefined ? (
                                                            ''
                                                        ) : (
                                                            <Col span={12}>
                                                                <Text
                                                                    style={{
                                                                        color: 'green',
                                                                        fontSize: '16px',
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {getText('Return_trip_details')}:{' '}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        fontSize: '16px',
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {flightReturnDetail?.sourceAirport?.airportCode}{' '}
                                                                    <img src={vietjet} />{' '}
                                                                    {
                                                                        flightReturnDetail?.destinationAirport
                                                                            ?.airportCode
                                                                    }
                                                                </Text>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('TicketPrice')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.seatPrice +
                                                                                          fightReturn?.seat?.taxPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text> {getText('Price')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {' '}
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.seatPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('VAT')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.taxPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('TaxesAndFees')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {fightReturn?.taxService?.totalFee !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService?.totalFee
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>
                                                                            {getText('System_service_surcharge')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService
                                                                                ?.systemAdministrationSurcharge !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.systemAdministrationSurcharge
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('Security_screening_fee')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService
                                                                                ?.securityScreeningFee !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.securityScreeningFee
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('Domestic_airport_fees')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService?.airportFee !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.airportFee
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>
                                                                            {getText('System_administration_surcharge')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.taxService
                                                                                ?.systemServiceSurcharge !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService
                                                                                          ?.systemServiceSurcharge
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('VAT')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {' '}
                                                                            {fightReturn?.taxService?.VATTax !==
                                                                            undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.taxService?.VATTax
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('service')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn +
                                                                                    totalOptionMealPriceReturn +
                                                                                    (fightReturn?.seatServicePrice !==
                                                                                    undefined
                                                                                        ? fightReturn?.seatServicePrice
                                                                                        : 0)
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>ghế</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.seatServicePrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seatServicePrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('signed_luggage')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('Hot_Meal')} </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {formatCurrency(totalOptionMealPriceReturn)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text
                                                                            style={{
                                                                                color: 'red',
                                                                                fontSize: '18px',
                                                                                fontWeight: 700
                                                                            }}
                                                                        >
                                                                            {getText('Total')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text
                                                                            style={{
                                                                                color: 'red',
                                                                                fontSize: '18px',
                                                                                fontWeight: 700
                                                                            }}
                                                                        >
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn +
                                                                                    totalOptionMealPriceReturn +
                                                                                    (fightReturn?.seatServicePrice !==
                                                                                    undefined
                                                                                        ? fightReturn?.seatServicePrice
                                                                                        : 0) +
                                                                                    fightReturn?.taxService?.totalFee +
                                                                                    fightReturn?.seat?.seatPrice +
                                                                                    fightReturn?.seat?.taxPrice
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        )}
                                                    </Row>
                                                </div>
                                            )
                                        }
                                    ]}
                                    expandIconPosition='end'
                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                    style={{
                                        backgroundColor: '#F1F1F1',
                                        marginTop: '10px'
                                    }}
                                />
                            </div>
                        )
                    })}

                    {updatedInfants.map((index) => {
                        const serviceOption = index?.serviceOpts
                        const fightReturn = index?.return
                        const serviceOptionReturn = fightReturn?.serviceOpts
                        const baggageOptions = serviceOption.filter(
                            (item) => item.bookingService.serviceOption.optionType === 'BAGGAGE_OPT'
                        )
                        const mealOptions = serviceOption.filter(
                            (item) => item.bookingService.serviceOption.optionType === 'MEAL_OPT'
                        )
                        const totalOptionbaggagePrice = baggageOptions.reduce(
                            (total, item) => total + item.bookingService.serviceOption.optionPrice,
                            0
                        )
                        const totalOptionMealPrice = mealOptions.reduce(
                            (total, item) => total + item.bookingService.serviceOption.optionPrice,
                            0
                        )
                        //Return
                        let totalOptionbaggagePriceReturn = 0
                        let totalOptionMealPriceReturn = 0
                        if (index?.return !== undefined) {
                            const baggageOptionsReturn = serviceOptionReturn.filter(
                                (item) => item.bookingService.serviceOption.optionType === 'BAGGAGE_OPT'
                            )
                            const mealOptionsReturn = serviceOptionReturn.filter(
                                (item) => item.bookingService.serviceOption.optionType === 'MEAL_OPT'
                            )
                            totalOptionbaggagePriceReturn = baggageOptionsReturn.reduce(
                                (total, item) => total + item.bookingService.serviceOption.optionPrice,
                                0
                            )
                            totalOptionMealPriceReturn = mealOptionsReturn.reduce(
                                (total, item) => total + item.bookingService.serviceOption.optionPrice,
                                0
                            )
                        }
                        return (
                            <div key={index}>
                                <Collapse
                                    size='large'
                                    items={[
                                        {
                                            key: 'index',
                                            label: (
                                                <div style={{ fontSize: '18px', fontWeight: 600 }}>
                                                    {getText('baby')}: {convertGender(index?.gender, language)}{' '}
                                                    {index?.lastName} {index?.firstName}
                                                </div>
                                            ),
                                            children: (
                                                <div className='detail-ticket'>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Text
                                                                style={{
                                                                    color: 'green',
                                                                    fontSize: '16px',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {getText('Trip_details')}:{' '}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    color: 'black',
                                                                    fontSize: '16px',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {' '}
                                                                {flightAwayDetail?.sourceAirport?.airportCode}{' '}
                                                                <img src={vietjet} />{' '}
                                                                {flightAwayDetail?.destinationAirport?.airportCode}
                                                            </Text>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {' '}
                                                                        {getText('TicketPrice')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(index?.seat?.seatPrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text> {getText('Ticket')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {' '}
                                                                        {formatCurrency(index?.seat?.seatPrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text className='title-price'>
                                                                        {getText('service')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text className='title-price'>
                                                                        {formatCurrency(
                                                                            totalOptionbaggagePrice +
                                                                                totalOptionMealPrice +
                                                                                (index?.seatServicePrice !== undefined
                                                                                    ? index?.seatServicePrice
                                                                                    : 0)
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('seat')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {index?.seatServicePrice !== undefined
                                                                            ? formatCurrency(index?.seatServicePrice)
                                                                            : formatCurrency(0)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('signed_luggage')}</Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>
                                                                        {formatCurrency(totalOptionbaggagePrice)}
                                                                    </Text>
                                                                </Col>
                                                            </Row>

                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text>{getText('Hot_Meal')} </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text>{formatCurrency(totalOptionMealPrice)}</Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='details'>
                                                                <Col span={12}>
                                                                    <Text
                                                                        style={{
                                                                            color: 'red',
                                                                            fontSize: '18px',
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {getText('Total')}
                                                                    </Text>
                                                                </Col>
                                                                <Col span={12} className='col-details-price'>
                                                                    <Text
                                                                        style={{
                                                                            color: 'red',
                                                                            fontSize: '18px',
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {formatCurrency(
                                                                            totalOptionbaggagePrice +
                                                                                totalOptionMealPrice +
                                                                                (index?.seatServicePrice !== undefined
                                                                                    ? index?.seatServicePrice
                                                                                    : 0) +
                                                                                index?.seat?.seatPrice
                                                                        )}
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        {index?.return === undefined ? (
                                                            ''
                                                        ) : (
                                                            <Col span={12}>
                                                                <Text
                                                                    style={{
                                                                        color: 'green',
                                                                        fontSize: '16px',
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {getText('Return_trip_details')}:{' '}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        fontSize: '16px',
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {flightReturnDetail?.sourceAirport?.airportCode}{' '}
                                                                    <img src={vietjet} />{' '}
                                                                    {
                                                                        flightReturnDetail?.destinationAirport
                                                                            ?.airportCode
                                                                    }
                                                                </Text>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('TicketPrice')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.seatPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text> {getText('Price')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {' '}
                                                                            {fightReturn?.seat?.seatPrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seat?.seatPrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>

                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text className='title-price'>
                                                                            {getText('service')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text className='title-price'>
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn +
                                                                                    totalOptionMealPriceReturn +
                                                                                    (fightReturn?.seatServicePrice !==
                                                                                    undefined
                                                                                        ? fightReturn?.seatServicePrice
                                                                                        : 0)
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('seat')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {fightReturn?.seatServicePrice !== undefined
                                                                                ? formatCurrency(
                                                                                      fightReturn?.seatServicePrice
                                                                                  )
                                                                                : formatCurrency(0)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('signed_luggage')}</Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text>{getText('Hot_Meal')} </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text>
                                                                            {formatCurrency(totalOptionMealPriceReturn)}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='details'>
                                                                    <Col span={12}>
                                                                        <Text
                                                                            style={{
                                                                                color: 'red',
                                                                                fontSize: '18px',
                                                                                fontWeight: 700
                                                                            }}
                                                                        >
                                                                            {getText('Total')}
                                                                        </Text>
                                                                    </Col>
                                                                    <Col span={12} className='col-details-price'>
                                                                        <Text
                                                                            style={{
                                                                                color: 'red',
                                                                                fontSize: '18px',
                                                                                fontWeight: 700
                                                                            }}
                                                                        >
                                                                            {formatCurrency(
                                                                                totalOptionbaggagePriceReturn +
                                                                                    totalOptionMealPriceReturn +
                                                                                    (fightReturn?.seatServicePrice !==
                                                                                    undefined
                                                                                        ? fightReturn?.seatServicePrice
                                                                                        : 0) +
                                                                                    fightReturn?.seat?.seatPrice
                                                                            )}
                                                                        </Text>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        )}
                                                    </Row>
                                                </div>
                                            )
                                        }
                                    ]}
                                    expandIconPosition='end'
                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                    style={{
                                        backgroundColor: '#F1F1F1',
                                        marginTop: '10px'
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <Row className='form-btn-booking-detail'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => showDrawerCaneclFight()}>
                            {getText('Refund/Cancellation')}
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => navigate('/my/select-fly-change')}>
                            {getText('Change_flight_schedule')}
                        </Button>
                    </Col>
                </Row>
                <Row className='form-btn-booking-detail'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => navigate('/my/select-fly-service')}>
                            {getText('Buy_additional_services')}
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => navigate('/')}>
                            {getText('Find_another_flight')}
                        </Button>
                    </Col>
                </Row>
            </div>
            <Drawer
                title={getText('Refund/Cancellation')}
                placement='right'
                open={openCaneclFight}
                onClose={() => {
                    setOpenCaneclFight(false)
                }}
                width={700}
            >
                <div className='form-cancel'>
                    <div className='form-cancel-trip'>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={24}>
                                    <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                        {getText('Trip')}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                        <Text className='date-fly'>
                            {' '}
                            {getText('Date')}: {formatDateString(flightAwayDetail?.arrivalTime)}
                        </Text>
                        <Row>
                            <Col span={5} className='info-fly'>
                                <Text className='location'>{flightAwayDetail?.sourceAirport?.airportCode}</Text>
                            </Col>
                            <Col span={7} className='info-fly'>
                                <Text className='time-fly'>
                                    {' '}
                                    {calculateTimeDifference(
                                        formatTime(flightAwayDetail?.departureTime),
                                        formatTime(flightAwayDetail?.arrivalTime),
                                        language
                                    )}
                                </Text>
                            </Col>
                            <Col span={5} className='info-fly'>
                                <Text className='location'> {flightAwayDetail?.destinationAirport?.airportCode}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5} className='info-fly'>
                                <Text className='time'>{formatTime(flightAwayDetail?.departureTime)}</Text>
                            </Col>
                            <Col span={7} className='info-fly'>
                                <Text className='time-fly'> {getText('Direct-Flight')}</Text>
                            </Col>
                            <Col span={5} className='info-fly'>
                                <Text className='time'>{formatTime(flightAwayDetail?.arrivalTime)}</Text>
                            </Col>
                        </Row>
                    </div>
                    {bookingDetails?.journeyType === 'RETURN' ? (
                        <div className='form-cancel-trip'>
                            <div className='date-select-fly'>
                                <Row>
                                    <Col span={24}>
                                        <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                            {getText('TripReturn')}
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                            <Text className='date-fly'>
                                {' '}
                                {getText('Date')}: {formatDateString(flightReturnDetail?.arrivalTime)}
                            </Text>
                            <Row>
                                <Col span={5} className='info-fly'>
                                    <Text className='location'>{flightReturnDetail?.sourceAirport?.airportCode}</Text>
                                </Col>
                                <Col span={7} className='info-fly'>
                                    <Text className='time-fly'>
                                        {' '}
                                        {calculateTimeDifference(
                                            formatTime(flightReturnDetail?.departureTime),
                                            formatTime(flightReturnDetail?.arrivalTime),
                                            language
                                        )}
                                    </Text>
                                </Col>
                                <Col span={5} className='info-fly'>
                                    <Text className='location'>
                                        {' '}
                                        {flightReturnDetail?.destinationAirport?.airportCode}
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} className='info-fly'>
                                    <Text className='time'>{formatTime(flightReturnDetail?.departureTime)}</Text>
                                </Col>
                                <Col span={7} className='info-fly'>
                                    <Text className='time-fly'>{getText('Direct-Flight')}</Text>
                                </Col>
                                <Col span={5} className='info-fly'>
                                    <Text className='time'>{formatTime(flightReturnDetail?.arrivalTime)}</Text>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className='form-cancel-trip'>
                        <Row>
                            <Col span={24}>
                                <Text style={{ fontSize: '18px', fontWeight: 500, padding: '10px' }}>
                                    {getText('PhoneOTP')}
                                </Text>
                            </Col>
                            <Input
                                style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                                onChange={handleInputChange}
                            />
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text style={{ fontSize: '18px', fontWeight: 500, padding: '10px' }}>
                                    {' '}
                                    {getText('Reason')}:
                                </Text>
                            </Col>
                            <TextArea
                                placeholder='...'
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 6
                                }}
                                onChange={(e) => setReason(e.target.value)}
                                style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                            />
                        </Row>
                    </div>
                    <div>
                        <Modal centered open={isModalOpen} footer={null} onCancel={handleCancel}>
                            <h2>{getText('VerificationCode')}</h2>
                            <div className='form-text'>
                                <Text className='text-information'>
                                    {getText('textVerificationCode')}{' '}
                                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 500 }}>
                                        {inputNumberPhone}
                                    </Text>
                                </Text>
                            </div>
                            <div className='form-text'>
                                <Text className='text-email'></Text>
                            </div>
                            <Form form={form} onFinish={handleFinish}>
                                <Form.Item
                                    name='otp'
                                    className='center-error-message'
                                    rules={[{ validator: async () => Promise.resolve() }]}
                                >
                                    <InputOTP
                                        autoFocus
                                        inputType='numeric'
                                        length={6}
                                        inputClassName='input-classname'
                                    />
                                </Form.Item>
                                <div className='form-text'>
                                    <Text className='text-not'>
                                        {getText('HaveCode')} {getText('Press')}{' '}
                                        <u className='text-sendTo' onClick={() => hanldeSentOTP()}>
                                            {getText('SendTo')}
                                        </u>{' '}
                                        {getText('after')} <Text style={{ color: 'red' }}>{timeLeft}</Text>{' '}
                                        {getText('second')}
                                    </Text>
                                </div>
                                <Form.Item noStyle>
                                    <Button block htmlType='submit' type='primary' className='btn-accuracy'>
                                        {getText('Authentication')}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div className='btn-form-require'>
                    <Button className='btn-require' onClick={() => handleRefund()}>
                        {getText('Send_require')}
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}
export default BookingDetail
