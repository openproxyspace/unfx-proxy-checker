import React from 'react';

import '../../public/styles/OverlayIp.postcss';

const OverlayIp = ({ isActive, currentIP, isLookupDone, isLookupSuccess }) => (
    <div className={`ip-lookup ${isActive ? 'opened' : ''}`}>
        <div className={`checking-status ${isLookupDone ? 'done' : 'processing'}`}>
            {!isLookupDone && (
                <svg viewBox="0 0 128 128">
                    <g transform="rotate(148.401 64 64)">
                        <path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" />
                        <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1000ms" repeatCount="indefinite" />
                    </g>
                </svg>
            )}
            {<div className="ip-address">{isLookupDone && (isLookupSuccess ? `Your IP address: ${currentIP}` : 'Ip lookup error. Please try change lookup address.')}</div>}
        </div>
    </div>
);

export default OverlayIp;
