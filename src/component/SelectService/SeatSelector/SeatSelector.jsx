import React, { useState } from "react";
import seatIcon from "../../../assets/service/favorite-seat_red.svg";
import selectedSeatIcon from "../../../assets/service/favorite-seat_yellow.svg";
import disabledSeatIcon from "../../../assets/service/favorite-seat_grey.svg";
import './SeatSelector.css'
import { Row, Col } from 'antd';


const Seat = ({ seatNumber, selectedSeat, onSelect, disabledSeats }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if (disabledSeats.includes(seatNumber)) {
            return; // Không cho phép chọn ghế bị vô hiệu hóa
        }

        setIsSelected(!isSelected); // Thay đổi trạng thái chọn ghế
        if (!isSelected) {
            onSelect(seatNumber); // Chỉ cho phép chọn một ghế duy nhất
        }
    };

    return (
        <div
            className={`seat ${selectedSeat === seatNumber ? "selected" : ""}`}
            onClick={handleClick}
        >
            <img className="imgseat"
                src={
                    selectedSeat === seatNumber
                        ? selectedSeatIcon
                        : disabledSeats.includes(seatNumber)
                            ? disabledSeatIcon
                            : seatIcon
                }
                alt="Seat"
            />
        </div>
    );
};

const SeatSelector = () => {
    const [selectedSeat, setSelectedSeat] = useState(null);
    const numRows = 15;
    const numColumns = 3;
    const disabledSeats = ["1A", "2B", "3C", '5C'];

    const handleSeatSelect = (seatNumber) => {
        setSelectedSeat(seatNumber);
    };

    return (
        <div>
            <div className="seat-container">
                <div>
                    {Array.from({ length: numColumns }).map((_, columnIndex) => {
                        const seatNumber = `${String.fromCharCode(65 + columnIndex)}`;
                        return (
                            <>
                                <span className="numberSeat">{seatNumber}</span>
                            </>
                        );
                    })}
                    <span className="numberseat"></span>
                    {Array.from({ length: numColumns }).map((_, columnIndex) => {
                        const seatNumber = `${String.fromCharCode(68 + columnIndex)}`;
                        return (
                            <>
                                <span className="numberSeat">{seatNumber}</span>
                            </>
                        );

                    })}
                </div>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 1}${String.fromCharCode(65 + columnIndex)}`;
                            return (
                                <Seat
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                />
                            );

                        })}
                        <h1 className="numberseat">
                            {rowIndex + 1}
                        </h1>
                        {Array.from({ length: numColumns }).map((_, columnIndex) => {
                            const seatNumber = `${rowIndex + 1}${String.fromCharCode(68 + columnIndex)}`;
                            return (
                                <Seat
                                    key={seatNumber}
                                    seatNumber={seatNumber}
                                    selectedSeat={selectedSeat}
                                    onSelect={handleSeatSelect}
                                    disabledSeats={disabledSeats}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <div>
                Selected Seat: {selectedSeat ? selectedSeat : "None"}
            </div>
        </div>
    );
};

export default SeatSelector;