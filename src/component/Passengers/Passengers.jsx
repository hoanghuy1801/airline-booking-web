import { Row, Col, Form, Button, Radio, Collapse, Input, DatePicker, Select } from 'antd';
import '../Passengers/Passengers.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import diacriticless from 'diacriticless';
import { useDispatch } from "react-redux";
import { Data_Passengers } from '../../redux/action/PassengersAction';


const Passengers = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(1);

    const [inputLastName, setInputLastName] = useState('');

    const [inputFirstName, setInputFirstName] = useState('');

    const [input, setInput] = useState([{}])

    const dispath = useDispatch();

    const data_homepage = useSelector(state => state.homepage.data_booking);

    const numberBooking = data_homepage.adult + data_homepage.children;

    const numberadult = Array.from({ length: data_homepage.adult });

    const numberChildren = Array.from({ length: data_homepage.children });

    const numberbaby = Array.from({ length: data_homepage.baby });

    // const removeDiacritics = (str) => {
    //     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // };

    // const newinputLastName = removeDiacritics(inputLastName);

    // const newinputFirstName = removeDiacritics(inputFirstName);

    const data_passengers = {
        inputLastName: inputLastName,
        inputFirstName: inputFirstName
    }

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const handlePassengers = () => {
        dispath(Data_Passengers(data_passengers))
        navigate('/select-service')
    }


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
        <div className="select-flight">
            <div className="info-flight">
                <Row>
                    <Col span={16} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {!data_homepage.roundTrip ?
                                    <div>CHUYẾN BAY MỘT CHIỀU | {data_homepage.adult} Người lớn, {data_homepage.children} Trẻ em, {data_homepage.baby} Em bé </div>
                                    :
                                    <div>CHUYẾN BAY KHỨ HỒI| {data_homepage.adult} Người lớn, {data_homepage.children} Trẻ em, {data_homepage.baby} Em bé</div>
                                }
                            </span>
                        </Row>
                        <Row style={{ paddingTop: 10 }}>
                            <div>
                                <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm khởi hành </span>
                                <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }} >Tp. Hồ Chí Minh ( SGN )</span>
                                <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm đến </span>
                                <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }}> Hà Nội ( HAN )</span>
                            </div>
                        </Row>
                    </Col>
                    <Col span={8} className='icon-selcet'>
                        <Row >
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCircle style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconShoppingCart style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>

                    </Col>
                </Row>

            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        {numberadult.map((value, index) => (
                            <div key={index}>
                                <Collapse
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
                            <div>
                                {numberChildren.map((_, index) => (
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
                                    />
                                ))
                                }
                            </div>
                        }

                        {data_homepage.baby == 0 ? ''
                            :
                            <div>
                                {numberbaby.map((_, index) => (
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
                                    />
                                ))
                                }
                            </div>
                        }

                    </Col>
                    <Col span={9} >
                        <Form className='infor-user-select'>
                            <div className='title-select'>
                                <span style={{ color: 'white', fontSize: 20, fontWeight: 600, paddingRight: 10 }}>THÔNG TIN ĐẶT CHỖ </span>
                            </div>
                            <Form.Item>
                                <div className='title-infor'>
                                    <span style={{
                                        color: 'black', fontSize: 20, fontWeight: 600,
                                        paddingLeft: 20,

                                    }}>Thông tin hành khách </span>
                                </div>
                                <div style={{ backgroundColor: 'rgb(201, 239, 255)' }}>
                                    <span style={{
                                        color: 'black', fontSize: 18, fontWeight: 400,
                                        paddingLeft: 20,

                                    }}>Chuyến đi</span>
                                </div>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 500,
                                    paddingLeft: 20,

                                }}>Tp. Hồ Chí Minh (SGN)</span>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 500,
                                    paddingLeft: 20,
                                }}>  <IconPlane style={{ width: 25, height: 25, marginRight: 15, paddingTop: 6 }} /> </span>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 500,
                                    paddingLeft: 20,

                                }}>Hà Nội (HAN) </span>
                                <div className='title-infor'>
                                    <Row>
                                        <Col span={8}>
                                            <span style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 20,
                                            }}>Giá vé </span>
                                        </Col>
                                        <Col span={6}>
                                            <span style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20,
                                            }}>x{numberBooking} </span>
                                        </Col>
                                        <Col span={10}><span style={{
                                            color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingRight: 20,
                                        }}>928,800 VND </span></Col>
                                    </Row>
                                </div>
                                {!data_homepage.baby == 0 ? <div className='title-infor'>
                                    <Row>
                                        <Col span={8}>
                                            <span style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 20,
                                            }}>Giá vé em bé </span>
                                        </Col>
                                        <Col span={6}><span style={{
                                            color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingRight: 20,
                                        }}>x{data_homepage.baby} </span></Col>
                                        <Col span={10}><span style={{
                                            color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingRight: 20,
                                        }}>100,000 VND </span></Col>
                                    </Row>
                                </div>
                                    : ''}

                                <div className='title-infor'>
                                    <Row>
                                        <Col span={8}>
                                            <span style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 20,
                                            }}>Thuế, phí </span>
                                        </Col>
                                        <Col span={16}><span style={{
                                            color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingRight: 20,
                                        }}>928,800 VND </span></Col>
                                    </Row>
                                </div>
                                <div className='title-infor'>
                                    <Row>
                                        <Col span={8}>
                                            <span style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 20,
                                            }}>Dịch vụ </span>
                                        </Col>
                                        <Col span={16}><span style={{
                                            color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingRight: 20,
                                        }}>0 VND </span></Col>
                                    </Row>
                                </div>

                                {!data_homepage.roundTrip ?
                                    <div></div>
                                    :
                                    <div>
                                        <div style={{ backgroundColor: 'rgb(201, 239, 255)' }}>
                                            <span style={{
                                                color: 'black', fontSize: 18, fontWeight: 400,
                                                paddingLeft: 20,

                                            }}>Chuyến về</span>
                                        </div>
                                        <span style={{
                                            color: 'black', fontSize: 18, fontWeight: 500,
                                            paddingLeft: 20,

                                        }}>Hà Nội (HAN) </span>
                                        <span style={{
                                            color: 'black', fontSize: 18, fontWeight: 500,
                                            paddingLeft: 20,
                                        }}>  <IconPlane style={{ width: 25, height: 25, marginRight: 15, paddingTop: 6 }} /> </span>
                                        <span style={{
                                            color: 'black', fontSize: 18, fontWeight: 500,
                                            paddingLeft: 20,

                                        }}>Tp. Hồ Chí Minh (SGN)</span>
                                        <div className='title-infor'>
                                            <Row>
                                                <Col span={8}>
                                                    <span style={{
                                                        color: 'black', fontSize: 18, fontWeight: 600,
                                                        paddingLeft: 20,
                                                    }}>Giá vé </span>
                                                </Col>
                                                <Col span={6}>
                                                    <span style={{
                                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                        display: 'flex',
                                                        alignItems: 'flex-end',
                                                        paddingRight: 20,
                                                    }}>x{numberBooking} </span>
                                                </Col>
                                                <Col span={10}><span style={{
                                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    paddingRight: 20,
                                                }}>928,800 VND </span></Col>
                                            </Row>
                                        </div>
                                        {!data_homepage.baby == 0 ? <div className='title-infor'>
                                            <Row>
                                                <Col span={8}>
                                                    <span style={{
                                                        color: 'black', fontSize: 18, fontWeight: 600,
                                                        paddingLeft: 20,
                                                    }}>Giá vé em bé </span>
                                                </Col>
                                                <Col span={6}><span style={{
                                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    paddingRight: 20,
                                                }}>x{data_homepage.baby} </span></Col>
                                                <Col span={10}><span style={{
                                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    paddingRight: 20,
                                                }}>100,000 VND </span></Col>
                                            </Row>
                                        </div>
                                            : ''}
                                        <div className='title-infor'>
                                            <Row>
                                                <Col span={8}>
                                                    <span style={{
                                                        color: 'black', fontSize: 18, fontWeight: 600,
                                                        paddingLeft: 20,
                                                    }}>Thuế, phí </span>
                                                </Col>
                                                <Col span={16}><span style={{
                                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    paddingRight: 20,
                                                }}>928,800 VND </span></Col>
                                            </Row>
                                        </div>
                                        <div className='title-infor'>
                                            <Row>
                                                <Col span={8}>
                                                    <span style={{
                                                        color: 'black', fontSize: 18, fontWeight: 600,
                                                        paddingLeft: 20,
                                                    }}>Dịch vụ </span>
                                                </Col>
                                                <Col span={16}><span style={{
                                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    paddingRight: 20,
                                                }}>0 VND </span></Col>
                                            </Row>
                                        </div>
                                    </div>
                                }
                            </Form.Item>
                            <div className='title-select-end'>
                                <Row>
                                    <Col span={8}>
                                        <span style={{
                                            color: 'white', fontSize: 20, fontWeight: 600,
                                            paddingLeft: 20,
                                        }}>Tổng tiền</span>
                                    </Col>
                                    <Col span={16}><span style={{
                                        color: 'white', fontSize: 20, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20,
                                    }}>0 VND </span></Col>
                                </Row>
                            </div>

                        </Form>
                    </Col>
                </Row>

            </div>
            <div className="footer">
                <Row>
                    <Col span={6}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/select-fight-infor') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={16} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={8} className='footer-price'><i>1,000,000 </i><span> VND</span>
                            </Col>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue' onClick={() => handlePassengers()} >Tiếp tục</Button>

                    </Col>
                </Row>
            </div>


        </div >
    )
}
export default Passengers;