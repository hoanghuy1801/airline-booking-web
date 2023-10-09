import { Row, Col, Typography, Button, Drawer, Divider, Card, Radio, InputNumber, Select } from 'antd';
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
const { Title, Text } = Typography;
const Service = (props) => {
    const { baggageOptions, mealOptions, defaultBaggageOptions,
        defaultMealOptions } = props;
    const [openFavorite, setOpenFavorite] = useState(false);
    const [openLuggage, setOpenLuggage] = useState(false);
    const [openFood, setOpenFood] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const navigate = useNavigate();

    const data = useSelector((state) => state.homePage.homePageInfor);


    const data_passengers = '';

    const numberBooking = data.adult + data.children;

    const [valueRadio, setValueRadio] = useState('');
    const [priceBaggageFomat, setPriceBaggageFomat] = useState('');
    let defaultBaggageOptionsCARRY_ON = {
        id: "",
        createdAt: "",
        updatedAt: "",
        optionCode: "",
        optionName: null,
        optionDescription: null,
        optionImage: null,
        value: 0,
        optionType: "",
        status: "",
        seatClass: "",
        luggageType: "",
        optionPrice: null
    };

    const newdefaultBaggageOptionsCARRY_ON = defaultBaggageOptions.find((item) => item.luggageType === 'CARRY_ON');

    if (newdefaultBaggageOptionsCARRY_ON) {
        defaultBaggageOptionsCARRY_ON = { ...newdefaultBaggageOptionsCARRY_ON };
    }
    let defaultBaggageOptionsCHECKED = {
        id: "",
        createdAt: "",
        updatedAt: "",
        optionCode: "",
        optionName: null,
        optionDescription: null,
        optionImage: null,
        value: 0,
        optionType: "",
        status: "",
        seatClass: "",
        luggageType: "",
        optionPrice: null
    };

    const newdefaultBaggageOptionsCHECKED = defaultBaggageOptions.find((item) => item.luggageType === 'CHECKED');

    if (newdefaultBaggageOptionsCHECKED) {
        defaultBaggageOptionsCHECKED = { ...newdefaultBaggageOptionsCHECKED };
    }


    const onChangeRadio = (value) => {
        setValueRadio(value.target);
        setPriceBaggageFomat(value.target.label.toLocaleString('it-IT'));
    };

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
                            {/* <Select style={{ width: 200 }} defaultValue={DataPassengers[0]}>
                                {DataPassengers.map((option) => (
                                    <Option key={option} value={option}>
                                        {option}
                                    </Option>
                                ))}
                            </Select> */}
                        </Row>
                    </div>
                    <div className='info-booking-service'>
                        <Row className='user-service' >
                            <span style={{ color: 'black' }}>SGN - HAN</span>
                        </Row>
                    </div>
                    <div className='form-seat'>
                        <div className='information-seat'>
                            <Row>
                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div style={{ backgroundColor: 'red' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế thương gia</span>
                                </Col>
                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div style={{ backgroundColor: '#25A006' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế phổ thông đặc biệt</span>
                                </Col>

                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div style={{ backgroundColor: ' #208AEC' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế phổ thông</span>
                                </Col>
                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div style={{ backgroundColor: '#FBB612 ' }} className='information-seat-color'>
                                    </div>
                                    <span>Ghế đang chọn</span>
                                </Col>

                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div style={{ backgroundColor: ' #D1D3D4' }} className='information-seat-color'>
                                    </div>
                                    <span>Đã có người</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='seat-ariline'>
                            <SeatSelector />
                        </div>
                    </div>
                    <div className="footer-divider">
                        <Row >
                            <Col span={3} className='display-img' >
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgFavorite} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={12} className='display-img'>
                                <Row>
                                    <i className='seat-price'>4-C: Ghế cao cấp</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>90,000 VND</i>
                                </Row>
                            </Col>
                            <Col xl={9} >
                                <Button className='footer-continue-service' >Xác nhận</Button>
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
                    <div >
                        <Text className='written-notices'>Hạng vé của bạn đã bao gồm {defaultBaggageOptionsCARRY_ON.value}kg hành lý xách tay{newdefaultBaggageOptionsCHECKED == null ? '' : <>, {defaultBaggageOptionsCHECKED.value}kg hành lý ký gửi</>}.</Text>
                    </div>
                    <div className='title-luggage'>

                        <span>Chọn thêm hành lý</span>
                    </div>
                    <div>
                        <Row>
                            {baggageOptions.map((item) => {
                                const priceFomat = item.optionPrice.toLocaleString('it-IT');
                                return (
                                    <Card
                                        className='card-luggage'
                                    >
                                        <Row>
                                            <img src={imgluggage} style={{ width: '60px', height: '60px' }} />
                                        </Row>
                                        <p style={{ paddingTop: '10px', fontSize: 16, fontWeight: 500 }}>Gói {item.value}kg</p>
                                        <p style={{ paddingTop: '3px', fontSize: 17, fontWeight: 500, color: 'red' }}>{priceFomat} </p>
                                        <Radio key={item.id}
                                            name="radioGroup"
                                            value={item.value}
                                            label={item.optionPrice}
                                            checked={valueRadio.value === item.value}
                                            onChange={onChangeRadio}
                                            style={{ paddingLeft: '20px' }} />
                                    </Card>
                                )
                            })}
                        </Row>
                    </div>
                    <div className="footer-divider">
                        <Row >
                            <Col span={3} className='display-img'>
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgluggage} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={12} className='display-img'>
                                <Row>
                                    <i className='seat-price'>Gói {valueRadio.value}kg</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>{priceBaggageFomat} VND</i>
                                </Row>
                            </Col>
                            <Col span={9} >
                                <Button className='footer-continue-service' >Xác nhận</Button>
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
                    <div>
                        {defaultMealOptions == '' ?
                            '' : <><Text className='written-notices'>Hạng vé của bạn sẽ được phục vụ suất ăn và nước uống miễn phí!</Text></>}
                    </div>
                    <div className='title-luggage'>
                        <span>Hãy chọn mua thức ăn bạn yêu thích nhé !</span>
                    </div>
                    <div>
                        {mealOptions.map((item) => {
                            const priceFomat = item.optionPrice.toLocaleString('it-IT');
                            return (
                                <Card
                                    className='food-service-card'
                                >
                                    <Row>
                                        <Col span={10}>
                                            <img src={imgMiy} className='img-foods' />
                                        </Col>
                                        <Col span={14}>
                                            <Row>
                                                <span style={{ fontSize: '18px', fontWeight: 500, paddingTop: '10px' }}>{item.optionName}</span>
                                            </Row>
                                            <Row>
                                                <i style={{ fontSize: '18px', fontWeight: 500, paddingTop: '5px', paddingLeft: '5px', color: 'red' }}>{priceFomat} VND</i>
                                            </Row>
                                            <Row span={3}>
                                                <div style={{ marginLeft: '220px', marginTop: '10px' }}>
                                                    <label >Số lượng:</label>
                                                    <InputNumber min={0} max={10} defaultValue={0} style={{
                                                        width: '60px', marginLeft: '10px'
                                                    }} />
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        })}

                    </div>
                    <div className="footer-divider">
                        <Row >
                            <Col span={3} className='display-img' >
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgFood} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={12} className='display-img'>
                                <Row>
                                    <i className='seat-price'>Suất ăn nóng</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>100,000 VND</i>
                                </Row>
                            </Col>
                            <Col span={9} >
                                <Button className='footer-continue-service' >Xác nhận</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer >
        </>
    )
}
export default Service;