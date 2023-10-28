import { Row, Col, Checkbox } from 'antd'
const FormSelectFlyService = () => {
    return (
        <>
            <div className='form-select-fly-service'>
                <div className='date-select-fly'>
                    <Row>
                        <Col span={18}>
                            <p style={{ fontSize: '18px', fontWeight: 500 }}>Chuyến đi</p>
                        </Col>
                        <Col span={2}>
                            <p style={{ fontSize: '18px', fontWeight: 500 }}> Chọn </p>
                        </Col>
                        <Col span={4}>
                            <Checkbox />
                        </Col>
                    </Row>
                </div>
                <p className='date-fly'>Ngày 22/08/2023</p>
                <Row>
                    <Col span={5} className='info-fly'>
                        <p className='location'>SGN</p>
                    </Col>
                    <Col span={7} className='info-fly'>
                        <p className='time-fly'>1 giờ 25 phút</p>
                    </Col>
                    <Col span={5} className='info-fly'>
                        <p className='location'>HAN</p>
                    </Col>
                    <Col span={7}>
                        <p className='name-fly'>VietNam Airline</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={5} className='info-fly'>
                        <p className='time'>22:30</p>
                    </Col>
                    <Col span={7} className='info-fly'>
                        <p className='time-fly'>Bay thẳng</p>
                    </Col>
                    <Col span={5} className='info-fly'>
                        <p className='time'>22:30</p>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default FormSelectFlyService
