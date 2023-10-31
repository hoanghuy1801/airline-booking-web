import { Row, Col, Button } from 'antd'
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import './SelectSeat.css'
import SeatSelector from '../../SelectService/SeatSelector/SeatSelector'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getServiceAirline } from '../../../services/apiBooking'
import { convertGender } from '../../../utils/utils'
import { setSeatCheckin } from '../../../redux/reducers/checkIn'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { showWaringModal } from '../../../utils/modalError'

const SelectSeat = () => {
    const { getText } = useLanguage()
    const [seatOptions, setSeatOptions] = useState({
        seatsInBooking: [],
        id: '',
        aircraftCode: '',
        aircraftName: '',
        capacity: 0,
        rowNumbers: 0,
        columnNumbers: 0,
        type: '',
        ECONOMY: {
            seatNumber: 0,
            servicePrice: ''
        },
        BUSINESS: {
            seatNumber: 0,
            servicePrice: ''
        },
        PREMIUM_ECONOMY: {
            seatNumber: 0,
            servicePrice: ''
        }
    })
    const [selectedSeat, setSelectedSeat] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [priceSeat, setPriceSeat] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [selectedSeats, setSelectedSeats] = useState([])
    const [chooseSeat, seatChooseSeat] = useState()
    useEffect(() => {
        feachListService()
    }, [])
    const dispath = useDispatch()
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const language = useSelector((state) => state.language.language)
    const flightReturnDetail = useSelector((state) => state.myFlight.bookingDetails?.flightReturnDetail)
    const selectFlightCheckIn = useSelector((state) => state.checkIn.selectFlightCheckIn?.selectFlight)
    const passengerId = useSelector((state) => state.checkIn?.selectPassengers)
    const selectFlightReturn = useSelector((state) => state.checkIn.selectFlightCheckIn?.return)
    let newData = { ...selectFlightCheckIn }
    if (selectFlightReturn) {
        newData.passenger = newData.passengerReturnsDetail
        delete newData.passengerReturnsDetail
    } else {
        newData.passenger = newData.passengerAwaysDetail
        delete newData.passengerAwaysDetail
    }
    let passenger = newData?.passenger

    let passengers = passenger.filter((passenger) => passenger.id === passengerId)
    console.log('selectFlightCheckIn', selectFlightCheckIn)
    const feachListService = async () => {
        let res = await getServiceAirline(
            selectFlightCheckIn.id,
            '826b4d34-fe05-48b7-b78b-9a83083a38af',
            flightReturnDetail?.passengerReturnsDetail[0]?.seat?.id
        )
        setSeatOptions(res.data.seatOptions)
    }
    const navigate = useNavigate()
    const handleContinue = () => {
        if (passengers[0]?.seat?.seatCode !== undefined) {
            dispath(setSeatCheckin(selectedSeat))
            navigate('/my/restricted-baggage')
        } else {
            if (chooseSeat === undefined) {
                showWaringModal(`${getText('HeyFriend')}`, 'bạn chưa chọn ghế ngồi', `${getText('Close')}`)
                return
            }
            dispath(setSeatCheckin(selectedSeat))
            navigate('/my/restricted-baggage')
        }
    }
    const handleConfirm = () => {
        if (passengers[0]?.seat?.seatCode) {
            showWaringModal(`${getText('HeyFriend')}`, 'bạn đã đặt ghế trước đó', `${getText('Close')}`)
            return
        } else {
            seatChooseSeat(selectedSeat)
        }
    }
    const handleCancel = () => {
        seatChooseSeat(null)
    }
    return (
        <div className='booking-detail'>
            <div className='info-booking-detail'>
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
                    <Col span={16} className='icon-select'>
                        <Row>
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCheck style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconChecklist style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-container-seat'>
                <Row>
                    <Col span={9}>
                        <p className='text-title'>Chọn ghế để làm thủ tục</p>
                        <div className='info-user-form'>
                            <div className='info-user'>
                                <p className='text-name'>
                                    {convertGender(passengers[0].gender, language)}: {passengers[0]?.lastName}{' '}
                                    {passengers[0]?.firstName}
                                </p>
                                <p className='text-seat'>
                                    Seat: {passengers[0]?.seat?.seatCode}
                                    {chooseSeat}
                                </p>
                            </div>
                        </div>
                        <div className='btn'>
                            <Button className='btn-back' onClick={() => navigate('/my/select-passengers')}>
                                Trở lại
                            </Button>
                            <Button
                                className='btn-continue'
                                //onClick={() => }
                                onClick={() => handleContinue()}
                            >
                                Đi tiếp
                            </Button>
                        </div>
                    </Col>
                    <Col span={15} className='view-select-seat'>
                        <div className='title-seats'>
                            <p>Chọn chỗ ngồi</p>
                        </div>
                        <div className='info-seat'>
                            <Row>
                                <Col span={5} style={{ display: 'flex' }}>
                                    <div style={{ backgroundColor: 'red' }} className='information-seat-color'></div>
                                    <span>Ghế thương gia</span>
                                </Col>
                                <Col span={6} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: '#25A006' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>Ghế phổ thông đặc biệt</span>
                                </Col>

                                <Col span={4} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: ' #208AEC' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>Ghế phổ thông</span>
                                </Col>
                                <Col span={4} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: '#FBB612 ' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>Ghế đang chọn</span>
                                </Col>

                                <Col span={5} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: ' #D1D3D4' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>Đã có người</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='seats'>
                            <SeatSelector
                                seatOptions={seatOptions}
                                setSelectedSeat={setSelectedSeat}
                                selectedSeat={selectedSeat}
                                setPriceSeat={setPriceSeat}
                                selectedSeats={selectedSeats}
                            />
                        </div>
                        <div className='btn'>
                            <Button className='btn-back' onClick={() => handleCancel()}>
                                Hủy chọn
                            </Button>
                            <Button className='btn-continue' onClick={() => handleConfirm()}>
                                Xác nhận
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectSeat
