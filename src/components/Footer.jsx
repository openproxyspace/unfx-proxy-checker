import React from 'react';
import { currentVersion } from '../core/updater';
import { openLink } from '../misc/other';
import LogoIcon from '../components/ui/LogoIcon';
import GitIcon from '../components/ui/GitIcon';
import DocIcon from '../components/ui/DocIcon';
import LicenseIcon from '../components/ui/LicenseIcon';

import '../../public/styles/Footer.postcss';

const Footer = ({ stats, toggleModal }) => (
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
            {/* <a className="d" href="https://utilify.me" title="Online Tools & Utilities" onClick={openLink}>
                <svg viewBox="0 0 512 512">
                    <path
                        d="M73.621 466.656L45.344 438.38 206.8 276.922l28.277 28.277zM512 28.277L483.723 0 293.277 190.445l28.278 28.278zM19.996 472.012C8.953 472.012 0 480.96 0 492.004 0 503.047 8.953 512 19.996 512s19.992-8.953 19.992-19.996-8.949-19.992-19.992-19.992zm243.93-241.934c-11.043 0-19.992 8.953-19.992 19.996s8.949 19.992 19.992 19.992 19.996-8.949 19.996-19.992-8.953-19.996-19.996-19.996zM372.063 28.254L343.738.024 45.32 299.44l28.325 28.227zM19.995 333.05C8.953 333.05 0 342 0 353.043s8.953 19.996 19.996 19.996 19.992-8.953 19.992-19.996-8.949-19.992-19.992-19.992zM512 172.234l-28.277-28.273-294.418 294.418 28.277 28.277zM163.953 472.012c-11.043 0-19.992 8.949-19.992 19.992 0 11.043 8.95 19.996 19.992 19.996s19.996-8.953 19.996-19.996-8.953-19.992-19.996-19.992zM512 308.199l-28.277-28.277-94.473 94.473 28.277 28.277zm-148.102 99.828c-11.043 0-19.992 8.953-19.992 19.996s8.95 19.997 19.992 19.997c11.043 0 19.997-8.954 19.997-19.997s-8.954-19.996-19.997-19.996zm-130.82-378.75L204.801 1 74.836 130.965l28.277 28.273zm-184.09 134.82c-11.043 0-19.996 8.95-19.996 19.993s8.953 19.996 19.996 19.996 19.992-8.953 19.992-19.996-8.949-19.992-19.992-19.992zm0 0"
                        data-original="#000000"
                        data-old_color="#2980b9"
                    ></path>
                </svg>
                Utilify Me
            </a> */}
        </div>
    </footer>
);

export default Footer;
