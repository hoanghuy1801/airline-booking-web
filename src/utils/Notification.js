import React from 'react';
import { Button, notification, Space } from 'antd';


const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
        duration: 5,
    });
};

export { openNotification };