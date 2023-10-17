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
    const flightSelectReturn = useSelector((state) => state.flightSelect.flightSelectReturn)
    //   console.log('flightSelect', flightSelect)
    console.log('dataPassengers', dataPassengers)
    const totalFlight = useSelector((state) => state.flightSelect.totalflight)

    useEffect(() => {
        if (location.search) {
            const searchParams = new URLSearchParams(location.search)
            axios.get('api/v1/payment/vnpay-return' + location.search).then(async (res) => {
                if (res.status === 200) {
                    setAmount(searchParams.get('vnp_Amount'))
                    setBookingCode(searchParams.get('vnp_TxnRef'))
                    if (!data.roundTrip) {
                        const passengers = dataPassengers.map((data) => {
                            const { id, baggage, meal, seats, ...passengers } = data
                            const serviceOpts = [...meal, baggage]
                            return {
                                ...passengers,
                                seats: [seats],
                                serviceOpts
                            }
                        })
                        let dataBooking = {
                            bookingCode: searchParams.get('vnp_TxnRef'),
                            flightAwayId: flightSelect?.id,
                            flightReturnId: null,
                            amountTotal: totalFlight,
                            seatTotal: 1,
                            journeyType: 'ONE_AWAY',
                            passengers
                        }
                        await postBooking(dataBooking)
                    } else {
                        const passengers = dataPassengers.map((data) => {
                            const { id, baggage, meal, seats, seatsReturn, baggageReturn, mealReturn, ...passengers } =
                                data
                            const serviceOpts = [...meal, baggage, baggageReturn, mealReturn]

                            return {
                                ...passengers,
                                seats: [seats, seatsReturn],
                                serviceOpts
                            }
                        })
                        let dataBooking = {
                            bookingCode: searchParams.get('vnp_TxnRef'),
                            flightAwayId: flightSelect?.id,
                            flightReturnId: flightSelectReturn?.id,
                            amountTotal: totalFlight,
                            seatTotal: 1,
                            journeyType: 'ONE_AWAY',
                            passengers
                        }
                        await postBooking(dataBooking)
                    }
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
