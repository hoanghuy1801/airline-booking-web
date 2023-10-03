import React from 'react';
import { Button, DatePicker, Form, Input, Row, Col, Typography, Divider, Select } from 'antd';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../Auth/Register.css'
import {
    GoogleOutlined,
    FacebookFilled,
    RollbackOutlined
} from '@ant-design/icons';
import { getCountries, postRegister } from '../../services/apiRegister';
import { formatDate } from '../../utils/format';
import { showSuccessModal, showWaringModal } from '../../utils/modalError';


const { Title, Text } = Typography;

const Register = () => {
    const [listCountries, setListCountries] = useState([])
    useEffect(() => {
        fechListCountries();
    }, []);

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [gender, setGender] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState("");

    const [country, setCountry] = useState("");

    const [email, setEmail] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispastch = useDispatch();

    const RegisterOr = () => {
        message.success('Register oke nha')
    }

    const fechListCountries = async () => {
        let res = await getCountries();
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }
    const onChangeGender = (value) => {
        setGender(value)
    }
    const onChangecountries = (value) => {
        setCountry(value)
    }
    const onChangeDatePicker = (dates, dateStrings) => {
        setDateOfBirth(dateStrings);
    };
    const data = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: formatDate(dateOfBirth),
        country: country,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        password: password

    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validatePhone = (phoneNumber) => {
        return String(phoneNumber)
            .toLowerCase()
            .match(
                /^\d{10}$/
            );
    };
    const handleRegister = async () => {
        try {
            const isValiEmail = validateEmail(email);
            const isValiPhone = validatePhone(phoneNumber);
            if (data.firstName == '') {
                showWaringModal('Bạn ơi', 'Bạn chưa nhập Họ');
                return;
            } else if (lastName == '') {
                showWaringModal('Bạn ơi', 'Bạn chưa nhập Tên');
                return;
            } else if (gender == '') {
                showWaringModal('Bạn ơi', 'Bạn chưa nhập giới tính');
                return;
            } else if (dateOfBirth == '') {
                showWaringModal('Bạn ơi', 'Bạn chưa nhập ngày sinh');
                return;
            } else if (country == '') {
                showWaringModal('Bạn ơi', 'Bạn chưa chọn quốc gia');
                return;
            } else if (email == '') {
                showWaringModal('Bạn ơi', 'Bạn chưa nhập Email');
                return;
            } else if (!isValiEmail) {
                showWaringModal('Bạn ơi', 'Bạn nhập sai định dạng Email');
                return;
            } else if (phoneNumber == '') {
                showWaringModal('Bạn ơi', 'Bạn chưa nhập số điện thoại');
                return;
            } else if (!isValiPhone) {
                showWaringModal('Bạn ơi', 'Bạn nhập nhập sai định dạng số điện thoại');
                return;
            }
            let res = await postRegister(data)
            if (res.status == 201) {
                showSuccessModal('Thông báo', 'Bạn đã đăng ký tài khoản thành công')
            }
        } catch (e) {
            showWaringModal('Bạn ơi', e.response.data.error.message);
        }

    }

    return (
        <div className='page-Register'>
            <Form className='RegisterForm'>
                <Row className='RegisterForm-title'>
                    <Typography.Title style={{ paddingTop: 15 }} >Đăng ký thành viên Vivu!</Typography.Title>
                </Row>
                <Row className='rowInforRegister'>
                    <Col span={10}>
                        <Row>
                            <Input className='text-input'
                                placeholder='Họ*'
                                style={{ width: '90%' }}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Row>
                    </Col>
                    <Col span={14}>
                        <Row>
                            <Input className='text-input'
                                placeholder='Tên đệm & Tên *'
                                style={{ width: '100%' }}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Row>
                    </Col>
                </Row>
                <Text className='text-instruct-name'>Vui lòng nhập họ và tên cùng định dạng trên Hộ chiếu, Thẻ căn cước công dân hoặc CMND của bạn để được tích điểm (Ví dụ với tên Nguyen Van A, bạn cần điền: Họ: NGUYEN, Tên đệm và tên: VAN A)</Text>
                <Row className='rowInforRegister' style={{ paddingTop: 15 }}>
                    <Col span={10}>
                        <Text className='text-Date'> Giới tính</Text>
                        <Select
                            style={{
                                width: '60%'
                            }}
                            onChange={onChangeGender}

                            options={[
                                {
                                    value: 'MALE',
                                    label: 'Nam',
                                },
                                {
                                    value: 'FEMALE',
                                    label: 'Nữ',
                                },
                                {
                                    value: 'OTHER',
                                    label: 'Khác',
                                }

                            ]}
                        />
                    </Col>
                    <Col span={14}>
                        <Row>
                            <Text className='text-Date'> Ngày Sinh</Text>
                            <DatePicker style={{ width: '73%' }} className='text-input' placeholder='--/--/----' format="DD/MM/YYYY"
                                onChange={onChangeDatePicker} />
                        </Row>
                    </Col>

                </Row>
                <Row className='rowInforRegister'>
                    <Col span={10}>
                        <Row>
                            <Select
                                showSearch
                                style={{ width: '91%', fontSize: 16, fontWeight: 500 }}
                                placeholder="Chọn quốc gia *"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={onChangecountries}

                            >
                                {listCountries.map((item) => (
                                    <Option key={item.countryCode} value={item.countryCode} label={item.countryName}>
                                        {item.countryName}
                                    </Option>
                                ))}
                            </Select>
                        </Row>
                    </Col>
                    <Col span={14}>
                        <Row>
                            <Input placeholder="Email"
                                style={{ width: '100%' }} className='text-input'
                                onChange={(e) => setEmail(e.target.value)} />
                        </Row>
                    </Col>
                </Row>
                <Row className='rowInforRegister'>
                    <Col span={24}>
                        <Row>
                            <Input placeholder="Số điện thoại *"
                                style={{ width: '100%' }} className='text-input'
                                onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Row>
                    </Col>
                </Row>
                <Row className='rowInforRegister'>
                    <Col span={24}>
                        <Row>
                            <Input.Password placeholder="Mật khẩu *"
                                style={{ width: '100%' }} className='text-input'
                                onChange={(e) => setPassword(e.target.value)} />
                        </Row>
                    </Col>
                </Row>
                <Row className='rowbtn-register'>
                    <Button
                        type='primary' danger
                        className='btn-register'
                        onClick={() => handleRegister()}
                    >
                        Đăng nhập
                    </Button>
                </Row>
                <div className='register'>
                    <span >Bạn đã có tài khoản?<a onClick={() => { navigate('/login') }}>  Đăng nhập ngay</a></span>
                </div>
                <Divider style={{ borderColor: "black" }}>Hoặc đăng ký bằng</Divider>
                <div className='socialRegister'>
                    <GoogleOutlined className='socialIcon' onClick={() => RegisterOr()} style={{ color: 'red' }} />
                    <FacebookFilled className='socialIcon' onClick={() => RegisterOr()} style={{ color: 'blue' }} />
                </div>
                <div >
                    <span className='back-home' onClick={() => { navigate('/') }}><RollbackOutlined /> Trở về trang chủ</span>
                </div>

            </Form>
        </div >
    );
}
export default Register;