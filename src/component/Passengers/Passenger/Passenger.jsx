import { Row, Col, Radio, Collapse, Input, DatePicker, Select, Typography } from 'antd';
import './Passenger.css'
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from "react-redux";
const { Title, Text } = Typography;
const Passenger = () => {
    const navigate = useNavigate();

    const [valueRadio, setValueRadio] = useState();

    const [inputLastName, setInputLastName] = useState('');

    const [inputFirstName, setInputFirstName] = useState('');


    const dispath = useDispatch();

    const data_homepage = useSelector(state => state.formsearch.data_booking);

    const numberadult = Array.from({ length: data_homepage.adult });

    const numberChildren = Array.from({ length: data_homepage.children });

    const numberbaby = Array.from({ length: data_homepage.baby });

    const onChange = (e) => {
        setValueRadio(e.target.value);
    };

    const handleInputLastName = (index, event) => {
        const newValues = [...inputLastName];
        newValues[index] = event.target.value;
        setInputLastName(newValues);

    };

    const handleInputFirstName = (index, event) => {
        const newValues = [...inputFirstName];
        newValues[index] = event.target.value;
        setInputFirstName(newValues);
    };
    return (
        <>
            <Text className='title'>Thông tin hành khách</Text>
            {numberadult.map((_, index) => (
                <div key={index}>
                    <Collapse
                        key='adult'
                        size="large"
                        items={[
                            {
                                key: { index },
                                label: <div style={{ fontSize: '18px', fontWeight: 600 }}>Người lớn</div>,
                                children:
                                    <div className='formPassengers'>
                                        <Row className='rowInforPassengers'>
                                            <Radio.Group onChange={onChange} value={valueRadio}>
                                                <Radio value='Nam'>Nam</Radio>
                                                <Radio value='Nữ'>Nữ</Radio>
                                                <Radio value='Khác'>Khác</Radio>
                                            </Radio.Group>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Họ*</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        placeholder='Họ'
                                                        style={{ width: '90%' }}

                                                        onChange={(event) => handleInputLastName(index, event)}
                                                    />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Tên đệm & tên*</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        placeholder='Tên đệm & tên theo trình tự CCCD'
                                                        style={{ width: '90%' }}

                                                        onChange={(event) => handleInputFirstName(index, event)}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Ngày sinh*</Text>
                                                </Row>
                                                <Row>
                                                    <DatePicker style={{ width: '90%' }} placeholder='Ngày sinh' />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Quốc gia*</Text>
                                                </Row>
                                                <Row>
                                                    <Select
                                                        showSearch
                                                        style={{ width: '90%' }}
                                                        placeholder="Chọn quốc gia"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                        filterSort={(optionA, optionB) =>
                                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                        }
                                                        options={[
                                                            {
                                                                value: '1',
                                                                label: 'SGN',
                                                            },
                                                            {
                                                                value: '2',
                                                                label: 'HN',
                                                            },
                                                        ]}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Số điện thoại*</Text>
                                                </Row>
                                                <Row>
                                                    <Input placeholder='Số điện thoại' style={{ width: '90%' }} />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Email*</Text>
                                                </Row>
                                                <Row>
                                                    <Input placeholder='Email của bạn' style={{ width: '90%' }} />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={24}>
                                                <Row>
                                                    <Text className='text-passenger'>Nơi ở</Text>
                                                </Row>
                                                <Row>
                                                    <Input placeholder='Nơi ở hiện tại' style={{ width: '95%' }} />
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                            },
                        ]}
                        expandIconPosition='end'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            backgroundColor: '#F1F1F1',
                            marginTop: '10px'
                        }}
                    /></div>
            ))}
            {data_homepage.children == 0 ? ''
                :
                <div >
                    {numberChildren.map((_, index) => (
                        <div key={index}>
                            <Collapse
                                size="large"
                                items={[
                                    {
                                        key: '1',
                                        label: <div style={{ fontSize: '18px', fontWeight: 600 }}>Trẻ em</div>,
                                        children:
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Họ*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                placeholder='Họ'
                                                                style={{ width: '90%' }}
                                                                onChange={(event) => handleInputLastName(index, event)}
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Tên đệm & tên*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input placeholder='Tên đệm & tên theo trình tự theo giấy khai sinh'
                                                                style={{ width: '90%' }} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Ngày sinh*</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker style={{ width: '90%' }} placeholder='Ngày sinh' />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Text className='text-passenger'>Giới tính</Text>
                                                        <Select
                                                            showSearch
                                                            style={{ width: '90%' }}
                                                            defaultValue={1}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }

                                                            options={[
                                                                {
                                                                    value: '1',
                                                                    label: 'Nam',
                                                                },
                                                                {
                                                                    value: '2',
                                                                    label: 'Nữ',
                                                                },

                                                            ]}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                    },
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            /></div>
                    ))
                    }
                </div>
            }
            {data_homepage.baby == 0 ? ''
                :
                <div>
                    {numberbaby.map((_, index) => (
                        <div key={index}>
                            <Collapse
                                size="large"
                                items={[
                                    {
                                        key: '1',
                                        label: <div style={{ fontSize: '18px', fontWeight: 600 }}>Em bé</div>,
                                        children:
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={24}>
                                                        <Row>
                                                            <Text className='text-passenger'>Đi cùng</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input placeholder='Tên người em bé đi cùng' style={{ width: '95%' }} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Họ*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                placeholder='Họ'
                                                                style={{ width: '90%' }}
                                                                onChange={(event) => handleInputLastName(index, event)}
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Tên đệm & tên*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input placeholder='Tên đệm & tên theo trình tự theo giấy khai sinh'
                                                                style={{ width: '90%' }} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>Ngày sinh*</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker style={{ width: '90%' }} placeholder='Ngày sinh' />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Text className='text-passenger'>Giới tính</Text>
                                                        <Select
                                                            showSearch
                                                            style={{ width: '90%' }}
                                                            defaultValue={1}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }

                                                            options={[
                                                                {
                                                                    value: '1',
                                                                    label: 'Nam',
                                                                },
                                                                {
                                                                    value: '2',
                                                                    label: 'Nữ',
                                                                },

                                                            ]}
                                                        />
                                                    </Col>
                                                </Row>

                                            </div>
                                    },
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            /></div>
                    ))
                    }
                </div>
            }
        </>
    )
}
export default Passenger;