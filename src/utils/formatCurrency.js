function formatCurrency(amount, locale = 'it-IT', currency = 'VND') {
    return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
export { formatCurrency };