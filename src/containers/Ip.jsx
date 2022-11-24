import React from 'react';
import { connect } from 'react-redux';
import { changeOption } from '../actions/IpActions';
import { IpLookup } from '../actions/OverlayIpActions';

const Ip = ({ lookupUrl, current, changeOption, IpLookup }) => (
    <>
        <div className="block middle">
            <div className="title space-bot">
                <span className="name">Ip address lookup</span>
            </div>
            <div className="content no-bot">
                <input type="text" name="lookupUrl" className="field" placeholder="Url" onChange={changeOption} value={lookupUrl} />
            </div>
        </div>
        <div className="block sub-middle">
            <div className="sub-block">
                <div className="title space-bot">
                    <span className="name">Your ip is</span>
                </div>
                <div className="content no-bot">
                    <input type="text" name="current" className="field" placeholder="Your IP address" onChange={changeOption} value={current} />
                    <button className="ip-lookup-button" onClick={IpLookup}>
                        Check
                    </button>
                </div>
            </div>
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.ip
});

const mapDispatchToProps = {
    changeOption,
    IpLookup
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ip);
