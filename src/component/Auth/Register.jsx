import React from 'react';
import { Button, Checkbox, Form, Input, Row, Col, Typography, Divider, message } from 'antd';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../Auth/Register.css'
import {
    GoogleOutlined,
    FacebookFilled,
    RollbackOutlined
} from '@ant-design/icons';



const Register = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispastch = useDispatch();

    const RegisterOr = () => {
        message.success('Register oke nha')
    }

    return (
        <div className='page-Register'>
            <Form className='RegisterForm'>
                <Typography.Title >Đăng ký thành viên Vivu!</Typography.Title>
                <Form.Item
                    label='Tài khoản'
                    name={'myEmail'}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}>
                    <Input placeholder='Nhập tài khoản của bạn' />
                </Form.Item>
                <Form.Item
                    label='Mật khẩu'
                    name={'myPassword'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}>
                    <Input.Password placeholder='Nhập mật khẩu' />
                </Form.Item>
                <Form.Item
                    label='Nhập lại mật khẩu'
                    name={'myPassword'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}>
                    <Input.Password placeholder='Nhập lại mật khẩu' />
                </Form.Item>

                <Button
                    type='primary' danger
                    htmlType='submit'
                    block
                    onClick={() => handleRegister()}
                >
                    Đăng nhập
                </Button>

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