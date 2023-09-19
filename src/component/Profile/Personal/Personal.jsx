import React, { useState } from 'react';
import { Col, Row, Typography, Input, Button, Avatar } from 'antd';
import './Personal.css'
import { useNavigate } from 'react-router-dom';
import { IconUserSquareRounded, IconInfoSquareRoundedFilled, IconClockFilled, IconMail, IconLock, } from '@tabler/icons-react';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const Personal = () => {
    const navigate = useNavigate();
    const [onChangePersonal, setonChangePersonal] = useState(false);
    const ChangePersonal = () => {
        setonChangePersonal(true);
    }

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
                                style={{ backgroundColor: '#f6f7f6' }}>
                                <Row >
                                    <Col span={3} className='col-profile-account'>
                                        <IconInfoSquareRoundedFilled className='icon-proifile-account'
                                            style={{ color: '#006885', paddingLeft: 10 }} />
                                    </Col>
                                    <Col span={21} className='col-profile-account'>
                                        <Text className='text-li'>Thông tin cá nhân</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li className='li-profile-account'
                                onClick={() => navigate('/profile/transaction-history')}
                                style={{ backgroundColor: 'white', borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                                <Row >
                                    <Col span={3} className='col-profile-account'>
                                        <IconClockFilled className='icon-proifile-account'
                                            style={{ color: '#555555', paddingLeft: 10 }} />
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
                            <Row>
                                <Col span={22}>
                                    <Text className='title-profile'>Thông tin cá nhân</Text>
                                </Col>
                                <Col span={2}>
                                    <EditOutlined className='icon-title-personal' onClick={() => ChangePersonal()} />
                                </Col>
                            </Row>

                        </div>
                        {onChangePersonal ?
                            <div className='change-personal-content'>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Danh xưng:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input placeholder="Nhập danh xưng" className='change-personal' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='personal'>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Họ:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input placeholder="Nhập họ" className='change-personal' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} >
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Tên đệm và tên: </Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input placeholder="Nhập tên đệm và tên" className='change-personal' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Ngày sinh:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input placeholder="Nhập ngày sinh" className='change-personal' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Số CMND:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input placeholder="Nhập ngày sinh" className='change-personal' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='account' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Quốc tịch:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input placeholder="Nhập ngày sinh" className='change-personal' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='form-btn-change-password'>
                                    <Col >
                                        <Button className='btn-cancel-change' onClick={() => setonChangePersonal(false)}> Hủy bỏ</Button>
                                        <Button className='btn-confirm-change'>Xác nhận</Button>
                                    </Col>
                                </Row>
                            </div>
                            :
                            <div className='profile-personal-content'>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={5}>
                                        <Text className='text-personal'>Danh xưng:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>Ông</Text>
                                    </Col>
                                </Row>
                                <Row className='personal'>
                                    <Col span={5}>
                                        <Text className='text-personal'>Họ:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>Phạm</Text>
                                    </Col>
                                    <Col span={19}>
                                        <Text className='text-personal'>Tên đệm và tên: </Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}> HOÀNG HUY</Text>
                                    </Col>
                                </Row>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Text className='text-personal'>Ngày sinh:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>18/01/2001</Text>
                                    </Col>
                                </Row>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Text className='text-personal'>Số hộ chiếu/CMND:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>00000000</Text>
                                    </Col>
                                </Row>
                                <Row className='account' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Text className='text-personal'>Quốc tịch:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>VN</Text>
                                    </Col>
                                </Row>
                            </div>
                        }


                    </Col>
                </Row>
            </div >
        </>
    )
}
export default Personal;