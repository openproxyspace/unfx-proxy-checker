import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { openLink } from '../misc/other';

import '../../public/styles/Modal.postcss';
import LicenseIcon from './ui/LicenseIcon';
import CloseIcon from './ui/CloseIcon';
import CheckIcon from './ui/CheckIcon';
import XIcon from './ui/XIcon';
import PlusIcon from './ui/PlusIcon';

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
                    <div className="title"><span className="title-name"> Permissions </span></div>
                    <div className="content">
                        <div className="item-list">
                            <CheckIcon /> <div> Commercial Use</div>
                        </div>
                        <div className="item-list">
                            <CheckIcon /> <div> Modification</div>
                        </div>
                        <div className="item-list">
                            <CheckIcon /> <div> Distribution</div>
                        </div>
                        <div className="item-list">
                            <CheckIcon /> <div> Private Use</div>
                        </div>
                    </div>

                </div>
                <div className='section section-limitations'>
                    <div className="title"><span className="title-name"> Limitations </span></div>
                    <div className="content">
                        <div className="item-list">
                            <XIcon /> <div> Liability</div>
                        </div>
                        <div className="item-list">
                            <XIcon /> <div> Warranty</div>
                        </div>
                    </div>

                </div>
                <div className='section section-conditions'>
                    <div className="title"><span className="title-name"> Conditions </span></div>
                    <div className="content">
                        <div className="item-list">
                            <PlusIcon /> <div> License and copyright notice</div>
                        </div>
                    </div>

                </div>
                <div className="section section-footer">
                    <p>MIT License </p>

                    <p>Copyright (c) 2018 assnctr </p>

                    <p>Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the "Software"), to dealin the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions: </p>

                    <p>The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software. </p>

                    <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THESOFTWARE.</p>
                </div>
            </div>

        </div>
    );
});

export default LicenseModal;
