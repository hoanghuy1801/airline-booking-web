import { Row, Col, Radio, Collapse, Input, DatePicker, Select, Typography, Button } from 'antd';
import './Passenger.css'
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useLanguage } from '../../../LanguageProvider/LanguageProvider';
import { getCountries } from '../../../services/apiRegister';
import moment from 'moment';
const { Title, Text } = Typography;
const Passenger = (props) => {
    const { formData, setFormData, formDataChildren, setFormDataChildren, formDataBaby, setFormDataBaby } = props;
    const navigate = useNavigate();
    const { getText } = useLanguage();
    const [valueRadio, setValueRadio] = useState();

    const [inputLastName, setInputLastName] = useState('');

    const [inputFirstName, setInputFirstName] = useState('');

    const [listCountries, setListCountries] = useState([])
    useEffect(() => {
        fechListCountries();
    }, []);
    const fechListCountries = async () => {
        let res = await getCountries();
        if (res.status == 200) {
            setListCountries(res.data)
        }
    }

    const dispath = useDispatch();

    const data = useSelector((state) => state.homePage.homePageInfor);


    const handleFormChange = (field, value, index) => {
        const newFormData = [...formData];
        newFormData[index][field] = value;
        setFormData(newFormData);
    };
    const handleFormChangeChildren = (field, value, index) => {
        const newFormData = [...formDataChildren];
        newFormData[index][field] = value;
        setFormDataChildren(newFormData);
    };
    const handleFormChangeBaby = (field, value, index) => {
        const newFormData = [...formDataBaby];
        newFormData[index][field] = value;
        setFormDataBaby(newFormData);
    };
    const handleDateChange = (date, index) => {
        const formattedDate = moment(date.$d).format('YYYY-MM-DD');
        const newFormData = [...formData];
        newFormData[index]['dateBirth'] = formattedDate;
        setFormData(newFormData);

    };
    const handleDateChangeChildren = (date, index) => {
        const formattedDate = moment(date.$d).format('YYYY-MM-DD');
        const newFormData = [...formDataChildren];
        newFormData[index]['dateBirthChildren'] = formattedDate;
        setFormDataChildren(newFormData);
    };
    const handleDateChangeBaby = (date, index) => {
        const formattedDate = moment(date.$d).format('YYYY-MM-DD');
        const newFormData = [...formDataBaby];
        newFormData[index]['dateBirthBaby'] = formattedDate;
        setFormDataBaby(newFormData);
    };
    const handleSelectChange = (value, index) => {
        const newFormData = [...formData];
        newFormData[index]['nation'] = value;
        setFormData(newFormData);
    };

    return (
        <>
            <Text className='title'>{getText('PassengerInformation')}</Text>
            {formData.map((form, index) => (
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
                                            <Radio.Group value={form.gender}
                                                onChange={(e) => handleFormChange('gender', e.target.value, index)}
                                            >
                                                <Radio value='Male'>{getText('Male')}</Radio>
                                                <Radio value='Female'>{getText('Female')}</Radio>
                                                <Radio value='Other'>{getText('Other')}</Radio>
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
                                                        onChange={(e) => handleFormChange('fristName', e.target.value, index)}
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
                                                        onChange={(e) => handleFormChange('lastName', e.target.value, index)}
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
                                                    <DatePicker style={{ width: '90%' }} placeholder=''
                                                        onChange={(date) => handleDateChange(date, index)}
                                                        format="DD/MM/YYYY" />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Nation')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Select
                                                        showSearch
                                                        onChange={(value) => handleSelectChange(value, index)}
                                                        style={{ width: '91%', fontSize: 16, fontWeight: 500 }}
                                                        placeholder="Chọn quốc gia *"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                        filterSort={(optionA, optionB) =>
                                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                        }
                                                    >
                                                        {listCountries.map((item) => (
                                                            <Option key={item.countryCode} value={item.countryCode} label={item.countryName}>
                                                                {item.countryName}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Phone-number')}*</Text>
                                                </Row>
                                                <Row>
                                                    <Input style={{ width: '90%' }}
                                                        onChange={(e) => handleFormChange('phone', e.target.value, index)} />
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Text className='text-passenger'>Email*</Text>
                                                </Row>
                                                <Row>
                                                    <Input style={{ width: '90%' }}
                                                        onChange={(e) => handleFormChange('email', e.target.value, index)} />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='rowInforPassengers'>
                                            <Col span={24}>
                                                <Row>
                                                    <Text className='text-passenger'>{getText('Accommodation')}</Text>
                                                </Row>
                                                <Row>
                                                    <Input style={{ width: '95%' }}
                                                        onChange={(e) => handleFormChange('address', e.target.value, index)} />
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
                    {formDataChildren.map((form, index) => (
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
                                                    <Radio.Group value={form.genderChildren}
                                                        onChange={(e) => handleFormChangeChildren('genderChildren', e.target.value, index)}
                                                    >
                                                        <Radio value='Male'>{getText('Male')}</Radio>
                                                        <Radio value='Female'>{getText('Female')}</Radio>
                                                        <Radio value='Other'>{getText('Other')}</Radio>
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
                                                                onChange={(e) => handleFormChangeChildren('fristNameChildren', e.target.value, index)}
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
                                                                onChange={(e) => handleFormChangeChildren('lastNameChildren', e.target.value, index)} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Date-birth')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker style={{ width: '90%' }} placeholder=''
                                                                onChange={(date) => handleDateChangeChildren(date, index)}
                                                                format="DD/MM/YYYY" />
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
                    ))
                    }
                </div>
            }
            {data.baby == 0 ? ''
                :
                <div>
                    {formDataBaby.map((form, index) => (
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
                                                    <Radio.Group value={form.genderBaby}
                                                        onChange={(e) => handleFormChangeBaby('genderBaby', e.target.value, index)}
                                                    >
                                                        <Radio value='Male'>{getText('Male')}</Radio>
                                                        <Radio value='Female'>{getText('Female')}</Radio>
                                                        <Radio value='Other'>{getText('Other')}</Radio>
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
                                                                onChange={(e) => handleFormChangeBaby('fristNameBaby', e.target.value, index)}
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
                                                                onChange={(e) => handleFormChangeBaby('lastNameBaby', e.target.value, index)} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className='rowInforPassengers'>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Text className='text-passenger'>{getText('Date-birth')}*</Text>
                                                        </Row>
                                                        <Row>
                                                            <DatePicker style={{ width: '90%' }} placeholder=''
                                                                onChange={(date) => handleDateChangeBaby(date, index)}
                                                                format="DD/MM/YYYY" />
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
                    ))
                    }
                </div>
            }
        </>
    )
}
export default Passenger;