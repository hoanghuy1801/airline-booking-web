import PropTypes from 'prop-types'
import { Row, Col, Typography, Button, Image } from 'antd'
import { IconBrandCitymapper, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react'
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CaretRightOutlined } from '@ant-design/icons'
import './InfoFly.css'
import { formatCurrency } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Title, Text } = Typography

const InfoFly = (props) => {
    const navigate = useNavigate()
    const { listFlight, setFlightSelect } = props
    const data = useSelector((state) => state.homePage.homePageInfor)
    const { getText } = useLanguage()

    const [disabledButtonIds, setDisabledButtonIds] = useState([])
    const isButtonDisabled = (id) => {
        return disabledButtonIds.includes(id)
    }

    const handleSelect = (id) => {
        const selectedItem = listFlight.find((item) => item.id === id)
        setFlightSelect(selectedItem)
        setDisabledButtonIds([...disabledButtonIds, id])
    }
    return (
        <>
            <Text className="title">{getText('Trip')}</Text>
            {listFlight.map((item) => {
                const dateObjectdepartureTime = new Date(item.departureTime)
                const hourdepartureTime = dateObjectdepartureTime.getHours()
                const minutedepartureTime = dateObjectdepartureTime.getMinutes()
                const dateObjectarrivalTime = new Date(item.arrivalTime)
                const hourarrivalTime = dateObjectarrivalTime.getHours()
                const minutearrivalTime = dateObjectarrivalTime.getMinutes()
                const hourflight = hourarrivalTime - hourdepartureTime
                const minuteflight = minutearrivalTime - minutedepartureTime
                const adultPriceFomat = formatCurrency(item.flightSeatPrice.adultPrice)
                return (
                    <div key={item.id}>
                        <div className="fly-color"></div>
                        <div className="select-flight-info">
                            <Row>
                                <Col span={6}>
                                    <Row>
                                        <Title level={4} className="name-airline">
                                            {item.airline.airlineName}
                                        </Title>
                                    </Row>
                                    <Row>
                                        <Image preview={false} src={item.airline.avatarUrl} className="img-airline" />
                                    </Row>
                                    <Row>
                                        <Text className="name-aircraft-fly">{item.aircraft.aircraftName}</Text>
                                    </Row>
                                </Col>
                                <Col span={11}>
                                    <Row>
                                        <Col span={8}>
                                            <Row>
                                                <Text className="time-start-fly">
                                                    {hourdepartureTime}:{minutedepartureTime}
                                                </Text>
                                            </Row>
                                            <Row>
                                                <Text className="code-start-fly">{item.sourceAirport.airportCode}</Text>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                <Text className="flightName"></Text>
                                            </Row>
                                            <Row>
                                                <Text className="fly-ladder">{getText('Direct-Flight')}</Text>
                                            </Row>
                                            <Row>
                                                <IconBrandCitymapper className="icon-fly" />
                                            </Row>
                                            <Row>
                                                <Text className="time-to-fly">
                                                    {hourflight} {getText('Hour')} {minuteflight} {getText('Minute')}
                                                </Text>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                <Text className="time-start-fly">
                                                    {hourarrivalTime}:{minutearrivalTime}
                                                </Text>
                                            </Row>
                                            <Row>
                                                <Text className="code-start-fly">
                                                    {item.destinationAirport.airportCode}
                                                </Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={7}>
                                    <Row>
                                        <Text className="price-fly text-ellipsis">
                                            {adultPriceFomat}/{getText('Guest')}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Button
                                            className="btn-select"
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
