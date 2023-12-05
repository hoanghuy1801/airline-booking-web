// SiderSeat.jsx

import React from 'react'
import Slider from 'react-slick'
import { Image, Typography } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './SiderSeat.css'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'

const { Text } = Typography

const SiderSeat = () => {
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
    }
    const { getText } = useLanguage()
    return (
        <div className='carousel'>
            <Slider {...settings}>
                <div className='box'>
                    <Image
                        className='img-slide'
                        preview={false}
                        src='https://www.vietnamairlines.com/~/media/Images/Highlight/Korea/HL-business.jpg'
                    />
                    <Text className='text-rank'>{getText('BUSINESS')}</Text>
                </div>
                <div className='box'>
                    <Image
                        className='img-slide'
                        preview={false}
                        src='https://www.vietnamairlines.com/~/media/Images/Highlight/Korea/HL-pre-eco.jpg'
                    />
                    <Text className='text-rank'>{getText('PREMIUM_ECONOMY')}</Text>
                </div>
                <div className='box'>
                    <Image
                        className='img-slide'
                        preview={false}
                        src='https://owa.bestprice.vn/images/articles/uploads/su-khac-nhau-cua-cac-ve-may-bay-hang-vietnam-airlines-5d0c8cdabf485.jpg'
                    />
                    <Text className='text-rank'>{getText('ECONOMY')}</Text>
                </div>
            </Slider>
        </div>
    )
}

export default SiderSeat
