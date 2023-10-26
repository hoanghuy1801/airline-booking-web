import { Row, Col, Button } from 'antd'

import './ServiceDetail.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import TotalService from './TotalService'
import { getServiceAirline } from '../../../services/apiBooking'
import { useDispatch, useSelector } from 'react-redux'
import ServiceFly from './ServiceFly/ServiceFly'
import {
    setChangeService,
    setDataPassengersService,
    setDataPassengersServiceReturn,
    setTotalChange
} from '../../../redux/reducers/myFlight'
import { formatCurrency } from '../../../utils/format'
import { showWaringModal } from '../../../utils/modalError'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { changeStatus } from '../../../utils/utils'

const ServiceDetail = () => {
    useEffect(() => {
        feachListService()
    }, [])
    const dispath = useDispatch()
    const navigate = useNavigate()
    const { getText } = useLanguage()
    const [baggageOptions, setBaggageOptions] = useState([])
    const [mealOptions, setMealOptions] = useState([])
    const [totalBaggage, setTotalBaggage] = useState(0)
    const [totalMeal, setTotalMeal] = useState(0)
    const [totalSeat, setTotalSeat] = useState(0)
    const [totalBaggageReturn, setTotalBaggageReturn] = useState(0)
    const [totalMealReturn, setTotalMealReturn] = useState(0)
    const [totalSeatReturn, setTotalSeatReturn] = useState(0)
    let total = totalBaggage + totalMeal + totalSeat + totalBaggageReturn + totalMealReturn + totalSeatReturn
    const bookingDetail = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const [defaultBaggageOptions, setDefaultBaggageOptions] = useState([])
    const [defaultMealOptions, setDefaultMealOptions] = useState([])
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
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const language = useSelector((state) => state.language.language)
    const feachListService = async () => {
        try {
            let res = await getServiceAirline(
                flightAwayDetail?.id,
                '826b4d34-fe05-48b7-b78b-9a83083a38af',
                flightAwayDetail?.passengerAwaysDetail[0]?.seat?.id
            )
            setBaggageOptions(res.data.baggageOptions)
            setMealOptions(res.data.mealOptions)
            setDefaultBaggageOptions(res.data.defaultOpt.defaultBaggageOptions)
            setDefaultMealOptions(res.data.defaultOpt.defaultMealOptions)
            setSeatOptions(res.data.seatOptions)
        } catch (error) {
            console.log(error)
        }
    }
    const handleBack = () => {
        dispath(setDataPassengersService(null))
        dispath(setDataPassengersServiceReturn(null))
        navigate('/my/select-fly-service')
    }
    const handleContinue = async () => {
        if (total === 0) {
            showWaringModal(`${getText('HeyFriend')}`, 'bạn chưa mua dịch vụ', `${getText('Close')}`)
            return
        }
        dispath(setTotalChange(total))
        dispath(setChangeService(true))
        navigate('/payment-change-methods')
    }
    return (
        <div className='service-detail'>
            <div className='nav-service-detail'>
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>
                            Mã đặt chỗ :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {bookingDetail?.bookingCode}
                            </span>
                        </p>
                    </Col>
                    <Col span={16} className='code-booking-status'>
                        <p>
                            Trạng thái:{' '}
                            <span style={{ color: 'green', fontSize: '20px', fontWeight: 700 }}>
                                {' '}
                                {changeStatus(bookingDetail?.status, language)}
                            </span>
                        </p>
                    </Col>
                </Row>
            </div>
            <div className='main-service-detail'>
                <Row>
                    <Col span={15}>
                        <ServiceFly
                            baggageOptions={baggageOptions}
                            mealOptions={mealOptions}
                            defaultBaggageOptions={defaultBaggageOptions}
                            defaultMealOptions={defaultMealOptions}
                            seatOptions={seatOptions}
                            totalBaggage={totalBaggage}
                            setTotalBaggage={setTotalBaggage}
                            totalSeat={totalSeat}
                            setTotalSeat={setTotalSeat}
                            totalMeal={totalMeal}
                            setTotalMeal={setTotalMeal}
                            totalBaggageReturn={totalBaggageReturn}
                            totalMealReturn={totalMealReturn}
                            totalSeatReturn={totalSeatReturn}
                            setTotalBaggageReturn={setTotalBaggageReturn}
                            setTotalMealReturn={setTotalMealReturn}
                            setTotalSeatReturn={setTotalSeatReturn}
                            setSeatOptions={setSeatOptions}
                        />
                    </Col>
                    <Col span={9}>
                        <TotalService total={total} />
                    </Col>
                </Row>
            </div>
            <div className='footer'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <Button
                            className='footer-back'
                            onClick={
                                () => handleBack()
                                // navigate('my/select-fly-service')
                            }
                        >
                            Quay lại
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={18} className='footer-price'>
                                Tổng tiền:
                            </Col>
                            <Col span={6} className='footer-price'>
                                {formatCurrency(total)}
                            </Col>
                        </Row>
                    </Col>
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
export default ServiceDetail
