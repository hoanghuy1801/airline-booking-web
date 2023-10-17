import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Drawer, Row, Col, Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import '../Header/Header.css'
import logo from '../../assets/VivuAirlines.png'

import { useLanguage, LanguageProvider } from '../../LanguageProvider/LanguageProvider'
import { setLanguage } from '../../redux/reducers/languageSlice'

const { Text } = Typography
const Header = () => {
    const navigate = useNavigate()

    const [openMenu, setOpenMenu] = useState(false)

    const AppMenuDrawer = () => {
        return (
            <>
                <Row>
                    <div
                        style={{
                            paddingLeft: '20%'
                        }}
                    >
                        <img
                            src={logo}
                            onClick={() => {
                                navigate('/')
                            }}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </Row>
                <Row>
                    <div className='auth'>
                        <UserOutlined className='auth-child' />
                        <span
                            className='auth-child'
                            onClick={() => {
                                navigate('/register')
                            }}
                        >
                            Đăng ký
                        </span>
                        <span>|</span>
                        <span
                            className='auth-child'
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            Đăng nhập
                        </span>
                    </div>
                </Row>
                <Row>
                    <Button className='service-child' type='link'>
                        CHUYẾN BAY CỦA TÔI
                    </Button>
                    <Button
                        className='service-child'
                        type='link'
                        onClick={() => {
                            navigate('/checkin')
                        }}
                    >
                        CHECKIN-ONLINE
                    </Button>
                </Row>
            </>
        )
    }
    const AppMenu = () => {
        const { getText, changeLanguage } = useLanguage()
        const dispastch = useDispatch()
        const handleChangeLanguageVI = () => {
            changeLanguage('vi')
            dispastch(setLanguage('vi'))
        }
        const handleChangeLanguageEN = () => {
            changeLanguage('en')
            dispastch(setLanguage('en'))
        }
        const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated)

        const InforUser = useSelector((state) => state.Auth.InforUser)
        return (
            <>
                <div className='menuPage'>
                    <Row className='headerMenu'>
                        <Col span={6}>
                            <div className='logo'>
                                <img
                                    src={logo}
                                    onClick={() => {
                                        navigate('/')
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className='service'>
                                <Button
                                    className='service-child'
                                    type='link'
                                    onClick={() => {
                                        navigate('/my/search-booking')
                                    }}
                                >
                                    {getText('myflight')}
                                </Button>
                                <Button
                                    className='service-child'
                                    type='link'
                                    onClick={() => {
                                        navigate('/checkin')
                                    }}
                                >
                                    CHECKIN-ONLINE
                                </Button>
                                <Button
                                    className='service-child'
                                    type='link'
                                    onClick={() => {
                                        navigate('/admins')
                                    }}
                                >
                                    Admin
                                </Button>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='auth'>
                                <UserOutlined className='auth-Icon' />
                                {!isAuthenticated ? (
                                    <>
                                        <span
                                            className='auth-child'
                                            onClick={() => {
                                                navigate('/register')
                                            }}
                                        >
                                            {getText('register')}
                                        </span>
                                        <span className='auth-Icon'>|</span>
                                        <span
                                            className='auth-child'
                                            onClick={() => {
                                                navigate('/login')
                                            }}
                                        >
                                            {getText('login')}
                                        </span>
                                        <span
                                            className='auth-child'
                                            style={{ paddingLeft: 20 }}
                                            onClick={() => handleChangeLanguageVI()}
                                        >
                                            VI
                                        </span>
                                        <span className='auth-child' onClick={() => handleChangeLanguageEN()}>
                                            EN
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Text className='auth-name' onClick={() => navigate('/profile/account')}>
                                            {InforUser?.lastName} {InforUser?.firstName}
                                        </Text>
                                        <span
                                            className='auth-child'
                                            style={{ paddingLeft: 20 }}
                                            onClick={() => handleChangeLanguageVI()}
                                        >
                                            VI
                                        </span>
                                        <span className='auth-child' onClick={() => handleChangeLanguageEN()}>
                                            EN
                                        </span>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
    return (
        <LanguageProvider>
            <div className='header'>
                <div className='menuIcon'>
                    <MenuOutlined
                        style={{
                            color: 'white',
                            fontSize: 30,
                            paddingLeft: 12,
                            paddingTop: 12
                        }}
                        onClick={() => {
                            setOpenMenu(true)
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
                        setOpenMenu(false)
                    }}
                    bodyStyle={{ backgroundColor: '#006885' }}
                >
                    <AppMenuDrawer />
                </Drawer>
            </div>
        </LanguageProvider>
    )
}

export default Header
