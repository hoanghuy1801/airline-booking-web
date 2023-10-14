import axios from '../../utils/awiosCustomize'
import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"
const PaymentReturn = () => {
    const location = useLocation()
    const [amount, setAmount] = useState()
    const [totalAmount, setTotalAmount] = useState(0)
    const [bookingCode, setBookingCode] = useState('')
    const data = useSelector((state) => state.homePage.homePageInfor);
    console.log(data)
    useEffect(() => {
        if (location.search) {
            const searchParams = new URLSearchParams(location.search)
            axios.get('api/v1/payment/vnpay-return' + location.search).then((res) => {
                if (res.status === 200) {
                    setAmount(searchParams.get('vnp_Amount'))
                    setBookingCode(searchParams.get('vnp_TxnRef'))
                    // api booking
                }
            })
        }
    }, [])

    return (
        <>
            {amount ? (
                <h3>
                    {' '}
                    Số tiền đã thanh toán là : {amount} , Mã đặt vé : {bookingId}
                </h3>
            ) : (
                <h3>Thanh toán thất bại</h3>
            )}</>
    )
}
export default PaymentReturn