import React from 'react'
import { Table, Space, Input, Row, Col, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './ListFlight.css'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
}
const onSearch = (value) => console.log(value)
const ListFlight = () => {
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
            title: 'Ngày đi',
            dataIndex: 'dateto',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },
        {
            title: 'Ngày về',
            dataIndex: 'datereturn',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },
        {
            title: 'Thời gian đi',
            dataIndex: 'timego',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1
            }
        },
        {
            title: 'Thời gian về',
            dataIndex: 'timereturn',
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
                        onClick={() => navigate('/admins/manager-admin/edit')}
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
    return (
        <>
            <p className='title-admin'>Danh sách chuyến bay</p>
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'end' }}>
                    <Search
                        placeholder='Nhập id chuyến bay để tìm kiếm'
                        allowClear
                        enterButton='Tìm'
                        size='large'
                        onSearch={onSearch}
                        className='input-search'
                    />
                </Col>
            </Row>
            <div className='table'>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
        </>
    )
}

export default ListFlight
