import { Row, Col, Form, Typography } from 'antd';
import './SelectInfoFly.css'
import { IconPlane } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';
const { Title, Text } = Typography;


const SelectInfoFly = (props) => {
    const { adultsPriceFomat, childrenPriceFomat, infantPriceFomat,
        taxesfightFomat, totalFightFomat, adultsPriceFomatReturn, childrenPriceFomatReturn, infantPriceFomatReturn,
        taxesfightFomatReturn, totalFightFomatReturn } = props;
    const data = useSelector(state => state.formsearch.data_booking);

    const totalPeople = data.children + data.adult;
    return (
        <>
            <Form className='infor-user-select'>
                <div className='title-select'>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 600, paddingRight: 10 }}>THÔNG TIN ĐẶT CHỖ </Text>
                </div>
                <Form.Item>
                    <div className='title-infor'>
                        <Text style={{
                            color: 'black', fontSize: 20, fontWeight: 600,
                            paddingLeft: 20,

                        }}>Thông tin hành khách </Text>
                    </div>
                    <div style={{ backgroundColor: 'rgb(201, 239, 255)' }}>
                        <Text style={{
                            color: 'black', fontSize: 18, fontWeight: 400,
                            paddingLeft: 20,

                        }}>Chuyến đi</Text>
                    </div>
                    <Row style={{ paddingTop: 10 }}>
                        <Col span={10}>
                            <Text className='sourceAirportCity'
                                style={{
                                    color: 'black', fontSize: 18, fontWeight: 500,
                                    paddingLeft: 40,

                                }}> {data.sourceAirportCity}</Text>
                        </Col>
                        <Col span={4}>
                            <Text
                                style={{
                                    color: 'black', fontSize: 18, fontWeight: 500
                                }}>  <IconPlane style={{ width: 25, height: 25, paddingTop: 6 }} /> </Text>
                        </Col>
                        <Col span={10}>
                            <Text className='destinationAirportCity'
                                style={{
                                    color: 'black', fontSize: 18, fontWeight: 500,
                                }}>{data.destinationAirportCity}</Text>

                        </Col>
                    </Row>
                    <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600,
                                        paddingLeft: 10,
                                    }}>Giá vé </Text>
                            </Col>
                            <Col span={2}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}>x{data.adult} </Text>
                            </Col>
                            <Col span={13}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20,
                                    }}> {adultsPriceFomat}</Text></Col>
                        </Row>
                    </div>
                    {!data.children == 0 ? <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600,
                                        paddingLeft: 10,
                                    }}>Giá vé trẻ em </Text>
                            </Col>
                            <Col span={2}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}>x{data.children} </Text>
                            </Col>
                            <Col span={13}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20,
                                    }}> {childrenPriceFomat}</Text></Col>
                        </Row>
                    </div>
                        : ''}
                    {!data.baby == 0 ? <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600,
                                        paddingLeft: 10,
                                    }}>Giá vé em bé </Text>
                            </Col>
                            <Col span={2}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}>x{data.baby} </Text></Col>
                            <Col span={13}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20,
                                    }}>{infantPriceFomat} </Text></Col>
                        </Row>
                    </div>
                        : ''}
                    <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600,
                                        paddingLeft: 10,
                                    }}>Thuế, phí </Text>
                            </Col>
                            <Col span={2}>
                                <Text style={{
                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                }}>x{totalPeople} </Text></Col>
                            <Col span={13}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20,
                                    }}> {taxesfightFomat}</Text></Col>
                        </Row>
                    </div>
                    <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text className='text-select-info'
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 600,
                                        paddingLeft: 20,
                                    }}>Dịch vụ </Text>
                            </Col>
                            <Col span={15}>
                                <Text style={{
                                    color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingRight: 20,
                                }}>0 VND </Text></Col>
                        </Row>
                    </div>

                    {!data.roundTrip ?
                        <div></div>
                        :
                        <div>
                            <div style={{ backgroundColor: 'rgb(201, 239, 255)' }}>
                                <Text
                                    style={{
                                        color: 'black', fontSize: 18, fontWeight: 400,
                                        paddingLeft: 20,

                                    }}>Chuyến về</Text>
                            </div>
                            <Row style={{ paddingTop: 10 }}>
                                <Col span={10}>
                                    <Text className='sourceAirportCity'
                                        style={{
                                            color: 'black', fontSize: 18, fontWeight: 500,
                                            paddingLeft: 40,

                                        }}> {data.destinationAirportCity}</Text>
                                </Col>
                                <Col span={4}>
                                    <Text
                                        style={{
                                            color: 'black', fontSize: 18, fontWeight: 500
                                        }}>  <IconPlane style={{ width: 25, height: 25, paddingTop: 6 }} /> </Text>
                                </Col>
                                <Col span={10}>
                                    <Text className='destinationAirportCity'
                                        style={{
                                            color: 'black', fontSize: 18, fontWeight: 500,
                                        }}>{data.sourceAirportCity}</Text>

                                </Col>
                            </Row>
                            <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 10,
                                            }}>Giá vé </Text>
                                    </Col>
                                    <Col span={2}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                            }}>x{data.adult} </Text>
                                    </Col>
                                    <Col span={13}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20,
                                            }}> {adultsPriceFomatReturn}</Text></Col>
                                </Row>
                            </div>
                            {!data.children == 0 ? <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 10,
                                            }}>Giá vé trẻ em </Text>
                                    </Col>
                                    <Col span={2}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                            }}>x{data.children} </Text>
                                    </Col>
                                    <Col span={13}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20,
                                            }}> {childrenPriceFomatReturn}</Text></Col>
                                </Row>
                            </div>
                                : ''}
                            {!data.baby == 0 ? <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 10,
                                            }}>Giá vé em bé </Text>
                                    </Col>
                                    <Col span={2}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                            }}>x{data.baby} </Text></Col>
                                    <Col span={13}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20,
                                            }}>{infantPriceFomatReturn} </Text></Col>
                                </Row>
                            </div>
                                : ''}
                            <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 10,
                                            }}>Thuế, phí </Text>
                                    </Col>
                                    <Col span={2}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                            }}>x{totalPeople} </Text></Col>
                                    <Col span={13}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20,
                                            }}> {taxesfightFomatReturn}</Text></Col>
                                </Row>
                            </div>
                            <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600,
                                                paddingLeft: 10,
                                            }}>Dịch vụ </Text>
                                    </Col>
                                    <Col span={15}>
                                        <Text className='text-select-info'
                                            style={{
                                                color: 'black', fontSize: 18, fontWeight: 600, justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20,
                                            }}>0 VND </Text></Col>
                                </Row>
                            </div>
                        </div>
                    }
                </Form.Item>
                <div className='title-select-end'>
                    <Row>
                        <Col span={8}>
                            <Text className='text-select-info'
                                style={{
                                    color: 'white', fontSize: 20, fontWeight: 600,
                                    paddingLeft: 20,
                                }}>Tổng tiền</Text>
                        </Col>
                        <Col span={16}>
                            <Text className='text-select-info'
                                style={{
                                    color: 'white', fontSize: 20, fontWeight: 600, justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingRight: 20,
                                }}>{totalFightFomat}</Text></Col>
                    </Row>
                </div>
            </Form >
        </>
    )
}
export default SelectInfoFly;