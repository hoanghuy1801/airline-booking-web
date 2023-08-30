import { useState } from 'react'
import './FormSearch.css'
import { useNavigate } from 'react-router-dom';
import {
    SearchOutlined,
} from '@ant-design/icons';
import { Radio, Form, Select, DatePicker, Space, Row, Col, InputNumber, Button, Image } from 'antd';
import {
    IconPlaneDeparture, IconPlaneArrival,
    IconCalendar, IconArrowsExchange2, IconMan, IconBabyBottle, IconMoodKid, IconArmchair
} from '@tabler/icons-react';
import { useDispatch } from "react-redux";
import { Data_booking } from '../../../redux/action/FormSearch';
const { RangePicker } = DatePicker;
const FormSearch = (props) => {
    const { listAirports, listTickets } = props;
    const [value, setValue] = useState(1);
    const [roundTrip, setRoundTrip] = useState(false);
    const [adult, setAdult] = useState(1);
    const [children, setChildren] = useState(0);
    const [baby, setBaby] = useState(0);
    const dispath = useDispatch();
    const navigate = useNavigate();



    const data_booking = {
        roundTrip: roundTrip,
        adult: adult,
        children: children,
        baby: baby
    }

    const handleSelectBooking = () => {
        dispath(Data_booking(data_booking))
        navigate('/select-fight')
    }
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            <Form className='buyForm'>
                <Form.Item >
                    <Radio.Group onChange={onChange} value={value}
                        className='radio'>
                        <Radio value={1} onClick={() => setRoundTrip(false)} >Một chiều</Radio>
                        <Radio value={2} onClick={() => setRoundTrip(true)} >Khứ hồi</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={11}><label>Từ</label></Col>
                        <Col span={2}></Col>
                        <Col span={11}><label>Đến</label></Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <IconPlaneDeparture className='icon-search' />
                            <Select
                                showSearch
                                style={{ width: 250 }}
                                placeholder="Điểm khởi hành"
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.cityName} label={item.cityName}>
                                        <Row>
                                            {item.cityName}    ({item.airportCode})
                                        </Row>
                                        <Row>
                                            {item.airportName}
                                        </Row>
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={2}><IconArrowsExchange2 style={{ color: '#006885' }} /></Col>
                        <Col span={11}>
                            <IconPlaneArrival className='icon-search' />
                            <Select
                                showSearch
                                style={{ width: 250 }}
                                placeholder="Điểm đến"
                            >
                                {listAirports.map((item) => (
                                    <Option key={item.id} value={item.cityName} label={item.cityName}>
                                        <Row>
                                            {item.cityName}    ({item.airportCode})
                                        </Row>
                                        <Row>
                                            {item.airportName}
                                        </Row>
                                    </Option>
                                ))}
                            </Select>

                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={11}>
                            <IconCalendar className='icon-search' />
                            <Space direction="vertical">
                                {roundTrip ?
                                    <RangePicker onChange={onChange} style={{ width: 250 }}
                                        placeholder={["Ngày đi", "Ngày về"]} />

                                    :
                                    <DatePicker onChange={onChange} style={{ width: 250 }}
                                        placeholder="Ngày đi" />
                                }
                            </Space>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <IconArmchair className='icon-search' />
                            <Select
                                showSearch
                                style={{ width: 250 }}
                                placeholder="Hạng ghế"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {listTickets.map((item) => (
                                    <Option key={item.id} value={item.id} label={item.ticketName}>
                                        <Row>
                                            {item.ticketName}
                                        </Row>
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <IconMan className='icon-search' />
                        <Col span={3}>
                            <label>Người lớn <br /> <label
                                className='label-children'>(12 tuổi trở lên)</label> </label>
                        </Col>
                        <Col span={4}>
                            <InputNumber min={1} max={9} defaultValue={1} onChange={(value) => setAdult(value)} />
                        </Col>
                        <IconMoodKid className='icon-search' />
                        <Col span={2}>
                            <label>Trẻ em <br /> <label
                                className='label-children'>(2-11 tuổi)</label> </label>
                        </Col>
                        <Col span={4}>
                            <InputNumber min={0} defaultValue={0} onChange={(value) => setChildren(value)} />
                        </Col>
                        <IconBabyBottle className='icon-search' />
                        <Col span={2}>
                            <label>Em bé <br /> <label
                                className='label-children'>(0-2 tuổi)</label></label>
                        </Col>
                        <Col span={4}>
                            <InputNumber min={0} max={adult} defaultValue={0} onChange={(value) => setBaby(value)} />
                        </Col>
                    </Row>

                </Form.Item>
                <Form.Item className='btn-form'>
                    <Button
                        className='btn-search'
                        icon={<SearchOutlined />}
                        type='link'
                        onClick={() => handleSelectBooking()}
                    >TÌM KIẾM CHUYẾN BAY</Button>


                </Form.Item>


            </Form>
        </>

    )

}
export default FormSearch;