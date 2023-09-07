import { Row, Col, Form, Button } from 'antd';
import './SelectFlightInfor.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckInfoFly from './CheckInfoFly/CheckInfoFly';
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly';
import { useState, useEffect } from 'react';
import { Data_Service } from '../../redux/action/SelectFight';
import { getListService } from '../../services/apiServices';


const SelectFlightInfor = () => {

    const dispath = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(state => state.formsearch.data_booking);
    const dataSelect = useSelector(state => state.selectfight.data_select);
    const dataSelectReturn = useSelector(state => state.selectfight.data_select_return);



    const handleContinue = () => {
        // dispath(Data_Service(data_service));
        navigate('/passengers')
        //  console.log("sadsad", res.data)
    }
    return (
        <div className="select-flight">
            <div className="info-flight">
                <Row>
                    <Col span={16} className='infor-select'>
                        <Row>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>
                                {!data.roundTrip ?
                                    <div>CHUYẾN BAY MỘT CHIỀU | {data.adult} Người lớn, {data.children} Trẻ em, {data.baby} Em bé</div>
                                    :
                                    <div>CHUYẾN BAY KHỨ HỒI| {data.adult} Người lớn, {data.children} Trẻ em, {data.baby} Em bé </div>
                                }

                            </span>
                        </Row>
                        <Row style={{ paddingTop: 10 }}>
                            <div>
                                <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm khởi hành </span>
                                <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }} >{data.sourceAirportCity}</span>
                                <span style={{ color: 'grey', fontSize: 16, fontWeight: 500, paddingRight: 10 }}>Điểm đến </span>
                                <span style={{ color: 'red', fontSize: 18, fontWeight: 500, paddingRight: 30 }}> {data.destinationAirportCity}</span>
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
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <CheckInfoFly
                            dataSelect={dataSelect}
                            dataSelectReturn={dataSelectReturn} />
                    </Col>
                    <Col span={9} >
                        <SelectInfoFly
                            listByCondition={dataSelect.listByCondition}
                            conditionSelect={dataSelect.conditionSelect}
                            adultsPrice={dataSelect.adultsPrice}
                            childrenPrice={dataSelect.childrenPrice}
                            infantPrice={dataSelect.infantPrice}
                            adultsPriceFomat={dataSelect.adultsPriceFomat}
                            childrenPriceFomat={dataSelect.childrenPriceFomat}
                            infantPriceFomat={dataSelect.infantPriceFomat}
                            taxesfightFomat={dataSelect.taxesfightFomat}
                            totalFightFomat={dataSelect.totalFightFomat}
                            //Return
                            listByConditionReturn={dataSelectReturn.listByConditionReturn}
                            conditionSelectReturn={dataSelectReturn.conditionSelectReturn}
                            adultsPriceReturn={dataSelectReturn.adultsPriceReturn}
                            childrenPriceReturn={dataSelectReturn.childrenPriceReturn}
                            infantPriceReturn={dataSelectReturn.infantPriceReturn}
                            adultsPriceFomatReturn={dataSelectReturn.adultsPriceFomatReturn}
                            childrenPriceFomatReturn={dataSelectReturn.childrenPriceFomatReturn}
                            infantPriceFomatReturn={dataSelectReturn.infantPriceFomatReturn}
                            taxesfightFomatReturn={dataSelectReturn.taxesfightFomatReturn}
                        />
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={4}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/select-fight') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={18} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={6} className='footer-price'>{dataSelect.totalFightFomat}</Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue'
                            onClick={() => handleContinue()} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectFlightInfor;