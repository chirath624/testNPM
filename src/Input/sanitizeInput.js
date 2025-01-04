import React, { useState } from 'react';
import DOMPurify from "dompurify";

const SanitizedInput = ({ type, placeholder, onChange, style, className, ...rest }) => {
    const [sanitizedValue, setSanitizedValue] = useState('');

    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const sanitizedInput = sanitizeInput(inputValue);
        setSanitizedValue(sanitizedInput);
        if (onChange) {
            onChange(sanitizedInput);
        }
    };

    const renderInput = () => {
        switch (type) {
            case 'text':
                return (
                    <input
                        placeholder={placeholder}
                        value={sanitizedValue}
                        onChange={handleChange}
                        style={style}
                        className={className}
                    />
                );
            case 'area':
                return (
                    <textarea
                        placeholder={placeholder}
                        value={sanitizedValue}
                        onChange={handleChange}
                        style={style}
                        className={className}
                    />
                );
            default:
                return null;
        }
    };

    return renderInput();
};

export default SanitizedInput;
