import { useEffect, useState } from 'react'
import { Col, Row, Typography, Input, Button, Avatar, DatePicker, Select, Radio } from 'antd'
import './Personal.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IconUserSquareRounded, IconInfoSquareRoundedFilled, IconClockFilled } from '@tabler/icons-react'
import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import { getCountries, getInforUser } from '../../../services/apiAuth'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { showWaringModal } from '../../../utils/modalError'
import { putPassenger } from '../../../services/apiHomePage'
import { openNotification } from '../../../utils/Notification'
import { setInforUser } from '../../../redux/reducers/Auth'
import { getAcronym } from '../../../utils/utils'
const { Text } = Typography
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
const Personal = () => {
    const InforUser = useSelector((state) => state.Auth.InforUser)
    const dispastch = useDispatch()
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const [listCountries, setListCountries] = useState([])
    const [onChangePersonal, setonChangePersonal] = useState(false)
    useEffect(() => {
        fechListCountries()
    }, [])
    const [dateOfBirth, setDateOfBirth] = useState(InforUser?.dateOfBirth)
    const [firstName, setFirstName] = useState(InforUser?.firstName)
    const [idCard, setIdCard] = useState(InforUser?.idCard)
    const [lastName, setLastName] = useState(InforUser?.lastName)
    const [gender, setGender] = useState(InforUser?.gender)
    const [country, setCountry] = useState(InforUser?.country)
    const [email, setEmail] = useState(InforUser?.email)
    const data = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        country: country,
        gender: gender,
        email: email,
        idCard: idCard
    }
    const ChangePersonal = () => {
        setonChangePersonal(true)
    }
    const fechListCountries = async () => {
        let res = await getCountries()
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }
    const onChangecountries = (value) => {
        setCountry(value)
    }
    const onChange = (e) => {
        setGender(e.target.value)
    }

    const formattedDate = moment(InforUser.dateOfBirth).format('DD/MM/YYYY')

    const onChangeDatePicker = (dates, dateStrings) => {
        setDateOfBirth(dateStrings)
    }
    const handleConfirm = async () => {
        try {
            await putPassenger(data)
            let ress = await getInforUser()
            dispastch(setInforUser(ress.data))
            openNotification('success', `${getText('Notification')}`, 'cập nhật thành công')
        } catch (error) {
            showWaringModal(`${getText('HeyFriend')}`, error.response.data.error.message, `${getText('Close')}`)
        }
    }
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']
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
                                style={{ backgroundColor: '#f6f7f6' }}
                            >
                                <Row>
                                    <Col span={3} className='col-profile-account'>
                                        <IconInfoSquareRoundedFilled
                                            className='icon-proifile-account'
                                            style={{ color: '#006885', paddingLeft: 10 }}
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
                            <Row>
                                <Col span={22}>
                                    <Text className='title-profile'>Thông tin cá nhân</Text>
                                </Col>
                                <Col span={2}>
                                    <EditOutlined className='icon-title-personal' onClick={() => ChangePersonal()} />
                                </Col>
                            </Row>
                        </div>
                        {onChangePersonal ? (
                            <div className='change-personal-content'>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Danh xưng:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Radio.Group onChange={onChange} value={gender}>
                                                    <Radio value='MALE'>Nam</Radio>
                                                    <Radio value='FEMALE'>Nữ</Radio>
                                                </Radio.Group>
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
                                                <Input
                                                    value={lastName}
                                                    className='change-personal'
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Tên đệm và tên: </Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    value={firstName}
                                                    className='change-personal'
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
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
                                                <Input
                                                    value={idCard}
                                                    className='change-personal'
                                                    onChange={(e) => setIdCard(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='personal'>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Mail:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    value={email}
                                                    className='change-personal'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='personal'>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Ngày sinh:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <DatePicker
                                                    defaultValue={dayjs(formattedDate, dateFormatList[0])}
                                                    format={dateFormatList}
                                                    style={{ width: '25%' }}
                                                    className='text-input'
                                                    placeholder='--/--/----'
                                                    onChange={onChangeDatePicker}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className='account'>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={4}>
                                                <Text className='text-personal'>Quốc tịch:</Text>
                                            </Col>
                                            <Col span={20}>
                                                <Select
                                                    showSearch
                                                    style={{ width: '25%', fontSize: 16, fontWeight: 500 }}
                                                    placeholder={getText('Nation')}
                                                    optionFilterProp='children'
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').includes(input)
                                                    }
                                                    defaultValue={country}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '')
                                                            .toLowerCase()
                                                            .localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    onChange={onChangecountries}
                                                >
                                                    {listCountries.map((item) => (
                                                        // eslint-disable-next-line react/jsx-no-undef
                                                        <Option
                                                            key={item.countryCode}
                                                            value={item.countryCode}
                                                            label={item.countryName}
                                                        >
                                                            {item.countryName}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='form-btn-change-password'>
                                    <Col>
                                        <Button
                                            className='btn-cancel-change'
                                            onClick={() => setonChangePersonal(false)}
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
                            <div className='profile-personal-content'>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={5}>
                                        <Text className='text-personal'>Danh xưng:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>
                                            {InforUser.gender == 'MALE' ? (
                                                <>Ông</>
                                            ) : InforUser.gender == 'FEMALE' ? (
                                                <>Bà</>
                                            ) : (
                                                <>Other</>
                                            )}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row className='personal'>
                                    <Col span={5}>
                                        <Text className='text-personal'>Họ:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>
                                            {InforUser.lastName}
                                        </Text>
                                    </Col>
                                    <Col span={19}>
                                        <Text className='text-personal'>Tên đệm và tên: </Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>
                                            {' '}
                                            {InforUser.firstName}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Text className='text-personal'>Ngày sinh:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>
                                            {formattedDate}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row className='personal' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Text className='text-personal'>Số hộ chiếu/CMND:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>
                                            {InforUser?.idCard}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row className='account' style={{ paddingTop: 20 }}>
                                    <Col span={24}>
                                        <Text className='text-personal'>Quốc tịch:</Text>
                                        <Text className='text-personal' style={{ color: 'black', paddingLeft: 10 }}>
                                            {InforUser?.country}
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Personal
