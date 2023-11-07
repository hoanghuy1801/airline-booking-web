import { Avatar, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { getCountries } from '../../../services/apiAuth'
import './CustomerInfo.css'
const { Text } = Typography

const CustomerInfo = () => {
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
    const onClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Text className='title-admin'>Thông tin cá nhân</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel'>Hủy</Button>
                <Button className='btn-save'>Lưu</Button>
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
                        <Form.Item name='fullName' label='Họ& Tên:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='DateOfBirth' label='Ngày sinh:'>
                            <DatePicker
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='gender' label='Giới Tính:'>
                            <Select
                                defaultValue='MALE'
                                style={{
                                    width: '90%'
                                }}
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
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    {' '}
                    <Form form={form} layout='vertical'>
                        <Form.Item name='url' label='Số CMND/CCCD/Hộ Chiếu:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='email' label='Email:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='address' label='Địa chỉ:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='country' label='Quốc gia:'>
                            <Select
                                showSearch
                                style={{ width: '90%', fontSize: 16, fontWeight: 500 }}
                                optionFilterProp='children'
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
