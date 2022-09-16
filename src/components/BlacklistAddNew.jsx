import React from 'react';
import { ipcRenderer } from 'electron';

export default class BlacklistAddNew extends React.PureComponent {
    state = {
        title: '',
        path: ''
    };

    changeTitle = e => this.setState({ title: e.target.value });

    changePath = e => this.setState({ path: e.target.value });

    selectPath = async () => {
        const path = await ipcRenderer.invoke('choose-path', 'open');

        if (path) {
            this.setState({ path });
        }
    };

    add = () => {
        if (this.state.title.length > 0 && this.state.path.length > 0) {
            const { add } = this.props;
            add(this.state.title, this.state.path);
        }
    };

    render = () => (
        <div className='blacklist-add-new'>
            <input type='text' className='field' onChange={this.changeTitle} value={this.state.title} placeholder='Title' />
            <div className='path'>
                <input type='text' className='field' onChange={this.changePath} value={this.state.path} placeholder='URL or Select path' />
                <button onClick={this.selectPath}>...</button>
            </div>
            <button className='blacklist-add-new-button' onClick={this.add}>
                Add
            </button>
        </div>
    );
}
