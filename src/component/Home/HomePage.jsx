
import videoHomePage from '../../assets/videoHome.mp4'
import '../Home/HomePage.css'
import { Row, Col, Button, Image } from 'antd';
import ImgGiaLai from '../../assets/travel/gialai.png'
import ImgPhuQuoc from '../../assets/travel/phuquoc.png'
import ImgQuangBinh from '../../assets/travel/quangbinh.png'
import FormSearch from './FormSearch/FormSearch';
import { useEffect, useState } from "react";
import { getAirports, getTickets } from '../../services/apiServices';
import axios from 'axios';
import Slider from "react-slick";
import Side from './Side/Side';

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
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='homePage'>
            <div className='video'>
                <Row>
                    <Col span={24}>
                        <video autoPlay muted loop className='myvideo'  >
                            <source
                                src={videoHomePage}
                                type="video/mp4" />
                        </video>
                    </Col>
                </Row>
            </div>
            <div className="search">
                <FormSearch
                    listAirports={listAirports}
                    listSeats={listSeats}
                />
            </div>
            <div className='content'>
                <div className='label-hot'>
                    <Button className='label-img' type='link'>ĐIỂM ĐẾN HẤP DẪN</Button>
                </div>
                <Side />
            </div>

        </div >
    )
}
export default HomePage
