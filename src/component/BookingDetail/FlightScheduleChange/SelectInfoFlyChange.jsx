import { Row, Col, Form, Typography } from 'antd'
import { IconPlane } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import './Change.css'
import { formatCurrency } from '../../../utils/format'
const { Text } = Typography
const SelectInfoFlyChange = (props) => {
    // eslint-disable-next-line react/prop-types
    const { flightSelect } = props
    let feeChange = 300000

    const dataChangeFly = useSelector((state) => state.myFlight?.dataChangeFly)

    const totalPeople = dataChangeFly?.aduls + dataChangeFly?.childs
    let totalFeeChange = feeChange * totalPeople
    const totalAdultPrice =
        // eslint-disable-next-line react/prop-types
        (flightSelect?.flightSeatPrice?.adultPrice + flightSelect?.flightSeatPrice?.taxPrice) * dataChangeFly?.aduls
    const adultPriceFomat = formatCurrency(totalAdultPrice)

    const totalChildrenPrice =
        // eslint-disable-next-line react/prop-types
        (flightSelect?.flightSeatPrice?.childrenPrice + flightSelect?.flightSeatPrice?.taxPrice) * dataChangeFly?.childs
    const childrenPriceFomat = formatCurrency(totalChildrenPrice)

    // eslint-disable-next-line react/prop-types
    const totalInfantPrice = flightSelect?.flightSeatPrice?.infantPrice * dataChangeFly?.infants
    const infantPriceFomat = formatCurrency(totalInfantPrice)

    let passengerDetail = {}
    const selectChangeFly = useSelector((state) => state.myFlight?.selectChangeFly)
    if (selectChangeFly?.return) {
        // eslint-disable-next-line no-unused-vars
        passengerDetail = selectChangeFly?.flightReturnDetail?.passengerReturnsDetail
    } else {
        // eslint-disable-next-line no-unused-vars
        passengerDetail = selectChangeFly?.flightAwayDetail?.passengerAwaysDetail
    }
    const huy = 17500 * totalPeople
    let deduct = passengerDetail.reduce((total, item) => total + item.seatPrice, 0)
    const total = totalAdultPrice + totalChildrenPrice + totalInfantPrice + totalFeeChange - (deduct + huy)
    return (
        <>
            <Form className='infor-user-select'>
                <div className='title-select'>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 600, paddingRight: 10 }}>
                        THÔNG TIN ĐẶT CHỖ{' '}
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
                            Thông tin hành khách{' '}
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
                            Chuyến đi
                        </Text>
                    </div>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 500,
                            paddingLeft: 20
                        }}
                    >
                        ({selectChangeFly?.sourceAirport?.airportCode})
                    </Text>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 500,
                            paddingLeft: 20
                        }}
                    >
                        {' '}
                        <IconPlane style={{ width: 25, height: 25, marginRight: 15, paddingTop: 6 }} />{' '}
                    </Text>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 500,
                            paddingLeft: 20
                        }}
                    >
                        ({selectChangeFly?.destinationAirport?.airportCode})
                    </Text>
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
                                    Giá vé{' '}
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
                                    {adultPriceFomat}
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
                                    Giá vé trẻ em
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
                                    {childrenPriceFomat}
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
                                    Giá vé em bé
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
                                    {infantPriceFomat}
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
                                    Phí thay đổi{' '}
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
                                    Khấu trừ{' '}
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
                                    {formatCurrency(deduct + huy)}
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
                                Tổng tiền
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
                                {formatCurrency(total)}
                            </Text>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    )
}
export default SelectInfoFlyChange
