import { Row, Col, Form, Button } from 'antd';
import './SelectFlightInfor.css'
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckInfoFly from './CheckInfoFly/CheckInfoFly';
import SelectInfoFly from '../SelectFlight/SelectInfoFly/SelectInfoFly';
import InfoAndStep from '../SelectFlight/InfoAndStep/InfoAndStep';

const SelectFlightInfor = () => {
    const navigate = useNavigate();
    const data_homepage = useSelector(state => state.formsearch.data_booking);
    const dataSelect = useSelector(state => state.selectfight.data_select);


    return (
        <div className="select-flight">
            <div className="info-flight">
                <InfoAndStep />
            </div>
            <div className='mains-container'>
                <Row>
                    <Col span={15} className='infor-user-select-flight'>
                        <CheckInfoFly
                            dataSelect={dataSelect} />
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
                            totalFightFomat={dataSelect.totalFightFomat} />
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
                            onClick={() => { navigate('/passengers') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default SelectFlightInfor;