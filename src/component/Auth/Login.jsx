import React from 'react';
import { Button, Form, Input, Typography, Divider, message } from 'antd';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../Auth/Login.css'
import {
    GoogleOutlined,
    FacebookFilled,
    RollbackOutlined
} from '@ant-design/icons';



const Login = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispastch = useDispatch();

    const LoginOr = () => {
        message.success('login oke nha')
    }

    const handleLogin = async () => {



        let data = await postLogin(email, password);


        if (data.data && data.data.EC === 0) {
            dispastch({
                type: 'FETCH_USER_LOGIN_SUCCESS',
                payload: data.data
            })
            navigate('/');
        }
    }
    return (
        <div className='page-login'>
            <Form className='loginForm'>
                <Typography.Title >Đăng nhập tài khoản</Typography.Title>
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
                    <Input.Password placeholder='Nhập tài khoản của bạn' />
                    <Typography.Text className='forgot-password'>Bạn quên mật khẩu?</Typography.Text>
                </Form.Item>

                <Button
                    type='primary' danger
                    htmlType='submit'
                    block
                    onClick={() => handleLogin()}
                >
                    Đăng nhập
                </Button>

                <div className='register'>
                    <span >Bạn chưa có tài khoản?<a onClick={() => { navigate('/register') }}>  Đăng ký ngay</a></span>
                </div>
                <Divider style={{ borderColor: "black" }}>Hoặc đăng nhập bằng</Divider>
                <div className='socialLogin'>
                    <GoogleOutlined className='socialIcon' onClick={() => LoginOr()} style={{ color: 'red' }} />
                    <FacebookFilled className='socialIcon' onClick={() => LoginOr()} style={{ color: 'blue' }} />
                </div>
                <div >
                    <span className='back-home' onClick={() => { navigate('/') }}><RollbackOutlined /> Trở về trang chủ</span>
                </div>

            </Form>
        </div >
    );
}
export default Login;