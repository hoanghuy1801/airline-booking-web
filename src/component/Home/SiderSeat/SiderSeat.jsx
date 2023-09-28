import React, { Component } from "react";
import Slider from 'react-slick';
import { Card, Image, Typography } from 'antd';
const { Meta } = Card;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SiderSeat.css'
const { Title, Text } = Typography;
export default class SiderSeat extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 700,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="carousel">
                <Slider {...settings}>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://www.vietnamairlines.com/~/media/Images/Highlight/Korea/HL-business.jpg"
                        />

                        <Text className="text-rank">Hạng Thương Gia</Text>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://www.vietnamairlines.com/~/media/Images/Highlight/Korea/HL-pre-eco.jpg"
                        />
                        <Text className="text-rank">Hạng Phổ Thông Đặc Biệt</Text>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://owa.bestprice.vn/images/articles/uploads/su-khac-nhau-cua-cac-ve-may-bay-hang-vietnam-airlines-5d0c8cdabf485.jpg"
                        />
                        <Text className="text-rank">Hạng Phổ thông</Text>
                    </div>
                </Slider>
            </div>
        );
    }
}