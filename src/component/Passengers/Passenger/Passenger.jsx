import { Row, Col, Radio, Collapse, Input, DatePicker, Select, Typography } from 'antd';
import './Passenger.css'
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useLanguage } from '../../../LanguageProvider/LanguageProvider';
const { Title, Text } = Typography;
const Passenger = () => {
    const navigate = useNavigate();
    const { getText } = useLanguage();
    const [valueRadio, setValueRadio] = useState();

    const [inputLastName, setInputLastName] = useState('');

    const [inputFirstName, setInputFirstName] = useState('');


    const dispath = useDispatch();

    const data = useSelector((state) => state.homePage.homePageInfor);

    const numberadult = Array.from({ length: data.adult });

    const numberChildren = Array.from({ length: data.children });

    const numberbaby = Array.from({ length: data.baby });

    const onChange = (e) => {
        setValueRadio(e.target.value);
    };

    const handleInputLastName = (index, event) => {
        const newValues = [...inputLastName];
        newValues[index] = event.target.value;
        setInputLastName(newValues);

    };

    const handleInputFirstName = (index, event) => {
        const newValues = [...inputFirstName];
        newValues[index] = event.target.value;
        setInputFirstName(newValues);
    };
    return (
        <>
            <Text className='title'>{getText('PassengerInformation')}</Text>
            {numberadult.map((_, index) => (
                <div key={index}>
                    <Collapse
                        key='adult'
                        size="large"
                        items={[
                            {
                                key: { index },
                                label: <div style={{ fontSize: '18px', fontWeight: 600 }}>{getText('Adults')}</div>,
                                children:
                                    <div className='formPassengers'>
                                        <Row className='rowInforPassengers'>
                                            <Radio.Group onChange={onChange} value={valueRadio}>
                                                <Radio value='Nam'>{getText('Male')}</Radio>
                                                <Radio value='Nữ'>{getText('Female')}</Radio>
                                                <Radio value='Khác'>{getText('Other')}</Radio>
                                            </Radio.Group>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Surname')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        style={{ width: '90%' }}

                                                        onChange={(event) => handleInputLastName(index, event)}
                                                    />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Middle-name&first-name')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Input
                                                        style={{ width: '90%' }}

                                                        onChange={(event) => handleInputFirstName(index, event)}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Date-birth')}*</Text>
                                                </Row>
                                                <Row>
                                                    <DatePicker style={{ width: '90%' }} placeholder='' />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Nation')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Select
                                                        showSearch
                                                        style={{ width: '90%' }}
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                        filterSort={(optionA, optionB) =>
                                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                        }
                                                        options={[
                                                            {
                                                                value: '1',
                                                                label: 'SGN',
                                                            },
                                                            {
                                                                value: '2',
                                                                label: 'HN',
                                                            },
                                                        ]}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Phone-number')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Input style={{ width: '90%' }} />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Email*</Text>
                                                </Row>
                                                <Row>
                                                    <Input style={{ width: '90%' }} />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={24}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Accommodation')}</Text>
                                                </Row>
                                                <Row>
                                                    <Input style={{ width: '95%' }} />
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                            },
                        ]}
                        expandIconPosition='end'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            backgroundColor: '#F1F1F1',
                            marginTop: '10px'
                        }}
                    /></div>
            ))}
            {data.children == 0 ? ''
                :
                <div >
                    {numberChildren.map((_, index) => (
                        <div key={index}>
                            <Collapse
                                size="large"
                                items={[
                                    {
                                        key: '1',
                                        label: <div style={{ fontSize: '18px', fontWeight: 600 }}>{getText('Children')}</div>,
                                        children:
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Surname')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                onChange={(event) => handleInputLastName(index, event)}
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Middle-name&first-name')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Date-birth')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker style={{ width: '90%' }} placeholder='' />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Text className='text-passenger'>{getText('Gender')}</Text>
                                                        <Select
                                                            showSearch
                                                            style={{ width: '90%' }}
                                                            defaultValue='Nam'
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }

                                                            options={[
                                                                {
                                                                    value: '1',
                                                                    label: 'Nam',
                                                                },
                                                                {
                                                                    value: '2',
                                                                    label: 'Nữ',
                                                                },

                                                            ]}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                    },
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            /></div>
                    ))
                    }
                </div>
            }
            {data.baby == 0 ? ''
                :
                <div>
                    {numberbaby.map((_, index) => (
                        <div key={index}>
                            <Collapse
                                size="large"
                                items={[
                                    {
                                        key: '1',
                                        label: <div style={{ fontSize: '18px', fontWeight: 600 }}>{getText('Baby')}</div>,
                                        children:
                                            <div className='formPassengers'>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={24}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Fly-along')}</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input style={{ width: '95%' }} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Surname')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }}
                                                                onChange={(event) => handleInputLastName(index, event)}
                                                            />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Middle-name&first-name')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <Input
                                                                style={{ width: '90%' }} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Date-birth')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker style={{ width: '90%' }} placeholder='' />
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Text className='text-passenger'>{getText('Gender')}</Text>
                                                        <Select
                                                            showSearch
                                                            style={{ width: '90%' }}
                                                            defaultValue={1}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }

                                                            options={[
                                                                {
                                                                    value: '1',
                                                                    label: 'Nam',
                                                                },
                                                                {
                                                                    value: '2',
                                                                    label: 'Nữ',
                                                                },

                                                            ]}
                                                        />
                                                    </Col>
                                                </Row>

                                            </div>
                                    },
                                ]}
                                expandIconPosition='end'
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{
                                    backgroundColor: '#F1F1F1',
                                    marginTop: '10px'
                                }}
                            /></div>
                    ))
                    }
                </div>
            }
        </>
    )
}
export default Passenger;