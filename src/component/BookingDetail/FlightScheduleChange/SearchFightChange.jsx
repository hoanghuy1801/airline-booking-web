import { Row, Col } from 'antd'

import { useState, useEffect } from 'react'
import { getAirports, getTickets } from '../../../services/apiHomePage'
import './Change.css'
import FormSearchChangeFly from '../FormSearchChangeFly/FormSearchChangeFly'
import { useSelector } from 'react-redux'
import { useLanguage } from '../../../LanguageProvider/LanguageProvider'

const SearchFightChange = () => {
    const { getText } = useLanguage()
    const [listAirports, setListAirports] = useState([])
    const [listSeats, setListSeats] = useState([])
    const bookingDetails = useSelector((state) => state.myFlight.bookingDetails?.bookingDetail)
    useEffect(() => {
        fechListAirports()
        fechListTickets()
    }, [])

    const fechListAirports = async () => {
        let res = await getAirports()
        if (res.status == 200) {
            setListAirports(res.data)
        }
    }
    const fechListTickets = async () => {
        let res = await getTickets()
        if (res.status == 200) {
            setListSeats(res.data)
        }
    }
    return (
        <div className='search-detail'>
            <div className='nav-service-detail'>
                <Row>
                    <Col span={24} className='code-booking-change'>
                        <p>
                            {getText('BOOKING_CODE')} :{' '}
                            <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>
                                {bookingDetails?.bookingCode}
                            </span>
                        </p>
                    </Col>
                </Row>
            </div>
            <div className='main-fly-change'>
                <FormSearchChangeFly listAirports={listAirports} listSeats={listSeats} />
            </div>
        </div>
    )
}
export default SearchFightChange
