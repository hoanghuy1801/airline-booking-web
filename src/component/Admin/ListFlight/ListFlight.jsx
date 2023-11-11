/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Table, Space, Input, Row, Col, Button, DatePicker, Menu, Tag, Select } from 'antd'
import { DeleteOutlined, EditOutlined, DownOutlined } from '@ant-design/icons'
import { IconFilterFilled } from '@tabler/icons-react'
import './ListFlight.css'
import { useNavigate } from 'react-router-dom'
import { openNotification } from '../../../utils/Notification'
import { getListFlight } from '../../../services/apiAdmin'
import { changeStatusAdmin } from '../../../utils/utils'
import { formatDate, formatTimeHHMM } from '../../../utils/format'
import { getAirports } from '../../../services/apiHomePage'
import locale from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import LocaleProvider from 'antd/es/locale'
const { RangePicker } = DatePicker
const { Search } = Input

const items = [
    {
        label: 'Tất cả',
        key: 'all'
    },
    {
        label: 'Hoạt động',
        key: 'act'
    },
    {
        label: 'Tạm ngưng',
        key: 'pen'
    }
]
const ListFlight = () => {
    const [listFight, setListFight] = useState([])
    const [listAirports, setListAirports] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [textSearch, setTextSearch] = useState('')
    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [status, setStatus] = useState('all')
    const [sourceAirportId, setSourceAirportId] = useState(0)
    const [destinationAirportId, setDestinationAirportId] = useState(0)
    const [hidenSearch, setHidenSearch] = useState(false)
    const [departureDate, setDepartureDate] = useState('')
    const [arrivalDate, setArrivalDate] = useState('')
    const onChange = (pagination, filters, sorter, extra) => {
        setCurrentPage(pagination.current)
    }

    const navigate = useNavigate()
    useEffect(() => {
        fechListFight()
    }, [currentPage, status, textSearch])
    useEffect(() => {
        fechListAirports()
    }, [])
    const fechListAirports = async () => {
        let res = await getAirports()
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    const onChangeSourceAirport = (value, label) => {
        setSourceAirportId(value)
    }

    const onDestinationAirport = (value, label) => {
        setDestinationAirportId(value)
    }
    const dataSource = listFight.map((item, index) => ({
        ...item,
        stt: index + currentPage * 10 - 9
    }))
    const fechListFight = async () => {
        const data = {
            page: currentPage,
            size: 10,
            searchText: textSearch,
            sourceAirportId: sourceAirportId === 0 ? '' : sourceAirportId,
            destinationAirportId: destinationAirportId === 0 ? '' : destinationAirportId,
            departureDate: formatDate(departureDate) === 'Invalid date' ? '' : formatDate(departureDate),
            arrivalDate: formatDate(arrivalDate) === 'Invalid date' ? '' : formatDate(arrivalDate)
        }
        try {
            let res = await getListFlight(status, data)
            setListFight(res.data.items)
            setTotalCount(res.data.totalCount)
        } catch (e) {
            openNotification('error', 'Thông báo', e.response.data.error.message)
        }
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: 70,
            sorter: {
                compare: (a, b) => a.stt - b.stt,
                multiple: 1
            }
        },
        {
            title: 'TÊN CHUYẾN BAY',
            dataIndex: 'flightCode',
            sorter: (a, b) => {
                return a.flightCode.localeCompare(b.flightCode)
            }
        },
        {
            title: 'ĐIỂM ĐI',
            dataIndex: 'destinationAirport?.city?.cityName',
            render: (value, _record) => {
                return _record?.sourceAirport?.city?.cityName
            },
            sorter: (a, b) => {
                return a.sourceAirport?.city?.cityName.localeCompare(b.sourceAirport?.city?.cityName)
            }
        },
        {
            title: 'ĐIỂM ĐẾN',
            dataIndex: 'to',
            render: (value, _record) => {
                return _record?.destinationAirport?.city?.cityName
            },
            sorter: (a, b) => {
                return a.destinationAirport?.city?.cityName.localeCompare(b.destinationAirport?.city?.cityName)
            }
        },
        {
            title: 'NGÀY CẤT CÁNH',
            dataIndex: 'departureTime',
            sorter: (a, b) => {
                return a.departureTime.localeCompare(b.departureTime)
            },
            render: (value, _record) => {
                return formatTimeHHMM(value)
            }
        },
        {
            title: 'NGÀY HẠ CÁCH',
            dataIndex: 'arrivalTime',
            sorter: (a, b) => {
                return a.arrivalTime.localeCompare(b.arrivalTime)
            },
            render: (value, _record) => {
                return formatTimeHHMM(value)
            }
        },
        {
            title: 'LOẠI',
            dataIndex: 'flightType',
            sorter: (a, b) => {
                return a.flightType.localeCompare(b.flightType)
            },
            render: (value, _record) => {
                return value === 'DOMESTIC' ? 'Nội địa' : 'Quốc tế'
            }
        },

        {
            title: 'TRẠNG THÁI',
            dataIndex: 'status',
            render: (_, { status }) => {
                const color = status === 'ACT' ? 'green' : status === 'PEN' ? 'orange' : 'orange' // Determine color based on tag value
                return (
                    <Tag color={color} key={status}>
                        {changeStatusAdmin(status, 'vi')}
                    </Tag>
                )
            },
            width: 170
        },
        {
            title: 'XỬ LÝ',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        icon={<EditOutlined className='icon' />}
                        className='btn-edit'
                        onClick={() => navigate('/admins/flight/edit')}
                    />
                    <Button type='primary' danger icon={<DeleteOutlined />} className='btn-delete' />
                </Space>
            )
        }
    ]

    const [current, setCurrent] = useState('all')

    const onClick = (e) => {
        setCurrent(e.key)
        if (e.key === 'all') {
            setStatus('all')
            setCurrentPage(1)
        } else if (e.key === 'act') {
            setStatus('act')
            setCurrentPage(1)
        } else if (e.key === 'pen') {
            setStatus('pen')
            setCurrentPage(1)
        }
    }
    const onSearch = (value, _e, info) => {
        setTextSearch(value)
    }
    const onChangeDepartureDate = (dates, dateStrings) => {
        setDepartureDate(dateStrings)
    }
    const onChangeArrivalDate = (dates, dateStrings) => {
        setArrivalDate(dateStrings)
    }
    const hanldeApply = () => {
        fechListFight()
    }

    return (
        <>
            <p className='title-admin'>Danh Sách Chuyến Bay</p>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
                style={{ paddingTop: 10 }}
            />
            <Row>
                <Col span={12}>
                    <Button className='btn-create' onClick={() => navigate('/admins/flight/create')}>
                        Thêm
                    </Button>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                    <div>
                        <Space>
                            <IconFilterFilled className='icon-filter' onClick={() => setHidenSearch(!hidenSearch)} />
                        </Space>
                    </div>
                    <Search
                        allowClear
                        placeholder='Nhập tên chuyến bay'
                        enterButton='Tìm'
                        size='large'
                        onSearch={onSearch}
                        className='input-search'
                    />
                </Col>
            </Row>
            {hidenSearch === true ? (
                <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <Col span={4}>
                        {' '}
                        <Select
                            showSearch
                            placeholder='Chọn điểm đi'
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
                    </Col>
                    <Col span={4}>
                        {' '}
                        <Select
                            showSearch
                            placeholder='Chọn điểm đến'
                            style={{ width: '90%' }}
                            onChange={onDestinationAirport}
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
                    </Col>
                    <Col span={4}>
                        <LocaleProvider locale={locale}>
                            <DatePicker
                                style={{ width: '90%' }}
                                placeholder={'Ngày cất cách'}
                                onChange={onChangeDepartureDate}
                                format='DD/MM/YYYY'
                            />
                        </LocaleProvider>
                    </Col>
                    <Col span={4}>
                        <LocaleProvider locale={locale}>
                            <DatePicker
                                style={{ width: '90%' }}
                                placeholder={'Ngày hạ cánh'}
                                format='DD/MM/YYYY'
                                onChange={onChangeArrivalDate}
                            />
                        </LocaleProvider>
                    </Col>
                    <Col span={4}>
                        <Button className='btn-apply' onClick={() => hanldeApply()}>
                            Áp Dụng
                        </Button>
                    </Col>
                </Row>
            ) : (
                ''
            )}

            <div className='table'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current: currentPage,
                        pageSize: 10,
                        total: totalCount,
                        onChange: onChange
                    }}
                    scroll={{
                        y: 540
                    }}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default ListFlight
