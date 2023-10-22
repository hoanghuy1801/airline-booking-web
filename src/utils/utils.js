function generateRandomID(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}
function calculateAge(birthdate, currentDate) {
    const birthdateObj = new Date(birthdate)
    const currentDateObj = currentDate ? new Date(currentDate) : new Date()

    const yearsDiff = currentDateObj.getFullYear() - birthdateObj.getFullYear()
    const birthdateMonth = birthdateObj.getMonth()
    const currentDateMonth = currentDateObj.getMonth()

    if (
        currentDateMonth < birthdateMonth ||
        (currentDateMonth === birthdateMonth && currentDateObj.getDate() < birthdateObj.getDate())
    ) {
        return yearsDiff - 1
    } else {
        return yearsDiff
    }
}
function convertGender(gender, language) {
    if (language === 'vi') {
        if (gender === 'MALE') {
            return 'ÔNG'
        } else if (gender === 'FEMALE') {
            return 'BÀ'
        } else {
            return ''
        }
    } else if (language === 'en') {
        if (gender === 'MALE') {
            return 'MR.'
        } else if (gender === 'FEMALE') {
            return 'MRS.'
        } else {
            return ''
        }
    } else {
        return ''
    }
}
export { generateRandomID, calculateAge, convertGender }
