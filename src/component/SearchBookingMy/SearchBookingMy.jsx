import { Form, Input, Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBookingMy.css'
import diacriticless from 'diacriticless'
import { useDispatch } from 'react-redux'
import { setBookingDetail } from '../../redux/reducers/myFlight'
import { getBookingDetails } from '../../services/apiMyFlight'
import { Spin } from 'antd'
import { showWaringModal } from '../../utils/modalError'
import { useLanguage } from '../../LanguageProvider/LanguageProvider'
const SearchBookingMy = () => {
    const { getText } = useLanguage()
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [loading, setLoading] = useState(false)
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
        let data = {
            bookingCode: inputCode,
            firstName: inputFirstName,
            lastName: inputLastName
        }
        try {
            setLoading(true)
            let res = await getBookingDetails(data)
            if (res.status === 200) {
                dispath(setBookingDetail(res.data))
                navigate('/my/booking-detail')
            }
        } catch (error) {
            showWaringModal(`${getText('Notification')}`, error.response.data.error.message, `${getText('Close')}`)
        } finally {
            setLoading(false) // Dừng hiển thị Spinner khi API hoàn thành
        }
    }
    return (
        <div className='page-search-booking'>
            <div className='form-search-booking'>
                <p className='title'>{getText('myflight')}</p>
                <p className='notification'>{getText('Text_Notification_Myflight')}</p>
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
            </div>
        </div>
    )
}
export default SearchBookingMy
