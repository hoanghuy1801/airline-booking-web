import { Row, Col, Typography } from 'antd'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react'
import { useSelector } from 'react-redux'

import { removeDiacritics } from '../../utils/format'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
import './Payment.css'
import PaymentMethods from './PaymentMethods'
const { Title, Text } = Typography
const Payment = () => {
    const { getText } = useLanguage()
    const data = useSelector((state) => state.homePage.homePageInfor)

    const myLanguage = useSelector((state) => state.language.language)
    const sourceAirportCity = removeDiacritics(data.sourceAirportCity, myLanguage)
    const destinationAirportCity = removeDiacritics(data.destinationAirportCity, myLanguage)
    return (
        <div className='select-flight'>
            <div className='info-flight'>
                <Row>
                    <Col span={18} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {!data.roundTrip ? (
                                    <Title level={4}>
                                        {getText('ROUND-TRIP')} | {data.adult} {getText('Adults')}, {data.children}{' '}
                                        {getText('Children')}, {data.baby} {getText('Baby')}
                                    </Title>
                                ) : (
                                    <Title level={4}>
                                        {getText('ONE-WAY-FLIGHT')}| {data.adult} {getText('Adults')}, {data.children}{' '}
                                        {getText('Children')}, {data.baby} {getText('Baby')}
                                    </Title>
                                )}
                            </span>
                        </Row>
                        <Row>
                            <div>
                                <Title level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500 }}>
                                    {getText('From')}:
                                    <Text
                                        type='secondary'
                                        style={{
                                            color: 'red',
                                            fontSize: 18,
                                            fontWeight: 500,
                                            paddingRight: 30,
                                            marginLeft: 10
                                        }}
                                    >
                                        {sourceAirportCity}
                                    </Text>
                                    <Text level={5} style={{ color: 'grey', fontSize: 16, fontWeight: 500 }}>
                                        {getText('To')}:
                                    </Text>
                                    <Text
                                        type='secondary'
                                        style={{
                                            color: 'red',
                                            fontSize: 18,
                                            fontWeight: 500,
                                            paddingRight: 30,
                                            marginLeft: 10
                                        }}
                                    >
                                        {destinationAirportCity}
                                    </Text>
                                </Title>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} className='icon-select'>
                        <Row>
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCircle style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconShoppingCart style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconCurrencyDollar style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='mains-container'>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className='infor-user-select-flight'>
                        <PaymentMethods />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Payment
