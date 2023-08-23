import { Row, Col } from 'antd';
import './InfoAndStep.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import React from 'react';

const InfoAndStep = () => {

    const data_homepage = useSelector(state => state.formsearch.data_booking);
    return (
        <>
            <Row>
                <Col span={16} className='infor-select'>
                    <Row>
                        <span style={{ fontSize: 20, fontWeight: 500 }}>
                            {!data_homepage.roundTrip ?
                                <div>CHUYẾN BAY MỘT CHIỀU | {data_homepage.adult} Người lớn, {data_homepage.children} Trẻ em, {data_homepage.baby} Em bé </div>
                                :
                                <div>CHUYẾN BAY KHỨ HỒI| {data_homepage.adult} Người lớn, {data_homepage.children} Trẻ em, {data_homepage.baby} Em bé</div>
                            }
                        </span>
                    </Row>
                    <Row style={{ paddingTop: 10 }}>
                        <div>
                            <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm khởi hành </span>
                            <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }} >Tp. Hồ Chí Minh ( SGN )</span>
                            <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm đến </span>
                            <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }}> Hà Nội ( HAN )</span>
                        </div>
                    </Row>
                </Col>
                <Col span={8} className='icon-selcet'>
                    <Row >
                        <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                        <IconUserCircle style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        <IconShoppingCart style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        <IconCurrencyDollar style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                    </Row>

                </Col>
            </Row>
        </>
    )
}
export default InfoAndStep;