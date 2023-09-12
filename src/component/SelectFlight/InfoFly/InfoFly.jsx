import { Row, Col, Typography, Button, Image } from 'antd';
import { IconBrandCitymapper, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react';
import vietjet from '../../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import './InfoFly.css'
const { Title, Text } = Typography;



const InfoFly = (props) => {
    const navigate = useNavigate();
    const { listByCondition, setAdultsPrice, setChildrenPrice, setInfantPrice, setAdultsPriceFomat, setChildrenPriceFomat,
        setInfantPriceFomat, setTaxesfightFomat, setTaxesfight, setTotalFight, setTotalFightFomat, setConditionSelect } = props;
    const data = useSelector(state => state.formsearch.data_booking);

    const handleSelect = (id) => {
        const selectedItem = listByCondition.find((item) => item.id === id);
        setConditionSelect(selectedItem);
        const adultPriceTotal = selectedItem.seatPriceDto.adultsPrice * data.adult;
        const childrenPriceTotal = selectedItem.seatPriceDto.childrenPrice * data.children;
        const infantPriceTotal = selectedItem.seatPriceDto.infantPrice * data.baby;

        const totalTaxesfight = 584400 * (data.children + data.adult);

        const total = adultPriceTotal + childrenPriceTotal + infantPriceTotal + totalTaxesfight;

        setTotalFight(total);
        setTotalFightFomat(total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))

        setAdultsPrice(adultPriceTotal);
        setChildrenPrice(childrenPriceTotal);
        setInfantPrice(infantPriceTotal);

        setAdultsPriceFomat(adultPriceTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));
        setChildrenPriceFomat(childrenPriceTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));
        setInfantPriceFomat(infantPriceTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));

        setTaxesfight(totalTaxesfight)
        setTaxesfightFomat(totalTaxesfight.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))
    }



    return (
        <>
            <Text className='title'>Chuyến đi</Text>

            {listByCondition.map((item) => {
                const dateObjectdepartureTime = new Date(item.departureTime);
                const hourdepartureTime = dateObjectdepartureTime.getHours();
                const minutedepartureTime = dateObjectdepartureTime.getMinutes();
                const dateObjectarrivalTime = new Date(item.arrivalTime);
                const hourarrivalTime = dateObjectarrivalTime.getHours();
                const minutearrivalTime = dateObjectarrivalTime.getMinutes();
                const hourflight = hourarrivalTime - hourdepartureTime;
                const minuteflight = minutearrivalTime - minutedepartureTime;

                const price = item.seatPriceDto.adultsPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                return (


                    <div>
                        <div className='fly-color'>
                        </div>
                        <div className='select-flight-info'>
                            <Row>
                                <Col span={6}>

                                    <Row>
                                        <Title level={4} className='name-airline'>{item.airlineName}</Title>
                                    </Row>
                                    <Row>
                                        <Image
                                            preview={false}
                                            src={item.airlineAvatarUrl} className='img-airline'
                                        />
                                    </Row>
                                    <Row>
                                        <Text className='name-aircraft-fly'>{item.aircraftName}</Text>
                                    </Row>
                                </Col>
                                <Col span={11} >
                                    <Row>
                                        <Col span={8}>
                                            <Row>
                                                <Text className='time-start-fly'>{hourdepartureTime}:{minutedepartureTime}</Text>
                                            </Row>
                                            <Row>
                                                <Text className='code-start-fly'>{item.sourceAirportCode}</Text>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                <Text className='flightName'>{item.flightName}</Text>
                                            </Row>
                                            <Row>
                                                <IconBrandCitymapper className='icon-fly' />
                                            </Row>
                                            <Row>
                                                <Text className='fly-ladder'>Bay thẳng</Text>
                                            </Row>
                                            <Row>
                                                <Text className='time-to-fly'>{hourflight} giờ {minuteflight} phút</Text>
                                            </Row>
                                        </Col>
                                        <Col span={8} >
                                            <Row>
                                                <Text className='time-start-fly'>{hourarrivalTime}:{minutearrivalTime}</Text>
                                            </Row>
                                            <Row>
                                                <Text className='code-start-fly'>{item.destinationAirportCode}</Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={7} >
                                    <Row>
                                        <Text className='price-fly text-ellipsis'>{price}/Khách</Text>
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