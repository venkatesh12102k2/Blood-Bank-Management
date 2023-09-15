import React from 'react'

const InputType = ({
    labelFor,
    lableText,
    inputType,
    name,
    value,
    onChange
}) => {
    return (
        <>
            <div className="mb-1">
                <label htmlFor={labelFor} className="form-label">
                    {lableText}
                </label>
                <input 
                type={inputType} 
                className="form-control" 
                name={name}
                value={value}
                onChange={onChange}
                />
            </div>
        </>
    )
}

export default InputType
