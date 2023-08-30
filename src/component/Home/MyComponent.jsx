import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const MyComponent = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Show Modal
            </Button>
            <Modal
                title="Notification"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>This is a notification message.</p>
            </Modal>
        </>
    );
};

export default MyComponent;