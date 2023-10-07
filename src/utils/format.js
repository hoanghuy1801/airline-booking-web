
import moment from 'moment';
import unidecode from 'unidecode';
function formatCurrency(amount, locale = 'it-IT', currency = 'VND') {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
function formatDate(dateString) {
    const formattedDate = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
    return formattedDate;
}


function removeVietnameseAccentsAndConvert(inputString, language) {
    if (language === 'en') {
        return unidecode(inputString);
    } else if (language === 'vi') {
        // Chuyển đổi từ tiếng Việt có dấu sang tiếng Việt không dấu
        const vietnameseWithAccents = "àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ";
        const vietnameseWithoutAccents = "aaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyyy";

        const resultArray = inputString.split('').map(char => {
            const index = vietnameseWithAccents.indexOf(char);
            return index !== -1 ? vietnameseWithoutAccents.charAt(index) : char;
        });

        return resultArray.join('');
    } else {
        return inputString;
    }
}
function removeDiacritics(text, language) {
    if (language === 'en') {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
        return text;
    }
}

export { formatCurrency, formatDate, removeVietnameseAccentsAndConvert, removeDiacritics };