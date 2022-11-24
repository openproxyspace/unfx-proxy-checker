import React from 'react';
import { ipcRenderer } from 'electron';
import DropDocIcon from './ui/DropDocIcon';

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
            
            <div className='path'>
                <input type='text' className='field' onChange={this.changePath} value={this.state.path} placeholder='URL or Select path' />
                <button className="block-list-btn" onClick={this.selectPath}><DropDocIcon scale="30"/></button>
            </div>
            <div className="path">
                <input type='text' className='field' onChange={this.changeTitle} value={this.state.title} placeholder='Title' />
                <button className='blacklist-add-new-button' onClick={this.add}>
                    Add
                </button>
            </div>
        </div>
    );
}
