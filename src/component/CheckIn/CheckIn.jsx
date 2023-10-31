import { Row, Col, Form, Input, Button, Spin } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../CheckIn/CheckIn.css'
import diacriticless from 'diacriticless'
import { showWaringModal } from '../../utils/modalError'
import { getBookingDetails } from '../../services/apiMyFlight'
import { setBookingDetail } from '../../redux/reducers/myFlight'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'

const CheckIn = () => {
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dispastch = useDispatch()
    const [inputCode, setInputCode] = useState('')
    const [inputLastName, setInputLastName] = useState('')
    const [inputFirstName, setInputFirstName] = useState('')
    const handleInputCode = (event) => {
        const value = event.target.value
        const sanitizedValue = diacriticless(value)
        setInputCode(sanitizedValue.toUpperCase())
    }
    const handleInputLastName = (event) => {
        const value = event.target.value
        const sanitizedValue = diacriticless(value)
        setInputLastName(sanitizedValue.toUpperCase())
    }
    const handleInputFirstName = (event) => {
        const value = event.target.value
        const sanitizedValue = diacriticless(value)
        setInputFirstName(sanitizedValue.toUpperCase())
    }
    const handleSearch = async () => {
        if (inputCode === '' || inputLastName === '' || inputFirstName === '') {
            showWaringModal(`${getText('HeyFriend')}`, `${getText('NotInfo')}`, `${getText('Close')}`)
            return
        }
        try {
            setLoading(true)
            let res = await getBookingDetails(inputCode, inputFirstName, inputLastName)
            if (res.status === 200) {
                dispastch(setBookingDetail(res.data))
                navigate('/my/select-fight')
            }
        } catch (error) {
            showWaringModal(`${getText('Notification')}`, error.response.data.error.message, `${getText('Close')}`)
        } finally {
            setLoading(false) // Dừng hiển thị Spinner khi API hoàn thành
        }
    }
    return (
        <div className='page-checkin'>
            <Row className='main-checkin'>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className='form-search-checkin'>
                    <p className='title'>CHECK-IN</p>
                    <p className='notification'>{getText('textCheckin')}</p>
                    <Form>
                        <Form.Item>
                            <label className='lable-form'>
                                {getText('BOOKING_CODE')} <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Input className='input-form' onChange={handleInputCode} value={inputCode} />
                            <label className='lable-form'>
                                {getText('Surname')} <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Input className='input-form' onChange={handleInputLastName} value={inputLastName} />
                            <label className='lable-form'>
                                {getText('Middle-name&first-name')} <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Input className='input-form' onChange={handleInputFirstName} value={inputFirstName} />
                        </Form.Item>
                        {loading ? (
                            <>
                                <div className='form-btn-myflight'>
                                    <Button className='btn-search-booking' onClick={() => handleSearch()}>
                                        {getText('Search')}
                                    </Button>
                                    <Spin size='large' className='spin-myflight' style={{ paddingLeft: 20 }} />
                                </div>
                            </>
                        ) : (
                            <div className='form-btn-myflight'>
                                <Button className='btn-search-booking' onClick={() => handleSearch()}>
                                    {getText('Search')}
                                </Button>
                            </div>
                        )}
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
export default CheckIn
