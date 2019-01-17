import React from 'react';
import Checkbox from './ui/Checkbox';

export default class JudgesItem extends React.PureComponent {
    toggleSSL = () => {
        const { change, url, ssl } = this.props;
        change(url, { ssl: !ssl });
    };

    toggleValidate = () => {
        const { change, url, validate } = this.props;
        const enabledState = validate.value.length > 0 ? !validate.enabled : false;

        change(url, {
            validate: {
                ...validate,
                enabled: enabledState
            }
        });
    };

    changeValidateString = e => {
        const { change, url } = this.props;
        const enabledState = e.target.value.length > 0 ? true : false;

        change(url, {
            validate: {
                enabled: enabledState,
                value: e.target.value
            }
        });
    };

    remove = () => {
        const { remove, url } = this.props;
        remove(url);
    };

    render = () => {
        const { url, ssl, validate } = this.props;

        return (
            <div className="item">
                <div className="sides">
                    <div className="left">
                        <Checkbox id={`ssl-${url}`} name={`ssl-${url}`} checked={ssl} onChange={this.toggleSSL} text="SSL" />
                        <Checkbox id={`validate-${url}`} name={`validate-${url}`} checked={validate.enabled} onChange={this.toggleValidate} text="Validate" />
                    </div>
                    <div className="right">
                        <div className="url-remove">
                            <span>{url}</span>
                            <svg className="close-svg" onClick={this.remove} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
                                <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249    C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306    C514.019,27.23,514.019,14.135,505.943,6.058z" />
                                <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636    c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z" />
                            </svg>
                        </div>
                        <input type="text" className="field" value={validate.value} onChange={this.changeValidateString} placeholder="Validate string (supports Regex)" />
                    </div>
                </div>
            </div>
        );
    };
}
