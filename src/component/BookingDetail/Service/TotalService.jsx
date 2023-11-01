import { Row, Col, Form } from 'antd'
import './TotalService.css'
import { formatCurrency } from '../../../utils/format'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'

const TotalService = (props) => {
    const { getText } = useLanguage()
    const {
        // eslint-disable-next-line react/prop-types
        total
    } = props
    return (
        <>
            <Form className='infor-user-select'>
                <div className='title-select'>
                    <span style={{ color: 'white', fontSize: 20, fontWeight: 600, paddingRight: 10 }}>
                        {getText('InfoServiceBooking')}{' '}
                    </span>
                </div>
                <Form.Item>
                    <div className='title-infor'>
                        <Row>
                            <Col span={8}>
                                <span
                                    style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingLeft: 20
                                    }}
                                >
                                    {getText('service')}{' '}
                                </span>
                            </Col>
                            <Col span={16}>
                                <span
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
                                    {formatCurrency(total)}
                                </span>
                            </Col>
                        </Row>
                    </div>
                </Form.Item>
                <div className='title-select-end'>
                    <Row>
                        <Col span={8}>
                            <span
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 600,
                                    paddingLeft: 20
                                }}
                            >
                                {getText('Total')}
                            </span>
                        </Col>
                        <Col span={16}>
                            <span
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
                            </span>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    )
}
export default TotalService
