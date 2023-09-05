import React from 'react';
import { Table, Space, Input, Row, Col, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './ManagerAdmin.css'
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const onSearch = (value) => console.log(value);
const ManagerAdmin = () => {
    const navigate = useNavigate();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.Id - b.Id,
                multiple: 3,
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: {
                compare: (a, b) => a.email - b.email,
                multiple: 3,
            },
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            sorter: {
                compare: (a, b) => a.fullname - b.fullname,
                multiple: 2,
            },
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1,
            },
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'DateUser',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1,
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'dataCreate',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1,
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined className='icon' />} className='btn-edit' onClick={() => navigate('/admins/manager-admin/edit')} />
                    <Button type="primary" danger icon={<DeleteOutlined />} className='btn-delete' />
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            id: 1,
            email: 'huy@gmail.com',
            fullname: "Phạm Hoàng Huy",
            phone: '0964505517',
            DateUser: '10/01/2023',
            dataCreate: '10/01/2023'
        },

    ];
    return (
        <>
            <p className='title-admin'>Thông tin nhân viên</p>
            <Row>
                <Col span={18}>
                    <Button className='btn-create' onClick={() => navigate('/admins/manager-admin/create')}>Thêm</Button>
                </Col>
                <Col span={6}>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
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

export default ManagerAdmin;