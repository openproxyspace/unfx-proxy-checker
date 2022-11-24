import React from 'react';
import Checkbox from './ui/Checkbox';
import CloseIcon from './ui/CloseIcon';

export default class JudgesItem extends React.PureComponent {
    toggleActive = () => {
        const { change, url, active } = this.props;
        change(url, { active: !active });
    };

    changeValidateString = e => {
        const { change, url } = this.props;
        change(url, { validate: e.target.value });
    };

    remove = () => {
        const { remove, url } = this.props;
        remove(url);
    };

    render = () => {
        const { url, active, validate } = this.props;

        return (
            <div className="item">
                <div className="title-remove">
                    <Checkbox id={`active-${url}-judge`} name={`active-${url}-judge`} checked={active} onChange={this.toggleActive} text={url} />
                    <CloseIcon onChange={this.remove}/>
                </div>
                <input type="text" className="field" value={validate} onChange={this.changeValidateString} placeholder="Validate RegExp or String" />
            </div>
        );
    };
}
