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
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBookingDetails, getMyBooking } from '../../../services/apiMyFlight'
import { showWaringModal } from '../../../utils/modalError'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { formatCurrency, formatDate, formatDateString } from '../../../utils/format'
import { setBookingDetail } from '../../../redux/reducers/myFlight'
const { Text } = Typography

const { RangePicker } = DatePicker
const items = [
    {
        label: 'Tất cả',
        key: 'all'
    },
    {
        label: 'Chờ hủy',
        key: 'pen'
    },
    {
        label: 'Đã hủy',
        key: 'del'
    }
]
const TransactionHistory = () => {
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const InforUser = useSelector((state) => state.Auth.InforUser)
    const [current, setCurrent] = useState(1)
    const [currents, setCurrents] = useState('all')
    const [listMyBooking, setListMyBooking] = useState([])
    const [selectedDateRange, setSelectedDateRange] = useState(null)
    const [codeBooking, setcodeBooking] = useState('')
    console.log(listMyBooking)
    const dispath = useDispatch()
    useEffect(() => {
        handleSearch()
    }, [])

    const onClick = async (e) => {
        setCurrents(e.key)
        let data = {
            page: 1,
            size: 10
        }
        if (e.key === 'all') {
            let res = await getMyBooking('all', data)
            setListMyBooking(res.data.items)
        } else if (e.key === 'pen') {
            let res = await getMyBooking('pen', data)
            setListMyBooking(res.data.items)
        } else if (e.key === 'del') {
            let res = await getMyBooking('del', data)
            setListMyBooking(res.data.items)
        }
    }
    const onChange = (page) => {
        setCurrent(page)
    }

    const handleSearch = async () => {
        if (selectedDateRange === null) {
            try {
                let data = {
                    page: 1,
                    size: 10,
                    bookingCode: codeBooking.toUpperCase(),
                    fromDate: '',
                    toDate: ''
                }
                let res = await getMyBooking(currents, data)
                setListMyBooking(res.data.items)
            } catch (error) {
                console.log(error)
                showWaringModal(`${getText('HeyFriend')}`, error.response.data.error.message, `${getText('Close')}`)
            }
        } else {
            try {
                let data = {
                    page: 1,
                    size: 10,
                    bookingCode: codeBooking.toUpperCase(),
                    fromDate:
                        formatDate(formatDateString(selectedDateRange[0]?.$d)) === 'Invalid date'
                            ? ''
                            : formatDate(formatDateString(selectedDateRange[0]?.$d)),
                    toDate:
                        formatDate(formatDateString(selectedDateRange[1]?.$d)) === 'Invalid date'
                            ? ''
                            : formatDate(formatDateString(selectedDateRange[1]?.$d))
                }
                let res = await getMyBooking(currents, data)
                setListMyBooking(res.data.items)
            } catch (error) {
                console.log(error)
                showWaringModal(`${getText('HeyFriend')}`, error.response.data.error.message, `${getText('Close')}`)
            }
        }
    }
    const handleDetail = async (id) => {
        let data = {
            bookingId: id
        }
        try {
            let res = await getBookingDetails(data)
            if (res.status === 200) {
                dispath(setBookingDetail(res.data))
                navigate('/my/booking-detail')
            }
        } catch (error) {
            showWaringModal(`${getText('Notification')}`, error.response.data.error.message, `${getText('Close')}`)
        }
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
                            <Menu mode='horizontal' items={items} onClick={onClick} selectedKeys={[currents]} />
                            <Row>
                                <Col span={8}>
                                    {' '}
                                    <RangePicker
                                        placeholder={['Ngày đi', 'Ngày về']}
                                        style={{ marginTop: 20 }}
                                        onChange={(dates) => setSelectedDateRange(dates)}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input
                                        className='input-codeBooking'
                                        placeholder='Nhập mã vé'
                                        onChange={(e) => setcodeBooking(e.target.value)}
                                    />
                                </Col>
                                <Col span={10} className='form-btn-search'>
                                    <Button className='btn-search-transaction-history' onClick={() => handleSearch()}>
                                        Tìm kiếm
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        {listMyBooking.map((item) => {
                            console.log('huy', item)
                            return (
                                <div key={item.id}>
                                    <div className='profile-history-header'>
                                        <Row className=''>
                                            <Col span={8}>
                                                <Text className='title-profile'>
                                                    Mã đặt chỗ:{' '}
                                                    <Text style={{ color: 'red', fontSize: 20, fontWeight: 600 }}>
                                                        {item.bookingCode}
                                                    </Text>
                                                </Text>
                                            </Col>
                                            <Col span={8}>
                                                <Text className='title-profile'>
                                                    Loại:{' '}
                                                    <Text style={{ color: 'red', fontSize: 20, fontWeight: 600 }}>
                                                        {item?.journeyType === 'ONE_AWAY' ? 'Một Chiều' : 'Khứ Hồi'}
                                                    </Text>
                                                </Text>
                                            </Col>
                                            <Col span={8}>
                                                <Text className='text-profile-history'>
                                                    {formatCurrency(item.amountTotal)}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='profile-history-content'>
                                        <Row className='history'>
                                            <Col span={2}>
                                                <IconPlaneInflight className='icon-history' />
                                            </Col>
                                            <Col span={22}>
                                                <Text className='text-history'>
                                                    {item.flightAway.sourceAirport.airportName}
                                                </Text>
                                                <IconArrowRight style={{ paddingTop: 10 }} />
                                                <Text className='text-history'>
                                                    {' '}
                                                    {item.flightAway.destinationAirport.airportName}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='profile-history-footer' style={{ marginBottom: 20 }}>
                                        <Row className=''>
                                            <Col span={6}>
                                                {item.status === 'ACT' ? (
                                                    <Text className='text-check-transaction'>Giao dịch thành công</Text>
                                                ) : item.status === 'PEN' ? (
                                                    <Text className='text-check-transaction'>Giao dịch chờ hủy</Text>
                                                ) : item.status === 'DEL' ? (
                                                    <Text className='text-check-transaction'>Giao dịch đã hủy</Text>
                                                ) : (
                                                    <Text className='text-check-transaction'>Giao dịch thành công</Text>
                                                )}
                                            </Col>
                                            <Col span={12}>
                                                <Text className='title-profile'>
                                                    Ngày đi:{' '}
                                                    <Text style={{ color: 'red', fontSize: 20, fontWeight: 600 }}>
                                                        {formatDateString(item?.flightAway?.departureTime)}
                                                    </Text>
                                                </Text>
                                                {item?.flightReturn !== null ? (
                                                    <Text
                                                        className='title-profile'
                                                        style={{ paddingLeft: 20, paddingTop: '10px !!important' }}
                                                    >
                                                        Ngày về:{' '}
                                                        <Text style={{ color: 'red', fontSize: 20, fontWeight: 600 }}>
                                                            {formatDateString(item?.flightReturn?.departureTime)}
                                                        </Text>
                                                    </Text>
                                                ) : (
                                                    ''
                                                )}
                                            </Col>
                                            <Col
                                                span={6}
                                                style={{
                                                    color: 'red',
                                                    fontSize: 17,
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                    paddingRight: 30,
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => handleDetail(item?.id)}
                                            >
                                                Xem chi tiết
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='pagination'>
                            {' '}
                            <Pagination current={current} onChange={onChange} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default TransactionHistory
