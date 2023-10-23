import { Row, Col } from 'antd'
import { useSelector } from 'react-redux'

import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import './PaymentChange.css'
import PaymentChangeMethods from './PaymentChangeMethods'
const PaymentChange = () => {
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    return (
        <div className='select-flight'>
            <div className='info-flight'>
                <Row>
                    <Col span={24} className='code-booking-change'>
                        <p>
                            Mã đặt chỗ :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {bookingDetails?.bookingCode}
                            </span>
                        </p>
                    </Col>
                </Row>
            </div>
            <div className='mains-container'>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className='infor-user-select-flight'>
                        <PaymentChangeMethods />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default PaymentChange
