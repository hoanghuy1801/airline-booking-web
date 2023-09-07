import { Row, Col, Button, Radio } from 'antd';
import { IconBrandCitymapper } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './InfoFly.css'



const InfoFlyReturn = (props) => {
    const navigate = useNavigate();
    const { listByConditionReturn, setAdultsPriceReturn, setChildrenPriceReturn, setInfantPriceReturn, setAdultsPriceFomatReturn,
        setChildrenPriceFomatReturn, setInfantPriceFomatReturn, setTaxesfightFomatReturn, setTaxesfightReturn,
        totalFight, setTotalFightFomat, setTotalFight, setConditionSelectReturn } = props;
    const data = useSelector(state => state.formsearch.data_booking);

    const handleSelect = (id) => {
        const selectedItem = listByConditionReturn.find((item) => item.id === id);
        setConditionSelectReturn(selectedItem)
        const adultPriceTotal = selectedItem.seatPriceDto.adultsPrice * data.adult;
        const childrenPriceTotal = selectedItem.seatPriceDto.childrenPrice * data.children;
        const infantPriceTotal = selectedItem.seatPriceDto.infantPrice * data.baby;

        const totalTaxesfight = 584400 * (data.children + data.adult);

        const total = adultPriceTotal + childrenPriceTotal + infantPriceTotal + totalTaxesfight + totalFight;

        setTotalFight(total);
        setTotalFightFomat(total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))

        setAdultsPriceReturn(adultPriceTotal);
        setChildrenPriceReturn(childrenPriceTotal);
        setInfantPriceReturn(infantPriceTotal);

        setAdultsPriceFomatReturn(adultPriceTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));
        setChildrenPriceFomatReturn(childrenPriceTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));
        setInfantPriceFomatReturn(infantPriceTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));
        setTaxesfightReturn(totalTaxesfight)
        setTaxesfightFomatReturn(totalTaxesfight.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))
    }



    return (
        <>
            <p className='title'>Chuyến về</p>

            {listByConditionReturn.map((item) => {
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
                                <Col span={7}>

                                    <Row>
                                        <p className='name-airline'>{item.airlineName}</p>
                                    </Row>
                                    <Row>
                                        <img src={item.airlineAvatarUrl} className='img-airline' />
                                    </Row>
                                    <Row>
                                        <p className='name-aircraft-fly'>{item.aircraftName}</p>
                                    </Row>
                                </Col>
                                <Col span={10} >
                                    <Row>
                                        <Col span={8}>
                                            <p className='time-start-fly'>{hourdepartureTime}:{minutedepartureTime}</p>
                                            <p className='code-start-fly'>{item.sourceAirportCode}</p>
                                        </Col>
                                        <Col span={8}>
                                            <p className='flightName'>{item.flightName}</p>
                                            <IconBrandCitymapper className='icon-fly' />
                                            <p className='fly-ladder'>Bay thẳng</p>
                                            <p className='time-to-fly'>{hourflight} giờ {minuteflight} phút</p>
                                        </Col>
                                        <Col span={8} >
                                            <p className='time-start-fly'>{hourarrivalTime}:{minutearrivalTime}</p>
                                            <p className='code-start-fly'>{item.destinationAirportCode}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={7} >
                                    <Row>
                                        <p className='price-fly'>{price}/Khách</p>
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
export default InfoFlyReturn;