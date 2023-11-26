import { Row, Col, Typography, Radio, Button } from 'antd'
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import './SelectFight.css'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTimeDifference, formatDateString, formatTime } from '../../../utils/format'
import { useState } from 'react'
import { setSelectFlightCheckIn } from '../../../redux/reducers/checkIn'
import { showWaringModal } from '../../../utils/modalError'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Text } = Typography
const SelectFight = () => {
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [selectedValue, setSelectedValue] = useState(null)
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const flightReturnDetail = useSelector((state) => state.myFlight.bookingDetails?.flightReturnDetail)
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const language = useSelector((state) => state.language.language)
    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value)
    }
    const handleContinue = () => {
        if (selectedValue === null) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotSelectFlight')}`, `${getText('Close')}`)
            return
        }
        if (flightAwayDetail?.id === selectedValue) {
            const data = {
                selectFlight: flightAwayDetail,
                return: false
            }
            dispath(setSelectFlightCheckIn(data))
        } else if (flightReturnDetail?.id === selectedValue) {
            const data = {
                selectFlight: flightReturnDetail,
                return: true
            }
            dispath(setSelectFlightCheckIn(data))
        }
        navigate('/my/select-passengers')
    }
    return (
        <div className='checkin-detail'>
            <div className='info-booking-detail'>
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>
                            {getText('BOOKING_CODE')} :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {bookingDetails?.bookingCode}
                            </span>
                        </p>
                    </Col>
                    <Col span={16} className='icon-select'>
                        <Row>
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconChecklist style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-service-detail'>
                <Text className='title-services'> {getText('titleCheckIn')}</Text>
                <div className='form-select-fly-service'>
                    <div className='date-select-fly'>
                        <Row>
                            <Col span={22}>
                                <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                    {' '}
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
                        {getText('Date')}: {formatDateString(flightAwayDetail?.departureTime)}
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
                                        {' '}
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
                            {getText('Date')}: {formatDateString(flightReturnDetail?.departureTime)}
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
            </div>
            <div className='footer'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <Button
                            className='footer-back'
                            onClick={() => {
                                navigate('/checkin')
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
export default SelectFight
