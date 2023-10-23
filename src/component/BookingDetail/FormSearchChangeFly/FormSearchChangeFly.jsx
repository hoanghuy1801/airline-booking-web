import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './FormSearchChangeFly.css'
import { SearchOutlined } from '@ant-design/icons'
import { Radio, Form, Select, DatePicker, Row, Col, InputNumber, Button } from 'antd'
import {
    IconPlaneDeparture,
    IconPlaneArrival,
    IconCalendar,
    IconArrowsExchange2,
    IconMan,
    IconBabyBottle,
    IconMoodKid,
    IconArmchair
} from '@tabler/icons-react'
import moment from 'moment'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import LocaleProvider from 'antd/es/locale'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setDataChangeFly } from '../../../redux/reducers/myFlight'
import { showWaringModal } from '../../../utils/modalError'
const { Option } = Select

const disabledDate = (current) => {
    // Lấy ngày hiện tại
    const today = moment().startOf('day')
    // Nếu ngày hiện tại lớn hơn hoặc bằng ngày đang xét thì vô hiệu hóa
    return current && current < today
}

const FormSearch = (props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const { listAirports, listSeats } = props
    const [value] = useState(1)
    const [departureDate, setDepartureDate] = useState()
    const navigate = useNavigate()
    const dispath = useDispatch()
    const { getText } = useLanguage()
    const selectChangeFly = useSelector((state) => state.myFlight?.selectChangeFly)
    const passengerAwaysDetail = useSelector(
        (state) => state.myFlight?.bookingDetails?.flightAwayDetail?.passengerAwaysDetail
    )
    let aduls = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'ADULT')
    let childs = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'CHILD')
    let infants = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'INFANT')
    let data = {
        date: departureDate,
        aduls: aduls.length,
        childs: childs.length,
        infants: infants.length
    }
    const handleSelectBooking = () => {
        if (departureDate == null) {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotificationSearchBooking')}`, `${getText('Close')}`)
            return
        }
        dispath(setDataChangeFly(data))
        navigate('/my/select-flight-change')
    }
    let inputNumberStyle = {}

    if (windowWidth <= 600) {
        inputNumberStyle = { width: '50%' }
    } else if (windowWidth <= 1200) {
        inputNumberStyle = { width: '77%' }
    } else {
        inputNumberStyle = { width: '78%' }
    }
    const onChangeDatePicker = (dates, dateStrings) => {
        setDepartureDate(dateStrings)
    }

    return (
        <>
            <Form className='buyForm'>
                <Form.Item>
                    <Radio.Group value={value} className='radio'>
                        <Radio value={1} disabled>
                            {getText('onWay')}
                        </Radio>
                        <Radio value={2} disabled>
                            {getText('return')}
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={11}>
                            <IconPlaneDeparture className='icon-search' />
                            <Select
                                showSearch
                                style={{ width: '80%' }}
                                placeholder={getText('From')}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                disabled
                                defaultValue={selectChangeFly?.sourceAirport?.airportName}
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
                        </Col>
                        <Col span={2}>
                            <IconArrowsExchange2 style={{ color: '#006885' }} />
                        </Col>
                        <Col span={11}>
                            <IconPlaneArrival className='icon-search' />
                            <Select
                                showSearch
                                style={{ width: '80%' }}
                                placeholder={getText('To')}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                disabled
                                defaultValue={selectChangeFly?.destinationAirport?.airportName}
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
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={11}>
                            <IconCalendar className='icon-search' />
                            <LocaleProvider locale={locale}>
                                <DatePicker
                                    onChange={onChangeDatePicker}
                                    style={{ width: '80%' }}
                                    placeholder={getText('dateDepartment')}
                                    disabledDate={disabledDate}
                                    format='DD/MM/YYYY'
                                />
                            </LocaleProvider>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <IconArmchair className='icon-search' />
                            <Select
                                showSearch
                                style={{ width: '80%' }}
                                placeholder={getText('seatClass')}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                disabled
                                defaultOpen={selectChangeFly?.sourceAirport?.airportName}
                            >
                                {listSeats.map((item) => (
                                    <Option key={item.id} value={item.id} label={item.seatClass}>
                                        <Row>{item.seatName}</Row>
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={6}>
                            <IconMan className='icon-search' />
                            <label>
                                {getText('adult')} <br />{' '}
                                <label className='label-children'>{getText('adultText')}</label>{' '}
                            </label>
                        </Col>
                        <Col span={5}>
                            <InputNumber style={inputNumberStyle} min={1} defaultValue={aduls.length} disabled />
                        </Col>
                        <Col span={2}></Col>
                        <Col span={6}>
                            <IconMoodKid className='icon-search' />
                            <label>
                                {getText('children')} <br />{' '}
                                <label className='label-children'>{getText('childrenText')}</label>{' '}
                            </label>
                        </Col>
                        <Col span={5}>
                            <InputNumber style={inputNumberStyle} min={0} defaultValue={childs.length} disabled />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <IconBabyBottle className='icon-search' />
                            <label>
                                {getText('baby')} <br /> <label className='label-children'>{getText('babyText')}</label>
                            </label>
                        </Col>
                        <Col span={5}>
                            <InputNumber style={inputNumberStyle} min={0} defaultValue={infants.length} disabled />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item className='btn-form'>
                    <Button
                        className='btn-search'
                        icon={<SearchOutlined />}
                        type='link'
                        onClick={() => handleSelectBooking()}
                    >
                        {getText('searchFight')}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

FormSearch.propTypes = {
    listAirports: PropTypes.array.isRequired,
    listSeats: PropTypes.array.isRequired
}

export default FormSearch
