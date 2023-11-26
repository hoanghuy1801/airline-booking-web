import { Row, Col, Typography } from 'antd'
import './CheckInfoFly.css'
import { useSelector } from 'react-redux'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { calculateTimeDifference, formatTime } from '../../../utils/format'

const { Text } = Typography
const CheckInfoFly = () => {
    const language = useSelector((state) => state.language.language)
    const { getText } = useLanguage()
    const data_homepage = useSelector((state) => state.homePage.homePageInfor)
    const dataSelect = useSelector((state) => state.flightSelect.flightSelect)
    const dataSelectReturn = useSelector((state) => state.flightSelect.flightSelectReturn)
    const dateObjectdepartureTime = new Date(dataSelect.departureTime)

    const daydepartureTime = dateObjectdepartureTime.getDate()
    const monthdepartureTime = dateObjectdepartureTime.getMonth() + 1
    const yeardepartureTime = dateObjectdepartureTime.getFullYear()

    //return
    const dateObjectdepartureTimeReturn = new Date(dataSelectReturn.departureTime)

    const daydepartureTimeReturn = dateObjectdepartureTimeReturn.getDate()
    const monthdepartureTimeReturn = dateObjectdepartureTimeReturn.getMonth() + 1
    const yeardepartureTimeReturn = dateObjectdepartureTimeReturn.getFullYear()
    return (
        <>
            <Text className='title'>{getText('Flight-Information')}</Text>
            <Row
                style={{
                    height: 8,
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    backgroundColor: '#006885'
                }}
            ></Row>
            <Row
                style={{
                    backgroundColor: 'white',
                    height: '40px',
                    padding: 10
                }}
            >
                <Col span={6}>
                    <Text className='text-title-fight-info'> {getText('Trip')}</Text>
                </Col>
                <Col span={18}>
                    <Text className='text-title-fight-info' style={{ paddingLeft: '27%' }}>
                        {getText('Local-time-at-airport')}
                    </Text>
                </Col>
            </Row>
            <div className='select-fight-infor'>
                <Row>
                    <Col span={24}>
                        <Text className='date-fight'>
                            {getText('Date')} {daydepartureTime}/{monthdepartureTime}/{yeardepartureTime}
                        </Text>
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
                                <Text className='time-start'>{formatTime(dataSelect?.departureTime)}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row>
                            <Col span={24}>
                                <Text className='flight-time'>
                                    {calculateTimeDifference(
                                        dataSelect?.departureTime,
                                        dataSelect?.arrivalTime,
                                        language
                                    )}
                                </Text>
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
                                <Text className='time-start'>{formatTime(dataSelect?.arrivalTime)}</Text>
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
            {!data_homepage.roundTrip ? (
                ''
            ) : (
                <div>
                    <Row
                        style={{
                            height: 8,
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                            backgroundColor: '#006885',
                            marginTop: 10
                        }}
                    ></Row>
                    <Row
                        style={{
                            backgroundColor: 'white',
                            height: '40px',
                            padding: 10,
                            paddingTop: 10
                        }}
                    >
                        <Col span={6}>
                            <Text className='text-title-fight-info'>{getText('TripReturn')}</Text>
                        </Col>
                        <Col span={18}>
                            <Text className='text-title-fight-info' style={{ paddingLeft: '27%' }}>
                                {getText('Local-time-at-airport')}
                            </Text>
                        </Col>
                    </Row>
                    <div className='select-fight-infor'>
                        <Row>
                            <Col span={24}>
                                <Text className='date-fight'>
                                    {getText('Date')} {daydepartureTimeReturn}/{monthdepartureTimeReturn}/
                                    {yeardepartureTimeReturn}
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Row>
                                    <Col span={24}>
                                        <Text className='location-start'>
                                            {dataSelectReturn.sourceAirport.airportCode}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='time-start'>
                                            {formatTime(dataSelectReturn?.departureTime)}
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Row>
                                    <Col span={24}>
                                        <Text className='flight-time'>
                                            {calculateTimeDifference(
                                                dataSelectReturn?.departureTime,
                                                dataSelectReturn?.arrivalTime,
                                                language
                                            )}
                                        </Text>
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
                                        <Text className='location-start'>
                                            {dataSelectReturn.destinationAirport.airportCode}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='time-start'>{formatTime(dataSelectReturn?.arrivalTime)}</Text>
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
            )}
        </>
    )
}
export default CheckInfoFly
