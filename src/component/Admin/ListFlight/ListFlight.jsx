/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Table, Space, Input, Row, Col, Button, Mentions, Menu } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './ListFlight.css'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const items = [
    {
        label: 'Tất cả',
        key: 'all'
    },
    {
        label: 'Hoạt động',
        key: 'yes'
    },
    {
        label: 'Tạm ngưng',
        key: 'no'
    }
]
const ListFlight = () => {
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }
    const onSearch = (value) => console.log(value)
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.Id - b.Id,
                multiple: 3
            }
        },
        {
            title: 'Tên chuyến bay',
            dataIndex: 'nameflight',
            sorter: {
                compare: (a, b) => a.email - b.email,
                multiple: 3
            }
        },
        {
            title: 'Điểm đi',
            dataIndex: 'from',
            sorter: {
                compare: (a, b) => a.fullname - b.fullname,
                multiple: 2
            }
        },
        {
            title: 'điểm đến',
            dataIndex: 'to',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },
        {
            title: 'Ngày cất cánh',
            dataIndex: 'dateto',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },
        {
            title: 'Ngày hạ cánh',
            dataIndex: 'datereturn',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },
        {
            title: 'Loại',
            dataIndex: 'datereturn',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },
        {
            title: 'Action',
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
    const data = [
        {
            key: '1',
            id: 1,
            nameflight: 'Arbuss',
            from: 'HN',
            to: 'HCM',
            dateto: '10/01/2023',
            datereturn: '10/01/2023',
            timego: 'mai',
            timereturn: 'môt',
            status: 'oke'
        }
    ]
    const [current, setCurrent] = useState('mail')

    const onClick = (e) => {
        console.log('click ', e)
        setCurrent(e.key)
    }
    return (
        <>
            <p className='title-admin'>Danh sách chuyến bay</p>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
                style={{ paddingTop: 10 }}
            />
            <Row>
                <Col span={18}>
                    <Button className='btn-create' onClick={() => navigate('/admins/flight/create')}>
                        Thêm
                    </Button>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'end' }}>
                    <Search allowClear enterButton='Tìm' size='large' onSearch={onSearch} className='input-search' />
                </Col>
            </Row>
            <div className='table'>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
        </>
    )
}

export default ListFlight
