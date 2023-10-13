import React, { useState } from 'react';
import { Card, Row, Col, InputNumber, Button } from 'antd';

import imgMiy from '../../assets/BackRoud.png'

const mealOptions = [
    {
        id: 1,
        optionName: 'Món ăn 1',
        optionPrice: 10000,
    },
    {
        id: 2,
        optionName: 'Món ăn 2',
        optionPrice: 12000,
    },
];

function MyForm() {
    const [selectedMeals, setSelectedMeals] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleOrderClick = () => {
        // Lấy thông tin món ăn và số lượng đã chọn
        const selectedDetails = Object.keys(selectedMeals).map((optionName) => ({
            id: mealOptions.find((meal) => meal.optionName === optionName).id,
            quantity: selectedMeals[optionName],
        }));

        // Cập nhật danh sách chi tiết đơn hàng
        setOrderDetails(selectedDetails);
        console.log("huy", orderDetails)
        // Tính tổng tiền
        const newTotalPrice = selectedDetails.reduce((total, orderDetail) => {
            const meal = mealOptions.find((meal) => meal.id === orderDetail.id);
            return total + meal.optionPrice * orderDetail.quantity;
        }, 0);
        setTotalPrice(newTotalPrice);

    };

    const handleQuantityChange = (item, quantity) => {
        setSelectedMeals((prevSelectedMeals) => {
            const updatedSelectedMeals = { ...prevSelectedMeals };

            if (quantity === 0) {
                delete updatedSelectedMeals[item.optionName];
            } else {
                updatedSelectedMeals[item.optionName] = quantity;
            }

            return updatedSelectedMeals;
        });
    };

    return (
        <div>
            {mealOptions.map((item, index) => (
                <Card key={index} className='food-service-card'>
                    <Row>
                        <Col span={10}>
                            <img src={imgMiy} className='img-foods' alt='Food' />
                        </Col>
                        <Col span={14}>
                            <Row>
                                <span style={{ fontSize: '18px', fontWeight: 500, paddingTop: '10px' }}>{item.optionName}</span>
                            </Row>
                            <Row>
                                <i style={{ fontSize: '18px', fontWeight: 500, paddingTop: '5px', paddingLeft: '5px', color: 'red' }}>{item.optionPrice.toLocaleString('it-IT')} VND</i>
                            </Row>
                            <Row span={3}>
                                <div style={{ marginLeft: '220px', marginTop: '10px' }}>
                                    <label >Số lượng:</label>
                                    <InputNumber
                                        min={0}
                                        max={10}
                                        defaultValue={0}
                                        onChange={(value) => handleQuantityChange(item, value)}
                                        style={{
                                            width: '60px',
                                            marginLeft: '10px',
                                        }}
                                    />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            ))}
            <div>
                <Button type="primary" onClick={handleOrderClick}>
                    Đặt hàng
                </Button>
            </div>
            <div>
                <h2>Chi tiết đơn hàng:</h2>
                <ul>
                    {orderDetails.map((orderDetail) => (
                        <li key={orderDetail.id}>
                            Món ăn có ID: {orderDetail.id}, Số lượng: {orderDetail.quantity}
                        </li>
                    ))}
                </ul>
                <p>Tổng tiền: {totalPrice.toLocaleString('it-IT')} VND</p>
            </div>
        </div>
    );
}

export default MyForm;
