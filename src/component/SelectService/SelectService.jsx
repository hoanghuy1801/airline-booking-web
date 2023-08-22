import { Row, Col, Form, Button, Drawer, Divider, Card, Radio, InputNumber, Select } from 'antd';
import '../SelectService/SelectService.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import imgFavorite from '../../assets/service/select-service_favorite.svg'
import imgFood from '../../assets/service/select-service_foods.svg'
import imgluggage from '../../assets/service/select-service_luggage.svg'
import imgFavoriteRed from '../../assets/service/favorite-seat_red.svg'
import imgMiy from '../../assets/service/mi-y.jpg'
import { useState } from 'react';
const { Option } = Select;
const SelectService = () => {
    const [openFavorite, setOpenFavorite] = useState(false);
    const [openLuggage, setOpenLuggage] = useState(false);
    const [openFood, setOpenFood] = useState(false);
    const navigate = useNavigate();
    const data_homepage = useSelector(state => state.homepage.data_booking);
    const data_passengers = useSelector(state => state.passengers.data_passengers);
    const numberBooking = data_homepage.adult + data_homepage.children;
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const DataPassengers = [];
    for (let i = 0; i < data_passengers.inputFirstName.length; i++) {
        DataPassengers.push(data_passengers.inputFirstName[i] + ' ' + data_passengers.inputLastName[i])
    }

    const showDrawerFavorite = () => {
        setOpenFavorite(true);
    };
    const showDrawerLuggage = () => {
        setOpenLuggage(true);
    };
    const showDrawerFood = () => {
        setOpenFood(true);
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
                            <IconShoppingCart style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>

                    </Col>
                </Row>

            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <Row className='selectService' onClick={() => showDrawerFavorite()}>
                            <Col span={4} className='img-service' >
                                <img src={imgFavorite} style={{ width: '70px', height: '70px' }} />
                            </Col>
                            <Col span={12} className='title-service'>
                                <i>Chọn chỗ ngồi yêu thích</i>
                            </Col>
                            <Col span={6} className='price-service'>
                                <i>49,000 VND</i>
                            </Col>
                            <Col span={2} className='title-service'>
                                <IconArrowBadgeRightFilled style={{ color: 'grey' }} />
                            </Col>
                        </Row>
                        <Row className='selectService' onClick={() => showDrawerLuggage()}>
                            <Col span={4} className='img-service'>
                                <img src={imgluggage} style={{ width: '70px', height: '70px' }} />
                            </Col>
                            <Col span={12} className='title-service'>
                                <i>Chọn hành lý</i>
                            </Col>
                            <Col span={6} className='price-service'>
                                <i>149,000 VND</i>
                            </Col>
                            <Col span={2} className='title-service'>
                                <IconArrowBadgeRightFilled style={{ color: 'grey' }} />
                            </Col>
                        </Row>
                        <Row className='selectService' onClick={() => showDrawerFood()}>
                            <Col span={4} className='img-service'>
                                <img src={imgFood} style={{ width: '70px', height: '70px' }} />
                            </Col>
                            <Col span={12} className='title-service'>
                                <i>Chọn món ăn</i>
                            </Col>
                            <Col span={6} className='price-service'>
                                <i>99,000 VND</i>
                            </Col>
                            <Col span={2} className='title-service'>
                                <IconArrowBadgeRightFilled style={{ color: 'grey' }} />
                            </Col>
                        </Row>

                    </Col>
                    <Col span={9} className='infor-user-select'>
                        <Form>
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
                            onClick={() => { navigate('/passengers') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={16} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={8} className='footer-price'><i>1,000,000 </i><span> VND</span>    </Col>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue' >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>

            <Drawer className='service-favorite'
                title="Chọn chỗ ngồi yêu thích"
                placement='right'
                open={openFavorite}
                onClose={() => {
                    setOpenFavorite(false);
                }}
                width={700}
            >
                <div className='form-favorite'>
                    <Row className='roundTrip'>
                        <span>Chuyến đi</span>
                    </Row>
                    <Divider style={{ borderColor: "black" }}></Divider>
                    <div className='info-user-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>Chuyến đi</span>
                        </Row>
                        <Row className='user-service'>
                            <Select style={{ width: 200 }} defaultValue={DataPassengers[0]}>
                                {DataPassengers.map((option) => (
                                    <Option key={option} value={option}>
                                        {option}
                                    </Option>
                                ))}
                            </Select>
                        </Row>
                    </div>
                    <div className='info-booking-service'>
                        <Row className='user-service' >
                            <span style={{ color: 'black' }}>SGN - HAN</span>
                        </Row>
                        <Row className='user-service' >
                            <span style={{ color: 'black' }}>4 - C</span>
                        </Row>

                    </div>
                    <div className='information-seat'>
                        <Row>
                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: 'red' }} className='information-seat-color'>
                                </div>
                                <span>Ghế cao cấp</span>
                            </Col>
                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: '#25A006' }} className='information-seat-color'>
                                </div>
                                <span>Ghế tiêu chuẩn</span>
                            </Col>

                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: ' #208AEC' }} className='information-seat-color'>
                                </div>
                                <span>Ghế chân rộng</span>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: '10px' }}>
                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: '#6D09BB' }} className='information-seat-color'>
                                </div>
                                <span>Ghế hàng trước</span>
                            </Col>
                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: '#FBB612 ' }} className='information-seat-color'>
                                </div>
                                <span>Ghế đang chọn</span>
                            </Col>

                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: ' #D1D3D4' }} className='information-seat-color'>
                                </div>
                                <span>Đã có người</span>
                            </Col>
                        </Row>
                    </div>
                    <div className='seat-ariline'>
                        <Row >
                            <Col span={1}>
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                A
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                B
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                C
                            </Col>
                            <Col span={4} className='seat-ariline-booking'>
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                D
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                E
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                F
                            </Col>
                            <Col span={1} className='seat-ariline-booking'>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={1}>
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                <img src={imgFavoriteRed} />
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                <img src={imgFavoriteRed} />
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                <img src={imgFavoriteRed} />
                            </Col>
                            <Col span={4} className='seat-ariline-booking'>
                                1
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                <img src={imgFavoriteRed} />
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                <img src={imgFavoriteRed} />
                            </Col>
                            <Col span={3} className='seat-ariline-booking'>
                                <img src={imgFavoriteRed} />
                            </Col>
                            <Col span={1} className='seat-ariline-booking'>
                            </Col>
                        </Row>
                    </div>

                    <div className="footer-divider">
                        <Row >
                            <Col span={3}  >
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgFavorite} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <i className='seat-price'>4-C: Ghế cao cấp</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>90,000 VND</i>
                                </Row>


                            </Col>
                            <Col span={7} >
                                <Button className='footer-continue' >Xác nhận</Button>
                            </Col>

                        </Row>
                    </div>
                </div>
            </Drawer >
            <Drawer className='service-luggage'
                title="Chọn hành lý"
                placement='right'
                open={openLuggage}
                onClose={() => {
                    setOpenLuggage(false);
                }}
                width={700}
            >
                <div className='form-favorite'>
                    <Row className='roundTrip'>
                        <span>Chuyến đi</span>
                    </Row>
                    <Divider style={{ borderColor: "black" }}></Divider>
                    <div className='info-user-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>Chuyến đi</span>
                        </Row>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>PHAM HOANG HUY</span>
                        </Row>
                    </div>
                    <div className='info-booking-service'>
                        <Row className='user-service' >
                            <span style={{ color: 'black' }}>SGN - HAN</span>
                        </Row>


                    </div>
                    <div className='title-luggage'>
                        <span>Chọn thêm hành lý</span>
                    </div>
                    <div>
                        <Radio.Group onChange={onChange} value={value}>
                            <Row>
                                <Card
                                    className='card-luggage'
                                >
                                    <Row>
                                        <img src={imgluggage} style={{ width: '60px', height: '60px' }} />
                                    </Row>
                                    <p style={{ paddingTop: '10px', fontSize: 16, fontWeight: 500 }}>Gói 20kg</p>
                                    <p style={{ paddingTop: '3px', fontSize: 17, fontWeight: 500, color: 'red' }}>180,000 </p>
                                    <Radio value={1} style={{ paddingLeft: '20px' }}></Radio>
                                </Card>
                                <Card
                                    className='card-luggage'
                                >
                                    <Row>
                                        <img src={imgluggage} style={{ width: '60px', height: '60px' }} />
                                    </Row>
                                    <p style={{ paddingTop: '10px', fontSize: 16, fontWeight: 500 }}>Gói 20kg</p>
                                    <p style={{ paddingTop: '3px', fontSize: 17, fontWeight: 500, color: 'red' }}>180,000 </p>
                                    <Radio value={2} style={{ paddingLeft: '20px' }}></Radio>
                                </Card>
                            </Row>
                        </Radio.Group>
                    </div>
                    <div className="footer-divider">
                        <Row >
                            <Col span={3}  >
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgluggage} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <i className='seat-price'>Gói 20kg</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>180,000 VND</i>
                                </Row>
                            </Col>
                            <Col span={7} >
                                <Button className='footer-continue' >Xác nhận</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer >
            <Drawer className='service-food'
                title="Chọn suất ăn"
                placement='right'
                open={openFood}
                onClose={() => {
                    setOpenFood(false);
                }}
                width={700}
            >
                <div className='form-favorite'>
                    <Row className='roundTrip'>
                        <span>Chuyến đi</span>
                    </Row>
                    <Divider style={{ borderColor: "black" }}></Divider>
                    <div className='info-user-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>Chuyến đi</span>
                        </Row>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>PHAM HOANG HUY</span>
                        </Row>
                    </div>
                    <div className='info-booking-service'>
                        <Row className='user-service' >
                            <span style={{ color: 'black' }}>SGN - HAN</span>
                        </Row>


                    </div>
                    <div className='title-luggage'>
                        <span>Hãy chọn mua thức ăn bạn yêu thích nhé !</span>
                    </div>
                    <div>
                        <Card
                            className='food-service-card'
                        >
                            <Row>
                                <Col span={10}>
                                    <img src={imgMiy} className='img-foods' />
                                </Col>
                                <Col span={14}>
                                    <Row>
                                        <span style={{ fontSize: '18px', fontWeight: 500, paddingTop: '10px' }}>Combo Mỳ Ý và Nước suối và Hạt điều</span>
                                    </Row>
                                    <Row>
                                        <i style={{ fontSize: '18px', fontWeight: 500, paddingTop: '5px', paddingLeft: '5px', color: 'red' }}>100.000 VND</i>
                                    </Row>
                                    <Row span={3}>
                                        <div style={{ marginLeft: '220px', marginTop: '40px' }}>
                                            <label >Số lượng:</label>
                                            <InputNumber min={0} max={10} defaultValue={0} style={{
                                                width: '60px', marginLeft: '10px'
                                            }} />
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className="footer-divider">
                        <Row >
                            <Col span={3}  >
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgFood} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <i className='seat-price'>Suất ăn nóng</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>100,000 VND</i>
                                </Row>
                            </Col>
                            <Col span={7} >
                                <Button className='footer-continue' >Xác nhận</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer >
        </div >
    )
}
export default SelectService;