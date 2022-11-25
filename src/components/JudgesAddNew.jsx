import React from 'react';
import { isURL } from '../misc/regexes';
import FillPlusIcon from './ui/FillPlusIcon';

export default class JudgesAddNew extends React.PureComponent {
    state = {
        url: ''
    };

    changeUrl = e => this.setState({ url: e.target.value });

    addUrl = () => {
        if (this.state.url.length > 0 && isURL(this.state.url)) {
            const { add } = this.props;
            add(this.state.url);
        }
    };

    render = () => (
        <div className="judges-add-new">
            <input type="text" className="field" onChange={this.changeUrl} value={this.state.url} placeholder="Url" />
            <div className="add-url-button" onClick={this.addUrl}>
                <FillPlusIcon />
            </div>
        </div>
    );
}
