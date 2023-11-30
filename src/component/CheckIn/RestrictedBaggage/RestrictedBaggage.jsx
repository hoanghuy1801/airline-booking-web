import { Row, Col, Button, Radio } from 'antd'
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './RestrictedBaggage.css'
import { useDispatch, useSelector } from 'react-redux'
import { posstCheckIn } from '../../../services/apiMyFlight'
import { setDataCheckIn } from '../../../redux/reducers/checkIn'
import { showWaringModal } from '../../../utils/modalError'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'

const RestrictedBaggage = () => {
    const [selectedRadio, setSelectedRadio] = useState(null)
    const navigate = useNavigate()
    const dispath = useDispatch()
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const selectFlightCheckIn = useSelector((state) => state.checkIn.selectFlightCheckIn?.selectFlight)
    const id = useSelector((state) => state.checkIn.selectPassengers)
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
    let passengers = passenger.filter((passenger) => passenger.id === id)
    const seatCheckin = useSelector((state) => state.checkIn.seatCheckin)
    const { getText } = useLanguage()
    const handleContinue = async () => {
        if (selectedRadio !== true) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('redioCheck')}`, `${getText('Close')}`)
            return
        }
        try {
            let data = {
                bookingId: bookingDetails?.id,
                flightId: selectFlightCheckIn?.id,
                passengerId: id,
                seatId: passengers[0]?.seat?.id,
                seatCode: passengers[0]?.seat?.seatCode === undefined ? seatCheckin : passengers[0]?.seat?.seatCode
            }
            let res = await posstCheckIn(data)
            dispath(setDataCheckIn(res.data))
        } catch (error) {
            showWaringModal(`${getText('Notification')}`, error.response.data.error.message, `${getText('Close')}`)
        }
        navigate('/my/success')
    }
    const handleRadioChange = (value) => {
        setSelectedRadio(value?.target?.checked)
    }
    return (
        <div className='booking-restricted-baggage'>
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
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-container-restricted-baggage'>
                <p className='title-booking' style={{ paddingBottom: '10px' }}>
                    {getText('recommends')}
                </p>
                <div className='restricted-baggage-form'>
                    <p className='restricted-baggage-title'> {getText('TitileRecommends')}</p>
                    <p className='restricted-baggage-item'> {getText('TitileRecommends1')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends1')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/phaohoa.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/phaosang.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/thuocsung.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/luudan.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-item'>{getText('TitileRecommends2')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends2')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/chatclo.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/tayrua.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/chattruyennhiem.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/chatphongxa.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-item'>{getText('TitileRecommends3')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends3')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/chatlongdechay.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/diem.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/douongcocon.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/batlua.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-item'>{getText('TitileRecommends4')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends4')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends4_1')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/binhcuuhoa.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/pin.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/sacpin.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CHECKED_CABIN_BAGGAGE/sacpin.png' />
                        </Col>
                    </Row>
                    <Row className='restricted-baggage-imgsmall'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/ContentImage/TravelInfo/Baggage/restrict-baggage/Hanhly_NguyHiem1.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/ContentImage/TravelInfo/Baggage/restrict-baggage/Hanhly_NguyHiem2.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-title'>{getText('TitileRecommends_1')}</p>
                    <p className='restricted-baggage-item'>{getText('TitileRecommends8')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends8')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/daodanang.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/keo.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/dao.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/riu.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-item'>{getText('TitileRecommends5')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends5')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/sung.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/aka.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/dan.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/sungdochoi.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-item'>{getText('TitileRecommends6')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends6')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/denkho.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/dao_6cm.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/xabeng.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/cole.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-text'>{getText('textRecommends6_1')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/gaychoigolf.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/gaybongchay.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/binhxittuve.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/dungvuvothuat.png' />
                        </Col>
                    </Row>
                    <p className='restricted-baggage-title'>{getText('TitileRecommends_2')}</p>
                    <p className='restricted-baggage-text'>{getText('textRecommends7')}</p>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img
                                alt=''
                                src='/~/media/FilesDownload/Travel-Information/Restrict_Baggage/DO_NOT_PUT_IN_CHECKED_BAGGAGE/kimcuong.png'
                            />{' '}
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/PROHIBITED_ITEMS_ON_CABIN_BAGGAGE/gaychoigolf.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/DO_NOT_PUT_IN_CHECKED_BAGGAGE/laptop.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/DO_NOT_PUT_IN_CHECKED_BAGGAGE/chuphinh.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/DO_NOT_PUT_IN_CHECKED_BAGGAGE/tien.png' />
                        </Col>
                    </Row>
                    <Row className='restricted-baggage-form-img'>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/DO_NOT_PUT_IN_CHECKED_BAGGAGE/didong.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/DO_NOT_PUT_IN_CHECKED_BAGGAGE/pin.png' />
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className='restricted-baggage-imgsmall'>
                            <img src='https://www.vietnamairlines.com/~/media/FilesDownload/Travel-Information/Restrict_Baggage/DO_NOT_PUT_IN_CHECKED_BAGGAGE/dongho.png' />
                        </Col>
                    </Row>
                </div>
                <div className='radio-check'>
                    <p>
                        <Radio value='true' onChange={handleRadioChange} /> {getText('radioCheckIn')}
                    </p>
                </div>
                <div className='btn'>
                    <Button className='btn-back' onClick={() => navigate('/my/select-seat')}>
                        {getText('Back')}
                    </Button>
                    <Button className='btn-continue' onClick={() => handleContinue()}>
                        {getText('Continue')}
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    )
}
export default RestrictedBaggage
