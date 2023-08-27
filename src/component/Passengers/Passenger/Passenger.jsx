import { Row, Col, Radio, Collapse, Input, DatePicker, Select } from 'antd';
import './Passenger.css'
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Data_Passengers } from '../../../redux/action/PassengersAction';
const Passenger = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(1);

    const [inputLastName, setInputLastName] = useState('');

    const [inputFirstName, setInputFirstName] = useState('');


    const dispath = useDispatch();

    const data_homepage = useSelector(state => state.formsearch.data_booking);

    const numberadult = Array.from({ length: data_homepage.adult });

    const numberChildren = Array.from({ length: data_homepage.children });

    const numberbaby = Array.from({ length: data_homepage.baby });

    // const removeDiacritics = (str) => {
    //     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // };

    // const newinputLastName = removeDiacritics(inputLastName);

    // const newinputFirstName = removeDiacritics(inputFirstName);


    const onChange = (e) => {
        setValue(e.target.value);
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
            <p className='title'>Thông tin hành khách</p>
            {numberadult.map((value, index) => (
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
                                            <Radio.Group onChange={onChange} value={value}>
                                                <Radio value='Nam'>Nam</Radio>
                                                <Radio value='Nữ'>Nữ</Radio>
                                                <Radio value='Khác'>Khác</Radio>
                                            </Radio.Group>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <span style={{ fontSize: '16px', fontWeight: 500 }}>Họ*</span>
                                                <Input
                                                    placeholder='Họ'
                                                    style={{ width: 350 }}
                                                    value={value}
                                                    onChange={(event) => handleInputLastName(index, event)}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <span style={{ fontSize: '16px', fontWeight: 500 }}>Tên đệm & tên*</span>
                                                <Input
                                                    placeholder='Tên đệm & tên theo trình tự CCCD'
                                                    value={value}
                                                    onChange={(event) => handleInputFirstName(index, event)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <span style={{ fontSize: '16px', fontWeight: 500 }}>Ngày sinh*</span>
                                                <DatePicker style={{ width: 350 }} placeholder='Ngày sinh' />
                                            </Col>
                                            <Col span={12}>
                                                <span style={{ fontSize: '16px', fontWeight: 500 }}>Quốc gia*</span>
                                                <Select
                                                    showSearch
                                                    style={{ width: 365 }}
                                                    placeholder="Điểm khởi hành"
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
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <span style={{ fontSize: '16px', fontWeight: 500 }}>Số điện thoại*</span>
                                                <Input placeholder='Số điện thoại' style={{ width: 350 }} />
                                            </Col>
                                            <Col span={12}>
                                                <span style={{ fontSize: '16px', fontWeight: 500 }}>Email*</span>
                                                <Input placeholder='Email của bạn' />
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={24}>
                                                <span style={{ fontSize: '16px', fontWeight: 500 }}>Nơi ở</span>
                                                <Input placeholder='Nơi ở hiện tại' style={{ width: 730 }} />
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
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Họ*</span>
                                                        <Input placeholder='Họ' style={{ width: 350 }} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Tên đệm & tên*</span>
                                                        <Input placeholder='Tên đệm & tên theo trình tự theo giấy khai sinh' />
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Ngày sinh*</span>
                                                        <DatePicker style={{ width: 350 }} placeholder='Ngày sinh' />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Giới tính</span>
                                                        <Select
                                                            showSearch
                                                            style={{ width: 365 }}
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
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Đi cùng</span>
                                                        <Input placeholder='Tên người em bé đi cùng' style={{ width: 730 }} />
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Họ*</span>
                                                        <Input placeholder='Họ' style={{ width: 350 }} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Tên đệm & tên*</span>
                                                        <Input placeholder='Tên đệm & tên theo trình tự theo giấy khai sinh' />
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Ngày sinh*</span>
                                                        <DatePicker style={{ width: 350 }} placeholder='Ngày sinh' />
                                                    </Col>
                                                    <Col span={12}>
                                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>Giới tính</span>
                                                        <Select
                                                            showSearch
                                                            style={{ width: 365 }}
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