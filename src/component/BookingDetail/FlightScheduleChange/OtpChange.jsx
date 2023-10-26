import { useState, useEffect } from 'react'
import { Button, Form, Typography } from 'antd'
import { InputOTP } from 'antd-input-otp'
import { useNavigate } from 'react-router-dom'
import './OtpChange.css'
import { postSendPhoneOTP, postVerifyPhoneOTPUpdate } from '../../../services/apiAuth'
import { convertString } from '../../../utils/format'
import { showErrorModal, showSuccessModal, showWaringModal } from '../../../utils/modalError'
import { useSelector } from 'react-redux'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Text } = Typography
const Otp = () => {
    const { getText } = useLanguage()
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const passengerAwaysDetail = useSelector(
        (state) => state.myFlight?.bookingDetails?.flightAwayDetail?.passengerAwaysDetail
    )
    const [timeLeft, setTimeLeft] = useState(120)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        const { otp } = values
        if (!otp || otp.includes(undefined) || otp.includes(''))
            return form.setFields([
                {
                    name: 'otp',
                    errors: [`${getText('NotValidOTP')}`]
                }
            ])
        try {
            await postVerifyPhoneOTPUpdate(bookingDetails?.id, convertString(otp))
            navigate('/payment-change-methods')
        } catch (error) {
            showErrorModal(`${getText('Notification')}`, `${getText('NotOTP')}`, `${getText('Close')}`)
        }
    }
    const hanldeSentOTP = async () => {
        if (timeLeft == 0) {
            await postSendPhoneOTP(bookingDetails?.id, passengerAwaysDetail[0].phoneNumber)
            showSuccessModal(`${getText('Notification')}`, `${getText('AgainOTP')}`, `${getText('Close')}`)
        } else {
            showWaringModal(
                `${getText('Notification')}`,
                `${getText('TryAgain')} ${getText('after')} ${timeLeft} ${getText('second')}`,
                `${getText('Close')}`
            )
        }
    }
    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1)
            }
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [timeLeft])

    return (
        <main className='app'>
            <section className='card'>
                <h2>{getText('VerificationCode')}</h2>
                <div className='form-text'>
                    <Text className='text-information'>{getText('textVerificationCode')}</Text>
                </div>
                <div className='form-text'>
                    <Text className='text-email'>{passengerAwaysDetail[0]?.phoneNumber}</Text>
                </div>
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name='otp'
                        className='center-error-message'
                        rules={[{ validator: async () => Promise.resolve() }]}
                    >
                        <InputOTP autoFocus inputType='numeric' length={6} inputClassName='input-classname' />
                    </Form.Item>
                    <div className='form-text'>
                        <Text className='text-not'>
                            {getText('HaveCode')} {getText('Press')}{' '}
                            <u className='text-sendTo' onClick={() => hanldeSentOTP()}>
                                {getText('SendTo')}
                            </u>{' '}
                            {getText('after')} <Text style={{ color: 'red' }}>{timeLeft}</Text> {getText('second')}
                        </Text>
                    </div>
                    <Form.Item noStyle>
                        <Button block htmlType='submit' type='primary' className='btn-accuracy'>
                            {getText('Authentication')}
                        </Button>
                    </Form.Item>
                    <div className='form-text'>
                        <Text className='text-back' onClick={() => navigate('/my/booking-detail')}>
                            {getText('Back')}
                        </Text>
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default Otp
