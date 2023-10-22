import { useState, useEffect } from 'react'
import { Row, Col, Form, Typography } from 'antd'
import './SelectInfoFly.css'
import { IconPlane } from '@tabler/icons-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatCurrency, removeDiacritics } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Title, Text } = Typography

const SelectInfoFly = (props) => {
    const { getText } = useLanguage()
    const { flightSelect, flightSelectReturn, totalService, totalServiceReturn } = props
    const data = useSelector((state) => state?.homePage?.homePageInfor)
    const totalPeople = data?.children + data?.adult

    const totalAdultPrice =
        (flightSelect?.flightSeatPrice?.adultPrice + flightSelect?.flightSeatPrice?.taxPrice) * data?.adult
    const adultPriceFomat = formatCurrency(totalAdultPrice)

    const totalChildrenPrice =
        (flightSelect?.flightSeatPrice?.childrenPrice + flightSelect?.flightSeatPrice?.taxPrice) * data?.children
    const childrenPriceFomat = formatCurrency(totalChildrenPrice)

    const totalInfantPrice = flightSelect?.flightSeatPrice?.infantPrice * data?.baby
    const infantPriceFomat = formatCurrency(totalInfantPrice)

    const totalFee = flightSelect?.flightSeatPrice?.taxService?.totalFee * totalPeople
    const totalFeeFomat = formatCurrency(totalFee)

    const totalAdultPriceReturn =
        (flightSelectReturn?.flightSeatPrice?.adultPrice + flightSelectReturn?.flightSeatPrice?.taxPrice) * data?.adult
    const adultPriceFomatReturn = formatCurrency(totalAdultPriceReturn)

    const totalChildrenPriceReturn =
        (flightSelectReturn?.flightSeatPrice?.childrenPrice + flightSelectReturn?.flightSeatPrice?.taxPrice) *
        data?.children
    const childrenPriceFomatReturn = formatCurrency(totalChildrenPriceReturn)

    const totalInfantPriceReturn = flightSelectReturn?.flightSeatPrice?.infantPrice * data?.baby
    const infantPriceFomatReturn = formatCurrency(totalInfantPriceReturn)

    const totalFeeReturn = flightSelectReturn?.flightSeatPrice?.taxService?.totalFee * totalPeople
    const totalFeeReturnFomat = formatCurrency(totalFeeReturn)

    const total =
        totalAdultPrice +
        totalChildrenPrice +
        totalInfantPrice +
        totalFee +
        totalService +
        totalServiceReturn +
        totalAdultPriceReturn +
        totalChildrenPriceReturn +
        totalInfantPriceReturn +
        totalFeeReturn
    const totalFomat = formatCurrency(Number(total))

    const myLanguage = useSelector((state) => state?.language?.language)
    const sourceAirportCity = removeDiacritics(data?.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data?.destinationAirportCity, myLanguage)

    return (
        <div>
            <Form className='infor-user-select'>
                <div className='title-select'>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 600, paddingRight: 10 }}>
                        {getText('RESERVATION-INFO')}{' '}
                    </Text>
                </div>
                <Form.Item>
                    <div className='title-infor'>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 600,
                                paddingLeft: 20
                            }}
                        >
                            {getText('PassengerInformation')}{' '}
                        </Text>
                    </div>
                    <div style={{ backgroundColor: 'rgb(201, 239, 255)' }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                fontWeight: 400,
                                paddingLeft: 20
                            }}
                        >
                            {getText('Trip')}
                        </Text>
                    </div>
                    <Row style={{ paddingTop: 10 }}>
                        <Col span={10}>
                            <Text
                                className='sourceAirportCity'
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    paddingLeft: 40
                                }}
                            >
                                {' '}
                                {sourceAirportCity}
                            </Text>
                        </Col>
                        <Col span={4}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    fontWeight: 500
                                }}
                            >
                                {' '}
                                <IconPlane style={{ width: 25, height: 25, paddingTop: 6 }} />{' '}
                            </Text>
                        </Col>
                        <Col span={10}>
                            <Text
                                className='destinationAirportCity'
                                style={{
                                    color: 'black',
                                    fontSize: 18,
                                    fontWeight: 500
                                }}
                            >
                                {destinationAirportCity}
                            </Text>
                        </Col>
                    </Row>

                    <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text
                                    className='text-select-info'
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingLeft: 10
                                    }}
                                >
                                    {getText('Price')}{' '}
                                </Text>
                            </Col>
                            <Col span={2}>
                                <Text
                                    className='text-select-info'
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    x{data?.adult}{' '}
                                </Text>
                            </Col>
                            <Col span={13}>
                                <Text
                                    className='text-select-info'
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20
                                    }}
                                >
                                    {adultPriceFomat}
                                </Text>
                            </Col>
                        </Row>
                    </div>
                    {!data?.children == 0 ? (
                        <div className='title-infor'>
                            <Row>
                                <Col span={9}>
                                    <Text
                                        className='text-select-info'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            paddingLeft: 10
                                        }}
                                    >
                                        {getText('Price-Children')}{' '}
                                    </Text>
                                </Col>
                                <Col span={2}>
                                    <Text
                                        className='text-select-info'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end'
                                        }}
                                    >
                                        x{data?.children}
                                    </Text>
                                </Col>
                                <Col span={13}>
                                    <Text
                                        className='text-select-info'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingRight: 20
                                        }}
                                    >
                                        {childrenPriceFomat}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        ''
                    )}
                    {!data?.baby == 0 ? (
                        <div className='title-infor'>
                            <Row>
                                <Col span={9}>
                                    <Text
                                        className='text-select-info'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            paddingLeft: 10
                                        }}
                                    >
                                        {getText('Price-Baby')}
                                    </Text>
                                </Col>
                                <Col span={2}>
                                    <Text
                                        className='text-select-info'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end'
                                        }}
                                    >
                                        x{data?.baby}
                                    </Text>
                                </Col>
                                <Col span={13}>
                                    <Text
                                        className='text-select-info'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingRight: 20
                                        }}
                                    >
                                        {infantPriceFomat}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text
                                    className='text-select-info'
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingLeft: 10
                                    }}
                                >
                                    {getText('TaxesAndFees')}
                                </Text>
                            </Col>
                            <Col span={2}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    x{totalPeople}{' '}
                                </Text>
                            </Col>
                            <Col span={13}>
                                <Text
                                    className='text-select-info'
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20
                                    }}
                                >
                                    {' '}
                                    {totalFeeFomat}
                                </Text>
                            </Col>
                        </Row>
                    </div>
                    <div className='title-infor'>
                        <Row>
                            <Col span={9}>
                                <Text
                                    className='text-select-info'
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingLeft: 10
                                    }}
                                >
                                    {getText('Add-On')}
                                </Text>
                            </Col>
                            <Col span={15}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        justifyContent: 'flex-end',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        paddingRight: 20
                                    }}
                                >
                                    {' '}
                                    {formatCurrency(totalService)}
                                </Text>
                            </Col>
                        </Row>
                    </div>

                    {!data?.roundTrip ? (
                        <div></div>
                    ) : (
                        <div>
                            <div style={{ backgroundColor: 'rgb(201, 239, 255)' }}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 400,
                                        paddingLeft: 20
                                    }}
                                >
                                    {getText('TripReturn')}
                                </Text>
                            </div>
                            <Row style={{ paddingTop: 10 }}>
                                <Col span={10}>
                                    <Text
                                        className='sourceAirportCity'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 500,
                                            paddingLeft: 40
                                        }}
                                    >
                                        {destinationAirportCity}
                                    </Text>
                                </Col>
                                <Col span={4}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}
                                    >
                                        <IconPlane style={{ width: 25, height: 25, paddingTop: 6 }} />{' '}
                                    </Text>
                                </Col>
                                <Col span={10}>
                                    <Text
                                        className='destinationAirportCity'
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 500
                                        }}
                                    >
                                        {sourceAirportCity}
                                    </Text>
                                </Col>
                            </Row>
                            <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                paddingLeft: 10
                                            }}
                                        >
                                            {getText('Price')}
                                        </Text>
                                    </Col>
                                    <Col span={2}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            x{data?.adult}
                                        </Text>
                                    </Col>
                                    <Col span={13}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20
                                            }}
                                        >
                                            {adultPriceFomatReturn}
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                            {!data?.children == 0 ? (
                                <div className='title-infor'>
                                    <Row>
                                        <Col span={9}>
                                            <Text
                                                className='text-select-info'
                                                style={{
                                                    color: 'black',
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    paddingLeft: 10
                                                }}
                                            >
                                                {getText('Price-Children')}
                                            </Text>
                                        </Col>
                                        <Col span={2}>
                                            <Text
                                                className='text-select-info'
                                                style={{
                                                    color: 'black',
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                x{data?.children}
                                            </Text>
                                        </Col>
                                        <Col span={13}>
                                            <Text
                                                className='text-select-info'
                                                style={{
                                                    color: 'black',
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    paddingRight: 20
                                                }}
                                            >
                                                {childrenPriceFomatReturn}
                                            </Text>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                ''
                            )}
                            {!data?.baby == 0 ? (
                                <div className='title-infor'>
                                    <Row>
                                        <Col span={9}>
                                            <Text
                                                className='text-select-info'
                                                style={{
                                                    color: 'black',
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    paddingLeft: 10
                                                }}
                                            >
                                                {getText('Price-Baby')}
                                            </Text>
                                        </Col>
                                        <Col span={2}>
                                            <Text
                                                className='text-select-info'
                                                style={{
                                                    color: 'black',
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                x{data?.baby}
                                            </Text>
                                        </Col>
                                        <Col span={13}>
                                            <Text
                                                className='text-select-info'
                                                style={{
                                                    color: 'black',
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    justifyContent: 'flex-end',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    paddingRight: 20
                                                }}
                                            >
                                                {infantPriceFomatReturn}
                                            </Text>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                ''
                            )}
                            <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                paddingLeft: 10
                                            }}
                                        >
                                            {getText('TaxesAndFees')}
                                        </Text>
                                    </Col>
                                    <Col span={2}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            x{totalPeople}
                                        </Text>
                                    </Col>
                                    <Col span={13}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20
                                            }}
                                        >
                                            {totalFeeReturnFomat}
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                            <div className='title-infor'>
                                <Row>
                                    <Col span={9}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                paddingLeft: 10
                                            }}
                                        >
                                            {getText('Add-On')}
                                        </Text>
                                    </Col>
                                    <Col span={15}>
                                        <Text
                                            className='text-select-info'
                                            style={{
                                                color: 'black',
                                                fontSize: 18,
                                                fontWeight: 600,
                                                justifyContent: 'flex-end',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingRight: 20
                                            }}
                                        >
                                            {formatCurrency(totalServiceReturn)}
                                        </Text>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    )}
                </Form.Item>
                <div className='title-select-end'>
                    <Row>
                        <Col span={8}>
                            <Text
                                className='text-select-info'
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 600,
                                    paddingLeft: 20
                                }}
                            >
                                {getText('Total')}
                            </Text>
                        </Col>
                        <Col span={16}>
                            <Text
                                className='text-select-info'
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 600,
                                    justifyContent: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    paddingRight: 20
                                }}
                            >
                                {totalFomat}
                            </Text>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}
export default SelectInfoFly
