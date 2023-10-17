import { Col, Row, Typography, Button } from "antd";
import './PaymentMethods.css'
import { useState } from 'react';
import { postVnPay } from "../../services/apiBooking";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/format";
const { Text } = Typography;
const PaymentMethods = () => {
    const origin = window.location.origin
    const totalFlight = useSelector((state) => state.flightSelect.totalflight);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const priceBenefit = 0;
    const handlePaymentClick = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };
    const dataVnpay = {
        amount: totalFlight,
        returnUrl: origin + '/payment-return'
    }
    const handlePayment = async () => {
        if (selectedPayment === 'vnpay') {
            await postVnPay(dataVnpay).then((res) => window.location.href = res.data.paymentLink)
        }
    }

    return (
        <>
            <div className="main-payment">
                <Row>
                    <Text className="title-payment">Phương thức thanh toán </Text>
                </Row>
                <Row>
                    <Text className="payment-now">Thanh toán ngay </Text>
                </Row>
                <div className="form-payment">
                    <Row className="form-payment">
                        <div
                            className={`img-payment ${selectedPayment === 'momo' ? 'selected' : ''}`}
                            onClick={() => handlePaymentClick('momo')}
                        >
                            <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/momonew-1664036377132.png" width="80" height="80" />
                        </div>
                        <div
                            className={`img-payment ${selectedPayment === 'zalopay' ? 'selected' : ''}`}
                            onClick={() => handlePaymentClick('zalopay')}
                        >
                            <img src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/zalopaypayment-1679149526539.png" width="80" height="50" />
                        </div>
                        <div
                            className={`img-payment ${selectedPayment === 'vnpay' ? 'selected' : ''}`}
                            onClick={() => handlePaymentClick('vnpay')}
                        >
                            <img src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg" width="80" height="80" />
                        </div>
                    </Row>

                </div>
                <Row>
                    <Text className="title-payment">Chi tiết thanh toán</Text>
                </Row>
                <div className="detail-payment">
                    <Row>
                        <Col span={12}>
                            <Text className="text">Tạm tính</Text>
                        </Col>
                        <Col span={12} className="display">
                            <Text className="text">{formatCurrency(totalFlight)}</Text>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={12}>
                            <Text className="text">Thí tiện ích</Text>
                        </Col>
                        <Col span={12} className="display">
                            <Text className="text">{formatCurrency(priceBenefit)}</Text>
                        </Col>
                    </Row>
                    <Row className="total">
                        <Col span={12}>
                            <Text className="text">Tổng tiền</Text>
                        </Col>
                        <Col span={12} className="display">
                            <Text className="text">{formatCurrency(totalFlight)}</Text>
                        </Col>
                    </Row>
                </div>

            </div>
            <div className="btn-payment-form">
                <Row>
                    <Button className='btn-payment' onClick={() => handlePayment()}>Xác nhận</Button>
                </Row>

            </div>
        </>
    )
}
export default PaymentMethods;