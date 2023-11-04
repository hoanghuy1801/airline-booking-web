import { Col, Row, Typography, Avatar, Menu, DatePicker, Button, Input, Pagination } from 'antd'
import './TransactionHistory.css'
import { useNavigate } from 'react-router-dom'

import {
    IconUserSquareRounded,
    IconInfoSquareRoundedFilled,
    IconClockFilled,
    IconArrowRight,
    IconPlaneInflight
} from '@tabler/icons-react'
import { getAcronym } from '../../../utils/utils'
import { useSelector } from 'react-redux'
import { useState } from 'react'
const { Text } = Typography

const { RangePicker } = DatePicker
const items = [
    {
        label: 'Tất cả',
        key: 'all'
    },
    {
        label: 'Chờ hủy',
        key: 'wait'
    },
    {
        label: 'Hoàn thành',
        key: 'complete'
    },
    {
        label: 'Đã hủy',
        key: 'cancelled'
    }
]
const TransactionHistory = () => {
    const navigate = useNavigate()
    const InforUser = useSelector((state) => state.Auth.InforUser)
    const [current, setCurrent] = useState(1)
    const onChange = (page) => {
        console.log(page)
        setCurrent(page)
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
                                            PHAM HOANG HUY
                                        </Text>
                                    </Col>
                                </Row>
                            </li>
                            <li
                                className='li-profile-account'
                                onClick={() => navigate('/profile/account')}
                                style={{ backgroundColor: 'white' }}
                            >
                                <Row>
                                    <Col span={3} className='col-profile-account'>
                                        <IconUserSquareRounded
                                            className='icon-proifile-account'
                                            style={{ color: '#555555', paddingLeft: 10 }}
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
                                    backgroundColor: '#f6f7f6',
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10
                                }}
                            >
                                <Row>
                                    <Col span={3} className='col-profile-account'>
                                        <IconClockFilled
                                            className='icon-proifile-account'
                                            style={{ color: '#006885', paddingLeft: 10 }}
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
                        <div className='profile-history-header' style={{ paddingTop: 10, marginBottom: 15 }}>
                            <Menu mode='horizontal' items={items} />
                            <Row>
                                <Col span={8}>
                                    {' '}
                                    <RangePicker style={{ marginTop: 20 }} />
                                </Col>
                                <Col span={6}>
                                    <Input className='input-codeBooking' placeholder='Nhập mã vé' />
                                </Col>
                                <Col span={10} className='form-btn-search'>
                                    <Button className='btn-search-transaction-history'>Tìm kiếm</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className='profile-history-header'>
                            <Row className=''>
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
                            <Row className=''>
                                <Col span={12}>
                                    <Text className='text-check-transaction'>Giao dịch thành công</Text>
                                </Col>
                                <Col span={12}>
                                    <Text className='text-detail'> Xem chi tiết </Text>
                                </Col>
                            </Row>
                        </div>
                        <div className='pagination'>
                            {' '}
                            <Pagination current={current} onChange={onChange} total={40} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default TransactionHistory
