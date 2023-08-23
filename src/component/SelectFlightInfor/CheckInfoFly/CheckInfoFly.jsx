import { Row, Col } from 'antd';
import './CheckInfoFly.css'
import { useSelector } from 'react-redux';
const CheckInfoFly = () => {
    const data_homepage = useSelector(state => state.formsearch.data_booking);
    return (
        <>
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
        </>
    )
}
export default CheckInfoFly;