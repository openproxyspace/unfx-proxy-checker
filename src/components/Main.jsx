import React from 'react';
import Settings from './Settings';
import Input from '../containers/Input';
import Checking from '../containers/Checking';
import Overlay from '../containers/Overlay';
import Update from '../containers/Update';
import Footer from './Footer';
import Result from '../containers/Result';

import '../../public/styles/Main.postcss';
import '../../public/styles/Elements.postcss';

const Main = () => (
    <div className="container">
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
);

export default Main;
