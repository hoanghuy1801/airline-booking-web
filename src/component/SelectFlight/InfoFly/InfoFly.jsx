import { Row, Col, Typography, Button, Image } from 'antd';
import { IconBrandCitymapper, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import './InfoFly.css'
import { formatCurrency } from '../../../utils/format';
const { Title, Text } = Typography;



const InfoFly = (props) => {
    const navigate = useNavigate();
    const { listFlight, setFlightSelect } = props;
    const data = useSelector((state) => state.homePage.homePageInfor);

    const handleSelect = (id) => {
        const selectedItem = listFlight.find((item) => item.id === id);
        setFlightSelect(selectedItem);
    }
    return (
        <>
            <Text className='title'>Chuyến đi</Text>
            {listFlight.map((item) => {
                const dateObjectdepartureTime = new Date(item.departureTime);
                const hourdepartureTime = dateObjectdepartureTime.getHours();
                const minutedepartureTime = dateObjectdepartureTime.getMinutes();
                const dateObjectarrivalTime = new Date(item.arrivalTime);
                const hourarrivalTime = dateObjectarrivalTime.getHours();
                const minutearrivalTime = dateObjectarrivalTime.getMinutes();
                const hourflight = hourarrivalTime - hourdepartureTime;
                const minuteflight = minutearrivalTime - minutedepartureTime;
                const adultPriceFomat = formatCurrency(item.flightSeatPrices[0].adultPrice);
                return (
                    <div>
                        <div className='fly-color'>
                        </div>
                        <div className='select-flight-info'>
                            <Row>
                                <Col span={6}>

                                    <Row>
                                        <Title level={4} className='name-airline'>{item.airline.airlineName}</Title>
                                    </Row>
                                    <Row>
                                        <Image
                                            preview={false}
                                            src={item.airline.avatarUrl} className='img-airline'
                                        />
                                    </Row>
                                    <Row>
                                        <Text className='name-aircraft-fly'>{item.aircraft.aircraftName}</Text>
                                    </Row>
                                </Col>
                                <Col span={11} >
                                    <Row>
                                        <Col span={8}>
                                            <Row>
                                                <Text className='time-start-fly'>{hourdepartureTime}:{minutedepartureTime}</Text>
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
                                                <IconBrandCitymapper className='icon-fly' />
                                            </Row>
                                            <Row>
                                                <Text className='fly-ladder'>Bay thẳng</Text>
                                            </Row>
                                            <Row>
                                                <Text className='time-to-fly'>{hourflight} giờ {minuteflight}  phút</Text>
                                            </Row>
                                        </Col>
                                        <Col span={8} >
                                            <Row>
                                                <Text className='time-start-fly'>{hourarrivalTime}:{minutearrivalTime}</Text>
                                            </Row>
                                            <Row>
                                                <Text className='code-start-fly'>{item.destinationAirport.airportCode}</Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={7} >
                                    <Row>
                                        <Text className='price-fly text-ellipsis'>{adultPriceFomat}/Khách</Text>
                                    </Row>
                                    <Row>
                                        <Button className='btn-select' onClick={() => handleSelect(item.id)}>Chọn</Button>
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
export default InfoFly;