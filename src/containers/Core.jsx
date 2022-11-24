import React from 'react';
import { connect } from 'react-redux';
import { changeOption, toggleOption, toggleProtocol } from '../actions/CoreActions';
import Checkbox from '../components/ui/Checkbox';
import { splitByKK } from '../misc/text';
import { getMaxThreads } from '../misc/other';

const Core = ({ protocols, captureFullData, captureServer, threads, timeout, retries, keepAlive, changeOption, toggleOption, toggleProtocol }) => (
    <>
        <div className='block middle'>
            <div className='title'>
                <span className='name'>Protocols</span>
            </div>
            <div className='content no-flex'>
                <Checkbox id='http-protocol' name='http' checked={protocols.http} onChange={toggleProtocol} text='Http' />
                <Checkbox id='https-protocol' name='https' checked={protocols.https} onChange={toggleProtocol} text='Https' />
                <Checkbox id='socks4-protocol' name='socks4' checked={protocols.socks4} onChange={toggleProtocol} text='Socks4' />
                <Checkbox id='socks5-protocol' name='socks5' checked={protocols.socks5} onChange={toggleProtocol} text='Socks5' />
            </div>
        </div>
        <div className='block small'>
            <div className='title'>
                <span className='name'>Data Capturing</span>
            </div>
            <div className='content no-flex'>
                <Checkbox id='captureFullData' name='captureFullData' checked={captureFullData} onChange={toggleOption} text='Full Data' />
                <Checkbox id='captureServer' name='captureServer' checked={captureServer} onChange={toggleOption} text='Server' />
            </div>
        </div>
        <div className='block small'>
            <div className='title'>
                <span className='name'>Options</span>
            </div>
            <div className='content no-flex'>
                <Checkbox id='core-k-a' name='keepAlive' checked={keepAlive} onChange={toggleOption} text='Keep-Alive' />
            </div>
        </div>
        <div className='blocks-row bottom'>
            <div className='block slider small'>
                <div className='title'>
                    <span className='name'>Threads</span>
                    <span className='value'>{threads}</span>
                </div>
                <div className='content'>
                    <input type='range' name='threads' min='1' max={getMaxThreads(protocols)} onChange={changeOption} value={threads} />
                </div>
            </div>
            <div className='block slider small'>
                <div className='title'>
                    <span className='name'>Retries</span>
                    <span className='value'>{retries > 0 ? retries : 'Off'}</span>
                </div>
                <div className='content'>
                    <input type='range' name='retries' min='0' max='10' onChange={changeOption} value={retries}/>
                </div>
            </div>
            <div className='block slider small'>
                <div className='title'>
                    <span className='name'>Timeout</span>
                    <span className='value'>{splitByKK(timeout)} ms</span>
                </div>
                <div className='content'>
                    <input type='range' name='timeout' min='1000' max='60000' step='100' onChange={changeOption} value={timeout} />
                </div>
            </div>
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.core
});

const mapDispatchToProps = {
    changeOption,
    toggleOption,
    toggleProtocol
};

export default connect(mapStateToProps, mapDispatchToProps)(Core);
