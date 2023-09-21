import { useEffect, useState } from "react";
import { Row, Col, Typography, Image, Divider } from 'antd';
import './Footer.css'
const { Title, Text } = Typography;
const Footer = () => {
    return (
        <>
            <div className="footer-homepage">
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: 20 }} >
                        <Text className="title-footer">Vivu Airlines</Text>
                        <ul>
                            <li>
                                ĐỊA CHỈ: Số 12 Nguyễn Văn Bảo, Phường 4,
                                Quận Gò Vấp, Thành phố Hồ Chí Minh
                            </li>
                            <li>Điện thoại: 0964505517
                            </li>
                            <li>
                                Email: vivuairlines@gmail.com
                            </li>
                            <li>
                                Website: https://vivuairline.vercel.app
                            </li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={5} md={5} lg={5} xl={5} style={{ paddingLeft: 20 }}>
                        <Text className="title-footer">DỊCH VỤ</Text>
                        <ul>
                            <li>
                                Đặt vé
                            </li>
                            <li>Check-in online
                            </li>
                            <li>
                                Đặt trước ghế ngồi
                            </li>
                            <li>
                                Mua thêm đồ ăn
                            </li>
                            <li>
                                Mua thêm hành lý
                            </li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={7} md={7} lg={7} xl={7} style={{ paddingLeft: 20 }}>
                        <Text className="title-footer">Liên hệ quản trị viên</Text>
                        <ul>
                            <li>Quản lý:</li>
                            <li>- Phạm Hoàng Huy </li>
                            <li>Email: hoanghuy.pham1801@gmail.com</li>
                            <li>- Phạm Lê Khánh Duy</li>
                            <li>Email: phamduy2408@gmail.com</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Footer;