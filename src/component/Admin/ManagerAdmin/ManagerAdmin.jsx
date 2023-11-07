/* eslint-disable no-unused-vars */
import React from 'react'
import { Table, Space, Input, Row, Col, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './ManagerAdmin.css'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
}
const onSearch = (value) => console.log(value)
const ManagerAdmin = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.Id - b.Id,
                multiple: 3
            }
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'codeName',
            sorter: {
                compare: (a, b) => a.fullname - b.fullname,
                multiple: 2
            }
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            sorter: {
                compare: (a, b) => a.fullname - b.fullname,
                multiple: 2
            }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Chức vụ',
            dataIndex: 'fullname',
            sorter: {
                compare: (a, b) => a.fullname - b.fullname,
                multiple: 2
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'status',
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
            title: 'Xử lý',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        icon={<EditOutlined className='icon' />}
                        className='btn-edit'
                        onClick={() => navigate('/admins/employee/edit')}
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
            email: 'huy@gmail.com',
            fullname: 'Phạm Hoàng Huy',
            phone: '0964505517',
            DateUser: '10/01/2023',
            status: 'ACT'
        }
    ]
    return (
        <>
            <p className='title-admin'>Quản lý nhân viên</p>
            <Row>
                <Col span={18}>
                    <Button className='btn-create' onClick={() => navigate('/admins/employee/create')}>
                        Thêm
                    </Button>
                </Col>
                <Col span={6}>
                    <Search allowClear enterButton='Tìm' size='large' onSearch={onSearch} className='input-search' />
                </Col>
            </Row>
            <div className='table'>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
        </>
    )
}

export default ManagerAdmin
