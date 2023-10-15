import React, { useState, useEffect } from 'react'
import seatBUSINESS from '../../../assets/service/favorite-seat_red.svg'
import seatPREMIUM_ECONOMY from '../../../assets/service/favorite-seat_green.svg'
import seatECONOMY from '../../../assets/service/favorite-seat_blue.svg'
import selectedSeatIcon from '../../../assets/service/favorite-seat_yellow.svg'
import disabledSeatIcon from '../../../assets/service/favorite-seat_grey.svg'
import './SeatSelector.css'
import { Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

const SeatBUSINESS = ({ seatNumber, selectedSeat, onSelect, disabledSeats, seatClass, selectedSeats, reload }) => {
    const [isSelected, setIsSelected] = useState(false)
    const data = useSelector((state) => state.homePage.homePageInfor)
    const handleClick = () => {
        if (disabledSeats.includes(seatNumber)) {
            return // Không cho phép chọn ghế bị vô hiệu hóa
        }

        setIsSelected(!isSelected) // Thay đổi trạng thái chọn ghế
        if (!isSelected) {
            onSelect(seatNumber) // Chỉ cho phép chọn một ghế duy nhất
        }
    }

    return (
        <div className={`seat ${selectedSeat === seatNumber ? 'selected' : ''}`} onClick={handleClick}>
            <img
                className="imgseat"
                src={
                    seatClass !== data.seatClass
                        ? disabledSeatIcon
                        : selectedSeats.includes(seatNumber)
                        ? disabledSeatIcon
                        : selectedSeat === seatNumber
                        ? selectedSeatIcon
                        : disabledSeats.includes(seatNumber)
                        ? disabledSeatIcon
                        : seatBUSINESS
                }
                alt="Seat"
            />
        </div>
    )
}
const SeatPREMIUM_ECONOMY = ({
    seatNumber,
    selectedSeat,
    onSelect,
    disabledSeats,
    seatClass,
    selectedSeats,
    reload
}) => {
    const [isSelected, setIsSelected] = useState(false)
    const data = useSelector((state) => state.homePage.homePageInfor)
    const handleClick = () => {
        if (disabledSeats.includes(seatNumber)) {
            return // Không cho phép chọn ghế bị vô hiệu hóa
        }

        setIsSelected(!isSelected) // Thay đổi trạng thái chọn ghế
        if (!isSelected) {
            onSelect(seatNumber) // Chỉ cho phép chọn một ghế duy nhất
        }
    }

    return (
        <div className={`seat ${selectedSeat === seatNumber ? 'selected' : ''}`} onClick={handleClick}>
            <img
                className="imgseat"
                src={
                    seatClass !== data.seatClass
                        ? disabledSeatIcon
                        : selectedSeats.includes(seatNumber)
                        ? disabledSeatIcon
                        : selectedSeat === seatNumber
                        ? selectedSeatIcon
                        : disabledSeats.includes(seatNumber)
                        ? disabledSeatIcon
                        : seatPREMIUM_ECONOMY
                }
                alt="Seat"
            />
        </div>
    )
}
const SeatECONOMY = ({ seatNumber, selectedSeat, onSelect, disabledSeats, seatClass, selectedSeats, reload }) => {
    const [isSelected, setIsSelected] = useState(false)
    const data = useSelector((state) => state.homePage.homePageInfor)
    const handleClick = () => {
        if (disabledSeats.includes(seatNumber)) {
            return // Không cho phép chọn ghế bị vô hiệu hóa
        }

        setIsSelected(!isSelected) // Thay đổi trạng thái chọn ghế
        if (!isSelected) {
            onSelect(seatNumber) // Chỉ cho phép chọn một ghế duy nhất
        }
    }

    return (
        <div className={`seat ${selectedSeat === seatNumber ? 'selected' : ''}`} onClick={handleClick}>
            <img
                className="imgseat"
                src={
                    seatClass !== data.seatClass
                        ? disabledSeatIcon
                        : selectedSeats.includes(seatNumber)
                        ? disabledSeatIcon
                        : selectedSeat === seatNumber
                        ? selectedSeatIcon
                        : disabledSeats.includes(seatNumber)
                        ? disabledSeatIcon
                        : seatECONOMY
                }
                alt="Seat"
            />
        </div>
    )
}

const SeatSelector = (props) => {
    const { seatOptions, selectedSeat, setSelectedSeat, setPriceSeat, selectedSeats } = props
    const numRowsBUSINESS = seatOptions.BUSINESS.seatNumber / 6
    const numRowsPREMIUM_ECONOMY = seatOptions.PREMIUM_ECONOMY.seatNumber / 6
    const numRowsECONOMY = seatOptions.ECONOMY.seatNumber / 6
    const numColumns = 3

    let disabledSeats = seatOptions.seatsInBooking + ',' + selectedSeats

    const data = useSelector((state) => state.homePage.homePageInfor)

    const handleSeatSelect = (seatNumber) => {
        setSelectedSeat(seatNumber)
        if (data.seatClass == 'ECONOMY') {
            setPriceSeat(seatOptions.ECONOMY.servicePrice)
        }
        if (data.seatClass == 'PREMIUM_ECONOMY') {
            setPriceSeat(seatOptions.PREMIUM_ECONOMY.servicePrice)
        }
        if (data.seatClass == 'BUSINESS') {
            setPriceSeat(seatOptions.BUSINESS.servicePrice)
        }
    }

    return (
        <div>
            <div className="seat-container">
                <div>
                    {Array.from({ length: numColumns }).map((_, columnIndex) => {
                        const seatString = `${String.fromCharCode(65 + columnIndex)}`
                        return (
                            <div key={columnIndex}>
                                <span className="seatString">{seatString}</span>
                            </div>
                        )
                    })}
                    <span className="numberseat"></span>
                    {Array.from({ length: numColumns }).map((_, columnIndex) => {
                        const seatString = `${String.fromCharCode(68 + columnIndex)}`
                        return (
                            <div key={columnIndex}>
                                <span key={columnIndex} className="seatStringRight">
                                    {seatString}
                                </span>
                            </div>
                        )
                    })}
                </div>
                {Array.from({ length: numRowsBUSINESS }).map((_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 1}${String.fromCharCode(65 + columnIndex)}`
                            return (
                                <SeatBUSINESS
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                    seatClass="BUSINESS"
                                    selectedSeats={selectedSeats}
                                />
                            )
                        })}
                        <h1 className="numberseat">{rowIndex + 1}</h1>
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 1}${String.fromCharCode(68 + columnIndex)}`
                            return (
                                <SeatBUSINESS
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                    seatClass="BUSINESS"
                                    selectedSeats={selectedSeats}
                                />
                            )
                        })}
                    </div>
                ))}
                {Array.from({ length: numRowsPREMIUM_ECONOMY }).map((_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 4}${String.fromCharCode(65 + columnIndex)}`
                            return (
                                <SeatPREMIUM_ECONOMY
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                    seatClass="PREMIUM_ECONOMY"
                                    selectedSeats={selectedSeats}
                                />
                            )
                        })}
                        <h1 className="numberseat">{rowIndex + 4}</h1>
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 4}${String.fromCharCode(68 + columnIndex)}`
                            return (
                                <SeatPREMIUM_ECONOMY
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                    seatClass="PREMIUM_ECONOMY"
                                    selectedSeats={selectedSeats}
                                />
                            )
                        })}
                    </div>
                ))}
                {Array.from({ length: numRowsECONOMY }).map((_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 7}${String.fromCharCode(65 + columnIndex)}`
                            return (
                                <SeatECONOMY
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                    seatClass="ECONOMY"
                                    selectedSeats={selectedSeats}
                                />
                            )
                        })}
                        <h1 className="numberseat">{rowIndex + 7}</h1>
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 7}${String.fromCharCode(68 + columnIndex)}`
                            return (
                                <SeatECONOMY
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                    seatClass="ECONOMY"
                                    selectedSeats={selectedSeats}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>

            <div>Selected Seat: {selectedSeat ? selectedSeat : 'None'}</div>
        </div>
    )
}

export default SeatSelector
