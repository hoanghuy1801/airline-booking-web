import { Row, Col, Typography, Radio, Button } from 'antd'
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import './SelectPassengers.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { convertGender } from '../../../utils/utils'
import { setSelectPassengers } from '../../../redux/reducers/checkIn'
import { showWaringModal } from '../../../utils/modalError'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Text } = Typography
const SelectPassengers = () => {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [selectedValue, setSelectedValue] = useState(null)
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const language = useSelector((state) => state.language.language)
    const selectFlightCheckIn = useSelector((state) => state.checkIn.selectFlightCheckIn?.selectFlight)
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
    let aduls = passenger.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'ADULT')
    let childs = passenger.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'CHILD')
    let infants = passenger.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'INFANT')
    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value)
    }
    const { getText } = useLanguage()

    const handleContinue = () => {
        if (selectedValue === null) {
            showWaringModal(
                `${getText('HeyFriend')}`,
                `${getText('NotselectPassengersCheckIn')}`,
                `${getText('Close')}`
            )
            return
        }
        dispath(setSelectPassengers(selectedValue))
        navigate('/my/select-seat')
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
                <Text className='title-services'> {getText('selectPassengersCheckIn')}</Text>
                {aduls.map((index) => (
                    <div className='form-select-fly-service' key={index} style={{ marginBottom: 20 }}>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={22}>
                                    <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                        {convertGender(index?.gender, language)} :
                                    </Text>
                                </Col>
                                <Col span={2}>
                                    <Radio
                                        value={index?.id}
                                        onChange={handleRadioChange}
                                        checked={selectedValue === index?.id}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Text className='name-passengers'>
                            {index?.lastName} {index?.firstName}
                        </Text>
                    </div>
                ))}
                {childs.map((index) => (
                    <div className='form-select-fly-service' key={index} style={{ marginBottom: 20 }}>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={22}>
                                    <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                        {convertGender(index?.gender, language)} :
                                    </Text>
                                </Col>
                                <Col span={2}>
                                    <Radio
                                        value={index?.id}
                                        onChange={handleRadioChange}
                                        checked={selectedValue === index?.id}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Text className='name-passengers'>
                            {index?.lastName} {index?.firstName}
                        </Text>
                    </div>
                ))}
                {infants.map((index) => (
                    <div className='form-select-fly-service' key={index} style={{ marginBottom: 20 }}>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={22}>
                                    <Text style={{ fontSize: '18px', fontWeight: 500, color: 'white' }}>
                                        {convertGender(index?.gender, language)} :
                                    </Text>
                                </Col>
                                <Col span={2}>
                                    <Radio
                                        value={index?.id}
                                        onChange={handleRadioChange}
                                        checked={selectedValue === index?.id}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Text className='name-passengers'>
                            {index?.lastName} {index?.firstName}
                        </Text>
                    </div>
                ))}
            </div>
            <div className='footer'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <Button
                            className='footer-back'
                            onClick={() => {
                                navigate('/my/select-fight')
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
export default SelectPassengers
