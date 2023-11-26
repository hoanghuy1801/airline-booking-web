import { Row, Col, Collapse, Typography } from 'antd'
import vietjet from '../../../assets/vietjet.svg'
import { CaretRightOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { calculateTimeDifference, formatDateString, formatTime } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Text } = Typography
const CollapseDetail = () => {
    const { getText } = useLanguage()
    const flightAwayDetail = useSelector((state) => state.myFlight.bookingDetails?.flightAwayDetail)
    const flightReturnDetail = useSelector((state) => state.myFlight.bookingDetails?.flightReturnDetail)
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    const language = useSelector((state) => state.language.language)
    const passengerAwaysDetail = useSelector(
        (state) => state.myFlight.bookingDetails?.flightAwayDetail?.passengerAwaysDetail
    )
    let aduls = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'ADULT')
    let childs = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'CHILD')
    let infants = passengerAwaysDetail.filter((passengerAwaysDetail) => passengerAwaysDetail.passengerType === 'INFANT')
    console.log('flightAwayDetail', flightAwayDetail?.arrivalTime)
    return (
        <>
            <Collapse
                size='large'
                items={[
                    {
                        showArrow: false,
                        key: 'index',
                        label: (
                            <div>
                                <Text className='roundTrip-booking'>{getText('Trip')}</Text>
                                <br />
                                <Text className='date-fly'>
                                    {getText('Date')}: {formatDateString(flightAwayDetail?.departureTime)}
                                </Text>

                                <Row>
                                    <Col span={5} className='info-fly'>
                                        <Text className='location'>{flightAwayDetail?.sourceAirport?.airportCode}</Text>
                                    </Col>
                                    <Col span={7} className='info-fly'>
                                        <Text className='time-fly'>
                                            {calculateTimeDifference(
                                                flightAwayDetail?.departureTime,
                                                flightAwayDetail?.arrivalTime,
                                                language
                                            )}
                                        </Text>
                                    </Col>
                                    <Col span={5} className='info-fly'>
                                        <Text className='location'>
                                            {' '}
                                            {flightAwayDetail?.destinationAirport?.airportCode}
                                        </Text>
                                    </Col>
                                    <Col span={7} className='info-fly'>
                                        <Text className='number-fly'>
                                            {' '}
                                            {aduls.length} {getText('Adults')},{childs.length} {getText('Children')},{' '}
                                            {infants.length} {getText('Baby')}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={5} className='info-fly'>
                                        <Text className='time'>{formatTime(flightAwayDetail?.departureTime)}</Text>
                                    </Col>
                                    <Col span={7} className='info-fly'>
                                        <Text className='time-fly'>{getText('Direct-Flight')}</Text>
                                    </Col>
                                    <Col span={5} className='info-fly'>
                                        <Text className='time'>{formatTime(flightAwayDetail?.arrivalTime)}</Text>
                                    </Col>
                                </Row>
                            </div>
                        ),
                        children: (
                            <div>
                                <Row style={{ paddingTop: '20px' }}>
                                    <Text className='code-fly'>
                                        <img src={vietjet} /> {getText('Flight_Number')}: {flightAwayDetail?.flightCode}
                                    </Text>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Row>
                                            <Text className='from'>{getText('From')}: </Text>
                                            <Text className='time-flys'>
                                                {''}
                                                {formatTime(flightAwayDetail?.departureTime)},{' '}
                                                {formatDateString(flightAwayDetail?.departureTime)} (
                                                {getText('Local-time-at-airport')})
                                            </Text>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='time-flys' style={{ paddingBottom: '20px' }}>
                                            {flightAwayDetail?.sourceAirport?.airportName}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Row>
                                            <Text className='to'>{getText('To')}:</Text>
                                            <Text className='time-flys'>
                                                {' '}
                                                {formatTime(flightAwayDetail?.arrivalTime)},{' '}
                                                {formatDateString(flightAwayDetail?.arrivalTime)} (
                                                {getText('Local-time-at-airport')})
                                            </Text>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='time-flys'>
                                            {flightAwayDetail?.destinationAirport?.airportName}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className='time-flys' style={{ paddingTop: '20px' }}>
                                            {getText('Time')}:{' '}
                                            <span style={{ color: 'red' }}>
                                                {' '}
                                                {calculateTimeDifference(
                                                    flightAwayDetail?.departureTime,
                                                    flightAwayDetail?.arrivalTime,
                                                    language
                                                )}{' '}
                                            </span>
                                            Airbus: <span style={{ color: 'red' }}> </span>
                                            {getText('Flight-Operating-Company')}:{' '}
                                            <span style={{ color: 'red' }}> </span>
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                ]}
                expandIconPosition='end'
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    backgroundColor: '#F1F1F1',
                    marginTop: '10px'
                }}
            />
            {bookingDetails?.journeyType === 'RETURN' ? (
                <div>
                    <Collapse
                        size='large'
                        items={[
                            {
                                showArrow: false,
                                key: 'index',
                                label: (
                                    <div>
                                        <Text className='roundTrip-booking'>{getText('TripReturn')}</Text>
                                        <br />
                                        <Text className='date-fly'>
                                            {getText('Date')}: {formatDateString(flightReturnDetail?.arrivalTime)}
                                        </Text>

                                        <Row>
                                            <Col span={5} className='info-fly'>
                                                <Text className='location'>
                                                    {flightReturnDetail?.sourceAirport?.airportCode}
                                                </Text>
                                            </Col>
                                            <Col span={7} className='info-fly'>
                                                <Text className='time-fly'>
                                                    {calculateTimeDifference(
                                                        flightReturnDetail?.departureTime,
                                                        flightReturnDetail?.arrivalTime,
                                                        language
                                                    )}
                                                </Text>
                                            </Col>
                                            <Col span={5} className='info-fly'>
                                                <Text className='location'>
                                                    {' '}
                                                    {flightReturnDetail?.destinationAirport?.airportCode}
                                                </Text>
                                            </Col>
                                            <Col span={7} className='info-fly'>
                                                <Text className='number-fly'>
                                                    {' '}
                                                    {aduls.length} {getText('Adults')},{childs.length}{' '}
                                                    {getText('Children')}, {infants.length} {getText('Baby')}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={5} className='info-fly'>
                                                <Text className='time'>
                                                    {formatTime(flightReturnDetail?.departureTime)}
                                                </Text>
                                            </Col>
                                            <Col span={7} className='info-fly'>
                                                <Text className='time-fly'>{getText('Direct-Flight')}</Text>
                                            </Col>
                                            <Col span={5} className='info-fly'>
                                                <Text className='time'>
                                                    {formatTime(flightReturnDetail?.arrivalTime)}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </div>
                                ),
                                children: (
                                    <div>
                                        <Row style={{ paddingTop: '20px' }}>
                                            <Text className='code-fly'>
                                                <img src={vietjet} /> {getText('Flight_Number')}:{' '}
                                                {flightReturnDetail?.flightCode}
                                            </Text>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Row>
                                                    <Text className='from'>{getText('From')}: </Text>
                                                    <Text className='time-flys'>
                                                        {''}
                                                        {formatTime(flightReturnDetail?.departureTime)},{' '}
                                                        {formatDateString(flightReturnDetail?.departureTime)} (
                                                        {getText('Local-time-at-airport')})
                                                    </Text>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Text className='time-flys' style={{ paddingBottom: '20px' }}>
                                                    {flightReturnDetail?.sourceAirport?.airportName}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Row>
                                                    <Text className='to'>{getText('To')}:</Text>
                                                    <Text className='time-flys'>
                                                        {' '}
                                                        {formatTime(flightReturnDetail?.arrivalTime)},{' '}
                                                        {formatDateString(flightReturnDetail?.arrivalTime)} (
                                                        {getText('Local-time-at-airport')})
                                                    </Text>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Text className='time-flys'>
                                                    {flightReturnDetail?.destinationAirport?.airportName}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Text className='time-flys' style={{ paddingTop: '20px' }}>
                                                    {getText('Time')}:{' '}
                                                    <span style={{ color: 'red' }}>
                                                        {' '}
                                                        {calculateTimeDifference(
                                                            flightReturnDetail?.departureTime,
                                                            flightReturnDetail?.arrivalTime,
                                                            language
                                                        )}{' '}
                                                    </span>
                                                    Airbus: <span style={{ color: 'red' }}> </span>
                                                    {getText('Flight-Operating-Company')}:{' '}
                                                    <span style={{ color: 'red' }}> </span>
                                                </Text>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                        ]}
                        expandIconPosition='end'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            backgroundColor: '#F1F1F1',
                            marginTop: '10px'
                        }}
                    />
                </div>
            ) : (
                ''
            )}
        </>
    )
}
export default CollapseDetail
