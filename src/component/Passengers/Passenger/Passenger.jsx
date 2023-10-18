import PropTypes from 'prop-types'
import { Row, Col, Radio, Collapse, Input, DatePicker, Select, Typography } from 'antd'
import './Passenger.css'
import { CaretRightOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { getCountries } from '../../../services/apiAuth'
import moment from 'moment'
import { calculateAge, generateRandomID } from '../../../utils/utils'
const { Text } = Typography
const { Option } = Select
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import LocaleProvider from 'antd/es/locale'
import { showWaringModal } from '../../../utils/modalError'
const Passenger = (props) => {
    const { formData, setFormData, formDataChildren, setFormDataChildren, formDataBaby, setFormDataBaby } = props
    const { getText } = useLanguage()

    const [listCountries, setListCountries] = useState([])
    useEffect(() => {
        fechListCountries()
    }, [])
    const fechListCountries = async () => {
        let res = await getCountries()
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }

    const data = useSelector((state) => state.homePage.homePageInfor)

    const handleFormChange = (field, value, index) => {
        const newFormData = [...formData]
        newFormData[index][field] = value
        newFormData[index]['id'] = generateRandomID(8)
        setFormData(newFormData)
    }
    const handleFormChangeChildren = (field, value, index) => {
        const newFormData = [...formDataChildren]
        newFormData[index][field] = value
        newFormData[index]['id'] = generateRandomID(8)
        setFormDataChildren(newFormData)
    }
    const handleFormChangeBaby = (field, value, index) => {
        const newFormData = [...formDataBaby]
        newFormData[index][field] = value
        newFormData[index]['id'] = generateRandomID(8)
        setFormDataBaby(newFormData)
    }
    const handleDateChange = (date, index) => {
        const currentDate = new Date()
        const formattedDate = moment(date.$d).format('YYYY-MM-DD')
        const currentDateFomat = moment(currentDate).format('YYYY-MM-DD')
        let age = calculateAge(formattedDate, currentDateFomat)
        if (age < 12) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('Notification_Adults')}`, `${getText('Close')}`)
            return
        }
        const newFormData = [...formData]
        newFormData[index]['dateOfBirth'] = formattedDate
        setFormData(newFormData)
    }
    const handleDateChangeChildren = (date, index) => {
        const currentDate = new Date()
        const formattedDate = moment(date.$d).format('YYYY-MM-DD')
        const currentDateFomat = moment(currentDate).format('YYYY-MM-DD')
        let age = calculateAge(formattedDate, currentDateFomat)
        if (age < 2 || age > 12) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('Notification_Childrens')}`, `${getText('Close')}`)
            return
        }
        const newFormData = [...formDataChildren]
        newFormData[index]['dateOfBirth'] = formattedDate
        setFormDataChildren(newFormData)
    }
    const handleDateChangeBaby = (date, index) => {
        const currentDate = new Date()
        const formattedDate = moment(date.$d).format('YYYY-MM-DD')
        const currentDateFomat = moment(currentDate).format('YYYY-MM-DD')
        let age = calculateAge(formattedDate, currentDateFomat)
        if (age > 2) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('Notification_Infants')}`, `${getText('Close')}`)
            return
        }
        const newFormData = [...formDataBaby]
        newFormData[index]['dateOfBirth'] = formattedDate
        setFormDataBaby(newFormData)
    }
    const handleSelectChange = (value, index) => {
        const newFormData = [...formData]
        newFormData[index]['country'] = value
        setFormData(newFormData)
    }

    return (
        <>
            <Text className='title'>{getText('PassengerInformation')}</Text>
            {formData.map((form, index) => (
                <div key={index}>
                    <Collapse
                        key='adult'
                        size='large'
                        items={[
                            {
                                key: { index },
                                label: <div style={{ fontSize: '18px', fontWeight: 600 }}>{getText('Adults')}</div>,
                                children: (
                                    <div className='formPassengers'>
                                        <Row className='rowInforPassengers'>
                                            <Radio.Group
                                                value={form.gender}
                                                onChange={(e) => handleFormChange('gender', e.target.value, index)}
                                            >
                                                <Radio value='MALE'>{getText('Male')}</Radio>
                                                <Radio value='FEMALE'>{getText('Female')}</Radio>
                                                <Radio value='OTHER'>{getText('Other')}</Radio>
                                            </Radio.Group>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Surname')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        style={{ width: '90%' }}
                                                        onChange={(e) =>
                                                            handleFormChange('lastName', e.target.value, index)
                                                        }
                                                    />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>
                                                        {getText('Middle-name&first-name')}*
                                                    </Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        style={{ width: '90%' }}
                                                        onChange={(e) =>
                                                            handleFormChange('firstName', e.target.value, index)
                                                        }
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Date-birth')}*</Text>
                                                </Row>
                                                <Row>
                                                    <LocaleProvider locale={locale}>
                                                        <DatePicker
                                                            style={{ width: '90%' }}
                                                            placeholder=''
                                                            onChange={(date) => handleDateChange(date, index)}
                                                            format='DD/MM/YYYY'
                                                        />
                                                    </LocaleProvider>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Nation')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Select
                                                        showSearch
                                                        onChange={(value) => handleSelectChange(value, index)}
                                                        style={{ width: '91%', fontSize: 16, fontWeight: 500 }}
                                                        optionFilterProp='children'
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').includes(input)
                                                        }
                                                        filterSort={(optionA, optionB) =>
                                                            (optionA?.label ?? '')
                                                                .toLowerCase()
                                                                .localeCompare((optionB?.label ?? '').toLowerCase())
                                                        }
                                                    >
                                                        {listCountries.map((item) => (
                                                            <Option
                                                                key={item.countryCode}
                                                                value={item.countryCode}
                                                                label={item.countryName}
                                                            >
                                                                {item.countryName}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Phone-number')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        style={{ width: '90%' }}
                                                        onChange={(e) =>
                                                            handleFormChange('phone', e.target.value, index)
                                                        }
                                                    />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Email*</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        style={{ width: '90%' }}
                                                        onChange={(e) =>
                                                            handleFormChange('email', e.target.value, index)
                                                        }
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={24}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Accommodation')}</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        style={{ width: '95%' }}
                                                        onChange={(e) =>
                                                            handleFormChange('address', e.target.value, index)
                                                        }
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                        ]}
                        expandIconPosition='end'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            backgroundColor: '#F1F1F1',
                            marginTop: '10px'
                        }}
                    />
                </div>
            ))}
            {data.children == 0 ? (
                ''
            ) : (
                <div>
                    {formDataChildren.map((form, index) => (
                        <div key={index}>
                            <Collapse
                                size='large'
                                items={[
                                    {
                                        key: '1',
                                        label: (
                                            <div style={{ fontSize: '18px', fontWeight: 600 }}>
                                                {getText('Children')}
                                            </div>
                                        ),
                                        children: (
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Radio.Group
                                                        value={form.gender}
                                                        onChange={(e) =>
                                                            handleFormChangeChildren('gender', e.target.value, index)
                                                        }
                                                    >
                                                        <Radio value='MALE'>{getText('Male')}</Radio>
                                                        <Radio value='FEMALE'>{getText('Female')}</Radio>
                                                        <Radio value='OTHER'>{getText('Other')}</Radio>
                                                    </Radio.Group>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>
                                                                {getText('Surname')}*
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                onChange={(e) =>
                                                                    handleFormChangeChildren(
                                                                        'lastName',
                                                                        e.target.value,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>
                                                                {getText('Middle-name&first-name')}*
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                onChange={(e) =>
                                                                    handleFormChangeChildren(
                                                                        'firstName',
                                                                        e.target.value,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>
                                                                {getText('Date-birth')}*
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <LocaleProvider locale={locale}>
                                                                <DatePicker
                                                                    style={{ width: '90%' }}
                                                                    placeholder=''
                                                                    onChange={(date) =>
                                                                        handleDateChangeChildren(date, index)
                                                                    }
                                                                    format='DD/MM/YYYY'
                                                                />
                                                            </LocaleProvider>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
            {data.baby == 0 ? (
                ''
            ) : (
                <div>
                    {formDataBaby.map((form, index) => (
                        <div key={index}>
                            <Collapse
                                size='large'
                                items={[
                                    {
                                        key: '1',
                                        label: (
                                            <div style={{ fontSize: '18px', fontWeight: 600 }}>{getText('Baby')}</div>
                                        ),
                                        children: (
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Radio.Group
                                                        value={form.gender}
                                                        onChange={(e) =>
                                                            handleFormChangeBaby('gender', e.target.value, index)
                                                        }
                                                    >
                                                        <Radio value='MALE'>{getText('Male')}</Radio>
                                                        <Radio value='FEMALE'>{getText('Female')}</Radio>
                                                        <Radio value='OTHER'>{getText('Other')}</Radio>
                                                    </Radio.Group>
                                                </Row>

                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>
                                                                {getText('Surname')}*
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                onChange={(e) =>
                                                                    handleFormChangeBaby(
                                                                        'lastName',
                                                                        e.target.value,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>
                                                                {getText('Middle-name&first-name')}*
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                onChange={(e) =>
                                                                    handleFormChangeBaby(
                                                                        'firstName',
                                                                        e.target.value,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>
                                                                {getText('Date-birth')}*
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <LocaleProvider locale={locale}>
                                                                <DatePicker
                                                                    style={{ width: '90%' }}
                                                                    placeholder=''
                                                                    onChange={(date) =>
                                                                        handleDateChangeBaby(date, index)
                                                                    }
                                                                    format='DD/MM/YYYY'
                                                                />
                                                            </LocaleProvider>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

Passenger.propTypes = {
    formData: PropTypes.array.isRequired,
    setFormData: PropTypes.func.isRequired,
    formDataChildren: PropTypes.array,
    setFormDataChildren: PropTypes.func,
    formDataBaby: PropTypes.array,
    setFormDataBaby: PropTypes.func
}

export default Passenger
