import React from 'react';


function MyForm() {
    const seats = [];

    const rows = 40; // Số hàng
    const columns = 6; // Số cột (từ A đến F)

    for (let row = 4; row <= rows; row++) {
        for (let column = 'A'.charCodeAt(0); column <= 'F'.charCodeAt(0); column++) {
            const seat = row + String.fromCharCode(column);
            seats.push(seat);
        }
    }

    console.log(seats);

    return (
        <div>

            <a>huy</a>
        </div>
    );
}

export default MyForm;
