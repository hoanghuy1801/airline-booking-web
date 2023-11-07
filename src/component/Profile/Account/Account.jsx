import { useState } from 'react'
import { Col, Row, Typography, Input, Button, Avatar } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import './Account.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    IconUserSquareRounded,
    IconInfoSquareRoundedFilled,
    IconClockFilled,
    IconPhone,
    IconMail,
    IconLock
} from '@tabler/icons-react'
import { setInforUser, setIsAuthenticated } from '../../../redux/reducers/Auth'
import { postChangePassword } from '../../../services/apiAuth'
import { showWaringModal } from '../../../utils/modalError'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { openNotification } from '../../../utils/Notification'
import { getAcronym } from '../../../utils/utils'
import jwt from '../../../utils/jwt'
const { Text } = Typography

const Account = () => {
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const dispastch = useDispatch()
    const [onChangePassword, setonChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [newRePassword, setNewRePassword] = useState()
    const handleChangePassword = () => {
        setonChangePassword(true)
    }
    const InforUser = useSelector((state) => state.Auth.InforUser)
    const data = {
        currentPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: newRePassword
    }

    const handleConfirm = async () => {
        if (newPassword !== newRePassword) {
            showWaringModal(`${getText('HeyFriend')}`, 'mk nhập lại không đúng', `${getText('Close')}`)
            return
        }
        try {
            await postChangePassword(data)
            openNotification('success', `${getText('Notification')}`, 'đỏi mk thành công')
        } catch (error) {
            showWaringModal(`${getText('HeyFriend')}`, error.response.data.error.message, `${getText('Close')}`)
        }
    }
    const hanldeLogOut = () => {
        dispastch(setInforUser(''))
        dispastch(setIsAuthenticated(false))
        jwt.deleteToken()
        navigate('/')
    }
    return (
        <>
            <div className='profile-account'>
                <Row className='main-profile'>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <ul className='menu-profile'>
                            <li
                                className='li-profile-account'
                                style={{ backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
                            >
                                <Row>
                                    <Col span={24} className='col-profile-account'>
                                        <Avatar
                                            size={60}
                                            style={{
                                                backgroundColor: `${InforUser?.color}`,
                                                marginLeft: 20
                                            }}
                                        >
                                            {getAcronym(InforUser.lastName)}
                                            {getAcronym(InforUser.firstName)}
                                        </Avatar>
                                        <Text className='text-li' style={{ paddingLeft: 20 }}>
                                            {InforUser.lastName} {InforUser.firstName}
                                        </Text>
                                    </Col>
                                </Row>
                            </li>
                            <li
                                className='li-profile-account'
                                onClick={() => navigate('/profile/account')}
                                style={{ backgroundColor: '#f6f7f6' }}
                            >
                                <Row>
                                    <Col span={3} className='col-profile-account'>
                                        <IconUserSquareRounded
                                            className='icon-proifile-account'
                                            style={{ color: '#006885', paddingLeft: 10 }}
                                        />
                                    </Col>
                                    <Col span={21} className='col-profile-account'>
                                        <Text className='text-li'>Tài khoản của tôi</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li
                                className='li-profile-account'
                                onClick={() => navigate('/profile/personal')}
                                style={{ backgroundColor: 'white' }}
                            >
                                <Row>
                                    <Col span={3} className='col-profile-account'>
                                        <IconInfoSquareRoundedFilled
                                            className='icon-proifile-account'
                                            style={{ color: '#555555', paddingLeft: 10 }}
                                        />
                                    </Col>
                                    <Col span={21} className='col-profile-account'>
                                        <Text className='text-li'>Thông tin cá nhân</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li
                                className='li-profile-account'
                                onClick={() => navigate('/profile/transaction-history')}
                                style={{
                                    backgroundColor: 'white',
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10
                                }}
                            >
                                <Row>
                                    <Col span={3} className='col-profile-account'>
                                        <IconClockFilled
                                            className='icon-proifile-account'
                                            style={{ color: '#555555', paddingLeft: 10 }}
                                        />
                                    </Col>
                                    <Col span={21} className='col-profile-account'>
                                        <Text className='text-li'>Lịch sử giao dịch</Text>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className='profile-acount-header'>
                            <Text className='title-profile'>Tài khoản</Text>
                        </div>
                        <div className='profile-acount-content'>
                            <Row className='account' style={{ paddingTop: 20 }}>
                                <Col span={2}>
                                    <IconPhone className='icon-account' />
                                </Col>
                                <Col span={4}>
                                    <Text className='text-account'>Phone</Text>
                                </Col>
                                <Col span={17}>
                                    <Text className='text-account'>{InforUser.phoneNumber}</Text>
                                </Col>
                            </Row>
                            <Row className='account'>
                                <Col span={2}>
                                    <IconMail className='icon-account' />
                                </Col>
                                <Col span={4}>
                                    <Text className='text-account'>Email</Text>
                                </Col>
                                <Col span={17}>
                                    <Text className='text-account'>{InforUser.email}</Text>
                                </Col>
                            </Row>
                            {onChangePassword ? (
                                <div className='display-change-password'>
                                    <Row className='account'>
                                        <Col span={2}>
                                            <IconLock className='icon-account' />
                                        </Col>
                                        <Col span={4}>
                                            <Text className='text-account'>Mật Khẩu</Text>
                                        </Col>
                                        <Col span={17}>
                                            <Input.Password
                                                style={{ width: '50%' }}
                                                placeholder='Nhập mật khẩu cũ'
                                                iconRender={(visible) =>
                                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                }
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='account'>
                                        <Col span={2}></Col>
                                        <Col span={4}></Col>
                                        <Col span={17}>
                                            <Input.Password
                                                style={{ width: '50%' }}
                                                placeholder='Nhập mật khẩu mới'
                                                iconRender={(visible) =>
                                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                }
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='account'>
                                        <Col span={2}></Col>
                                        <Col span={4}></Col>
                                        <Col span={17}>
                                            <Input.Password
                                                style={{ width: '50%' }}
                                                placeholder='Nhập lại mật khẩu mới'
                                                iconRender={(visible) =>
                                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                }
                                                onChange={(e) => setNewRePassword(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='form-btn-change-password'>
                                        <Col>
                                            <Button
                                                className='btn-cancel-change'
                                                onClick={() => setonChangePassword(false)}
                                            >
                                                {' '}
                                                Hủy bỏ
                                            </Button>
                                            <Button className='btn-confirm-change' onClick={() => handleConfirm()}>
                                                Xác nhận
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                <div className='display-change'>
                                    <Row className='account'>
                                        <Col span={2}>
                                            <IconLock className='icon-account' />
                                        </Col>
                                        <Col span={4}>
                                            <Text className='text-account'>Mật Khẩu</Text>
                                        </Col>
                                        <Col span={17}>
                                            <Text className='text-account'>******</Text>
                                        </Col>
                                    </Row>
                                    <Row className='account'>
                                        <Col span={2}></Col>
                                        <Col span={4}></Col>
                                        <Col span={17}>
                                            <Text
                                                className='text-change-password'
                                                onClick={() => handleChangePassword()}
                                            >
                                                Đổi mật khẩu{' '}
                                            </Text>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </div>
                        <div className='form-logout-user'>
                            <Button onClick={() => hanldeLogOut()} className='btn-logout-user'>
                                Đăng xuất
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Account
