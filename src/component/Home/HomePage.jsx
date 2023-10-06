
import videoHomePage from '../../assets/videoHome.mp4'
import '../Home/HomePage.css'
import { Row, Col, Typography, Image, Divider, Card } from 'antd';
import FormSearch from './FormSearch/FormSearch';
import { useEffect, useState } from "react";
import { getAirports, getTickets } from '../../services/apiHomePage';
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
import { useLanguage } from '../../LanguageProvider/LanguageProvider';
const { Title, Text } = Typography;
const { Meta } = Card;
const HomePage = () => {
    const [listAirports, setListAirports] = useState([]);
    const [listSeats, setListSeats] = useState([])
    const { getText } = useLanguage();
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
                    <Divider style={{ borderColor: "black", fontSize: 20, paddingBottom: 20, paddingRight: 70 }}>{getText('service')}</Divider>
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
                                        <Text className='title-inner'>{getText('service-1')}</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>{getText('service-text-1')}</Text>
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
                                        <Text className='title-inner'>{getText('service-2')}</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>{getText('service-text-2')}</Text>
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
                                        <Text className='title-inner'>{getText('service-3')}</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>{getText('service-text-3')} </Text>
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
                                        <Text className='title-inner'>{getText('service-4')}</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>{getText('service-text-4')}</Text>
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
                                        <Text className='title-inner'>{getText('service-5')}</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>{getText('service-text-5')}</Text>
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
                                        <Text className='title-inner'>{getText('service-6')}</Text>
                                    </Row>
                                    <Row>
                                        <Text className='text-inner'>{getText('service-text-6')} </Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className='trip-homepage'>
                    <Trip />
                </div>
                <Text className='title-seat'>{getText('SEATCLASS')}</Text>
                <div className='side-seat'>
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
