import React from 'react';
import { connect } from 'react-redux';
import { changeValue, loadFromTxt } from '../actions/InputActions';
import { getLinesCount, getContentSize } from '../misc/text';

import '../../public/styles/ProxyInput.postcss';

class ProxyInput extends React.Component {
    shouldComponentUpdate = nextProps => this.props.input != nextProps.input;

    onInputEvent = e => {
        const { changeValue } = this.props;
        changeValue(e.target.value);
    };

    render = () => {
        const { input, loadFromTxt } = this.props;

        return (
            <div className="proxy-input">
                <span>
                    <button onClick={loadFromTxt}>Load from txt</button>
                </span>
                <div className="metrics">
                    <div className="lines">Lines: {getLinesCount(input)}</div>
                    <div className="size">Size: {getContentSize(input)}</div>
                </div>
                <textarea
                    name="input"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    rows="10"
                    onChange={this.onInputEvent}
                    value={input}
                />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    input: state.input
});

const mapDispatchToProps = {
    changeValue,
    loadFromTxt
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProxyInput);
