import React, { useState } from 'react';

const RemoveDiacritics = () => {
    const [inputValues, setInputValues] = useState(['', '', '']);
    const numberadult = 3;
    const handleInputChange = (index, event) => {
        const newValues = [...inputValues];
        newValues[index] = event.target.value;
        setInputValues(newValues);
    };

    return (
        <div>
            <h2>Input List</h2>
            {numberadult.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(event) => handleInputChange(index, event)}
                />
            ))}
            <p>Input values: {inputValues.join(', ')}</p>
        </div>
    );
};

export default RemoveDiacritics;
