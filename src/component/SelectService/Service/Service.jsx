import { Row, Col, Form, Button, Drawer, Divider, Card, Radio, InputNumber, Select } from 'antd';
import './Service.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import imgFavorite from '../../../assets/service/select-service_favorite.svg'
import imgFood from '../../../assets/service/select-service_foods.svg'
import imgluggage from '../../../assets/service/select-service_luggage.svg'
import imgFavoriteRed from '../../../assets/service/favorite-seat_red.svg'
import imgMiy from '../../../assets/service/mi-y.jpg'
import { useState } from 'react';
import SeatSelector from '../SeatSelector/SeatSelector';
const { Option } = Select;

const Service = () => {
    const [openFavorite, setOpenFavorite] = useState(false);
    const [openLuggage, setOpenLuggage] = useState(false);
    const [openFood, setOpenFood] = useState(false);

    const navigate = useNavigate();

    const data_homepage = useSelector(state => state.formsearch.data_booking);

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
        <>
            <p className='title'>Đừng quên mua hành lý, suất ăn, chọn chỗ ngồi</p>
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
                    </div>
                    <div className='information-seat'>
                        <Row>
                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: 'red' }} className='information-seat-color'>
                                </div>
                                <span>Ghế thương gia</span>
                            </Col>
                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: '#25A006' }} className='information-seat-color'>
                                </div>
                                <span>Ghế phổ thông đặc biệt</span>
                            </Col>

                            <Col span={8} style={{ display: 'flex' }}>
                                <div style={{ backgroundColor: ' #208AEC' }} className='information-seat-color'>
                                </div>
                                <span>Ghế phổ thông</span>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: '10px' }}>
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
                        <SeatSelector />
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
        </>
    )
}
export default Service;