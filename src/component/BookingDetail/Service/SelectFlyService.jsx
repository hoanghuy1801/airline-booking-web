import { Row, Col, Button, Typography, Radio } from 'antd'

import './SelectFlyService.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTimeDifference, formatDateString, formatTime, getDifferenceInMinutes } from '../../../utils/format'
import {
    setDataPassengersService,
    setDataPassengersServiceReturn,
    setSelectChangeFly,
    setSelectedFlyChange
} from '../../../redux/reducers/myFlight'
import { changeStatus } from '../../../utils/utils'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { useState } from 'react'
import { showWaringModal } from '../../../utils/modalError'
const { Text } = Typography

const SelectFlyService = () => {
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [selectedValue, setSelectedValue] = useState(null)
    const bookingDetails = useSelector((state) => state.myFlight?.bookingDetails?.bookingDetail)
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const flightReturnDetail = useSelector((state) => state.myFlight.bookingDetails?.flightReturnDetail)
    const language = useSelector((state) => state.language.language)
    const dataPassengers = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail?.passengerAwaysDetail)
    const dataPassengersReturn = useSelector(
        (state) => state.myFlight.bookingDetails?.flightReturnDetail?.passengerReturnsDetail
    )

    const handleContinue = () => {
        const now = new Date()

        if (selectedValue === null) {
            showWaringModal(`${getText('Notification')}`, `${getText('NotSelectFlight')}`, `${getText('Close')}`)
            return
        }

        if (flightAwayDetail?.id === selectedValue) {
            const departureTime = new Date(flightAwayDetail?.departureTime)
            if (getDifferenceInMinutes(departureTime, now) < 1440) {
                showWaringModal(
                    `${getText('Notification')}`,
                    'Chỉ được mua dịch vụ trước 24 tiếng trước giờ bay',
                    `${getText('Close')}`
                )
                return
            }
            dispath(setSelectedFlyChange(flightAwayDetail))
            dispath(setDataPassengersService(flightAwayDetail?.passengerAwaysDetail))
        } else if (flightReturnDetail?.id === selectedValue) {
            console.log(flightReturnDetail)
            const departureTimeRE = new Date(flightReturnDetail?.departureTime)
            if (getDifferenceInMinutes(departureTimeRE, now) < 1440) {
                showWaringModal(
                    `${getText('Notification')}`,
                    'Chỉ được mua dịch vụ trước 24 tiếng trước giờ bay',
                    `${getText('Close')}`
                )
                return
            }
            dispath(setSelectedFlyChange(flightReturnDetail))
            dispath(setDataPassengersService(flightReturnDetail?.passengerReturnsDetail))
        }
        navigate('/my/sevice-detail')
    }
    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value)
    }
    return (
        <div className='service-detail'>
            <div className='nav-service-detail'>
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>
                            {getText('BOOKING_CODE')}:{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {' '}
                                {bookingDetails?.bookingCode}
                            </span>
                        </p>
                    </Col>
                    <Col span={16} className='code-booking-status'>
                        <p>
                            {getText('STATUS')}:{' '}
                            <span style={{ color: 'green', fontSize: '20px', fontWeight: 700 }}>
                                {' '}
                                {changeStatus(bookingDetails?.status, language)}
                            </span>
                        </p>
                    </Col>
                </Row>
            </div>
            <div className='main-service-detail'>
                <div className='form-select-fly-service'>
                    <div className='date-select-fly' style={{ marginTop: 40 }}>
                        <Row>
                            <Col span={22}>
                                <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                    {getText('Trip')}
                                </Text>
                            </Col>
                            <Col span={2}>
                                <Radio
                                    value={flightAwayDetail?.id}
                                    onChange={handleRadioChange}
                                    checked={selectedValue === flightAwayDetail?.id}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Text className='date-fly'>
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
                                    flightAwayDetail?.departureTime,
                                    flightAwayDetail?.arrivalTime,
                                    language
                                )}
                            </Text>
                        </Col>
                        <Col span={5} className='info-fly'>
                            <Text className='location'>{flightAwayDetail?.destinationAirport?.airportCode}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5} className='info-fly'>
                            <Text className='time'>{formatTime(flightAwayDetail?.departureTime)}</Text>
                        </Col>
                        <Col span={7} className='info-fly'>
                            <Text className='time-fly'>{getText('Direct-Flight')}</Text>
                        </Col>
                        <Col span={5} className='info-fly'>
                            <Text className='time'>{formatTime(flightAwayDetail?.arrivalTime)}</Text>
                        </Col>
                    </Row>
                </div>
                {bookingDetails?.journeyType === 'RETURN' ? (
                    <div className='form-select-fly-service' style={{ marginTop: 30 }}>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={22}>
                                    <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                        {getText('TripReturn')}
                                    </Text>
                                </Col>
                                <Col span={2}>
                                    <Radio
                                        value={flightReturnDetail?.id}
                                        onChange={handleRadioChange}
                                        checked={selectedValue === flightReturnDetail?.id}
                                    />
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
                                        flightReturnDetail?.departureTime,
                                        flightReturnDetail?.arrivalTime,
                                        language
                                    )}
                                </Text>
                            </Col>
                            <Col span={5} className='info-fly'>
                                <Text className='location'>{flightReturnDetail?.destinationAirport?.airportCode}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5} className='info-fly'>
                                <Text className='time'>{formatTime(flightReturnDetail?.departureTime)}</Text>
                            </Col>
                            <Col span={7} className='info-fly'>
                                <Text className='time-fly'> {getText('Direct-Flight')}</Text>
                            </Col>
                            <Col span={5} className='info-fly'>
                                <Text className='time'>{formatTime(flightReturnDetail?.arrivalTime)}</Text>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className='footer'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <Button
                            className='footer-back'
                            onClick={() => {
                                navigate('/my/booking-detail')
                            }}
                        >
                            {getText('Back')}
                        </Button>
                    </Col>
                    <Col span={12}></Col>
                    <Col span={6}>
                        <Button className='footer-continue-info' onClick={() => handleContinue()}>
                            {getText('Continue')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlyService
