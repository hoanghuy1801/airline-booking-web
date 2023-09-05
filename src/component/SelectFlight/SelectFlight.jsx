import { Row, Col, Button } from 'antd';
import '../SelectFlight/SelectFlight.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import InfoFly from './InfoFly/InfoFly';
import SelectInfoFly from './SelectInfoFly/SelectInfoFly';
import InfoAndStep from './InfoAndStep/InfoAndStep';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListByCondition } from '../../services/apiServices';
import { Data_Select } from '../../redux/action/SelectFight';


const SelectFlight = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
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



    const handleShapeClick = (index) => {
        setSelectedShapeIndex(index);
    };
    useEffect(() => {
        feachListByCondition();
    }, []);
    const data = useSelector(state => state.formsearch.data_booking);


    const feachListByCondition = async () => {
        let res = await getListByCondition(data.sourceAirport, data.destinationAirport, data.departureDate, data.seatClass, data.adult, data.children, data.baby);
        setListByCondition(res.data);
    }
    const data_select = {
        listByCondition: listByCondition,
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

    const handleContinue = () => {
        dispath(Data_Select(data_select))
        navigate('/select-fight-infor')
    }


    return (
        <div className="select-flight">
            <div className="info-flight">
                <InfoAndStep />
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
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