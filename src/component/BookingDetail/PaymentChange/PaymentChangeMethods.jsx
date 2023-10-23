import { Col, Row, Typography, Button } from 'antd'
import './PaymentChangeMethods.css'
import { useState } from 'react'
import { postVnPay } from '../../../services/apiBooking'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { useNavigate } from 'react-router-dom'
const { Text } = Typography
const PaymentChangeMethods = () => {
    const origin = window.location.origin

    const totalChange = useSelector((state) => state.myFlight.totalChange)
    const [selectedPayment, setSelectedPayment] = useState('vnpay')
    const priceBenefit = 0
    const navigate = useNavigate()
    const handlePaymentClick = (paymentMethod) => {
        setSelectedPayment(paymentMethod)
    }
    const { getText } = useLanguage()
    const dataVnpay = {
        amount: totalChange,
        returnUrl: origin + '/payment-change-return'
    }
    const handlePayment = async () => {
        if (selectedPayment === 'vnpay') {
            await postVnPay(dataVnpay).then((res) => (window.location.href = res.data.paymentLink))
        }
    }

    return (
        <>
            <div className='main-payment'>
                <Row>
                    <Text className='title-payment'>{getText('Payment_methods')} </Text>
                </Row>
                <Row>
                    <Text className='payment-now'>{getText('Payment_Now')} </Text>
                </Row>
                <div className='form-payment'>
                    <Row className='form-payment'>
                        <div
                            className={`img-payment ${selectedPayment === 'momo' ? 'selected' : ''}`}
                            onClick={() => handlePaymentClick('momo')}
                        >
                            <img
                                src='https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/momonew-1664036377132.png'
                                width='80'
                                height='80'
                            />
                        </div>
                        <div
                            className={`img-payment ${selectedPayment === 'zalopay' ? 'selected' : ''}`}
                            onClick={() => handlePaymentClick('zalopay')}
                        >
                            <img
                                src='https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/zalopaypayment-1679149526539.png'
                                width='80'
                                height='50'
                            />
                        </div>
                        <div
                            className={`img-payment ${selectedPayment === 'vnpay' ? 'selected' : ''}`}
                            onClick={() => handlePaymentClick('vnpay')}
                        >
                            <img
                                src='https://vnpay.vn/assets/images/logo-icon/logo-primary.svg'
                                width='80'
                                height='80'
                            />
                        </div>
                    </Row>
                </div>
                <Row>
                    <Text className='title-payment'>{getText('Payment_Details')}</Text>
                </Row>
                <div className='detail-payment'>
                    <Row>
                        <Col span={12}>
                            <Text className='text'>{getText('provisional')}</Text>
                        </Col>
                        <Col span={12} className='display'>
                            <Text className='text'>{formatCurrency(totalChange)}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Text className='text'>{getText('utility_fee')}</Text>
                        </Col>
                        <Col span={12} className='display'>
                            <Text className='text'>{formatCurrency(priceBenefit)}</Text>
                        </Col>
                    </Row>
                    <Row className='total'>
                        <Col span={12}>
                            <Text className='text'>{getText('Total')}:</Text>
                        </Col>
                        <Col span={12} className='display'>
                            <Text className='text'>{formatCurrency(totalChange)}</Text>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='btn-payment-form'>
                <Row>
                    <Button
                        className='btn-payment'
                        style={{ marginRight: 20 }}
                        onClick={() => navigate('/select-service')}
                    >
                        {getText('Back')}
                    </Button>
                    <Button className='btn-payment' onClick={() => handlePayment()}>
                        {getText('Confirm')}
                    </Button>
                </Row>
            </div>
        </>
    )
}
export default PaymentChangeMethods
