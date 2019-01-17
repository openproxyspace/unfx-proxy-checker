import React from 'react';

export default class ResultCountriesItem extends React.PureComponent {
    toggle = () => {
        const { toggle, name, active } = this.props;
        toggle(name, false, !active);
    };

    toggleAll = () => {
        const { toggle, name, active } = this.props;
        toggle(name, true, !active);
    };

    render = () => {
        const { name, active, count, flag } = this.props;

        return (
            <div className={`country-item ${active ? 'active' : 'unactive'}`} onClick={this.toggle} onDoubleClick={this.toggleAll}>
                <div className="ico-wrap">
                    <div className={`ico ${flag} png`} />
                </div>
                <div className="merge">
                    <div className="name">{name}</div>
                    <div className="count">Proxies: {count}</div>
                </div>
            </div>
        );
    };
}
