import { Row, Col, Collapse, Button } from 'antd';
import '../BookingDetail/BookingDetail.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import vietjet from '../../assets/vietjet.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';


const BookingDetail = () => {
    return (
        <div className="booking-detail" style={{ paddingBottom: "1000px" }}>
            <div className="info-booking-detail">
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>

                    </Col>
                    <Col span={16} className='code-booking-status'>
                        <p>Trạng thái: <span style={{ color: 'green', fontSize: '20px', fontWeight: 700 }}>Đã thanh toán</span></p>
                    </Col>
                </Row>
            </div>
            <div className='main-container-detail'>
                <p className='title-booking' >Thông tin chuyến bay</p>
                <p className='roundTrip-booking'>Chuyến đi</p>
                <div className='booking-ticket'>
                    <p className='date-fly'>22/08/2023</p>
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
                        <Col span={7} className='info-fly'>
                            <p className='number-fly'>1 hành khách,1 trẻ em, 1 em bé</p>
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
                        <Col span={7} className='info-fly'>
                            <p className='number-fly' style={{ color: 'green', fontSize: '23px', fontWeight: 700 }}>820,920 VND</p>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: '20px' }}>
                        <p className='code-fly'><img src={vietjet} /> Số hiệu chuyến bay: VJ313</p>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <p className='from'>Khởi hành
                                :</p>
                        </Col>
                        <Col span={20}>
                            <p className='time-flys'>22:30, 03/08/2023 (Giờ địa phương)</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                        </Col>
                        <Col span={20}>
                            <p className='time-flys' style={{ paddingBottom: '20px' }}>Huế - Sân bay Phú Bài</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <p className='to'>Đến:</p>
                        </Col>
                        <Col span={20}>
                            <p className='time-flys'>23:55, 03/08/2023 (Giờ địa phương)</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>

                        </Col>
                        <Col span={20}>
                            <p className='time-flys'>Tp. Hồ Chí Minh - Sân bay Tân Sơn Nhất</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                        </Col>
                        <Col span={20}>
                            <p className='time-flys' style={{ paddingTop: '20px' }}>
                                Thời gian: <span style={{ color: 'red' }}>1 giờ 25 phút  </span>
                                Airbus:  <span style={{ color: 'red' }}>A321  </span>
                                Khai thác bởi: <span style={{ color: 'red' }}>Vietjet  </span>
                            </p>
                        </Col>
                    </Row>
                </div>
                <p className='title-booking' >Chi tiết giá vé</p>
                <div className='detail-booking-passengers'>
                    <Collapse
                        size="large"
                        items={[
                            {
                                key: 'index',
                                label: <div style={{ fontSize: '18px', fontWeight: 600 }}>Người lớn: ÔNG PHAM HOANG HUY </div>,
                                children:
                                    <div className='detail-ticket'>
                                        <p style={{ color: 'green', fontSize: '16px', fontWeight: 500 }}>Chi tiết chuyến đi </p>
                                        <p style={{ color: 'black', fontSize: '16px', fontWeight: 500 }}> HUI <img src={vietjet} /> SGN</p>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3>Giá vé</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3>236,520 VND</h3>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Vé phổ thông</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>219,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Thuế VAT</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>17,520</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3>Thuế, phí</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3>584,400 VND</h3>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phụ thu dịch vụ hệ thống (Quốc nội)</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>215,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phí an ninh soi chiếu</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>20,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phí sân bay quốc nội</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>100,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phụ thu quản trị hệ thống</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>215,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Thuế VAT</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>34,400</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3>Dịch vụ</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3>0 VND</h3>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Hành lý xách tay 7Kg</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>0 </p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Hành lý ký gửi </p>
                                            </Col>
                                            <Col span={12}>
                                                <p>0 </p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3 style={{ color: 'red', fontSize: '18px' }}>Dịch vụ</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3 style={{ color: 'red', fontSize: '18px' }}>0 VND</h3>
                                            </Col>
                                        </Row>
                                    </div>
                            },
                        ]}
                        expandIconPosition='end'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            backgroundColor: '#F1F1F1',
                            marginTop: '10px'
                        }}
                    />
                    <Collapse
                        size="large"
                        items={[
                            {
                                key: 'index',
                                label: <div style={{ fontSize: '18px', fontWeight: 600 }}>Người lớn: ÔNG PHAM HOANG HUY </div>,
                                children:
                                    <div className='detail-ticket'>
                                        <p style={{ color: 'green', fontSize: '16px', fontWeight: 500 }}>Chi tiết chuyến đi </p>
                                        <p style={{ color: 'black', fontSize: '16px', fontWeight: 500 }}> HUI <img src={vietjet} /> SGN</p>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3>Giá vé</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3>236,520 VND</h3>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Vé phổ thông</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>219,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Thuế VAT</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>17,520</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3>Thuế, phí</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3>584,400 VND</h3>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phụ thu dịch vụ hệ thống (Quốc nội)</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>215,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phí an ninh soi chiếu</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>20,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phí sân bay quốc nội</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>100,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Phụ thu quản trị hệ thống</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>215,000</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Thuế VAT</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>34,400</p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3>Dịch vụ</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3>0 VND</h3>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Hành lý xách tay 7Kg</p>
                                            </Col>
                                            <Col span={12}>
                                                <p>0 </p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <p>Hành lý ký gửi </p>
                                            </Col>
                                            <Col span={12}>
                                                <p>0 </p>
                                            </Col>
                                        </Row>
                                        <Row className='details'>
                                            <Col span={12}>
                                                <h3 style={{ color: 'red', fontSize: '18px' }}>Dịch vụ</h3>
                                            </Col>
                                            <Col span={12}>
                                                <h3 style={{ color: 'red', fontSize: '18px' }}>0 VND</h3>
                                            </Col>
                                        </Row>
                                    </div>
                            },
                        ]}
                        expandIconPosition='end'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            backgroundColor: '#F1F1F1',
                            marginTop: '10px'
                        }}
                    />
                </div>
                <div className='btn'>
                    <Button className='btn-mail-search'  >Gửi mail hành trình</Button>
                    <Button className='btn-mail-search'  >Tìm chuyến bay khác</Button>
                </div>
            </div>
        </div >
    )
}
export default BookingDetail;