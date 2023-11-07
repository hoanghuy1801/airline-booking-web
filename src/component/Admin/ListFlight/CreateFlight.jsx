/* eslint-disable react/jsx-no-undef */
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { getAirports } from '../../../services/apiHomePage'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'

const { Text } = Typography

const CreateFlight = () => {
    const { getText } = useLanguage()
    const [listAirports, setListAirports] = useState([])
    useEffect(() => {
        fechListAirports()
        //   fechListAircraft()
    }, [])
    const fechListAirports = async () => {
        let res = await getAirports()
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    // const fechListAircraft = async () => {
    //     let res = await getListAircraft()
    //     if (res.status == 200) {
    //         setListAirports(res.data)
    //     }
    //}
    const [form] = Form.useForm()

    const navigate = useNavigate()
    const onChangeSourceAirport = (value, label) => {
        // setSourceAirportCity(label.label)
        // setSourceAirport(value)
    }

    const onDestinationAirport = (value, label) => {
        // setDestinationAirport(value)
        // setDestinationAirportCity(label.label)
    }
    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value)
        console.log('Formatted Selected Time: ', dateString)
    }
    const onOk = (value) => {
        console.log('onOk: ', value)
    }

    return (
        <>
            <Text className='title-admin'>Thêm chuyến bay</Text>
            <Row className='form-btn'>
                <Button className='btn-cancel' onClick={() => navigate('/admins/flight/listflight')}>
                    Hủy
                </Button>
                <Button className='btn-save'>Lưu</Button>
            </Row>
            <Row>
                <Col span={8}>
                    {' '}
                    <Form form={form} layout='vertical'>
                        <Form.Item name='From' label={getText('From')}>
                            <Select
                                showSearch
                                style={{ width: '90%' }}
                                onChange={onChangeSourceAirport}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.id} label={item?.city?.cityName}>
                                        <>
                                            <Row className='text-cityname'>
                                                {item.city.cityName} ({item.airportCode})
                                            </Row>
                                            <Row>
                                                <Col span={18} className='text-airportname'>
                                                    {item.airportName}
                                                </Col>
                                            </Row>
                                        </>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label={getText('To')}>
                            <Select
                                showSearch
                                style={{ width: '90%' }}
                                onChange={onDestinationAirport}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.id} label={item.city.cityName}>
                                        <>
                                            <Row className='text-cityname'>
                                                {item.city.cityName} ({item.airportCode})
                                            </Row>
                                            <Row>
                                                <Col span={18} className='text-airportname'>
                                                    {item.airportName}
                                                </Col>
                                            </Row>
                                        </>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Ngày giờ cất cánh:'>
                            <DatePicker
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                                showTime
                                onChange={onChange}
                                onOk={onOk}
                                format='HH:mm DD/MM/YYYY '
                            />
                        </Form.Item>
                        <Form.Item label=' Ngày giờ hạ cánh:'>
                            <DatePicker
                                placeholder=''
                                style={{
                                    width: '90%'
                                }}
                                showTime
                                onChange={onChange}
                                onOk={onOk}
                                format='HH:mm DD/MM/YYYY '
                            />
                        </Form.Item>
                        <Form.Item name='status' label='Máy bay chở khách'>
                            <Select
                                defaultValue='ACT'
                                style={{
                                    width: '90%'
                                }}
                                options={[
                                    {
                                        value: 'ACT',
                                        label: 'Hoạt động'
                                    },
                                    {
                                        value: 'PEN',
                                        label: 'Tạm dừng'
                                    }
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    <Form form={form} layout='vertical'>
                        <Form.Item label='Loại:'>
                            <Select
                                defaultValue='DOMESTIC'
                                style={{
                                    width: '90%'
                                }}
                                options={[
                                    {
                                        value: 'DOMESTIC',
                                        label: 'Nội địa'
                                    },
                                    {
                                        value: 'INTERNATIONAL',
                                        label: 'Quốc tế'
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label='Giá vé người lớn phổ thông:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                suffix='VND'
                            />
                        </Form.Item>
                        <Form.Item label='Giá vé trẻ em phổ thông:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                suffix='VND'
                            />
                        </Form.Item>
                        <Form.Item label='Giá vé em bé:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                suffix='VND'
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}>
                    <Form form={form} layout='vertical'>
                        <Form.Item label='Giá vé người lớn phổ thông đặc biệt:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                suffix='VND'
                            />
                        </Form.Item>
                        <Form.Item label='Giá vé trẻ em phổ thông đặc biệt:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                suffix='VND'
                            />
                        </Form.Item>
                        <Form.Item label='Giá vé người lớn thương gia:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                suffix='VND'
                            />
                        </Form.Item>
                        <Form.Item label='Giá vé trẻ em thương gia:'>
                            <Input
                                style={{
                                    width: '90%'
                                }}
                                suffix='VND'
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default CreateFlight
