import { useEffect, useState } from "react";
import { Row, Col, Typography, Image, Divider, Button } from 'antd';
import ReactPlayer from 'react-player';
import './Trip.css'
const { Title, Text } = Typography;
const Trip = () => {
    return (
        <>
            <div className="trip">
                <Row className="row-trip">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Row>
                            <Text className="title-trip">PHÚ QUỐC</Text>
                        </Row>
                        <Row>
                            <Text className="text-introduce">Điểm đến của thượng khách</Text>
                        </Row>
                        <Row>
                            <Text className="text">Phú Quốc vào mùa khô là sự hội tụ của thiên nhiên hoang sơ, biển trong cát vàng - đẹp đến ngỡ ngàng của hòn đảo ngọc. Đắm mình ngắm rạn san hô ở Hòn Móng Tay, lưu dấu những bức hình kỷ niệm ở Cổng Trời (The Gate Keeper), nhà gỗ hay chiều hoàng hôn buông doens’t fine ở Bãi Sao. Tối đến thì thả mình vào ẩm thực địa phương: bún quậy, bún kèn, cơm chiên ghẹ, hải sản làng chài Hàm Ninh.</Text>
                        </Row>

                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div class="video-container">
                            <ReactPlayer url="https://www.youtube.com/watch?v=_o1GrGvzT6E" muted={true} />
                        </div>
                    </Col>
                    <Row>
                        <Button className="btn-trip">Đặt vé ngay</Button>
                    </Row>
                </Row>
            </div>
            <div className="trip">
                <Row className="row-trip">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Row>
                            <Text className="title-trip">NHA TRANG</Text>
                        </Row>
                        <Row>
                            <Text className="text-introduce">Điểm đến yêu thích của du khách</Text>
                        </Row>
                        <Row>
                            <Text className="text">Nha Trang - thành phố biển xinh đẹp “lừng danh” của Việt Nam, thiên đường biển xanh cát trắng nắng vàng tuyệt đẹp cùng những đặc sản ngon ngất ngây. Hãy cùng Vivu Airlines du lịch Nha Trang và khám phá vùng đất nghỉ dưỡng lý tưởng này nhé!</Text>
                        </Row>

                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div class="video-container">
                            <ReactPlayer url="https://www.youtube.com/watch?v=RDIXAFtOY0Y" muted={true} />
                        </div>
                    </Col>
                    <Row>
                        <Button className="btn-trip">Đặt vé ngay</Button>
                    </Row>
                </Row>
            </div>
        </>
    )
}
export default Trip;