import React from 'react';
import Checkbox from './ui/Checkbox';

import CloseIcon from './ui/CloseIcon';
import DropDocIcon from './ui/DropDocIcon';

export default class BlacklistItem extends React.PureComponent {
    setActive = () => {
        const { setActive, active, title, path } = this.props;
        const activeState = path.length > 0 ? !active : false;
        setActive(title, activeState);
    };

    changePath = e => {
        const { changePath, setActive, title } = this.props;
        const activeState = e.target.value.length > 0 ? true : false;
        changePath(title, e.target.value);
        setActive(title, activeState);
    };

    selectPath = () => {
        const { selectPath, title } = this.props;
        selectPath(title);
    };

    remove = () => {
        const { remove, title } = this.props;
        remove(title);
    };

    render = () => {
        const { title, active, path } = this.props;

        return (
            <div className="item">
                <div className="title-remove">
                    <Checkbox id={`active-${title}`} name={`active-${title}`} checked={active} onChange={this.setActive} text={title} />
                    <CloseIcon onChange={this.remove}/>
                </div>
                <div className="path">
                    <input type="text" className="field" value={path} onChange={this.changePath} placeholder="URL or Select path" />
                    <button className="block-list-btn" onClick={this.selectPath}> 
                        <DropDocIcon scale="30"/>
                    </button>
                </div>
            </div>
        );
    };
}
