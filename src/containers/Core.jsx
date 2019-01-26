import React from 'react';
import { connect } from 'react-redux';
import { changeOption, toggleOption, toggleProtocol } from '../actions/CoreActions';
import Checkbox from '../components/ui/Checkbox';

const Core = ({ protocols, captureFullData, captureExtraData, threads, timeout, retry, keepAlive, changeOption, toggleOption, toggleProtocol }) => (
    <>
        <div className="block middle">
            <div className="title">
                <span className="name">Protocols</span>
            </div>
            <div className="content no-flex">
                <Checkbox id="http-protocol" name="http" checked={protocols.http} onChange={toggleProtocol} text="Http" />
                <Checkbox id="https-protocol" name="https" checked={protocols.https} onChange={toggleProtocol} text="Https" />
                <Checkbox id="socks4-protocol" name="socks4" checked={protocols.socks4} onChange={toggleProtocol} text="Socks4" />
                <Checkbox id="socks5-protocol" name="socks5" checked={protocols.socks5} onChange={toggleProtocol} text="Socks5" />
            </div>
        </div>
        <div className="block middle">
            <div className="title">
                <span className="name">Data capturing</span>
            </div>
            <div className="content no-flex">
                <Checkbox id="captureFullData" name="captureFullData" checked={captureFullData} onChange={toggleOption} text="Capture full data" />
                <Checkbox id="captureExtraData" name="captureExtraData" checked={captureExtraData} onChange={toggleOption} text="Capture extra data" />
            </div>
        </div>
        <div className="blocks-row bottom">
            <div className="block slider small">
                <div className="title">
                    <span className="name">Threads</span>
                    <span className="value">{threads}</span>
                </div>
                <div className="content">
                    <input type="range" name="threads" min="1" max="500" onChange={changeOption} value={threads} />
                </div>
            </div>
            <div className="block slider small">
                <div className="title">
                    <span className="name">Timeout</span>
                    <span className="value">{timeout} ms</span>
                </div>
                <div className="content">
                    <input type="range" name="timeout" min="1000" max="60000" onChange={changeOption} value={timeout} />
                </div>
            </div>
            <div className="block small">
                <div className="title">
                    <span className="name">Options</span>
                </div>
                <div className="content no-flex">
                    <Checkbox id="retry" name="retry" checked={retry} onChange={toggleOption} text="Retry" />
                    <Checkbox id="core-k-a" name="keepAlive" checked={keepAlive} onChange={toggleOption} text="Keep-Alive" />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Core);
