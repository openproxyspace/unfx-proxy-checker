import React from 'react';
import Settings from '../components/Settings';
import Input from './Input';
import { connect } from 'react-redux';
import Checking from './Checking';
import Overlay from './Overlay';
import Update from './Update';
import Footer from '../components/Footer';
import Result from './Result';
import Titlebar from './Titlebar';
import { toggleDark } from '../actions/MainActions';

import '../../public/styles/Main.postcss';
import '../../public/styles/Elements.postcss';

const Main = ({ dark, toggleDark }) => (
    <>
        <Titlebar dark={dark} toggleDark={toggleDark} />
        <div className={`container ${dark ? 'dark' : ''}`}>
            <div className="main-page-container">
                <div className="main-page-content">
                    <Settings />
                    <Input />
                </div>
                <Footer />
            </div>
            <Result />
            <Checking />
            <Overlay />
            <Update />
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.main
});

const mapDispatchToProps = {
    toggleDark
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
