import React from 'react';
import CounterProtocol from './CounterProtocol';
import { splitByKK } from '../misc/text';

import '../../public/styles/Counter.postcss';

const Counter = ({ all, done, protocols: { http, https, socks4, socks5 } }) => {
    const progressStyle = {
        width: Math.floor((done / all) * 100) + '%'
    };

    return (
        <div className="counter-container">
            <CounterProtocol count={http} name="Http" className="http" />
            <CounterProtocol count={https} name="Https" className="http" />
            <CounterProtocol count={socks4} name="Socks4" className="socks" />
            <CounterProtocol count={socks5} name="Socks5" className="socks" />
            <div className="progress">
                <div className="bar" style={progressStyle} />
                <h1>
                    Total checked {splitByKK(done)} of {splitByKK(all)}
                </h1>
            </div>
        </div>
    );
};

export default Counter;
