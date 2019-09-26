import React from 'react';
import Settings from '../components/Settings';
import Input from './Input';
import { connect } from 'react-redux';
import Checking from './Checking';
import Overlay from './Overlay';
import Update from './Update';
import Footer from '../components/Footer';
import Info from '../components/Info';
import Result from './Result';
import Titlebar from './Titlebar';
import { toggleDark, setFooterStats } from '../actions/MainActions';

import '../../public/styles/Main.postcss';
import '../../public/styles/Elements.postcss';

class Main extends React.PureComponent {
    state = {
        showInfo: false
    };

    componentDidMount = () => {
        const { setFooterStats } = this.props;
        setFooterStats();
    };

    toggleInfo = () => this.setState({ showInfo: !this.state.showInfo });

    render = () => {
        const { dark, toggleDark, stats, releases } = this.props;

        return (
            <>
                <Titlebar dark={dark} toggleInfo={this.toggleInfo} toggleDark={toggleDark} />
                <div className={`container ${dark ? 'dark' : ''}`}>
                    <div className="main-page-container">
                        <div className="main-page-content">
                            <Settings />
                            <Input />
                        </div>
                        <Footer stats={stats} />
                    </div>
                    <Info show={this.state.showInfo} releases={releases} />
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
    toggleDark,
    setFooterStats
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
