import React, { useState } from 'react'
import { DatePicker, Button, message } from 'antd'

function MyForm() {
    const [selectedDate, setSelectedDate] = useState(null)

    const handleDateChange = (date) => {
        const currentDate = new Date()
        const selectedDate = new Date(date)

        // Tính toán tuổi dựa trên ngày sinh và ngày hiện tại
        const ageInMilliseconds = currentDate - selectedDate
        const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000) // Sử dụng năm nhuận
        if (ageInYears > 2) {
            message.error('Vui lòng chọn ngày sinh hợp lệ (dưới 2 tuổi).')
        } else {
            setSelectedDate(date)
        }
    }

    return (
        <div>
            <DatePicker onChange={handleDateChange} />
            <Button onClick={() => setSelectedDate(null)}>Xóa</Button>
        </div>
    )
}

export default MyForm
