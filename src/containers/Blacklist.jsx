import React from 'react';
import { connect } from 'react-redux';
import BlacklistItem from '../components/BlacklistItem';
import BlacklistAddNew from '../components/BlacklistAddNew';
import { changePath, add, remove, setActive, toggleOption, selectPath } from '../actions/BlacklistActions';
import Checkbox from '../components/ui/Checkbox';

const Blacklist = ({ filter, items, changePath, add, remove, setActive, toggleOption, selectPath }) => (
    <>
        <div className="block middle">
            <div className="title">
                <span className="name">Currently active</span>
            </div>
            <div className="content no-flex no-bot">
                <div className="black-list">
                    <div className="items">
                        {items.map(item => (
                            <BlacklistItem key={item.title} changePath={changePath} remove={remove} setActive={setActive} selectPath={selectPath} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="block middle">
            <div className="sub-block">
                <div className="title">
                    <span className="name">Options</span>
                </div>
                <div className="content no-flex">
                    <Checkbox id="filter" name="filter" checked={filter} onChange={toggleOption} text="Filtering" />
                </div>
            </div>
            <div className="sub-block">
                <div className="title">
                    <span className="name">Add new</span>
                </div>
                <div className="content no-flex no-bot">
                    <BlacklistAddNew add={add} />
                </div>
            </div>
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.blacklist
});

const mapDispatchToProps = {
    changePath,
    add,
    remove,
    setActive,
    toggleOption,
    selectPath
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blacklist);
