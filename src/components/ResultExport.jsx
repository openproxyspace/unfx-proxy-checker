import React from 'react';
import { getResultsInIpPort, getResultsInProtocolIpPort } from '../actions/ResultActions';

import CloseIcon from './ui/CloseIcon';
import '../../public/styles/ResultExport.postcss';

const ResultExport = ({ active, copy, items, type, authType, toggleExport, changeExportType, changeExportAuthType, save }) => {
    const hasItemsWithAuth = items.some(item => item.auth !== 'none');

    return (
        <div className={`export-container ${active ? 'active' : 'unactive'}`}>
            <div className='export-content'>
                <CloseIcon onChange={toggleExport}/>
                <div className='export-types'>
                    <div className='title'>Protocol Type</div>
                    <div className='items'>
                        <label>
                            <input type='radio' value={1} checked={type == 1} onChange={changeExportType} />
                            <div className='type-card'>
                                <div className='type-desc'>
                                    <span>Host</span>:<span>Port</span>
                                </div>
                                <textarea value={`Example:\r\n${getResultsInIpPort(items, authType)}.....`} rows='5' readOnly />
                            </div>
                        </label>
                        <label>
                            <input type='radio' value={2} checked={type == 2} onChange={changeExportType} />
                            <div className='type-card'>
                                <div className='type-desc'>
                                    <span>Protocol</span>://<span>Host</span>:<span>Port</span>
                                </div>
                                <textarea value={`Example:\r\n${getResultsInProtocolIpPort(items, authType)}.....`} rows='5' readOnly />
                            </div>
                        </label>
                    </div>
                </div>
                {hasItemsWithAuth ? (
                    <div className='export-types'>
                        <div className='title'>Auth Type</div>
                        <div className='items'>
                            <label>
                                <input type='radio' value={1} checked={authType == 1} onChange={changeExportAuthType} />
                                <div className='type-card'>
                                    <div className='type-desc'>
                                        <span>User:Pass</span>@<span>Host:Port</span>
                                    </div>
                                </div>
                            </label>
                            <label>
                                <input type='radio' value={2} checked={authType == 2} onChange={changeExportAuthType} />
                                <div className='type-card'>
                                    <div className='type-desc'>
                                        <span>Host:Port</span>:<span>User:Pass</span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                ) : null}
                <div className='buttons'>
                    <button onClick={save}>Save as .txt</button>
                    <button onClick={copy}>Copy To Clipboard</button>
                </div>
            </div>
        </div>
    );
};

export default ResultExport;
