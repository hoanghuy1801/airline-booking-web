import { Row, Col, Typography, Image } from 'antd'
import './Trip.css'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'
const { Text } = Typography
const Trip = () => {
    const { getText } = useLanguage()

    return (
        <>
            <div className='trip'>
                <Row className='row-trip'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Row>
                            <Text className='title-trip'>{getText('PHUQUOC')}</Text>
                        </Row>
                        <Row>
                            <Text className='text-introduce'>{getText('titleHot-1')}</Text>
                        </Row>
                        <Row>
                            <Text className='text'>{getText('textHot-1')}</Text>
                        </Row>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Image
                            className='img-slide'
                            preview={false}
                            src='https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/09/14140203/bai-vung-bau-canh-dep-phu-quoc-768x512.jpg'
                        />
                    </Col>
                </Row>
            </div>
            <div className='trip'>
                <Row className='row-trip'>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Row>
                            <Text className='title-trip'>{getText('NHATRANG')}</Text>
                        </Row>
                        <Row>
                            <Text className='text-introduce'>{getText('titleHot-2')}</Text>
                        </Row>
                        <Row>
                            <Text className='text'>{getText('textHot-2')}</Text>
                        </Row>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Image
                            className='img-slide'
                            preview={false}
                            src='https://i1-vnexpress.vnecdn.net/2021/03/19/NhaTrang-KhoaTran-27-1616120145.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=P6rNJD2Fm6OK-HTwBviZ4A'
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Trip
