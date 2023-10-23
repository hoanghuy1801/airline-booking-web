import { Row, Col, Button } from 'antd'
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import './SelectFight.css'
import FormSelectFlyService from '../../BookingDetail/FormSelectFlyService/FormSelectFlyService'

const SelectFight = () => {
    const navigate = useNavigate()
    return (
        <div className='checkin-detail'>
            <div className='info-booking-detail'>
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>
                            Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span>
                        </p>
                    </Col>
                    <Col span={16} className='icon-select'>
                        <Row>
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconChecklist style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-container-detail'>
                <p className='title-booking'>Chọn chuyến bay</p>
                <FormSelectFlyService />
                <div className='btn'>
                    <Button className='btn-back' onClick={() => navigate('/checkin')}>
                        Trở lại
                    </Button>
                    <Button className='btn-continue' onClick={() => navigate('/my/select-seat')}>
                        Đi tiếp
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default SelectFight
