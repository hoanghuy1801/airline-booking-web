import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './FormSearch.css'
import { useNavigate } from 'react-router-dom'
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
import { useDispatch } from 'react-redux'
import { setHomPageInfor } from '../../../redux/reducers/homePageSlice'
const { RangePicker } = DatePicker
import moment from 'moment'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
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
    const [value, setValue] = useState(1)
    const [sourceAirport, setSourceAirport] = useState()
    const [destinationAirport, setDestinationAirport] = useState()
    const [departureDate, setDepartureDate] = useState()
    const [returnDate, setReturnDate] = useState()
    const [destinationAirportCity, setDestinationAirportCity] = useState()
    const [sourceAirportCity, setSourceAirportCity] = useState()
    const [seatId, setSeatId] = useState()
    const [seatClass, setSeatClass] = useState()
    const [roundTrip, setRoundTrip] = useState(false)
    const [adult, setAdult] = useState(1)
    const [children, setChildren] = useState(0)
    const [baby, setBaby] = useState(0)
    const maxPeople = 9
    const dispath = useDispatch()
    const navigate = useNavigate()
    const { getText } = useLanguage()

    const data_booking = {
        roundTrip: roundTrip,
        sourceAirport: sourceAirport,
        destinationAirport: destinationAirport,
        departureDate: departureDate,
        seatId: seatId,
        adult: adult,
        children: children,
        baby: baby,
        destinationAirportCity: destinationAirportCity,
        sourceAirportCity: sourceAirportCity,
        returnDate: returnDate,
        seatClass: seatClass
    }

    const handleSelectBooking = () => {
        if (!roundTrip) {
            if (
                sourceAirport == null ||
                destinationAirport == null ||
                departureDate == null ||
                departureDate == null ||
                seatId == null
            ) {
                showWaringModal(
                    `${getText('HeyFriend')}`,
                    `${getText('NotificationSearchBooking')}`,
                    `${getText('Close')}`
                )
                return
            }
        } else {
            if (
                sourceAirport == null ||
                destinationAirport == null ||
                departureDate == null ||
                departureDate == null ||
                returnDate == null ||
                seatId == null
            ) {
                showWaringModal(
                    `${getText('HeyFriend')}`,
                    `${getText('NotificationSearchBooking')}`,
                    `${getText('Close')}`
                )
                return
            }
        }
        dispath(setHomPageInfor(data_booking))
        navigate('/select-fight')
    }
    let inputNumberStyle = {}

    if (windowWidth <= 600) {
        inputNumberStyle = { width: '50%' }
    } else if (windowWidth <= 1200) {
        inputNumberStyle = { width: '77%' }
    } else {
        inputNumberStyle = { width: '78%' }
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const [selectedDates, setSelectedDates] = useState([])

    const handleDateChange = (dates, dateStrings) => {
        setReturnDate(dateStrings[1])
        setDepartureDate(dateStrings[0])
        setSelectedDates(dates)
    }

    const onChangeSourceAirport = (value, label) => {
        setSourceAirportCity(label.label)
        setSourceAirport(value)
    }

    const onDestinationAirport = (value, label) => {
        setDestinationAirport(value)
        setDestinationAirportCity(label.label)
    }
    const onChangeDatePicker = (dates, dateStrings) => {
        setDepartureDate(dateStrings)
    }
    const onSeatClass = (value, label) => {
        setSeatId(value)
        setSeatClass(label.label)
    }
    const handleAdultChange = (value) => {
        if (value + children <= maxPeople) {
            setAdult(value)
        }
    }

    const handleChildrenChange = (value) => {
        if (adult + value <= maxPeople) {
            setChildren(value)
        }
    }

    return (
        <>
            <Form className="buyForm">
                <Form.Item>
                    <Radio.Group onChange={onChange} value={value} className="radio">
                        <Radio value={1} onClick={() => setRoundTrip(false)}>
                            {getText('onWay')}
                        </Radio>
                        <Radio value={2} onClick={() => setRoundTrip(true)}>
                            {getText('return')}
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={11}>
                            <IconPlaneDeparture className="icon-search" />
                            <Select
                                showSearch
                                style={{ width: '80%' }}
                                placeholder={getText('From')}
                                onChange={onChangeSourceAirport}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.id} label={item.city.cityName}>
                                        <>
                                            <Row className="text-cityname">
                                                {item.city.cityName} ({item.airportCode})
                                            </Row>
                                            <Row>
                                                <Col span={18} className="text-airportname">
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
                            <IconPlaneArrival className="icon-search" />
                            <Select
                                showSearch
                                style={{ width: '80%' }}
                                placeholder={getText('To')}
                                onChange={onDestinationAirport}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.id} label={item.city.cityName}>
                                        <>
                                            <Row className="text-cityname">
                                                {item.city.cityName} ({item.airportCode})
                                            </Row>
                                            <Row>
                                                <Col span={18} className="text-airportname">
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
                            <IconCalendar className="icon-search" />
                            {roundTrip ? (
                                <RangePicker
                                    style={{ width: '80%' }}
                                    placeholder={['Ngày đi', 'Ngày về']}
                                    disabledDate={disabledDate}
                                    value={selectedDates}
                                    onChange={handleDateChange}
                                    format="DD/MM/YYYY"
                                />
                            ) : (
                                <>
                                    <DatePicker
                                        onChange={onChangeDatePicker}
                                        style={{ width: '80%' }}
                                        placeholder={getText('dateDepartment')}
                                        disabledDate={disabledDate}
                                        format="DD/MM/YYYY"
                                    />
                                </>
                            )}
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <IconArmchair className="icon-search" />
                            <Select
                                showSearch
                                style={{ width: '80%' }}
                                placeholder={getText('seatClass')}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={onSeatClass}
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
                            <IconMan className="icon-search" />
                            <label>
                                {getText('adult')} <br />{' '}
                                <label className="label-children">{getText('adultText')}</label>{' '}
                            </label>
                        </Col>
                        <Col span={5}>
                            <InputNumber
                                style={inputNumberStyle}
                                min={1}
                                max={maxPeople}
                                defaultValue={1}
                                onChange={handleAdultChange}
                                value={adult}
                            />
                        </Col>
                        <Col span={2}></Col>
                        <Col span={6}>
                            <IconMoodKid className="icon-search" />
                            <label>
                                {getText('children')} <br />{' '}
                                <label className="label-children">{getText('childrenText')}</label>{' '}
                            </label>
                        </Col>
                        <Col span={5}>
                            <InputNumber
                                style={inputNumberStyle}
                                min={0}
                                max={maxPeople}
                                defaultValue={0}
                                onChange={handleChildrenChange}
                                value={children}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <IconBabyBottle className="icon-search" />
                            <label>
                                {getText('baby')} <br /> <label className="label-children">{getText('babyText')}</label>
                            </label>
                        </Col>
                        <Col span={5}>
                            <InputNumber
                                style={inputNumberStyle}
                                min={0}
                                max={adult}
                                defaultValue={0}
                                onChange={(value) => setBaby(value)}
                            />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item className="btn-form">
                    <Button
                        className="btn-search"
                        icon={<SearchOutlined />}
                        type="link"
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
