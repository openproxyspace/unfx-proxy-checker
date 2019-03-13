import React from 'react';

export default class ResultItemData extends React.Component {
    state = {
        full: false
    };

    viewFull = () => this.setState({ full: true });

    render = () => {
        const { data } = this.props;

        return data ? (
            <div className="data">
                {data.map(item => (
                    <div className={`protocol ${item.protocol}`} key={item.protocol}>
                        <h1 className="section">Details</h1>
                        <div className="item cap">
                            <div className="key">Protocol</div>
                            <div className="value">{item.protocol}</div>
                        </div>
                        <div className="item cap">
                            <div className="key">Anon</div>
                            <div className="value">{item.anon}</div>
                        </div>
                        <div className="item">
                            <div className="key">Judge</div>
                            <div className="value">{item.judge}</div>
                        </div>
                        <h1 className="section">Timings</h1>
                        <div className="item">
                            <div className="key">Lookup</div>
                            <div className="value">{item.timings.lookup}</div>
                        </div>
                        <div className="item">
                            <div className="key">Connect</div>
                            <div className="value">{item.timings.connect}</div>
                        </div>
                        <div className="item">
                            <div className="key">Socket</div>
                            <div className="value">{item.timings.socket}</div>
                        </div>
                        <div className="item">
                            <div className="key">Response</div>
                            <div className="value">{item.timings.response}</div>
                        </div>
                        <div className="item">
                            <div className="key">End</div>
                            <div className="value">{item.timings.end}</div>
                        </div>
                        {this.state.full || item.response.body.length < 800 ? (
                            <>
                                <h1 className="section">Response</h1>
                                <textarea value={item.response.body} readOnly />
                            </>
                        ) : (
                            <>
                                <h1 className="section">
                                    Response
                                    <button className="less" onClick={this.viewFull}>
                                        View full
                                    </button>
                                </h1>
                                <textarea value={`${item.response.body.slice(0, 800)}.....`} readOnly />
                            </>
                        )}
                        <h1 className="section">Headers</h1>
                        {Object.keys(item.response.headers).map(header => (
                            <div className="item" key={header}>
                                <div className="key">{header}</div>
                                <div className="value">{item.response.headers[header]}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ) : null;
    };
}
