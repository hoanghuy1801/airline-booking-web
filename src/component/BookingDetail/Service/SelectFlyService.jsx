import { Row, Col, Button, Typography } from 'antd'

import './SelectFlyService.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTimeDifference, formatDateString, formatTime } from '../../../utils/format'
import {
    setDataPassengersService,
    setDataPassengersServiceReturn,
    setSelectChangeFly
} from '../../../redux/reducers/myFlight'
import { changeStatus } from '../../../utils/utils'
const { Text } = Typography

const SelectFlyService = () => {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const bookingDetails = useSelector((state) => state.myFlight?.bookingDetails?.bookingDetail)
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const flightReturnDetail = useSelector((state) => state.myFlight.bookingDetails?.flightReturnDetail)
    const language = useSelector((state) => state.language.language)
    const dataPassengers = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail?.passengerAwaysDetail)
    const dataPassengersReturn = useSelector(
        (state) => state.myFlight.bookingDetails?.flightReturnDetail?.passengerReturnsDetail
    )
    const handleContinue = () => {
        if (bookingDetails?.journeyType === 'RETURN') {
            const dataChange = {
                flightAwayDetail: flightAwayDetail,
                flightReturnDetail: flightReturnDetail
            }
            const passengersReturn = dataPassengersReturn.map((item) => {
                // Tạo một bản sao của đối tượng hiện tại để không làm thay đổi dữ liệu gốc
                const newItem = { ...item }
                // Loại bỏ các biến không mong muốn
                delete newItem.seat
                return newItem
            })
            const passengers = dataPassengers.map((item) => {
                // Tạo một bản sao của đối tượng hiện tại để không làm thay đổi dữ liệu gốc
                const newItem = { ...item }
                // Loại bỏ các biến không mong muốn
                delete newItem.seat
                return newItem
            })
            dispath(setSelectChangeFly(dataChange))
            dispath(setDataPassengersService(passengers))
            dispath(setDataPassengersServiceReturn(passengersReturn))
        } else {
            const dataChange = {
                flightAwayDetail: flightAwayDetail,
                flightReturnDetail: null
            }
            const passengers = dataPassengers.map((item) => {
                // Tạo một bản sao của đối tượng hiện tại để không làm thay đổi dữ liệu gốc
                const newItem = { ...item }
                // Loại bỏ các biến không mong muốn
                delete newItem.seat
                return newItem
            })
            dispath(setSelectChangeFly(dataChange))
            dispath(setDataPassengersService(passengers))
            dispath(setDataPassengersServiceReturn(null))
        }
        navigate('/my/sevice-detail')
    }
    return (
        <div className='service-detail'>
            <div className='nav-service-detail'>
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>
                            Mã đặt chỗ :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {' '}
                                {bookingDetails?.bookingCode}
                            </span>
                        </p>
                    </Col>
                    <Col span={16} className='code-booking-status'>
                        <p>
                            Trạng thái:{' '}
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
                            <Col span={24}>
                                <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>Chuyến đi</Text>
                            </Col>
                        </Row>
                    </div>
                    <Text className='date-fly'>Ngày: {formatDateString(flightAwayDetail?.arrivalTime)}</Text>
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
                            <Text className='location'>{flightAwayDetail?.destinationAirport?.airportCode}</Text>
                        </Col>
                        <Col span={7}>
                            <Text className='name-fly'>Hãng khai thác:</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5} className='info-fly'>
                            <Text className='time'>{formatTime(flightAwayDetail?.departureTime)}</Text>
                        </Col>
                        <Col span={7} className='info-fly'>
                            <Text className='time-fly'>Bay thẳng</Text>
                        </Col>
                        <Col span={5} className='info-fly'>
                            <Text className='time'>{formatTime(flightAwayDetail?.arrivalTime)}</Text>
                        </Col>
                        <Col span={7}>
                            <Text className='name-fly'>VietNam Airline</Text>
                        </Col>
                    </Row>
                </div>
                {bookingDetails?.journeyType === 'RETURN' ? (
                    <div className='form-select-fly-service' style={{ marginTop: 30 }}>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={24}>
                                    <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>Chuyến về</Text>
                                </Col>
                            </Row>
                        </div>
                        <Text className='date-fly'>Ngày: {formatDateString(flightReturnDetail?.arrivalTime)}</Text>
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
                                <Text className='location'>{flightReturnDetail?.destinationAirport?.airportCode}</Text>
                            </Col>
                            <Col span={7}>
                                <Text className='name-fly'>Hãng khai thác:</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5} className='info-fly'>
                                <Text className='time'>{formatTime(flightReturnDetail?.departureTime)}</Text>
                            </Col>
                            <Col span={7} className='info-fly'>
                                <Text className='time-fly'>Bay thẳng</Text>
                            </Col>
                            <Col span={5} className='info-fly'>
                                <Text className='time'>{formatTime(flightReturnDetail?.arrivalTime)}</Text>
                            </Col>
                            <Col span={7}>
                                <Text className='name-fly'>VietNam Airline</Text>
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
                            Quay lại
                        </Button>
                    </Col>
                    <Col span={12}></Col>
                    <Col span={6}>
                        <Button className='footer-continue-info' onClick={() => handleContinue()}>
                            Tiếp tục
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlyService
