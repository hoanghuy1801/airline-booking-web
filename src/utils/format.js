
import moment from 'moment';
function formatCurrency(amount, locale = 'it-IT', currency = 'VND') {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
function formatDate(dateString) {
    const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
    return formattedDate;
}

function removeDiacritics(text, language) {
    if (language === 'en') {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
        return text;
    }
}
function convertToJSON(obj) {
    const jsonString = JSON.stringify(obj);
    return jsonString;
}
function convertString(array) {
    // Sử dụng phương thức join() để nối các số lại thành chuỗi mới
    const newString = array.join('');

    return newString;
};

export { formatCurrency, formatDate, removeDiacritics, convertToJSON, convertString };