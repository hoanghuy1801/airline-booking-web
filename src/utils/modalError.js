import { Modal } from 'antd';
function showErrorModal(title, content) {
    Modal.error({
        title: title,
        content: content,
    });
}
function showWaringModal(title, content) {
    Modal.warning({
        title: title,
        content: content,
    });
}
function showInfoModal(title, content) {
    Modal.info({
        title: title,
        content: content,
    });
}
function showSuccessModal(title, content) {
    Modal.success({
        title: title,
        content: content,
    });
}
export { showErrorModal, showWaringModal, showInfoModal, showSuccessModal };