import moment from 'moment'
function formatCurrency(amount, locale = 'it-IT', currency = 'VND') {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
function formatDate(dateString) {
    const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD')
    return formattedDate
}
function formatDateString(dateString) {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`

    return formattedDate
}
function formatTime(dateString) {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`

    return formattedTime
}
const calculateTimeDifference = (arrivalTime, departureTime, lang) => {
    const arrivalMoment = moment(arrivalTime)
    const departureMoment = moment(departureTime)

    const duration = moment.duration(departureMoment.diff(arrivalMoment))

    const hours = Math.floor(duration.asHours())
    const minutes = duration.minutes()

    if (lang === 'en') {
        return `${hours} giờ ${minutes} phút`
    } else {
        return `${hours} giờ ${minutes} phút`
    }
}

function removeDiacritics(text, language) {
    if (language === 'en') {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    } else {
        return text
    }
}
function convertToJSON(obj) {
    const jsonString = JSON.stringify(obj)
    return jsonString
}
function convertString(array) {
    // Sử dụng phương thức join() để nối các số lại thành chuỗi mới
    const newString = array.join('')

    return newString
}
const formatTimeHHMM = (time) => {
    return moment(time).format('HH:mm DD/MM/YYYY')
}

export {
    formatCurrency,
    formatDate,
    removeDiacritics,
    convertToJSON,
    convertString,
    formatDateString,
    formatTime,
    calculateTimeDifference,
    formatTimeHHMM
}
