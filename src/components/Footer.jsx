import React from 'react';
import { currentVersion } from '../core/updater';
import { openLink } from '../misc/other';
import LogoIcon from '../components/ui/LogoIcon';
import GitIcon from '../components/ui/GitIcon';
import DocIcon from '../components/ui/DocIcon';
import LicenseIcon from '../components/ui/LicenseIcon';

import '../../public/styles/Footer.postcss';

const Footer = ({ toggleModal }) => (
    <footer>
        <div className='links'>
            <a href='https://github.com/ProxyScrape/proxy-checker' title='Github Page' className='big' onClick={openLink}>
                <GitIcon />
                <span>Github</span>
            </a>
            <a href='https://proxyscrape.com/proxy-checker' title='Official Documentation' className='big' onClick={openLink}>
                <DocIcon />
                <span>Documentation</span>
            </a>
            <a href='#' title='License' className='big' onClick={toggleModal}>
                <LicenseIcon />
                <span>License</span>
            </a>
        </div>
        <div className='get-em'>
            <p>
                We have 60 000 premium datacenter proxies.
                <a href='https://proxyscrape.com/premium?ref=proxy-checker' onClick={openLink}>
                    <span>Get it all</span>
                </a>
            </p>
        </div>
        <div className='ops' data-version={`v${currentVersion}`}>
            <a href='https://proxyscrape.com/home' title='Official Website' onClick={openLink}>
                <img src="../icons/Logo-ProxyScrape-white.png" width="120" height="15.25"/>
            </a>
        </div>
    </footer>
);

export default Footer;
