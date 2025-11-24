import React from 'react';
import { currentVersion } from '../core/updater';
import { openLink } from '../misc/other';

import '../../public/styles/Footer.postcss';

const Footer = ({ stats }) => (
    <footer>
        <div className='ops' data-version={`v${currentVersion}`}>
            <span>hproxy</span>
        </div>
    </footer>
);

export default Footer;
