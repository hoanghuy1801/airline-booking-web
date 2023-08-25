
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, Menu, Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import '../Header/Header.css'
import logo from '../../assets/VivuTravel.png'


const Header = () => {
    const navigate = useNavigate();
    const dispastch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false);
    // const [isInline, setIsInline] = useState(true);

    const AppMenuDrawer = ({ isInline = false }) => {
        return (
            <>
                <Col>
                    <div className='auth'>
                        <UserOutlined className='auth-child' />
                        <span className='auth-child' onClick={() => { navigate('/register') }} >Đăng ký </span>
                        <span>|</span>
                        <span className='auth-child' onClick={() => { navigate('/login') }}>Đăng nhập</span>
                    </div>
                </Col>
                <Row>
                    <Col >
                        <Button className='service-child' type='link'>CHUYẾN BAY CỦA TÔI</Button>
                    </Col>
                    <Col >
                        <Button className='service-child' type='link' onClick={() => { navigate('/checkin') }}>CHECKIN-ONLINE</Button>
                    </Col>
                    <Col >
                        <Button className='service-child' type='link'>DỊCH VỤ CHUYẾN BAY</Button>

                    </Col>

                </Row>
            </>
        )
    }
    const AppMenu = ({ isInline = false }) => {
        return (
            <>
                <div className='menuPage'>
                    <Row className='headerMenu'>
                        <Col span={6} >
                            <div className='logo'>  <img src={logo} onClick={() => { navigate('/') }} style={{ cursor: 'pointer' }} /></div>

                        </Col>
                        <Col span={12} >
                            <div className='service'>
                                <Button className='service-child' type='link' onClick={() => { navigate('/my/search-booking') }}>CHUYẾN BAY CỦA TÔI</Button>
                                <Button className='service-child' type='link' onClick={() => { navigate('/checkin') }}>CHECKIN-ONLINE</Button>
                                <Button className='service-child' type='link' >DỊCH VỤ CHUYẾN BAY</Button>
                            </div>
                        </Col>
                        <Col span={6} >
                            <div className='auth'>
                                <UserOutlined className='auth-Icon' />
                                <span className='auth-child' onClick={() => { navigate('/register') }} >Đăng ký </span>
                                <span className='auth-Icon'>|</span>
                                <span className='auth-child' onClick={() => { navigate('/login') }}>Đăng nhập</span>
                            </div>
                        </Col>
                    </Row>

                </div >
            </>


        )

    }

    return (
        <div className='header' >
            <div
                className='menuIcon' >
                <MenuOutlined style={{
                    color: "white",
                    fontSize: 30,
                    paddingLeft: 12,
                    paddingTop: 12
                }}
                    onClick={() => {
                        setOpenMenu(true);
                    }}
                />

            </div>
            <span className='headerMenu'>
                <AppMenu />
            </span>
            <Drawer
                placement='left'
                open={openMenu}
                closable={false}
                onClose={() => {
                    setOpenMenu(false);
                }}
                bodyStyle={{ backgroundColor: '#e62c0c' }}
            >
                <AppMenuDrawer />
            </Drawer>



        </div >



    );
}

export default Header;