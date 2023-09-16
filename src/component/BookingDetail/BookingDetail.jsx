import { Row, Col, Drawer, Button, Checkbox, Input } from 'antd';
import '../BookingDetail/BookingDetail.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import vietjet from '../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import CollapseAdult from './Collapse/CollapseAdult';
import CollapseChildren from './Collapse/CollapseChildren';
import CollapseBaby from './Collapse/CollapseBaby';
import CollapseDetail from './Collapse/CollapseDetail';
import FormSelectFlyService from '../FormSelectFlyService/FormSelectFlyService';
const { TextArea } = Input;

const BookingDetail = () => {

    const [openCaneclFight, setOpenCaneclFight] = useState(false);
    const navigate = useNavigate();
    const showDrawerCaneclFight = () => {
        setOpenCaneclFight(true);
    };

    return (
        <div className="booking-detail" style={{ paddingBottom: "1000px" }}>
            <div className="info-booking-detail">
                <Row>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} className='code-booking'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>

                    </Col>
                    <Col xs={12} sm={12} md={16} lg={16} xl={16} className='code-booking-status'>
                        <p>Trạng thái: <span style={{ color: 'green', fontSize: '20px', fontWeight: 700 }}>Đã thanh toán</span></p>
                    </Col>
                </Row>
            </div>
            <div className='main-container-detail'>
                <p className='title-booking' >Thông tin chuyến bay</p>
                <p className='roundTrip-booking'>Chuyến đi</p>
                <CollapseDetail />
                <p className='title-booking' >Chi tiết giá vé</p>
                <div className='detail-booking-passengers'>
                    <CollapseAdult />
                    <CollapseChildren />
                    <CollapseBaby />
                </div>
            </div>
            <div>
                <Row className='form-btn-booking-detail'>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => showDrawerCaneclFight()} >Hoàn Tiền/Hủy Chuyến</Button>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => navigate('/my/select-fly-change')}>Thay đổi lịch bay</Button>
                    </Col>
                </Row>
                <Row className='form-btn-booking-detail'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => navigate('/my/select-fly-service')} >Mua thêm dịch vụ</Button>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className='btn-booking-detail' onClick={() => navigate('/')}>Tìm chuyến bay khách</Button>
                    </Col>
                </Row>
            </div>
            <Drawer
                title="Hoàn Tiền/Hủy chuyến"
                placement='right'
                open={openCaneclFight}
                onClose={() => {
                    setOpenCaneclFight(false);
                }}
                width={700}
            >
                <div className='form-cancel'>
                    <div className='form-cancel-trip'>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={21}><p style={{ fontSize: '18px', fontWeight: 500 }}>Chuyến đi</p></Col>
                                <Col span={3}>
                                    <Checkbox />
                                </Col>
                            </Row>
                        </div>
                        <p className='date-fly'>Ngày 22/08/2023</p>
                        <Row >
                            <Col span={5} className='info-fly'>
                                <p className='location'>SGN</p>
                            </Col>
                            <Col span={7} className='info-fly'>
                                <p className='time-fly'>1 giờ 25 phút</p>
                            </Col>
                            <Col span={5} className='info-fly'>
                                <p className='location' >HAN</p>
                            </Col>
                        </Row>
                        <Row >
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
                    <div className='form-cancel-trip'>
                        <div className='date-select-fly'>
                            <Row>
                                <Col span={21}><p style={{ fontSize: '18px', fontWeight: 500 }}>Chuyến về</p></Col>
                                <Col span={3}>
                                    <Checkbox />
                                </Col>
                            </Row>
                        </div>
                        <p className='date-fly'>Ngày 22/08/2023</p>
                        <Row >
                            <Col span={5} className='info-fly'>
                                <p className='location'>SGN</p>
                            </Col>
                            <Col span={7} className='info-fly'>
                                <p className='time-fly'>1 giờ 25 phút</p>
                            </Col>
                            <Col span={5} className='info-fly'>
                                <p className='location' >HAN</p>
                            </Col>
                        </Row>
                        <Row >
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
                    <div className='form-cancel-trip'>
                        <Row>
                            <Col span={24}><p style={{ fontSize: '18px', fontWeight: 500, padding: '10px' }}>Lý do:</p></Col>
                            <TextArea
                                // value={value}
                                // onChange={(e) => setValue(e.target.value)}
                                placeholder="..."
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 6,
                                }}
                                style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                            />
                        </Row>
                    </div>

                </div>
                <div className='btn-form-require'>

                    <Button className='btn-require' >Gửi yêu cầu</Button>
                </div>
            </Drawer >

        </div >
    )
}
export default BookingDetail;