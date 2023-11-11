import { Avatar, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { getCountries } from '../../../services/apiAuth'
import './CustomerInfo.css'
import { useSelector } from 'react-redux'
import { editEmployee } from '../../../services/apiAdmin'
import { formatDate } from '../../../utils/format'
import { openNotification } from '../../../utils/Notification'
const { Text } = Typography
const CustomerInfo = () => {
    const InforEmployee = useSelector((state) => state.Admin.InforEmployee)
    const [name, setName] = useState(InforEmployee?.name)
    const [dateOfBirth, setDateOfBirth] = useState(InforEmployee?.dateOfBirth)
    const [gender, setGender] = useState(InforEmployee?.gender)
    const [idCard, setIdCard] = useState(InforEmployee?.idCard)
    const [email, setEmail] = useState(InforEmployee?.email)
    const [country, setCountry] = useState(InforEmployee?.country)
    const [address, setAddress] = useState(InforEmployee?.address)
    useEffect(() => {
        fechListCountries()
    }, [])
    const fechListCountries = async () => {
        let res = await getCountries()
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }
    const [listCountries, setListCountries] = useState([])

    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const showDrawer = () => {
        setOpen(true)
    }
    const onDateOfBirth = (dates, dateStrings) => {
        setDateOfBirth(dateStrings)
    }
    const onClose = () => {
        setOpen(false)
    }
    const onChangecountries = (value) => {
        setCountry(value)
    }
    const handleGender = (value) => {
        setGender(value)
    }
    console.log('InforEmployee', InforEmployee)
    const handleContinue = async () => {
        const data = {
            name: name,
            dateOfBirth: formatDate(dateOfBirth) === 'Invalid date' ? '' : formatDate(dateOfBirth),
            gender: gender,
            idCard: idCard,
            email: email,
            address: address,
            country: country
        }

        try {
            await editEmployee(InforEmployee?.id, data)
            openNotification('success', 'Thông báo', 'Sửa thông tin thành công')
            //  navigate('/admins/customer-info')
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    return (
        <>
            <Text className='title-admin'>Thông tin cá nhân</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel'>Hủy</Button>
                <Button className='btn-save' onClick={() => handleContinue()}>
                    Lưu
                </Button>
            </Row>
            <Row>
                <Col span={8}>
                    <Row className='avata-admin'>
                        <Avatar size={150} icon={<UserOutlined />} />
                    </Row>
                    <Row className='avata-admin' style={{ paddingTop: 20 }}>
                        <a>
                            <i>
                                <u> Cập Nhật Ảnh Đại Diện</u>
                            </i>
                        </a>
                    </Row>
                </Col>

                <Col span={8}>
                    <Form form={form} layout='vertical'>
                        <Form.Item name='fullName' label='Họ& Tên:' onChange={(event) => setName(event.target.value)}>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                defaultValue={InforEmployee?.name}
                            />
                        </Form.Item>
                        <Form.Item name='DateOfBirth' label='Ngày sinh:'>
                            <DatePicker
                                onChange={onDateOfBirth}
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='gender' label='Giới Tính:' onChange={(event) => setGender(event.target.value)}>
                            <Select
                                defaultValue={InforEmployee?.gender}
                                style={{
                                    width: '90%'
                                }}
                                onChange={handleGender}
                                options={[
                                    {
                                        value: 'MALE',
                                        label: 'Nam'
                                    },
                                    {
                                        value: 'FEMALE',
                                        label: 'Nữ'
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name='phoneNumber' label=' Số điện thoại:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                defaultValue={InforEmployee?.phoneNumber}
                                disabled
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    {' '}
                    <Form form={form} layout='vertical'>
                        <Form.Item
                            name='url'
                            label='Số CMND/CCCD/Hộ Chiếu:'
                            onChange={(event) => setIdCard(event.target.value)}
                        >
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                defaultValue={InforEmployee?.idCard}
                            />
                        </Form.Item>
                        <Form.Item name='email' label='Email:' onChange={(event) => setEmail(event.target.value)}>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                defaultValue={InforEmployee?.email}
                            />
                        </Form.Item>
                        <Form.Item name='address' label='Địa chỉ:' onChange={(event) => setAddress(event.target.value)}>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                defaultValue={InforEmployee?.address}
                            />
                        </Form.Item>
                        <Form.Item name='country' label='Quốc gia:'>
                            <Select
                                showSearch
                                defaultValue={InforEmployee?.country}
                                style={{ width: '90%', fontSize: 16, fontWeight: 500 }}
                                optionFilterProp='children'
                                onChange={onChangecountries}
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '')
                                        .toLowerCase()
                                        .localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                            >
                                {listCountries.map((item) => (
                                    // eslint-disable-next-line react/jsx-no-undef
                                    <Option key={item.countryCode} value={item.countryCode} label={item.countryName}>
                                        {item.countryName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                    <Text
                        style={{
                            display: 'flex',
                            justifyContent: 'end',
                            paddingRight: 50,
                            fontSize: 18
                        }}
                    >
                        <a>
                            <i>
                                <u onClick={showDrawer}> Đổi mật khẩu</u>
                            </i>
                        </a>
                    </Text>
                </Col>
            </Row>
            <Drawer title='Đổi mật khẩu' placement='right' onClose={onClose} open={open}>
                <Form form={form} layout='vertical'>
                    <Form.Item name='password' label='Mật khẩu cũ:'>
                        <Input
                            style={{
                                width: '90%'
                            }}
                        />
                    </Form.Item>
                    <Form.Item name='newpassword' label='Mật khẩu mới:'>
                        <Input
                            style={{
                                width: '90%'
                            }}
                        />
                    </Form.Item>
                    <Form.Item name='isnewpassword' label='xác nhận lại mật khẩu:'>
                        <Input
                            style={{
                                width: '90%'
                            }}
                        />
                    </Form.Item>
                </Form>
                <Row className='form-btn'>
                    <Button className='btn-cancel' onClick={() => setOpen(false)}>
                        Hủy
                    </Button>
                    <Button className='btn-save'>Lưu</Button>
                </Row>
            </Drawer>
        </>
    )
}

export default CustomerInfo
