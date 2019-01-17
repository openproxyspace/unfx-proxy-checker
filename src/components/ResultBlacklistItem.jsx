import React from 'react';
import { CheckboxWithCount } from './ui/Checkbox';

export default class ResultBlacklistItem extends React.PureComponent {
    toggle = () => {
        const { toggle, title } = this.props;
        toggle(title);
    };

    render = () => {
        const { active, title, count } = this.props;

        return <CheckboxWithCount id={`in-blacklist-${title}`} name={`in-blacklist-${title}`} checked={active} onChange={this.toggle} text={title} count={count} />;
    };
}
