import { Row, Col, Form } from 'antd';
import './SelectInfoFly.css'
import { IconPlane } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';


const SelectInfoFly = (props) => {
    const { adultsPrice, childrenPrice, infantPrice, adultsPriceFomat, childrenPriceFomat, infantPriceFomat, taxesfightFomat,
        totalFightFomat, listByCondition } = props;
    const data = useSelector(state => state.formsearch.data_booking);

    const totalPeople = data.children + data.adult;
    return (
        <>
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
                        paddingLeft: 40,

                    }}> {data.sourceAirportCity}</span>
                    <span style={{
                        color: 'black', fontSize: 18, fontWeight: 500,
                        paddingLeft: 40,
                    }}>  <IconPlane style={{ width: 25, height: 25, marginRight: 15, paddingTop: 6 }} /> </span>
                    <span style={{
                        color: 'black', fontSize: 18, fontWeight: 500,
                        paddingLeft: 40,

                    }}>{data.destinationAirportCity}</span>
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
                                }}>x{data.adult} </span>
                            </Col>
                            <Col span={10}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}> {adultsPriceFomat}</span></Col>
                        </Row>
                    </div>
                    {!data.children == 0 ? <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600,
                                    paddingLeft: 20,
                                }}>Giá vé trẻ em </span>
                            </Col>
                            <Col span={6}>
                                <span style={{
                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingRight: 20,
                                }}>x{data.children} </span>
                            </Col>
                            <Col span={10}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}> {childrenPriceFomat}</span></Col>
                        </Row>
                    </div>
                        : ''}
                    {!data.baby == 0 ? <div className='title-infor'>
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
                            }}>x{data.baby} </span></Col>
                            <Col span={10}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}>{infantPriceFomat} </span></Col>
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
                            <Col span={6}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}>x{totalPeople} </span></Col>
                            <Col span={10}><span style={{
                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingRight: 20,
                            }}> {taxesfightFomat}</span></Col>
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

                    {!data.roundTrip ?
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

                            {!data.baby == 0 ? <div className='title-infor'>
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
                                    }}>{totalfight} </span></Col>
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
                        }}>{totalFightFomat}</span></Col>
                    </Row>
                </div>

            </Form>
        </>
    )
}
export default SelectInfoFly;