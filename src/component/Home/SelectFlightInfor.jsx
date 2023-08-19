import { Row, Col, Form, Button } from 'antd';
import '../Home/SelectFlightInfor.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import imgVeluxe from '../../assets/wdelux.svg'
import imgEco from '../../assets/weco.svg'
import imgskyboss from '../../assets/wskyboss.svg'
import imgBusinesswhite from '../../assets/businesswhite.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SelectFlightInfor = () => {
    const navigate = useNavigate();
    const data_homepage = useSelector(state => state.homepage.data_booking);

    const numberBooking = data_homepage.adult + data_homepage.children;

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
                            <IconUserCircle style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconShoppingCart style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>

                    </Col>
                </Row>

            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <Row style={{
                            height: 8,
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                            backgroundColor: '#006885'
                        }}>
                        </Row>
                        <Row style={{
                            backgroundColor: 'white',
                            height: '40px',
                            padding: 10,
                            borderBottomLeftRadius: '5px',
                            borderBottomRightRadius: '5px'
                        }}>
                            <Col span={12}>
                                <span style={{ color: '#006885', fontSize: 18, fontWeight: 500, padding: 10 }}>Chuyến đi</span>
                            </Col>
                            <Col span={12}>
                                <span style={{ color: '#006885', fontSize: 18, fontWeight: 500, padding: 10 }}>Tính theo giờ địa phương tại sân bay</span>
                            </Col>
                        </Row>
                        <div className='select-fight-infor'>
                            <Row>
                                <Col span={24}>
                                    <span className='date-fight'>Ngày 08/09/2023</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Row>
                                        <Col span={24}>
                                            <span className='location-start'>SGN</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <span className='time-start'>07:55</span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4}>
                                    <Row>
                                        <Col span={24}>
                                            <span className='flight-time'>2 giờ 10 phút</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <span className='code-flight'>VJ124</span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={6}>
                                    <Row>
                                        <Col span={24}>
                                            <span className='location-start'>HAN</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <span className='time-start'>10:05</span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={24}>
                                            <span className='flight-time'>Airbus A321</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <span className='code-flight'>Hãng khai thác: Vietjet</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        {!data_homepage.roundTrip ?
                            ''
                            :
                            <div>
                                <Row style={{
                                    height: 8,
                                    borderTopLeftRadius: '5px',
                                    borderTopRightRadius: '5px',
                                    backgroundColor: '#006885',
                                    marginTop: 10
                                }}>
                                </Row>
                                <Row style={{
                                    backgroundColor: 'white',
                                    height: '40px',
                                    padding: 10,
                                    borderBottomLeftRadius: '5px',
                                    borderBottomRightRadius: '5px',
                                    paddingTop: 10
                                }}>
                                    <Col span={12}>
                                        <span style={{ color: '#006885', fontSize: 18, fontWeight: 500, padding: 10 }}>Chuyến về</span>
                                    </Col>
                                    <Col span={12}>
                                        <span style={{ color: '#006885', fontSize: 18, fontWeight: 500, padding: 10 }}>Tính theo giờ địa phương tại sân bay</span>
                                    </Col>
                                </Row>
                                <div className='select-fight-infor'>
                                    <Row>
                                        <Col span={24}>
                                            <span className='date-fight'>Ngày 08/09/2023</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='location-start'>SGN</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='time-start'>07:55</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={4}>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='flight-time'>2 giờ 10 phút</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='code-flight'>VJ124</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={6}>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='location-start'>HAN</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='time-start'>10:05</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='flight-time'>Airbus A321</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <span className='code-flight'>Hãng khai thác: Vietjet</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
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
                            onClick={() => { navigate('/select-fight') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={16} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={8} className='footer-price'><i>1,000,000 </i><span> VND</span>    </Col>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue'
                            onClick={() => { navigate('/passengers') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>


        </div >
    )
}
export default SelectFlightInfor;