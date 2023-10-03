
import moment from 'moment';
function formatCurrency(amount, locale = 'it-IT', currency = 'VND') {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
function formatDate(dateString) {
    const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
    return formattedDate;
}

export { formatCurrency, formatDate };