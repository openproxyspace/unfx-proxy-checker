import React, { memo } from 'react';
import { splitByKK } from '../misc/text';

const CounterProtocol = memo(({ count, name, className }) => {
    if (count == undefined) return null;

    return (
        <div className={`protocol ${className} ${count > 0 ? 'active' : ''}`}>
            <div className="type">{name}:</div>
            <div className="count">{splitByKK(count)}</div>
        </div>
    );
});

export default CounterProtocol;
