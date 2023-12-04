import { Row, Col, Button, Typography, Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Change.css'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTimeDifference, formatDateString, formatTime, getDifferenceInMinutes } from '../../../utils/format'
import { useState } from 'react'
import { setSelectChangeFly } from '../../../redux/reducers/myFlight'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { showWaringModal } from '../../../utils/modalError'
const { Text } = Typography

const SelectFlyChange = () => {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const { getText } = useLanguage()
    const [selectedValue, setSelectedValue] = useState(null)
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const flightReturnDetail = useSelector((state) => state.myFlight.bookingDetails?.flightReturnDetail)
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const language = useSelector((state) => state.language.language)

    const handleContinue = () => {
        if (selectedValue === null) {
            showWaringModal(`${getText('Notification')}`, `${getText('NotSelectFlight')}`, `${getText('Close')}`)
            return
        }
        const now = new Date()
        if (flightAwayDetail?.id === selectedValue) {
            const departureTime = new Date(flightAwayDetail?.departureTime)
            if (flightAwayDetail?.passengerAwaysDetail[0]?.seat?.seatClass === 'ECONOMY') {
                if (getDifferenceInMinutes(departureTime, now) < 1440) {
                    showWaringModal(
                        `${getText('Notification')}`,
                        'Bạn chỉ có thể thay đổi lịch trình trước 24 giờ cất cánh',
                        `${getText('Close')}`
                    )
                    return
                }
            } else {
                if (getDifferenceInMinutes(departureTime, now) < 180) {
                    showWaringModal(
                        `${getText('Notification')}`,
                        'Bạn chỉ có thể thay đổi lịch trình trước 03 giờ cất cánh',
                        `${getText('Close')}`
                    )
                    return
                }
            }
            const dataChange = {
                flightAwayDetail: flightAwayDetail,
                flightReturnDetail: null,
                return: false
            }

            dispath(setSelectChangeFly(dataChange))
        } else if (flightReturnDetail?.id === selectedValue) {
            const departureTime = new Date(flightReturnDetail?.departureTime)
            if (flightReturnDetail?.passengerReturnsDetail[0]?.seat?.seatClass === 'ECONOMY') {
                if (getDifferenceInMinutes(departureTime, now) < 1440) {
                    showWaringModal(
                        `${getText('Notification')}`,
                        'Bạn chỉ có thể thay đổi lịch trình trước 24 giờ cất cánh',
                        `${getText('Close')}`
                    )
                    return
                }
            } else {
                if (getDifferenceInMinutes(departureTime, now) < 180) {
                    showWaringModal(
                        `${getText('Notification')}`,
                        'Bạn chỉ có thể thay đổi lịch trình trước 03 giờ cất cánh',
                        `${getText('Close')}`
                    )
                    return
                }
            }
            const dataChange = {
                flightAwayDetail: null,
                flightReturnDetail: flightReturnDetail,
                return: true
            }
            dispath(setSelectChangeFly(dataChange))
        }
        navigate('/my/search-flight-change')
    }

    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value)
    }
    return (
        <div className='search-detail'>
            <div className='nav-service-detail'>
                <Row>
                    <Col span={24} className='code-booking-change'>
                        <p>
                            {getText('BOOKING_CODE')} :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {bookingDetails?.bookingCode}
                            </span>
                        </p>
                    </Col>
                </Row>
            </div>
            <div className='main-service-detail'>
                <Text className='title-services'>{getText('SelectFligtChange')}</Text>
                <div className='form-select-fly-service'>
                    <div className='date-select-fly'>
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
                            <Text className='time-fly'> {getText('Direct-Flight')}</Text>
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
                    <Col span={10}></Col>
                    <Col span={8}>
                        <Button className='footer-continue-info' onClick={() => handleContinue()}>
                            {getText('Continue')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlyChange
