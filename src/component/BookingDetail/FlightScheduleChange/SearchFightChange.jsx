import { Row, Col, Checkbox, Button } from 'antd';
import { IconPlane, IconUserCircle, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './SearchFightChange.css'
import { CaretRightOutlined } from '@ant-design/icons';
import FormSelectFlyService from '../../FormSelectFlyService/FormSelectFlyService';
import FormSearch from '../../Home/FormSearch/FormSearch';

const SearchFightChange = () => {
    const [listAirports, setListAirports] = useState([]);
    const [listAirportsCode, setListAirportCode] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fechListAirports();
    }, []);

    const fechListAirports = async () => {
        let res = await getAirports();
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    return (
        <div className='search-detail'>
            <div className="nav-service-detail">
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>
                    </Col>
                </Row>
            </div>
            <div className="main-fly-change">
                <FormSearch
                    listAirports={listAirports}
                    listAirportsCode={listAirportsCode}
                />
            </div>
            <div className="footer">
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={4}>
                        <Button className='footer-back'
                            onClick={() => { navigate('/my/select-fly-change') }} >Quay lại</Button>
                    </Col>
                    <Col span={12} >
                    </Col>
                    <Col span={6}>
                        <Button className='footer-continue'
                            onClick={() => { navigate('/my/select-flight-change') }} >Tiếp tục</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SearchFightChange;