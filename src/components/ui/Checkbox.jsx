import React from 'react';

const Checkbox = ({ id, name, checked, onChange, text }) => (
    <>
        <input className="input-checkbox" type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
        <label htmlFor={id} className="checkbox">
            <span>
                <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                </svg>
            </span>
            <span>{text}</span>
        </label>
    </>
);

export const CheckboxWithCount = ({ id, name, checked, onChange, text, count }) => (
    <>
        <input className="input-checkbox" type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
        <label htmlFor={id} className="checkbox">
            <span>
                <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1" />
                </svg>
            </span>
            <span>
                {text}
                <span className="count">{count}</span>
            </span>
        </label>
    </>
);

export default Checkbox;
