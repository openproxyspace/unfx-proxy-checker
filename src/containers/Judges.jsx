import React from 'react';
import { connect } from 'react-redux';
import { change, add, remove, toggleOption } from '../actions/JudgesActions';
import JudgesItem from '../components/JudgesItem';
import JudgesAddNew from '../components/JudgesAddNew';
import Checkbox from '../components/ui/Checkbox';

const Judges = ({ items, swap, change, add, remove, toggleOption }) => (
    <>
        <div className="block middle">
            <div className="title space-bot">
                <span className="name">Currently active</span>
            </div>
            <div className="content no-flex no-bot">
                <div className="judges-list">
                    <div className="items">
                        {items.map(item => (
                            <JudgesItem {...item} key={item.url} change={change} remove={remove} />
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
                    <Checkbox id="swap" name="swap" checked={swap} onChange={toggleOption} text="Swap" />
                </div>
            </div>
            <div className="sub-block">
                <div className="title space-bot">
                    <span className="name">Add new</span>
                </div>
                <div className="content no-flex no-bot">
                    <JudgesAddNew add={add} />
                </div>
            </div>
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.judges
});

const mapDispatchToProps = {
    change,
    add,
    remove,
    toggleOption
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Judges);
