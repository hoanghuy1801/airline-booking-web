import { Row, Col } from 'antd';
import './CheckInfoFly.css'
import { useSelector } from 'react-redux';
const CheckInfoFly = (props) => {
    const data_homepage = useSelector(state => state.formsearch.data_booking);
    const { dataSelect, dataSelectReturn } = props;
    const dateObjectdepartureTime = new Date(dataSelect.conditionSelect.departureTime);
    const hourdepartureTime = dateObjectdepartureTime.getHours();
    const minutedepartureTime = dateObjectdepartureTime.getMinutes();
    const dateObjectarrivalTime = new Date(dataSelect.conditionSelect.arrivalTime);
    const hourarrivalTime = dateObjectarrivalTime.getHours();
    const minutearrivalTime = dateObjectarrivalTime.getMinutes();
    const hourflight = hourarrivalTime - hourdepartureTime;
    const minuteflight = minutearrivalTime - minutedepartureTime;

    const daydepartureTime = dateObjectdepartureTime.getDate();
    const monthdepartureTime = dateObjectdepartureTime.getMonth() + 1;
    const yeardepartureTime = dateObjectdepartureTime.getFullYear();

    //return
    const dateObjectdepartureTimeReturn = new Date(dataSelectReturn.conditionSelectReturn.departureTime);
    const hourdepartureTimeReturn = dateObjectdepartureTimeReturn.getHours();
    const minutedepartureTimeReturn = dateObjectdepartureTimeReturn.getMinutes();
    const dateObjectarrivalTimeReturn = new Date(dataSelectReturn.conditionSelectReturn.arrivalTime);
    const hourarrivalTimeReturn = dateObjectarrivalTimeReturn.getHours();
    const minutearrivalTimeReturn = dateObjectarrivalTimeReturn.getMinutes();
    const hourflightReturn = hourdepartureTimeReturn - hourarrivalTimeReturn;
    const minuteflightReturn = minutedepartureTimeReturn - minutearrivalTimeReturn;

    const daydepartureTimeReturn = dateObjectdepartureTimeReturn.getDate();
    const monthdepartureTimeReturn = dateObjectdepartureTimeReturn.getMonth() + 1;
    const yeardepartureTimeReturn = dateObjectdepartureTimeReturn.getFullYear();
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
                        <span className='date-fight'>Ngày {daydepartureTime}/{monthdepartureTime}/{yeardepartureTime}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <span className='location-start'>{dataSelect.conditionSelect.sourceAirportCode}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <span className='time-start'>{hourdepartureTime}:{minutedepartureTime}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row>
                            <Col span={24}>
                                <span className='flight-time'>{hourflight} giờ {minuteflight} phút</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <span className='code-flight'>{dataSelect.conditionSelect.flightName}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <span className='location-start'>{dataSelect.conditionSelect.destinationAirportCode}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <span className='time-start'>{hourarrivalTime}:{minutearrivalTime}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={24}>
                                <span className='flight-time'>{dataSelect.conditionSelect.aircraftName}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <span className='code-flight'>Hãng khai thác:</span>
                                <span className='code-flight'>{dataSelect.conditionSelect.airlineName} </span>
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
                                <span className='date-fight'>Ngày {daydepartureTimeReturn}/{monthdepartureTimeReturn}/{yeardepartureTimeReturn}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Row>
                                    <Col span={24}>
                                        <span className='location-start'>{dataSelectReturn.conditionSelectReturn.sourceAirportCode}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <span className='time-start'>{hourdepartureTimeReturn}:{minutedepartureTimeReturn}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row>
                                    <Col span={24}>
                                        <span className='flight-time'>{hourflightReturn} giờ {minuteflightReturn} phút</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <span className='code-flight'>{dataSelectReturn.conditionSelectReturn.flightName}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row>
                                    <Col span={24}>
                                        <span className='location-start'>{dataSelectReturn.conditionSelectReturn.destinationAirportCode}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <span className='time-start'>{hourarrivalTimeReturn}:{minutearrivalTimeReturn}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={24}>
                                        <span className='flight-time'>{dataSelectReturn.conditionSelectReturn.aircraftName}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <span className='code-flight'>Hãng khai thác:</span>
                                        <span className='code-flight'>{dataSelectReturn.conditionSelectReturn.airlineName} </span>
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