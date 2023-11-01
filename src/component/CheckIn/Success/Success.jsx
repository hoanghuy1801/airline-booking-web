import { Row, Col, Button } from 'antd'
import {
    IconPlane,
    IconUserCheck,
    IconChecklist,
    IconLocationCheck,
    IconLuggage,
    IconPlaneDeparture
} from '@tabler/icons-react'
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Success.css'
import BoardingPass from './BoardingPass'
import { calculateTimeDifference, formatDateString, formatTime } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'

const Success = () => {
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const selectFlightCheckIn = useSelector((state) => state.checkIn.selectFlightCheckIn?.selectFlight)
    console.log('selectFlightCheckIn', selectFlightCheckIn)
    const language = useSelector((state) => state.language.language)
    return (
        <div className='booking-detail'>
            <div className='info-booking-detail'>
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>
                            {getText('BOOKING_CODE')} :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {' '}
                                {bookingDetails?.bookingCode}
                            </span>
                        </p>
                    </Col>
                    <Col span={16} className='icon-select'>
                        <Row>
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCheck style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconChecklist style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-success'>
                <div className='container'>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                            <p className='title-success'> {getText('Flight-Information')}</p>
                            <Row>
                                <Col span={5} className='info-fly'>
                                    <p className='location'>{selectFlightCheckIn?.sourceAirport?.airportCode}</p>
                                </Col>
                                <Col span={7} className='info-fly'>
                                    <p className='time-fly'>
                                        {' '}
                                        {calculateTimeDifference(
                                            formatTime(selectFlightCheckIn?.departureTime),
                                            formatTime(selectFlightCheckIn?.arrivalTime),
                                            language
                                        )}
                                    </p>
                                </Col>
                                <Col span={5} className='info-fly'>
                                    <p className='location'>{selectFlightCheckIn?.destinationAirport?.airportCode}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} className='info-fly'>
                                    <p className='time'>{formatTime(selectFlightCheckIn?.departureTime)}</p>
                                </Col>
                                <Col span={7} className='info-fly'>
                                    <p className='time-fly'>{getText('Direct-Flight')}</p>
                                </Col>
                                <Col span={5} className='info-fly'>
                                    <p className='time'>{formatTime(selectFlightCheckIn?.arrivalTime)}</p>
                                </Col>
                            </Row>
                            <Row style={{ paddingTop: '20px' }}>
                                <p className='code-fly'>
                                    <img src={vietjet} /> {getText('Flight_Number')}: {selectFlightCheckIn?.flightName}
                                </p>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <p className='from'>{getText('From')}:</p>
                                </Col>
                                <Col span={20}>
                                    <p className='time-flys'>
                                        {formatTime(selectFlightCheckIn?.departureTime)},{' '}
                                        {formatDateString(selectFlightCheckIn?.departureTime)} (
                                        {getText('Local-time-at-airport')})
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}></Col>
                                <Col span={20}>
                                    <p className='time-flys' style={{ paddingBottom: '20px' }}>
                                        {selectFlightCheckIn?.sourceAirport?.airportName}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <p className='to'>{getText('To')}:</p>
                                </Col>
                                <Col span={20}>
                                    <p className='time-flys'>
                                        {formatTime(selectFlightCheckIn?.arrivalTime)},{' '}
                                        {formatDateString(selectFlightCheckIn?.arrivalTime)} (
                                        {getText('Local-time-at-airport')})
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}></Col>
                                <Col span={20}>
                                    <p className='time-flys'> {selectFlightCheckIn?.destinationAirport?.airportName}</p>
                                </Col>
                            </Row>
                            <Row className='form-info-fly'>
                                <Col span={4}></Col>
                                <Col span={20}>
                                    <p className='time-flys' style={{ paddingTop: '20px' }}>
                                        {getText('Time')}:{' '}
                                        <span style={{ color: 'red' }}>
                                            {' '}
                                            {calculateTimeDifference(
                                                formatTime(selectFlightCheckIn?.departureTime),
                                                formatTime(selectFlightCheckIn?.arrivalTime),
                                                language
                                            )}{' '}
                                        </span>
                                    </p>
                                </Col>
                            </Row>
                            <p className='title-instruction'>{getText('textSuccessCheckIn')}</p>
                            <Row>
                                <Col span={6} className='step-1'>
                                    <Row className='form-title-step'>{getText('step')} 1</Row>
                                    <Row className='form-icon-step'>
                                        <IconLuggage className='icon-step' />
                                    </Row>
                                    <Row className='form-text-step'>{getText('textSuccessCheckIn1')}</Row>
                                </Col>
                                <Col span={3}></Col>
                                <Col span={6} className='step-1'>
                                    <Row className='form-title-step'>{getText('step')} 2</Row>
                                    <Row className='form-icon-step'>
                                        <IconUserCheck className='icon-step' />
                                    </Row>
                                    <Row className='form-text-step'> {getText('textSuccessCheckIn2')}</Row>
                                </Col>
                                <Col span={3}></Col>
                                <Col span={6} className='step-1'>
                                    <Row className='form-title-step'>{getText('step')} 1</Row>
                                    <Row className='form-icon-step'>
                                        <IconPlaneDeparture className='icon-step' />
                                    </Row>
                                    <Row className='form-text-step'>{getText('textSuccessCheckIn3')}</Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={9} xl={9} className='boardingpass'>
                            <BoardingPass />
                        </Col>
                    </Row>
                </div>
                <div className='btn'>
                    <Button className='btn-continue' onClick={() => navigate('/')} style={{ width: 'auto' }}>
                        {getText('BackHome')}
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Success
