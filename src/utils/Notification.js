import React from 'react';
import { Button, notification, Space } from 'antd';

const openNotification = (message, description) => {
    notification.open({
        message: message,
        description: description,
        duration: 5,
    });
};

export { openNotification };