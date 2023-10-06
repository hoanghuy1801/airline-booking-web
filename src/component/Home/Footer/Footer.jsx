import { useEffect, useState } from "react";
import { Row, Col, Typography, Image, Divider } from 'antd';
import './Footer.css'
import { useLanguage } from "../../../LanguageProvider/LanguageProvider";
const { Title, Text } = Typography;
const Footer = () => {
    const { getText } = useLanguage();
    return (
        <>
            <div className="footer-homepage">
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: 20 }} >
                        <Text className="title-footer">Vivu Airlines</Text>
                        <ul>
                            <li>
                                {getText('address')}
                            </li>
                            <li>  {getText('phone')}: 0964505517
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
                        <Text className="title-footer"> {getText('SERVICE')}</Text>
                        <ul>
                            <li>
                                {getText('booktickets')}
                            </li>
                            <li>
                                {getText('check-in')}
                            </li>
                            <li>
                                {getText('reserveSeats')}
                            </li>
                            <li>
                                {getText('buyfood')}
                            </li>
                            <li>
                                {getText('buyluggage')}
                            </li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={7} md={7} lg={7} xl={7} style={{ paddingLeft: 20 }}>
                        <Text className="title-footer"> {getText('CONTACT')}</Text>
                        <ul>
                            <li>{getText('Manage')}:</li>
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