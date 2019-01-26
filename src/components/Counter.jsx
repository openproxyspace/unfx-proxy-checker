import React from 'react';

import '../../public/styles/Counter.postcss';

const Counter = ({ all, done, protocols }) => {
    const progressStyle = {
        width: Math.floor((done / all) * 100) + '%'
    };

    return (
        <div className="counter-container">
            <div className={`protocol http ${protocols.http ? 'active' : ''}`}>
                <div className="protocol-wrap">
                    <div className="type">Http</div>
                    <div className="count">{protocols.http}</div>
                </div>
            </div>
            <div className={`protocol http ${protocols.https ? 'active' : ''}`}>
                <div className="protocol-wrap">
                    <div className="type">Https</div>
                    <div className="count">{protocols.https}</div>
                </div>
            </div>
            <div className={`protocol socks ${protocols.socks4 ? 'active' : ''}`}>
                <div className="protocol-wrap">
                    <div className="type">Socks4</div>
                    <div className="count">{protocols.socks4}</div>
                </div>
            </div>
            <div className={`protocol socks ${protocols.socks5 ? 'active' : ''}`}>
                <div className="protocol-wrap">
                    <div className="type">Socks5</div>
                    <div className="count">{protocols.socks5}</div>
                </div>
            </div>
            <div className="progress">
                <div className="bar" style={progressStyle} />
                <h1>
                    Total checked {done} of {all}
                </h1>
            </div>
        </div>
    );
};

export default Counter;
