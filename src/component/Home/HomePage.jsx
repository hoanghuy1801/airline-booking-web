
import videoHomePage from '../../assets/videoHome.mp4'
import '../Home/HomePage.css'
import { Row, Col, Typography, Image, Divider, Card } from 'antd';
import FormSearch from './FormSearch/FormSearch';
import { useEffect, useState } from "react";
import { getAirports, getTickets } from '../../services/apiServices';
import axios from 'axios';
import Slider from "react-slick";
import Side from './Side/Side';
import Footer from './Footer/Footer';
import Trip from './Trip/Trip';
import SiderSeat from './SiderSeat/SiderSeat';
import imgTicket from '../../assets/homeService/ticket.png'
import imgBaby from '../../assets/homeService/baby.png'
import imgLock from '../../assets/homeService/lock.png'
import imgLuggage from '../../assets/homeService/luggage.png'
import imgSeat from '../../assets/homeService/seat.png'
import imgVat from '../../assets/homeService/vat.png'
const { Title, Text } = Typography;
const { Meta } = Card;
const HomePage = () => {
    const [listAirports, setListAirports] = useState([]);
    const [listSeats, setListSeats] = useState([])
    useEffect(() => {
        fechListAirports();
        fechListTickets();

    }, []);

    const fechListAirports = async () => {
        let res = await getAirports();
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    const fechListTickets = async () => {
        let res = await getTickets();
        if (res.status == 200) {
            setListSeats(res.data)
        }
    }
    function resizeVideo() {
        var videoContainer = document.querySelector('.video-container');
        var video = document.getElementById('background-video');
        var videoAspectRatio = 16 / 9; // Tỷ lệ khung hình của video

        var containerWidth = videoContainer.offsetWidth;
        var containerHeight = videoContainer.offsetHeight;
        var containerAspectRatio = containerWidth / containerHeight;

        if (containerAspectRatio > videoAspectRatio) {
            video.style.width = containerWidth + 'px';
            video.style.height = containerWidth / videoAspectRatio + 'px';
        } else {
            video.style.width = containerHeight * videoAspectRatio + 'px';
            video.style.height = containerHeight + 'px';
        }
    }
    return (
        <div className='main-homepage' >
            <div className='homePage'>
                <div class="video-container">
                    <video id="background-video" autoPlay muted loop className='myvideo'  >
                        <source
                            src={videoHomePage}
                            type="video/mp4" />
                    </video>
                </div>
                <div className="search">
                    <FormSearch
                        listAirports={listAirports}
                        listSeats={listSeats}
                    />
                </div>
                <div className='content'>
                    <div className='label-hot'>
                        <label className='label-img' type='link'>ĐIỂM ĐẾN HẤP DẪN</label>
                    </div>
                    <Side />
                </div>
            </div>
            <div className='col-inner'>
                <div className='inner'>
                    <Divider style={{ borderColor: "black", fontSize: 20, paddingBottom: 20, paddingRight: 70 }}>DỊCH VỤ</Divider>
                    <Row >
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Row style={{
                                paddingRight: 20, paddingBottom: 30
                            }}>
                                <Col span={4}>
                                    <Image src={imgTicket}
                                        preview={false} />
                                </Col>
                                <Col span={20}>
                                    <Row>
                                        <Text className='title-inner'>GIAO VÉ TẬN NƠI</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>Miễn phí giao vé tận nhà, hỗ trợ quẹt thẻ tận nơi</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Row style={{
                                paddingRight: 20, paddingBottom: 30
                            }}>
                                <Col span={4}>
                                    <Image src={imgLock}
                                        preview={false} />
                                </Col>
                                <Col span={20}>
                                    <Row>
                                        <Text className='title-inner'>HOÀN HỦY THAY ĐỔ</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>Hỗ trợ hoàn hủy, thay đổi 24/7</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Row style={{
                                paddingRight: 20, paddingBottom: 30
                            }}>
                                <Col span={4}>
                                    <Image src={imgSeat}
                                        preview={false} />
                                </Col>
                                <Col span={20}>
                                    <Row>
                                        <Text className='title-inner'>CHECKIN ,CHỌN GHẾ</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>Checkin ,chọn ghế ngồi </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Row style={{
                                paddingRight: 20, paddingBottom: 30
                            }}>
                                <Col span={4}>
                                    <Image src={imgLuggage}
                                        preview={false} />
                                </Col>
                                <Col span={20}>
                                    <Row>
                                        <Text className='title-inner'>HÀNH LÝ</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>Mua hành lý trả trước , giá ưu đãi</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Row style={{
                                paddingRight: 20, paddingBottom: 30
                            }}>
                                <Col span={4}>
                                    <Image src={imgVat}
                                        preview={false} />
                                </Col>
                                <Col span={20}>
                                    <Row>
                                        <Text className='title-inner'>HÓA ĐƠN VAT</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>Miễn phí hóa đơn GTGT cho mọi hành khách</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Row style={{
                                paddingRight: 20, paddingBottom: 30
                            }}>
                                <Col span={4}>
                                    <Image src={imgBaby}
                                        preview={false} />
                                </Col>
                                <Col span={20}>
                                    <Row>
                                        <Text className='title-inner'>TRẺ EM ĐI CÙNG</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>Mua vé trẻ em đi cùng </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className='trip-homepage'>
                    <Trip />
                </div>
                <Text className='title-seat'>HẠNG GHẾ</Text>
                <div className='card-seat'>
                    <SiderSeat />
                </div>
                <div className='footer-home'>
                    <Footer />
                </div>
            </div>

        </div>
    )
}
export default HomePage
