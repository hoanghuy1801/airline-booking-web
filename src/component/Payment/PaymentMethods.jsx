import { Col, Row, Typography, Button } from 'antd'
import './PaymentMethods.css'
import { useState } from 'react'
import { postMomo, postVnPay } from '../../services/apiBooking'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/format'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import { useNavigate } from 'react-router-dom'
import { setPaymentMethod } from '../../redux/reducers/booking'
const { Text } = Typography
const PaymentMethods = () => {
    const dispath = useDispatch()

    const origin = window.location.origin
    const totalFlight = useSelector((state) => state.flightSelect.totalflight)
    const [selectedPayment, setSelectedPayment] = useState('vnpay')
    const priceBenefit = 0
    const navigate = useNavigate()
    const handlePaymentClick = (paymentMethod) => {
        setSelectedPayment(paymentMethod)
    }
    const { getText } = useLanguage()
    const dataVnpay = {
        amount: totalFlight,
        returnUrl: origin + '/payment-return'
    }
    const handlePayment = async () => {
        if (selectedPayment === 'vnpay') {
            dispath(setPaymentMethod('VNPAY'))
            await postVnPay(dataVnpay).then((res) => (window.location.href = res.data.paymentLink))
        } else if (selectedPayment === 'momo') {
            dispath(setPaymentMethod('MOMO'))
            await postMomo(dataVnpay).then((res) => (window.location.href = res.data.paymentLink))
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
                            className={`img-payment ${selectedPayment === 'vnpay' ? 'selected' : ''}`}
                            onClick={() => handlePaymentClick('vnpay')}
                        >
                            <img
                                src='https://vnpay.vn/assets/images/logo-icon/logo-primary.svg'
                                width='80'
                                height='80'
                            />
                        </div>
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
                            <Text className='text'>{formatCurrency(totalFlight)}</Text>
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
                            <Text className='text'>{formatCurrency(totalFlight)}</Text>
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
export default PaymentMethods
