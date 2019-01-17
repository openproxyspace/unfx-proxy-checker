import React from 'react';
import { remote } from 'electron';

const { dialog } = remote;

export default class BlacklistAddNew extends React.PureComponent {
    state = {
        title: '',
        path: ''
    };

    changeTitle = e => this.setState({ title: e.target.value });

    changePath = e => this.setState({ path: e.target.value });

    selectPath = () => {
        let readPath = dialog.showOpenDialog({
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt']
                }
            ]
        });

        if (!readPath) return;

        this.setState({ path: readPath[0] });
    };

    add = () => {
        if (this.state.title.length > 0 && this.state.path.length > 0) {
            const { add } = this.props;
            add(this.state.title, this.state.path);
        }
    };

    render = () => (
        <div className="blacklist-add-new">
            <input type="text" className="field" onChange={this.changeTitle} value={this.state.title} placeholder="Title" />
            <div className="path">
                <input type="text" className="field" onChange={this.changePath} value={this.state.path} placeholder="URL or Select path" />
                <button onClick={this.selectPath}>...</button>
            </div>
            <button className="blacklist-add-new-button" onClick={this.add}>
                Add
            </button>
        </div>
    );
}
