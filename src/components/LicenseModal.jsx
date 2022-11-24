import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { openLink } from '../misc/other';

import '../../public/styles/Modal.postcss';
import LicenseIcon from './ui/LicenseIcon';
import CloseIcon from './ui/CloseIcon';

const LicenseModal = memo(({ show, toggleModal }) => {
    return (
        <div className={`modal-info-wrap ${show && 'active'}`}>
            <div className='modal-content'>
                <CloseIcon onChange={toggleModal}/>
                <div className='section section-description'>
                    <div className="title">
                        <LicenseIcon />
                        <div>ProxyScrape is licensed under the <br /><span className="title-name"> MIT License </span></div>
                    </div>
                    <div className="content">
                        A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
                    </div>

                </div>
                <div className='section section-permissions'>
                    <div><span className="title-name"> Permissions </span></div>
                </div>
                <div className='section section-limitations'>
                    <div><span className="title-name"> Limitations </span></div>
                </div>
                <div className='section section-conditions'>
                    <div><span className="title-name"> Conditions </span></div>
                </div>
                <div className="section section-footer">
                    
                </div>
            </div>

        </div>
    );
});

export default LicenseModal;
