import html2canvas from 'html2canvas'
import './BoardingPass.css'
import { Row, Col, Button } from 'antd'
import QRCode from 'qrcode.react'
import imgplane from '../../../assets/plane-icon_yellow.png'
import { useSelector } from 'react-redux'
import { formatDateString, formatTime } from '../../../utils/format'

const BoardingPass = () => {
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
    return (
        <>
            <div className='main-boardingpass' id='boardingpass'>
                <div className='vivutravel'>
                    <p className='text'>Vivu Travel</p>
                </div>
                <div className='content-main'>
                    <Row className='title'>
                        <p>Thẻ lên tàu bay</p>
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
                                <p>KHÁCH HÀNG</p>
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
                            <p className='row-1'>NGÀY</p>
                            <p className='row-2'> {formatDateString(dataCheckIn?.flight?.arrivalTime)}</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>CHUYẾN BAY</p>
                            <p className='row-2'>{dataCheckIn?.flight?.flightName}</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>MÃ ĐẶT CHỖ</p>
                            <p className='row-2'>{dataCheckIn?.booking?.bookingCode}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <p className='row-1'>CỬA</p>
                            <p className='row-2'>{dataCheckIn?.doorNumber}</p>
                        </Col>
                        <Col span={8}>
                            <p className='row-1'>GIỜ RA TÀU BAY</p>
                            <p className='row-2'> {formatTime(dataCheckIn?.doorTime)}</p>
                        </Col>
                        <Col span={6}>
                            <p className='row-1'>SỐ GHẾ</p>
                            <p className='row-2'>{dataCheckIn?.seatCode}</p>
                        </Col>
                        <Col span={6}>
                            <p className='row-1'>MÃ VÉ</p>
                            <p className='row-2'>{dataCheckIn?.ticketCode}</p>
                        </Col>
                    </Row>

                    <div className='attention'>
                        <p> Lưu ý: Cửa khời hành sẽ đóng 15 phút trước giờ khởi hành.</p>
                        <p> Hành khách sẽ không được phép lên tàu bay khi cửa khởi hành đóng.</p>
                    </div>
                    <div className='code-qr'>
                        <QRCode value={qrData} />
                    </div>
                </div>
            </div>
            <div className='btn-downs'>
                <Button onClick={handleImageDownload} className='btn-down'>
                    Tải ảnh
                </Button>
            </div>
        </>
    )
}

export default BoardingPass
