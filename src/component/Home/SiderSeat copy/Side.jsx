import React, { Component } from "react";
import Slider from 'react-slick';
import { Card, Image } from 'antd';
const { Meta } = Card;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Side/Side.css'

export default class Side extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1700,
                    settings: {
                        slidesToShow: 3,
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
                    breakpoint: 700,
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
                            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1391898416-1646649508378.png"
                        />
                        <h3>Hà Nội</h3>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1418571842-1645412456940.png"
                        />
                        <h3>Quy Nhơn</h3>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock2207867445-1693888900169.jpg"
                        />
                        <h3>Hà Giang</h3>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1286202790huge-1669090537263.jpg"
                        />
                        <h3>Cát Bà-Hải Phòng</h3>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1169930359huge-1693888927953.jpg"
                        />
                        <h3>Đà Nẵng</h3>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/689945404-1679386891876.jpg"
                        />
                        <h3>Thác Yang Bay-Nha Trang</h3>
                    </div>


                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/1940994577-1677148437457.jpg"
                        />
                        <h3>Quảng Ninh</h3>
                    </div>
                    <div className="box">
                        <Image className="img-slide"
                            preview={false}
                            src="https://www.vietjetgiare.vn/wp-content/uploads/2021/12/dia-diem-du-lich-sai-gon-1.jpg"
                        />
                        <h3>TP. Hồ Chí Minh</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}