import React from 'react';
import { getResultsInIpPort, getResultsInProtocolIpPort } from '../actions/ResultActions';

import '../../public/styles/ResultExport.postcss';

const ResultExport = ({ active, items, type, toggleExport, changeExportType, save }) => (
    <div className={`export-container ${active ? 'active' : 'unactive'}`}>
        <div className="export-content">
            <svg className="close-svg" onClick={toggleExport} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
                <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249    C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306    C514.019,27.23,514.019,14.135,505.943,6.058z" />
                <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636    c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z" />
            </svg>
            <div className="export-types">
                <label>
                    <input type="radio" name="product" value={1} checked={type == 1} onChange={changeExportType} />
                    <div className="type-card">
                        <div className="type-desc">
                            <span>Ip</span>:<span>Port</span>
                        </div>
                        <textarea value={`Example:\r\n${getResultsInIpPort(items)}.....`} rows="5" readOnly />
                    </div>
                </label>
                <label>
                    <input type="radio" name="product" value={2} checked={type == 2} onChange={changeExportType} />
                    <div className="type-card">
                        <div className="type-desc">
                            <span>Protocol</span>://<span>Ip</span>:<span>Port</span>
                        </div>
                        <textarea value={`Example:\r\n${getResultsInProtocolIpPort(items)}.....`} rows="5" readOnly />
                    </div>
                </label>
            </div>
            <button onClick={save}>Save</button>
        </div>
    </div>
);

export default ResultExport;
