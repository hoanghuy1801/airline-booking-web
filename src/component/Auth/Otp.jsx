
import { useState, useEffect } from 'react';
import { Button, Form, Typography } from "antd";
import { InputOTP } from "antd-input-otp";
import { useNavigate } from 'react-router-dom';
import "./Otp.css";
import { postVerifyOTP } from '../../services/apiRegister';
import { convertString } from '../../utils/format';
import { showErrorModal } from '../../utils/modalError';
import { openNotification } from '../../utils/Notification';
const { Title, Text } = Typography;
const Otp = () => {
    const [otpValues, setOtpValues] = useState([]);
    const [timeLeft, setTimeLeft] = useState(120);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleFinish = async (values) => {
        const { otp } = values;
        if (!otp || otp.includes(undefined) || otp.includes(""))
            return form.setFields([
                {
                    name: "otp",
                    errors: ["OTP không có hiệu lực"]
                }
            ]);
        console.log(otp)
        let res = await postVerifyOTP(convertString(otp))
        if (res.data.status == 400) {
            showErrorModal("Thông báo", "OTP không đúng")
        } else {
            openNotification("Thông báo", "Bạn đã đăng ký tài khoản thành công")
            navigate('/')
        }

    };
    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft;

    return (
        <main className="app">
            <section className="card">
                <h2>Vui lòng nhập mã xác thực</h2>
                <div className="form-text">
                    <Text className="text-information">Mã xác thực đã được gửi qua Email:</Text>
                </div>
                <div className="form-text">
                    <Text className="text-email">hoanghuy.pham1801@gmail.com</Text>
                </div>
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name="otp"
                        className="center-error-message"
                        rules={[{ validator: async () => Promise.resolve() }]}
                    >
                        <InputOTP autoFocus inputType="numeric" length={6}
                            inputClassName="input-classname"
                        />
                    </Form.Item>
                    <div className="form-text">
                        <Text className="text-not">Bạn chưa nhận được mã? Nhấn <u className="text-sendTo">gửi lại</u>  sau <Text style={{ color: 'red' }}>{timeLeft}</Text>  giây</Text>
                    </div>
                    <Form.Item noStyle>
                        <Button block htmlType="submit" type="primary" className='btn-accuracy'>
                            XÁC THỰC
                        </Button>
                    </Form.Item>
                    <div className="form-text">
                        <Text className='text-back' onClick={() => navigate('/register')}>Trở về</Text>
                    </div>
                </Form>
            </section>
        </main>
    );
};

export default Otp;
