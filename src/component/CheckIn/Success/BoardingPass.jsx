import html2canvas from 'html2canvas'
import './BoardingPass.css'
import { Row, Col, Button } from 'antd'
import QRCode from 'qrcode.react'
import imgplane from '../../../assets/plane-icon_yellow.png'
import { useSelector } from 'react-redux'
import { formatDateString, formatTime } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'

const BoardingPass = () => {
    const { getText } = useLanguage()
    const handleImageDownload = () => {
        const captureElement = document.getElementById('boardingpass')
        html2canvas(captureElement).then((canvas) => {
            const image = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = image
            link.download = 'screenshot.png'
            link.click()
        })
    }
    const dataCheckIn = useSelector((state) => state.checkIn?.dataCheckIn)
    const qrData = dataCheckIn?.ticketCode
    console.log(dataCheckIn)
    return (
        <>
            <div className='main-boardingpass' id='boardingpass'>
                <div className='vivutravel'>
                    <p className='text'>Vivu Travel</p>
                </div>
                <div className='content-main'>
                    <Row className='title'>
                        <p>{getText('Boarding_pass')}</p>
                    </Row>
                    <Row className='title'>
                        <Col span={10}>
                            <Row className='city'>
                                <p>{dataCheckIn?.flight?.sourceAirport?.airportName}</p>
                            </Row>
                            <Row className='code-city'>
                                <p>{dataCheckIn?.flight?.sourceAirport?.airportCode}</p>
                            </Row>
                        </Col>
                        <Col span={4}>
                            <img className='icon' src={imgplane} />
                        </Col>
                        <Col span={10}>
                            <Row
                                className='city'
                                style={{ display: 'flex', justifyContent: 'end', paddingRight: '10px' }}
                            >
                                <p>{dataCheckIn?.flight?.destinationAirport?.airportName}</p>
                            </Row>
                            <Row
                                className='code-city'
                                style={{ display: 'flex', justifyContent: 'end', paddingRight: '10px' }}
                            >
                                <p>{dataCheckIn?.flight?.destinationAirport?.airportCode}</p>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Row className='city'>
                                <p>{getText('passenger')}</p>
                            </Row>
                            <Row className='name-user'>
                                <p>
                                    {dataCheckIn?.passenger?.lastName} ,{dataCheckIn?.passenger?.firstName}
                                </p>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <p className='row-1'>{getText('Date')}</p>
                            <p className='row-2'> {formatDateString(dataCheckIn?.flight?.arrivalTime)}</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>{getText('flight')}</p>
                            <p className='row-2'>{dataCheckIn?.flight?.flightCode}</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>{getText('BOOKING_CODE')}</p>
                            <p className='row-2'>{dataCheckIn?.booking?.bookingCode}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <p className='row-1'>{getText('door')}</p>
                            <p className='row-2'>{dataCheckIn?.doorNumber}</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>{getText('TimeToBoardTheAir')}</p>
                            <p className='row-2'> {formatTime(dataCheckIn?.doorTime)}</p>
                        </Col>
                        <Col span={6}>
                            <p className='row-1'>{getText('seat')}</p>
                            <p className='row-2'>{dataCheckIn?.seatCode}</p>
                        </Col>
                        <Col span={6}>
                            <p className='row-1'>{getText('ticketCode')}</p>
                            <p className='row-2'>{dataCheckIn?.ticketCode}</p>
                        </Col>
                    </Row>

                    <div className='attention'>
                        <p>{getText('SuccessText1')} </p>
                        <p>{getText('SuccessText2')}</p>
                    </div>
                    <div className='code-qr'>
                        <QRCode value={qrData} />
                    </div>
                </div>
            </div>
            <div className='btn-downs'>
                <Button onClick={handleImageDownload} className='btn-down'>
                    {getText('dowImg')}
                </Button>
            </div>
        </>
    )
}

export default BoardingPass
