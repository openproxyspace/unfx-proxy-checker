import React from 'react';
import Settings from '../components/Settings';
import Input from './Input';
import { connect } from 'react-redux';
import Checking from './Checking';
import Overlay from './Overlay';
import Update from './Update';
import Footer from '../components/Footer';
import Info from '../components/Info';
import LicenseModal from '../components/LicenseModal';
import Result from './Result';
import Titlebar from './Titlebar';
import { toggleDark } from '../actions/MainActions';

import '../../public/styles/Main.postcss';
import '../../public/styles/Elements.postcss';

class Main extends React.PureComponent {
    state = {
        showInfo: false,
        showModal: false,
    };

    toggleInfo = () => this.setState({ showInfo: !this.state.showInfo });
    toggleModal = () => this.setState({ showModal: !this.state.showModal });

    render = () => {
        const { dark, toggleDark, releases } = this.props;

        return (
            <>
                <Titlebar dark={dark} toggleInfo={this.toggleInfo} toggleDark={toggleDark} />
                <div className={`container ${dark ? 'dark' : ''}`}>
                    <div className="main-page-container">
                        <div className="main-page-content">
                            <Settings />
                            <Input />
                        </div>
                        <Footer toggleModal={this.toggleModal}/>
                    </div>
                    <Info show={this.state.showInfo} releases={releases} />
                    <LicenseModal show={this.state.showModal} toggleModal={this.toggleModal}/>
                    <Result />
                    <Checking />
                    <Overlay />
                    <Update />
                </div>
            </>
        );
    };
}

const mapStateToProps = state => ({
    ...state.main,
    releases: state.update.releases
});

const mapDispatchToProps = {
    toggleDark
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
