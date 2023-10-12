import React, { useState } from 'react';
import { Col, Row, Typography, Avatar, Button } from 'antd';
import './TransactionHistory.css'
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'
import { IconUserSquareRounded, IconInfoSquareRoundedFilled, IconClockFilled, IconArrowRight, IconPlaneInflight, IconLock, } from '@tabler/icons-react';
const { Title, Text } = Typography;

const TransactionHistory = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='profile-account'>
                <Row className='main-profile'>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <ul className='menu-profile'>
                            <li className='li-profile-account'
                                style={{ backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                                <Row>
                                    <Col span={24} className='col-profile-account'>
                                        <Avatar size={64} style={{ marginLeft: 20 }} icon={<UserOutlined
                                        />} />
                                        <Text className='text-li' style={{ paddingLeft: 20 }}>PHAM HOANG HUY</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li className='li-profile-account'
                                onClick={() => navigate('/profile/account')}
                                style={{ backgroundColor: 'white' }}>
                                <Row>
                                    <Col span={3} className='col-profile-account'>
                                        <IconUserSquareRounded className='icon-proifile-account'
                                            style={{ color: '#555555', paddingLeft: 10 }} />
                                    </Col>
                                    <Col span={21} className='col-profile-account'>
                                        <Text className='text-li'>Tài khoản của tôi</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li className='li-profile-account'
                                onClick={() => navigate('/profile/personal')}
                                style={{ backgroundColor: 'white' }}>
                                <Row >
                                    <Col span={3} className='col-profile-account'>
                                        <IconInfoSquareRoundedFilled className='icon-proifile-account'
                                            style={{ color: '#555555', paddingLeft: 10 }} />
                                    </Col>
                                    <Col span={21} className='col-profile-account'>
                                        <Text className='text-li'>Thông tin cá nhân</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li className='li-profile-account'
                                onClick={() => navigate('/profile/transaction-history')}
                                style={{ backgroundColor: '#f6f7f6', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                                <Row >
                                    <Col span={3} className='col-profile-account'>
                                        <IconClockFilled className='icon-proifile-account'
                                            style={{ color: '#006885', paddingLeft: 10 }} />
                                    </Col>
                                    <Col span={21} className='col-profile-account'>
                                        <Text className='text-li'>Lịch sử giao dịch</Text>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className='profile-history-header'>
                            <Row className='' >
                                <Col span={12}>
                                    <Text className='title-profile'>Mã đặt chỗ: 1049442633</Text>
                                </Col>
                                <Col span={12}>
                                    <Text className='text-profile-history'>806.112 VND</Text>
                                </Col>
                            </Row>
                        </div>
                        <div className='profile-history-content'>
                            <Row className='history'>
                                <Col span={2}>
                                    <IconPlaneInflight className='icon-history' />
                                </Col>
                                <Col span={22}>
                                    <Text className='text-history'>Huế</Text>
                                    <IconArrowRight style={{ paddingTop: 10 }} />
                                    <Text className='text-history'>TP HCM</Text>
                                </Col>
                            </Row>
                        </div>
                        <div className='profile-history-footer'>
                            <Row className='' >
                                <Col span={12}>
                                    <Text className='text-check-transaction'>Giao dịch thành công</Text>
                                </Col>
                                <Col span={12}>
                                    <Text className='text-detail' > Xem chi tiết </Text>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    )
}
export default TransactionHistory;