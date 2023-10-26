import { Row, Col, Button, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import InfoFly from '../../SelectFlight/InfoFly/InfoFly'
import SelectInfoFlyChange from './SelectInfoFlyChange'
import { getListFlight } from '../../../services/apiBooking'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency, formatDate } from '../../../utils/format'
import { useNavigate } from 'react-router-dom'
import { postSendPhoneOTP } from '../../../services/apiAuth'
import { showWaringModal } from '../../../utils/modalError'
import { setChangeService, setSelectedFlyChange, setTotalChange } from '../../../redux/reducers/myFlight'
const { Text } = Typography
const SelectFlightChange = () => {
    const navigate = useNavigate()
    const { getText } = useLanguage()
    useEffect(() => {
        feachListFlight()
    }, [])
    const [loading, setLoading] = useState(true)
    const [totalAll, setTotalAll] = useState(0)
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const dispath = useDispatch()
    const [flightSelect, setFlightSelect] = useState({
        id: '',
        createdAt: '',
        updatedAt: '',
        flightCode: '',
        flightName: '',
        departureTime: '',
        arrivalTime: '',
        status: '',
        airline: {
            id: '',
            airlineCode: '',
            airlineName: '',
            avatarUrl: ''
        },
        aircraft: {
            id: '',
            aircraftCode: '',
            aircraftName: '',
            capacity: 0,
            rowNumbers: 0,
            columnNumbers: 0,
            businessNumber: 0,
            economyNumber: 0,
            premiumEconomyNumber: 0,
            type: ''
        },
        sourceAirport: {
            id: 0,
            airportCode: '',
            airportName: 't',
            visualIndex: 0
        },
        destinationAirport: {
            id: 0,
            airportCode: '',
            airportName: '',
            visualIndex: 0
        },
        flightSeatPrice: {
            id: '',
            createdAt: '',
            updatedAt: '',
            infantPrice: '',
            adultPrice: '',
            childrenPrice: '',
            seatClass: '',
            taxPrice: '',
            taxService: {
                id: '',
                airportFee: '',
                systemServiceSurcharge: '',
                systemAdministrationSurcharge: '',
                securityScreeningFee: '',
                VATTax: '',
                totalFee: '',
                fuelCharge: null,
                flightType: ''
            }
        }
    })
    const passengerAwaysDetail = useSelector(
        (state) => state.myFlight?.bookingDetails?.flightAwayDetail?.passengerAwaysDetail
    )
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const dataChangeFly = useSelector((state) => state.myFlight?.dataChangeFly)
    const selectChangeFly = useSelector((state) => state.myFlight?.selectChangeFly)
    const [listFlight, setListFlight] = useState([])
    const feachListFlight = async () => {
        try {
            setLoading(true) // Bắt đầu hiển thị Spinner
            if (selectChangeFly?.return) {
                const res = await getListFlight(
                    flightAwayDetail?.destinationAirport?.id,
                    flightAwayDetail?.sourceAirport?.id,
                    formatDate(dataChangeFly?.date),
                    flightAwayDetail?.passengerAwaysDetail[0]?.seat?.id,
                    dataChangeFly?.aduls,
                    dataChangeFly?.childs,
                    dataChangeFly?.infants
                )
                setListFlight(res.data)
            } else {
                const res = await getListFlight(
                    flightAwayDetail?.sourceAirport?.id,
                    flightAwayDetail?.destinationAirport?.id,
                    formatDate(dataChangeFly?.date),
                    flightAwayDetail?.passengerAwaysDetail[0]?.seat?.id,
                    dataChangeFly?.aduls,
                    dataChangeFly?.childs,
                    dataChangeFly?.infants
                )
                setListFlight(res.data)
            }

            // Lưu kết quả từ API vào biến data
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false) // Dừng hiển thị Spinner khi API hoàn thành
        }
    }
    let passengerDetail = {}
    if (selectChangeFly?.return) {
        // eslint-disable-next-line no-unused-vars
        passengerDetail = selectChangeFly?.flightReturnDetail?.passengerReturnsDetail
    } else {
        // eslint-disable-next-line no-unused-vars
        passengerDetail = selectChangeFly?.flightAwayDetail?.passengerAwaysDetail
    }

    const handleContinue = async () => {
        if (flightSelect.flightSeatPrice.adultPrice == '') {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotSelectFlight')}`, `${getText('Close')}`)
            return
        }
        try {
            await postSendPhoneOTP(bookingDetails?.id, passengerAwaysDetail[0]?.phoneNumber)
        } catch (error) {
            showWaringModal('ADMIN', 'API ERROR', `${getText('Close')}`)
        }
        dispath(setSelectedFlyChange(flightSelect))
        dispath(setTotalChange(totalAll))
        dispath(setChangeService(false))
        navigate('/my/opt-change')
    }
    return (
        <div className='search-detail'>
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
                </Row>
            </div>
            <div className='main-service-detail'>
                <Row>
                    {loading ? ( // Kiểm tra biến trạng thái để hiển thị Spinner
                        <Col xs={24} sm={24} md={24} lg={24} xl={15} style={{ paddingTop: 200 }}>
                            <Row className='col-spin'>
                                <Spin size='large' className='spin' />
                            </Row>
                            <Row className='col-spin'>
                                <Text className='search-spin'>{getText('searchSpin')}</Text>
                            </Row>
                        </Col>
                    ) : (
                        <Col xs={24} sm={24} md={24} lg={24} xl={15} style={{ paddingRight: 30 }}>
                            {listFlight.length != 0 ? (
                                <InfoFly listFlight={listFlight} setFlightSelect={setFlightSelect} />
                            ) : (
                                <div className='no-flight'>
                                    <Text className='text-NotificationFlight'>{getText('NotFlight')}</Text>
                                </div>
                            )}
                        </Col>
                    )}
                    <Col xs={24} sm={24} md={24} lg={24} xl={9}>
                        <SelectInfoFlyChange
                            flightSelect={flightSelect}
                            flightAwayDetail={flightAwayDetail}
                            setTotalAll={setTotalAll}
                            totalAll={totalAll}
                        />
                    </Col>
                </Row>
            </div>
            <div className='footer'>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12} className='footer-price-form'>
                        <Row>
                            <Col span={16} className='footer-price'>
                                {getText('Total')}:
                            </Col>
                            <Col span={8} className='footer-price'>
                                {formatCurrency(totalAll)}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={24} lg={6} xl={6} className='footer-price-btn'>
                        <Button className='footer-continue-select' onClick={() => handleContinue()}>
                            {getText('Continue')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SelectFlightChange
