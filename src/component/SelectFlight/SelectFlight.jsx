import { Row, Col, Button, Modal } from 'antd';
import '../SelectFlight/SelectFlight.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import InfoFly from './InfoFly/InfoFly';
import SelectInfoFly from './SelectInfoFly/SelectInfoFly';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListByCondition } from '../../services/apiServices';
import { Data_Select, Data_Select_Return } from '../../redux/action/SelectFight';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import moment from 'moment';
import InfoFlyReturn from './InfoFly/InfoFlyReturn';

const warning = () => {
    Modal.warning({
        title: 'Bạn ơi!',
        content: 'Bạn chưa chọn chuyến bay',
    });
};
const SelectFlight = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [hideSelectFightReturn, setHideSelectFightReturn] = useState(false);
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
    const [listByCondition, setListByCondition] = useState([]);
    const [conditionSelect, setConditionSelect] = useState([]);

    const [adultsPrice, setAdultsPrice] = useState();

    const [childrenPrice, setChildrenPrice] = useState();

    const [infantPrice, setInfantPrice] = useState();

    const [adultsPriceFomat, setAdultsPriceFomat] = useState();

    const [childrenPriceFomat, setChildrenPriceFomat] = useState();

    const [infantPriceFomat, setInfantPriceFomat] = useState();

    const [taxesfight, setTaxesfight] = useState();

    const [taxesfightFomat, setTaxesfightFomat] = useState();

    const [totalFight, setTotalFight] = useState();

    const [totalFightFomat, setTotalFightFomat] = useState('0 VND');
    //return

    const [listByConditionReturn, setListByConditionReturn] = useState([]);

    const [conditionSelectReturn, setConditionSelectReturn] = useState([]);

    const [adultsPriceReturn, setAdultsPriceReturn] = useState();

    const [childrenPriceReturn, setChildrenPriceReturn] = useState();

    const [infantPriceReturn, setInfantPriceReturn] = useState();

    const [adultsPriceFomatReturn, setAdultsPriceFomatReturn] = useState();

    const [childrenPriceFomatReturn, setChildrenPriceFomatReturn] = useState();

    const [infantPriceFomatReturn, setInfantPriceFomatReturn] = useState();

    const [taxesfightReturn, setTaxesfightReturn] = useState();

    const [taxesfightFomatReturn, setTaxesfightFomatReturn] = useState();

    const [totalFightReturn, setTotalFightReturn] = useState();
    const [totalFightFomatReturn, setTotalFightFomatReturn] = useState('0 VND');

    const handleShapeClick = (index) => {
        setSelectedShapeIndex(index);
    };
    useEffect(() => {
        feachListByCondition();
    }, []);
    const data = useSelector(state => state.formsearch.data_booking);

    const dateFomat = moment(data.departureDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dateFomatReturn = moment(data.returnDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const feachListByCondition = async () => {
        let res = await getListByCondition(data.sourceAirport, data.destinationAirport, dateFomat, data.seatClass, data.adult, data.children, data.baby);
        setListByCondition(res.data);
    }
    const data_select = {
        conditionSelect: conditionSelect,
        adultsPrice: adultsPrice,
        adultsPriceFomat: adultsPriceFomat,
        childrenPrice: childrenPrice,
        childrenPriceFomat: childrenPriceFomat,
        infantPrice: infantPrice,
        infantPriceFomat: infantPriceFomat,
        taxesfight: taxesfight,
        taxesfightFomat: taxesfightFomat,
        totalFight: totalFight,
        totalFightFomat, totalFightFomat
    }
    const data_select_return = {
        conditionSelectReturn: conditionSelectReturn,
        adultsPriceReturn: adultsPriceReturn,
        adultsPriceFomatReturn: adultsPriceFomatReturn,
        childrenPriceReturn: childrenPriceReturn,
        childrenPriceFomatReturn: childrenPriceFomatReturn,
        infantPriceReturn: infantPriceReturn,
        infantPriceFomatReturn: infantPriceFomatReturn,
        taxesfightReturn: taxesfightReturn,
        taxesfightFomatReturn: taxesfightFomatReturn,
    }

    const handleContinue = async () => {
        if (adultsPrice == null) {
            warning()
            return
        }
        if (!data.roundTrip) {
            dispath(Data_Select(data_select))
            navigate('/select-fight-infor')
        } else {
            if (adultsPrice != null) {
                dispath(Data_Select(data_select))
                let res = await getListByCondition(data.destinationAirport, data.sourceAirport, dateFomatReturn, data.seatClass, data.adult, data.children, data.baby);
                setListByConditionReturn(res.data);
                setHideSelectFightReturn(true)
            }
            if (adultsPriceReturn != null) {
                dispath(Data_Select_Return(data_select_return))
                navigate('/select-fight-infor')
            }
        }

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
                        {hideSelectFightReturn ?
                            <InfoFlyReturn
                                listByConditionReturn={listByConditionReturn}
                                setConditionSelectReturn={setConditionSelectReturn}
                                setAdultsPriceReturn={setAdultsPriceReturn}
                                setChildrenPriceReturn={setChildrenPriceReturn}
                                setInfantPriceReturn={setInfantPriceReturn}
                                setAdultsPriceFomatReturn={setAdultsPriceFomatReturn}
                                setChildrenPriceFomatReturn={setChildrenPriceFomatReturn}
                                setInfantPriceFomatReturn={setInfantPriceFomatReturn}
                                setTaxesfightReturn={setTaxesfightReturn}
                                setTaxesfightFomatReturn={setTaxesfightFomatReturn}
                                taxesfightReturn={taxesfightReturn}
                                setTotalFight={setTotalFight}
                                setTotalFightFomat={setTotalFightFomat}
                                totalFight={totalFight}
                            />
                            :
                            <InfoFly
                                listByCondition={listByCondition}
                                setConditionSelect={setConditionSelect}
                                setAdultsPrice={setAdultsPrice}
                                setChildrenPrice={setChildrenPrice}
                                setInfantPrice={setInfantPrice}
                                setAdultsPriceFomat={setAdultsPriceFomat}
                                setChildrenPriceFomat={setChildrenPriceFomat}
                                setInfantPriceFomat={setInfantPriceFomat}
                                setTaxesfight={setTaxesfight}
                                setTaxesfightFomat={setTaxesfightFomat}
                                taxesfight={taxesfight}
                                setTotalFight={setTotalFight}
                                setTotalFightFomat={setTotalFightFomat}
                            />
                        }
                    </Col>
                    <Col span={9} >
                        <SelectInfoFly
                            listByCondition={listByCondition}
                            conditionSelect={conditionSelect}
                            adultsPrice={adultsPrice}
                            childrenPrice={childrenPrice}
                            infantPrice={infantPrice}
                            adultsPriceFomat={adultsPriceFomat}
                            childrenPriceFomat={childrenPriceFomat}
                            infantPriceFomat={infantPriceFomat}
                            taxesfightFomat={taxesfightFomat}
                            totalFightFomat={totalFightFomat}
                            //
                            listByConditionReturn={listByConditionReturn}
                            conditionSelectReturn={conditionSelectReturn}
                            adultsPriceReturn={adultsPriceReturn}
                            childrenPriceReturn={childrenPriceReturn}
                            infantPriceReturn={infantPriceReturn}
                            adultsPriceFomatReturn={adultsPriceFomatReturn}
                            childrenPriceFomatReturn={childrenPriceFomatReturn}
                            infantPriceFomatReturn={infantPriceFomatReturn}
                            taxesfightFomatReturn={taxesfightFomatReturn}
                        />
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Row>
                    <Col span={6}>

                    </Col>
                    <Col span={12} >
                        <Row>
                            <Col span={16} className='footer-price'>Tổng tiền:
                            </Col>
                            <Col span={8} className='footer-price'>{totalFightFomat}</Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue' onClick={() => handleContinue()} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectFlight;