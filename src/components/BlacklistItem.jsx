import React from 'react';
import Checkbox from './ui/Checkbox';

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
                    <svg className="close-svg" onClick={this.remove} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
                        <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249    C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306    C514.019,27.23,514.019,14.135,505.943,6.058z" />
                        <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636    c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z" />
                    </svg>
                </div>
                <div className="path">
                    <input type="text" className="field" value={path} onChange={this.changePath} placeholder="URL or Select path" />
                    <button onClick={this.selectPath}>...</button>
                </div>
            </div>
        );
    };
}
