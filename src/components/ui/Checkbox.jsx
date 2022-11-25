import React from 'react';
import CheckIcon from './CheckIcon';

const Checkbox = ({ id, name, checked, onChange, text }) => (
    <>
        <input className="input-checkbox" type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
        <label htmlFor={id} className="checkbox">
            <span>
                <CheckIcon/>
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
                <CheckIcon/>
            </span>
            <span>
                {text}
                <span className="count">{count}</span>
            </span>
        </label>
    </>
);

export default Checkbox;
