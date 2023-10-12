import { Row, Col, Typography, Button, Drawer, Divider, Card, Radio, InputNumber, Select } from 'antd';
import './Service.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import imgFavorite from '../../../assets/service/select-service_favorite.svg'
import imgFood from '../../../assets/service/select-service_foods.svg'
import imgluggage from '../../../assets/service/select-service_luggage.svg'
import imgFavoriteRed from '../../../assets/service/favorite-seat_red.svg'
import imgMiy from '../../../assets/service/mi-y.jpg'
import { useState, useEffect } from 'react';
import SeatSelector from '../SeatSelector/SeatSelector';
import { useLanguage } from '../../../LanguageProvider/LanguageProvider';
import { setInfoPassengers } from '../../../redux/reducers/booking';
import { formatCurrency } from '../../../utils/format';
const { Option } = Select;
const { Title, Text } = Typography;
const Service = (props) => {
    const { baggageOptions, mealOptions, defaultBaggageOptions,
        defaultMealOptions, seatOptions } = props;
    useEffect(() => {
        handleDisabledSeats();
    }, []);
    const dispath = useDispatch();
    const [openFavorite, setOpenFavorite] = useState(false);
    const [openLuggage, setOpenLuggage] = useState(false);
    const [openFood, setOpenFood] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState('');
    const [disabledSeats, setdisabledSeats] = useState([]);
    const [priceSeat, setPriceSeat] = useState(0);
    const navigate = useNavigate();

    const data = useSelector((state) => state.homePage.homePageInfor);
    const handleDisabledSeats = () => {
        const seatsECONOMY = ['1A', '1B', '1C', '1D', '1E', '1F', '2A', '2B', '2C', '2D', '2E', '2F', '3A', '3B', '3C', '3D', '3E', '3F', '4A', '4B', '4C', '4D', '4E', '4F', '5A', '5B', '5C', '5D', '5E', '5F', '6A', '6B', '6C', '6D', '6E', '6F'];
        const seatsPREMIUM_ECONOMY = ['1A', '1B', '1C', '1D', '1E', '1F', '2A', '2B', '2C', '2D', '2E', '2F', '3A', '3B', '3C', '3D', '3E', '3F', "7A",
            "7B",
            "7C",
            "7D",
            "7E",
            "7F",
            "8A",
            "8B",
            "8C",
            "8D",
            "8E",
            "8F",
            "9A",
            "9B",
            "9C",
            "9D",
            "9E",
            "9F",
            "10A",
            "10B",
            "10C",
            "10D",
            "10E",
            "10F",
            "11A",
            "11B",
            "11C",
            "11D",
            "11E",
            "11F",
            "12A",
            "12B",
            "12C",
            "12D",
            "12E",
            "12F",
            "13A",
            "13B",
            "13C",
            "13D",
            "13E",
            "13F",
            "14A",
            "14B",
            "14C",
            "14D",
            "14E",
            "14F",
            "15A",
            "15B",
            "15C",
            "15D",
            "15E",
            "15F",
            "16A",
            "16B",
            "16C",
            "16D",
            "16E",
            "16F",
            "17A",
            "17B",
            "17C",
            "17D",
            "17E",
            "17F",
            "18A",
            "18B",
            "18C",
            "18D",
            "18E",
            "18F",
            "19A",
            "19B",
            "19C",
            "19D",
            "19E",
            "19F",
            "20A",
            "20B",
            "20C",
            "20D",
            "20E",
            "20F",
            "21A",
            "21B",
            "21C",
            "21D",
            "21E",
            "21F",
            "22A",
            "22B",
            "22C",
            "22D",
            "22E",
            "22F",
            "23A",
            "23B",
            "23C",
            "23D",
            "23E",
            "23F",
            "24A",
            "24B",
            "24C",
            "24D",
            "24E",
            "24F",
            "25A",
            "25B",
            "25C",
            "25D",
            "25E",
            "25F",
            "26A",
            "26B",
            "26C",
            "26D",
            "26E",
            "26F",
            "27A",
            "27B",
            "27C",
            "27D",
            "27E",
            "27F",
            "28A",
            "28B",
            "28C",
            "28D",
            "28E",
            "28F",
            "29A",
            "29B",
            "29C",
            "29D",
            "29E",
            "29F",
            "30A",
            "30B",
            "30C",
            "30D",
            "30E",
            "30F",
            "31A",
            "31B",
            "31C",
            "31D",
            "31E",
            "31F",
            "32A",
            "32B",
            "32C",
            "32D",
            "32E",
            "32F",
            "33A",
            "33B",
            "33C",
            "33D",
            "33E",
            "33F",
            "34A",
            "34B",
            "34C",
            "34D",
            "34E",
            "34F",
            "35A",
            "35B",
            "35C",
            "35D",
            "35E",
            "35F",
            "36A",
            "36B",
            "36C",
            "36D",
            "36E",
            "36F",
            "37A",
            "37B",
            "37C",
            "37D",
            "37E",
            "37F",
            "38A",
            "38B",
            "38C",
            "38D",
            "38E",
            "38F",
            "39A",
            "39B",
            "39C",
            "39D",
            "39E",
            "39F",
            "40A",
            "40B",
            "40C",
            "40D",
            "40E",
            "40F"];
        const seatsBUSINESS = [[
            "4A",
            "4B",
            "4C",
            "4D",
            "4E",
            "4F",
            "5A",
            "5B",
            "5C",
            "5D",
            "5E",
            "5F",
            "6A",
            "6B",
            "6C",
            "6D",
            "6E",
            "6F",
            "7A",
            "7B",
            "7C",
            "7D",
            "7E",
            "7F",
            "8A",
            "8B",
            "8C",
            "8D",
            "8E",
            "8F",
            "9A",
            "9B",
            "9C",
            "9D",
            "9E",
            "9F",
            "10A",
            "10B",
            "10C",
            "10D",
            "10E",
            "10F",
            "11A",
            "11B",
            "11C",
            "11D",
            "11E",
            "11F",
            "12A",
            "12B",
            "12C",
            "12D",
            "12E",
            "12F",
            "13A",
            "13B",
            "13C",
            "13D",
            "13E",
            "13F",
            "14A",
            "14B",
            "14C",
            "14D",
            "14E",
            "14F",
            "15A",
            "15B",
            "15C",
            "15D",
            "15E",
            "15F",
            "16A",
            "16B",
            "16C",
            "16D",
            "16E",
            "16F",
            "17A",
            "17B",
            "17C",
            "17D",
            "17E",
            "17F",
            "18A",
            "18B",
            "18C",
            "18D",
            "18E",
            "18F",
            "19A",
            "19B",
            "19C",
            "19D",
            "19E",
            "19F",
            "20A",
            "20B",
            "20C",
            "20D",
            "20E",
            "20F",
            "21A",
            "21B",
            "21C",
            "21D",
            "21E",
            "21F",
            "22A",
            "22B",
            "22C",
            "22D",
            "22E",
            "22F",
            "23A",
            "23B",
            "23C",
            "23D",
            "23E",
            "23F",
            "24A",
            "24B",
            "24C",
            "24D",
            "24E",
            "24F",
            "25A",
            "25B",
            "25C",
            "25D",
            "25E",
            "25F",
            "26A",
            "26B",
            "26C",
            "26D",
            "26E",
            "26F",
            "27A",
            "27B",
            "27C",
            "27D",
            "27E",
            "27F",
            "28A",
            "28B",
            "28C",
            "28D",
            "28E",
            "28F",
            "29A",
            "29B",
            "29C",
            "29D",
            "29E",
            "29F",
            "30A",
            "30B",
            "30C",
            "30D",
            "30E",
            "30F",
            "31A",
            "31B",
            "31C",
            "31D",
            "31E",
            "31F",
            "32A",
            "32B",
            "32C",
            "32D",
            "32E",
            "32F",
            "33A",
            "33B",
            "33C",
            "33D",
            "33E",
            "33F",
            "34A",
            "34B",
            "34C",
            "34D",
            "34E",
            "34F",
            "35A",
            "35B",
            "35C",
            "35D",
            "35E",
            "35F",
            "36A",
            "36B",
            "36C",
            "36D",
            "36E",
            "36F",
            "37A",
            "37B",
            "37C",
            "37D",
            "37E",
            "37F",
            "38A",
            "38B",
            "38C",
            "38D",
            "38E",
            "38F",
            "39A",
            "39B",
            "39C",
            "39D",
            "39E",
            "39F",
            "40A",
            "40B",
            "40C",
            "40D",
            "40E",
            "40F"
        ]]
        console.log("seatOptions", seatOptions)
        if (data.seatClass == 'ECONOMY') {
            setdisabledSeats(seatsECONOMY.concat(seatOptions.seatsInBooking));

        }
        if (data.seatClass == 'PREMIUM_ECONOMY') {
            setdisabledSeats(seatsPREMIUM_ECONOMY.concat(seatOptions.seatsInBooking));

        }
        if (data.seatClass == 'BUSINESS') {
            setdisabledSeats(seatsBUSINESS.concat(seatOptions.seatsInBooking));

        }
    }

    const { getText } = useLanguage();


    const priceSeatFomat = formatCurrency(priceSeat);
    const dataPassengers = useSelector((state) => state.flightSelect.infoPassengers);
    const [selectPassengers, setSelectPassengers] = useState(dataPassengers[0].id);

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
    console.log("huy", selectPassengers)

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
    const onChangePassengers = (value, label) => {
        setSelectPassengers(value)
    }

    const hanldeConfirm = () => {
        const newSeat = {
            seatId: data.seatId,
            seatCode: selectedSeat,
            seatClass: data.seatClass,
        };
        const updatedPassengers = dataPassengers.map((dataPassengers) => {
            if (dataPassengers.id === selectPassengers) {
                return { ...dataPassengers, seat: newSeat };
            }
            return dataPassengers;
        });
        dispath(setInfoPassengers(updatedPassengers))
    }
    const hanldeCancel = () => {
        const updatedPassengers = dataPassengers.map((dataPassengers) => {
            if (dataPassengers.id === selectPassengers) {
                const { seat, ...rest } = dataPassengers;
                return rest;
            }
            return dataPassengers;
        });
        dispath(setInfoPassengers(updatedPassengers))
    }
    const defaultValue = dataPassengers.length > 0 ? dataPassengers[0].id : undefined;
    return (
        <>
            <p className='title'>{getText('TitleSelectService')}</p>
            <Row className='selectService' onClick={() => showDrawerFavorite()}>
                <Col span={4} className='img-service' >
                    <img src={imgFavorite} style={{ width: '70px', height: '70px' }} />
                </Col>
                <Col span={12} className='title-service'>
                    <i>{getText('SelectSeat')}</i>
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
                    <i>{getText('SelectBaggage')}</i>
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
                    <i>{getText('SelectMeal')}</i>
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
                            <Select
                                showSearch
                                style={{ width: '30%' }}
                                onChange={onChangePassengers}
                                defaultValue={defaultValue}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >

                                {dataPassengers.map((item) => (
                                    <Option key={item.id} value={item.id} label={`${item.firstName} ${item.lastName}`} >
                                        <Row >
                                            {item.fristName}   {item.lastName}
                                        </Row>
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
                            <SeatSelector
                                seatOptions={seatOptions}
                                setSelectedSeat={setSelectedSeat}
                                selectedSeat={selectedSeat}
                                disabledSeats={disabledSeats}
                                setPriceSeat={setPriceSeat}
                            />
                        </div>
                    </div>
                    <div className="footer-divider">
                        <Row >
                            <Col span={3} className='display-img' >
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgFavorite} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={7} className='display-img'>
                                <Row>
                                    <i className='seat-price'> Ghế: {selectedSeat}</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>{priceSeatFomat}</i>
                                </Row>
                            </Col>
                            <Col xl={14} >
                                <Row>
                                    <Button className='footer-continue-service' onClick={() => hanldeCancel()}  >Không, Cảm ơn</Button>
                                    <Button className='footer-continue-service' onClick={() => hanldeConfirm()} >Xác nhận</Button>
                                </Row>
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