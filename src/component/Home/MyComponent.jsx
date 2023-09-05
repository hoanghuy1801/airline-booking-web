import React from 'react';

const MyComponent = ({ value }) => {
    const formattedPrice = value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return <span>{formattedPrice}</span>;
};

export default MyComponent;