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
    const feachListService = async () => {
        let res = await getServiceAirline(
            selectFlightCheckIn.id,
            '826b4d34-fe05-48b7-b78b-9a83083a38af',
            passengers[0]?.seat?.id
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
                showWaringModal(`${getText('HeyFriend')}`, `${getText('YouNotSeat')}`, `${getText('Close')}`)
                return
            }
            dispath(setSeatCheckin(selectedSeat))
            navigate('/my/restricted-baggage')
        }
    }
    const handleConfirm = () => {
        if (passengers[0]?.seat?.seatCode) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('YouHaveSeat')}`, `${getText('Close')}`)
            return
        } else {
            seatChooseSeat(selectedSeat)
        }
    }
    const handleCancel = () => {
        seatChooseSeat(undefined)
    }
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
                            <IconChecklist style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-container-seat'>
                <Row>
                    <Col span={9}>
                        <p className='text-title'>{getText('SelectSeatCHECKIN')}</p>
                        <div className='info-user-form'>
                            <div className='info-user'>
                                <p className='text-name'>
                                    {convertGender(passengers[0].gender, language)}: {passengers[0]?.lastName}{' '}
                                    {passengers[0]?.firstName}
                                </p>
                                <p className='text-seat'>
                                    {getText('seat')}: {passengers[0]?.seat?.seatCode}
                                    {chooseSeat}
                                </p>
                            </div>
                        </div>
                        <div className='btn'>
                            <Button className='btn-back' onClick={() => navigate('/my/select-passengers')}>
                                {getText('Back')}
                            </Button>
                            <Button
                                className='btn-continue'
                                //onClick={() => }
                                onClick={() => handleContinue()}
                            >
                                {getText('Continue')}
                            </Button>
                        </div>
                    </Col>
                    <Col span={15} className='view-select-seat'>
                        <div className='title-seats'>
                            <p> {getText('SelectSeat')}</p>
                        </div>
                        <div className='info-seat'>
                            <Row>
                                <Col span={5} style={{ display: 'flex' }}>
                                    <div style={{ backgroundColor: 'red' }} className='information-seat-color'></div>
                                    <span>{getText('BUSINESS')}</span>
                                </Col>
                                <Col span={6} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: '#25A006' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('PREMIUM_ECONOMY')}</span>
                                </Col>

                                <Col span={4} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: ' #208AEC' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('ECONOMY')}</span>
                                </Col>
                                <Col span={4} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: '#FBB612 ' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('SEAT_IS_SELECTED')}</span>
                                </Col>

                                <Col span={5} style={{ display: 'flex' }}>
                                    <div
                                        style={{ backgroundColor: ' #D1D3D4' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('SEAT_SELECTED')}</span>
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
                                {getText('No_Thank')}
                            </Button>
                            <Button className='btn-continue' onClick={() => handleConfirm()}>
                                {getText('Confirm')}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectSeat
