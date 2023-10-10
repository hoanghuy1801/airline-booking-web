import React, { useState, useEffect } from 'react';
import { convertString } from '../../utils/format';

function MyForm() {
    const [timeLeft, setTimeLeft] = useState(120);
    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const huy = '7,6,2,7,9,5';
    console.log("huy", convertString(huy))
    return (
        <div>
            <h1>Đếm ngược: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        </div>
    );
}

export default MyForm;
