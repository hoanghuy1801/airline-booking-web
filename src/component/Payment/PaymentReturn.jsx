import axios from '../../utils/awiosCustomize'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { postBooking } from '../../services/apiBooking'
const PaymentReturn = () => {
    const location = useLocation()
    const [amount, setAmount] = useState()
    const [bookingCode, setBookingCode] = useState('')
    const data = useSelector((state) => state.homePage.homePageInfor)
    /// console.log('data', data)
    const dataPassengers = useSelector((state) => state.flightSelect.infoPassengers)
    const flightSelect = useSelector((state) => state.flightSelect.flightSelect)
    //   console.log('flightSelect', flightSelect)
    console.log('dataPassengers', dataPassengers)
    const totalFlight = useSelector((state) => state.flightSelect.totalflight)
    // console.log('totalFlight', totalFlight)
    // let passengers = [];
    // const handlePassengers = () => {
    //     for (let i = 0; i < Array(dataPassengers).length; i++) {
    //         dataPassengers[i].
    //     }
    // }

    const passengers = dataPassengers.map((data) => {
        const { id, baggage, meal, ...passengers } = data
        const serviceOpts = [...meal, baggage]
        return {
            ...passengers,
            serviceOpts
        }
    })

    useEffect(() => {
        if (location.search) {
            const searchParams = new URLSearchParams(location.search)
            axios.get('api/v1/payment/vnpay-return' + location.search).then(async (res) => {
                if (res.status === 200) {
                    setAmount(searchParams.get('vnp_Amount'))
                    setBookingCode(searchParams.get('vnp_TxnRef'))
                    let dataBooking = {
                        bookingCode: searchParams.get('vnp_TxnRef'),
                        flightAwayId: flightSelect?.id,
                        flightReturnId: null,
                        amountTotal: totalFlight,
                        seatTotal: 1,
                        journeyType: 'ONE_AWAY',
                        passengers
                    }
                    console.log(dataBooking)
                    await postBooking(dataBooking)
                }
            })
        }
    }, [])

    return (
        <>
            {amount ? (
                <h3>
                    Số tiền đã thanh toán là : {totalFlight} , Mã đặt vé : {bookingCode}
                </h3>
            ) : (
                <h3>Thanh toán thất bại</h3>
            )}
        </>
    )
}
export default PaymentReturn
