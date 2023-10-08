import { Row, Col, Radio, Collapse, Input, DatePicker, Select, Typography, Button } from 'antd';
import './Passenger.css'
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useLanguage } from '../../../LanguageProvider/LanguageProvider';
import { getCountries } from '../../../services/apiRegister';
const { Title, Text } = Typography;
const Passenger = () => {
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

    const numberadult = Array.from({ length: data.adult });

    const numberChildren = Array.from({ length: data.children });

    const numberbaby = Array.from({ length: data.baby });

    const TotalPeople = data.adult;

    const [formDataList, setFormDataList] = useState(2);

    const initialFormState = {
        gender: '',
        fristName: '',
        lastName: '',
        dateBirth: null,
        nation: '',
        phone: '',
        email: '',
        address: '',
    };
    const [formData, setFormData] = useState(
        Array.from({ length: formDataList }, () => ({ ...initialFormState }))
    );
    const handleFormChange = (field, value, index) => {
        const newFormData = [...formData];
        newFormData[index][field] = value;
        setFormData(newFormData);
    };
    const handleDateChange = (date, index) => {
        const newFormData = [...formData];
        newFormData[index]['dateBirth'] = date;
        setFormData(newFormData);
    };

    const handleSelectChange = (value, index) => {
        const newFormData = [...formData];
        newFormData[index]['nation'] = value;
        setFormData(newFormData);
    };
    const handleSubmit = () => {
        // Lấy thông tin từ formData và chuyển thành JSON
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);
    };
    const onChange = (e) => {
        setValueRadio(e.target.value);
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
                                                        value={form.dateBirth}
                                                        onChange={(date) => handleDateChange(date, index)} />
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
                                            <Button type="primary" onClick={handleSubmit}>
                                                Submit
                                            </Button>
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
        </>
    )
}
export default Passenger;