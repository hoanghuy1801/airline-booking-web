import PropTypes from 'prop-types'
import { Row, Col, Typography, Button, Image } from 'antd'
import { IconBrandCitymapper } from '@tabler/icons-react'
import { useState } from 'react'
import './InfoFly.css'
import { calculateTimeDifference, formatCurrency, formatTime } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
import { useSelector } from 'react-redux'
const { Title, Text } = Typography

const InfoFly = (props) => {
    const { listFlight, setFlightSelect } = props
    const { getText } = useLanguage()
    const language = useSelector((state) => state.language.language)
    const [selectedButtonId, setSelectedButtonId] = useState(null)
    const isButtonDisabled = (id) => {
        return id === selectedButtonId
    }

    const handleSelect = (id) => {
        const selectedItem = listFlight.find((item) => item.id === id)
        setFlightSelect(selectedItem)
        setSelectedButtonId(id)
    }
    return (
        <>
            <Text className='title'>{getText('Trip')}</Text>
            {listFlight.map((item) => {
                return (
                    <div key={item.id}>
                        <div className='fly-color'></div>
                        <div className='select-flight-info'>
                            <Row>
                                <Col span={6}>
                                    <Row>
                                        <Title level={4} className='name-airline'>
                                            {item.airline.airlineName}
                                        </Title>
                                    </Row>
                                    <Row>
                                        <Image preview={false} src={item.airline.avatarUrl} className='img-airline' />
                                    </Row>
                                    <Row>
                                        <Text className='name-aircraft-fly'>{item.aircraft.aircraftCode}</Text>
                                    </Row>
                                </Col>
                                <Col span={11}>
                                    <Row>
                                        <Col span={8}>
                                            <Row>
                                                <Text className='time-start-fly'>
                                                    {formatTime(item?.departureTime)}
                                                </Text>
                                            </Row>
                                            <Row>
                                                <Text className='code-start-fly'>{item.sourceAirport.airportCode}</Text>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                <Text className='flightName'></Text>
                                            </Row>
                                            <Row>
                                                <Text className='fly-ladder'>{getText('Direct-Flight')}</Text>
                                            </Row>
                                            <Row>
                                                <IconBrandCitymapper className='icon-fly' />
                                            </Row>
                                            <Row>
                                                <Text className='time-to-fly'>
                                                    {calculateTimeDifference(
                                                        item?.departureTime,
                                                        item?.arrivalTime,
                                                        language
                                                    )}
                                                </Text>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                <Text className='time-start-fly'>{formatTime(item?.arrivalTime)}</Text>
                                            </Row>
                                            <Row>
                                                <Text className='code-start-fly'>
                                                    {item.destinationAirport.airportCode}
                                                </Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={7}>
                                    <Row>
                                        <Text className='price-fly text-ellipsis'>
                                            {formatCurrency(item.flightSeatPrice.adultPrice)}/{getText('Guest')}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Button
                                            className='btn-select'
                                            onClick={() => handleSelect(item.id)}
                                            disabled={isButtonDisabled(item.id)}
                                        >
                                            {getText('Selected')}
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

InfoFly.propTypes = {
    listFlight: PropTypes.array.isRequired,
    setFlightSelect: PropTypes.func.isRequired
}

export default InfoFly
