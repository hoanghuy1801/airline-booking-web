import { Row, Col, Typography } from 'antd';
import './CheckInfoFly.css'
import { useSelector } from 'react-redux';
import { useLanguage } from '../../../LanguageProvider/LanguageProvider';

const { Title, Text } = Typography;
const CheckInfoFly = (props) => {
    const { getText } = useLanguage();
    const data_homepage = useSelector((state) => state.homePage.homePageInfor);
    const dataSelect = useSelector((state) => state.flightSelect.flightSelect);
    const dataSelectReturn = useSelector((state) => state.flightSelect.flightSelectReturn);
    const dateObjectdepartureTime = new Date(dataSelect.departureTime);
    const hourdepartureTime = dateObjectdepartureTime.getHours();
    const minutedepartureTime = dateObjectdepartureTime.getMinutes();
    const dateObjectarrivalTime = new Date(dataSelect.arrivalTime);
    const hourarrivalTime = dateObjectarrivalTime.getHours();
    const minutearrivalTime = dateObjectarrivalTime.getMinutes();
    const hourflight = hourarrivalTime - hourdepartureTime;
    const minuteflight = minutearrivalTime - minutedepartureTime;

    const daydepartureTime = dateObjectdepartureTime.getDate();
    const monthdepartureTime = dateObjectdepartureTime.getMonth() + 1;
    const yeardepartureTime = dateObjectdepartureTime.getFullYear();

    //return
    const dateObjectdepartureTimeReturn = new Date(dataSelectReturn.departureTime);
    const hourdepartureTimeReturn = dateObjectdepartureTimeReturn.getHours();
    const minutedepartureTimeReturn = dateObjectdepartureTimeReturn.getMinutes();
    const dateObjectarrivalTimeReturn = new Date(dataSelectReturn.arrivalTime);
    const hourarrivalTimeReturn = dateObjectarrivalTimeReturn.getHours();
    const minutearrivalTimeReturn = dateObjectarrivalTimeReturn.getMinutes();
    const hourflightReturn = hourdepartureTimeReturn - hourarrivalTimeReturn;
    const minuteflightReturn = minutedepartureTimeReturn - minutearrivalTimeReturn;

    const daydepartureTimeReturn = dateObjectdepartureTimeReturn.getDate();
    const monthdepartureTimeReturn = dateObjectdepartureTimeReturn.getMonth() + 1;
    const yeardepartureTimeReturn = dateObjectdepartureTimeReturn.getFullYear();
    return (
        <>
            <Text className='title'>{getText('Flight-Information')}</Text>
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
                padding: 10
            }}>
                <Col span={6}>
                    <Text className='text-title-fight-info'> {getText('Trip')}</Text>
                </Col>
                <Col span={18}>
                    <Text className='text-title-fight-info' style={{ paddingLeft: '27%' }}>{getText('Local-time-at-airport')}</Text>
                </Col>
            </Row>
            <div className='select-fight-infor'>
                <Row>
                    <Col span={24}>
                        <Text className='date-fight'>{getText('Date')} {daydepartureTime}/{monthdepartureTime}/{yeardepartureTime}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Text className='location-start'>{dataSelect.sourceAirport.airportCode}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className='time-start'>{hourdepartureTime}:{minutedepartureTime}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row>
                            <Col span={24}>
                                <Text className='flight-time'>{hourflight}  {getText('Hour')} {minuteflight}  {getText('Minute')}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className='code-flight'>{dataSelect.flightName}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Text className='location-start'>{dataSelect.destinationAirport.airportCode}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className='time-start'>{hourarrivalTime}:{minutearrivalTime}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={24}>
                                <Text className='flight-time'>{dataSelect.aircraftName}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className='code-flight'>{getText('Flight-Operating-Company')}:</Text>
                                <Text className='code-flight'>{dataSelect.airline.airlineName} </Text>
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
                        paddingTop: 10
                    }}>
                        <Col span={6}>
                            <Text className='text-title-fight-info'>{getText('TripReturn')}</Text>
                        </Col>
                        <Col span={18}>
                            <Text className='text-title-fight-info' style={{ paddingLeft: '27%' }}>{getText('Local-time-at-airport')}</Text>
                        </Col>
                    </Row>
                    <div className='select-fight-infor'>
                        <Row>
                            <Col span={24}>
                                <Text className='date-fight'>{getText('Date')} {daydepartureTimeReturn}/{monthdepartureTimeReturn}/{yeardepartureTimeReturn}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Row>
                                    <Col span={24}>
                                        <Text className='location-start'>{dataSelectReturn.sourceAirport.airportCode}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='time-start'>{hourdepartureTimeReturn}:{minutedepartureTimeReturn}</Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row>
                                    <Col span={24}>
                                        <Text className='flight-time'>{hourflightReturn} {getText('Hour')} {minuteflightReturn} {getText('Minute')}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='code-flight'>{dataSelectReturn.flightName}</Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row>
                                    <Col span={24}>
                                        <Text className='location-start'>{dataSelectReturn.destinationAirport.airportCode}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='time-start'>{hourarrivalTimeReturn}:{minutearrivalTimeReturn}</Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={24}>
                                        <Text className='flight-time'>{dataSelectReturn.aircraftName}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='code-flight'>{getText('Flight-Operating-Company')}:</Text>
                                        <Text className='code-flight'>{dataSelect.airline.airlineName} </Text>
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