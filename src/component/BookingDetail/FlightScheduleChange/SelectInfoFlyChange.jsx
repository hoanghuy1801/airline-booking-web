import { Row, Col, Form, Typography } from 'antd'
import { useSelector } from 'react-redux'
import './Change.css'
import { formatCurrency } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Text } = Typography
const SelectInfoFlyChange = (props) => {
    const { getText } = useLanguage()
    // eslint-disable-next-line react/prop-types
    const { flightSelect, flightAwayDetail, setTotalAll, totalAll } = props
    let feeChange = 0
    // eslint-disable-next-line react/prop-types
    if (flightAwayDetail?.passengerAwaysDetail[0]?.seat?.seatClass === 'ECONOMY') {
        feeChange = 325000
        // eslint-disable-next-line react/prop-types
    } else if (flightAwayDetail?.passengerAwaysDetail[0]?.seat?.seatClass === 'PREMIUM_ECONOMY') {
        feeChange = 280000
    }

    const dataChangeFly = useSelector((state) => state.myFlight?.dataChangeFly)

    const totalPeople = dataChangeFly?.aduls + dataChangeFly?.childs
    let totalFeeChange = feeChange * totalPeople
    const totalAdultPrice =
        // eslint-disable-next-line react/prop-types
        (flightSelect?.flightSeatPrice?.adultPrice + flightSelect?.flightSeatPrice?.adultTaxPrice) *
        dataChangeFly?.aduls
    const adultPriceFomat = isNaN(totalAdultPrice) ? 0 : totalAdultPrice

    const totalChildrenPrice =
        // eslint-disable-next-line react/prop-types
        (flightSelect?.flightSeatPrice?.childrenPrice + flightSelect?.flightSeatPrice?.childrenTaxPrice) *
        dataChangeFly?.childs
    const childrenPriceFomat = isNaN(totalChildrenPrice) ? 0 : totalChildrenPrice

    // eslint-disable-next-line react/prop-types
    const totalInfantPrice = flightSelect?.flightSeatPrice?.infantPrice * dataChangeFly?.infants
    const infantPriceFomat = isNaN(totalInfantPrice) ? 0 : totalInfantPrice

    let passengerDetail = {}
    const selectChangeFly = useSelector((state) => state.myFlight?.selectChangeFly)
    if (selectChangeFly?.return) {
        // eslint-disable-next-line no-unused-vars
        passengerDetail = selectChangeFly?.flightReturnDetail?.passengerReturnsDetail
    } else {
        // eslint-disable-next-line no-unused-vars
        passengerDetail = selectChangeFly?.flightAwayDetail?.passengerAwaysDetail
    }
    let deduct = passengerDetail.reduce((total, item) => total + item?.seat?.seatPrice, 0)
    let deductFee = passengerDetail.reduce((total, item) => total + item?.seat?.taxPrice, 0)
    let priceChange = adultPriceFomat + childrenPriceFomat + infantPriceFomat
    let total = 0
    let deductAll = 0
    if (deduct + deductFee >= priceChange) {
        total = totalFeeChange
        deductAll = 0
        setTotalAll(total)
    } else {
        total = adultPriceFomat + childrenPriceFomat + infantPriceFomat + totalFeeChange - (deduct + deductFee)
        deductAll = deduct + deductFee
        setTotalAll(total)
    }
    return (
        <>
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

                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingLeft: 20
                                    }}
                                >
                                    {getText('Price')}{' '}
                                </Text>
                            </Col>
                            <Col span={6}>
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
                                    x{dataChangeFly?.aduls}
                                </Text>
                            </Col>
                            <Col span={10}>
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
                                    {formatCurrency(adultPriceFomat)}
                                </Text>
                            </Col>
                        </Row>
                    </div>
                    {dataChangeFly?.childs !== 0 ? (
                        <div className='title-infor'>
                            <Row>
                                <Col span={8}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            paddingLeft: 20
                                        }}
                                    >
                                        {getText('Price-Children')}
                                    </Text>
                                </Col>
                                <Col span={6}>
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
                                        x{dataChangeFly?.childs}
                                    </Text>
                                </Col>
                                <Col span={10}>
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
                                        {formatCurrency(childrenPriceFomat)}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        ''
                    )}

                    {dataChangeFly?.infants !== 0 ? (
                        <div className='title-infor'>
                            <Row>
                                <Col span={8}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            fontWeight: 600,
                                            paddingLeft: 20
                                        }}
                                    >
                                        {getText('Price-Baby')}
                                    </Text>
                                </Col>
                                <Col span={6}>
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
                                        x{dataChangeFly?.infants}{' '}
                                    </Text>
                                </Col>
                                <Col span={10}>
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
                                        {formatCurrency(infantPriceFomat)}
                                    </Text>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingLeft: 20
                                    }}
                                >
                                    {' '}
                                    {getText('ChangeFee')}{' '}
                                </Text>
                            </Col>
                            <Col span={6}>
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
                                    x{totalPeople}
                                </Text>
                            </Col>
                            <Col span={10}>
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
                                    {formatCurrency(totalFeeChange)}
                                </Text>
                            </Col>
                        </Row>
                    </div>
                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingLeft: 20
                                    }}
                                >
                                    {getText('deduct')}{' '}
                                </Text>
                            </Col>
                            <Col span={6}>
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
                                ></Text>
                            </Col>
                            <Col span={10}>
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
                                    {formatCurrency(deductAll)}
                                </Text>
                            </Col>
                        </Row>
                    </div>
                </Form.Item>
                <div className='title-select-end'>
                    <Row>
                        <Col span={8}>
                            <Text
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
                                {formatCurrency(totalAll)}
                            </Text>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    )
}
export default SelectInfoFlyChange
