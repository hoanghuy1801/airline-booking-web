import { DatePicker } from 'antd'
import dayjs from 'dayjs'

const MyForm = () => {
    const date4 = dayjs().toDate()

    return <DatePicker value={date4} />
}
export default MyForm
