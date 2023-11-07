import { useState } from 'react'
import numeral from 'numeral'
import { Input } from 'antd'

const MyForm = () => {
    const [price, setPrice] = useState(0)

    // Hàm xử lý khi người dùng thay đổi giá tiền trong input
    const handlePriceChange = (event) => {
        const inputValue = event.target.value

        // Kiểm tra xem người dùng đã nhập một số hợp lệ
        if (/^\d*\.?\d*$/.test(inputValue)) {
            setPrice(inputValue)
        }
    }

    // Định dạng giá tiền thành VND
    const formattedPrice = numeral(price).format('0,0 VND')

    // Hàm xử lý khi người dùng muốn sửa giá tiền đã định dạng
    const handleEditPrice = () => {
        // Chuyển đổi giá tiền đã định dạng thành giá trị số
        const numericPrice = numeral(price).value()
        setPrice(numericPrice)
    }

    return (
        <div>
            <div>
                <label>Giá tiền:</label>
                <Input type='text' value={formattedPrice} onChange={handlePriceChange} />
                <button onClick={handleEditPrice}>Sửa</button>
            </div>
        </div>
    )
}

export default MyForm
