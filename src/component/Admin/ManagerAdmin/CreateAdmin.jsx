import React from 'react';
import { Row, Col, Select, Input, Button } from 'antd';
import './CreateAdmin.css'
import { useNavigate } from 'react-router-dom';
const CreateAdmin = () => {
    const navigate = useNavigate();
    return (
        <>
            <p className='title-admin'>Thêm nhân viên</p>
            <Button className='btn-create' onClick={() => navigate('/admins/manager-admin')}>Trở về</Button>
            <div className='form-create'>

                <Row>
                    <Col span={24} >
                        <label className='text'> Họ Tên</label>
                        <Input className='input' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <label className='text'> Ngày Sinh</label>
                        <Input className='input' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <label className='text'> Số điện thoại</label>
                        <Input className='input' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <label className='text'> Email</label>
                        <Input className='input' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <label className='text'> Mật khẩu</label>
                        <Input.Password className='input' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <label className='text'> Chức vụ:</label>
                        <Select
                            defaultValue="lucy"
                            style={{ width: 150 }}
                            options={[
                                { value: 'admin', label: 'Quản lý' },
                                { value: 'staff', label: 'Nhân viên' },
                            ]}
                        />
                    </Col>
                </Row>
                <Row >
                    <Button className='btncreate' onClick={() => navigate('/admins/manager-admin')}>Lưu</Button>
                </Row>


            </div>
        </>
    )

};
export default CreateAdmin;