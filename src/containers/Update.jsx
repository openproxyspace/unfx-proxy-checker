import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { checkAtAvailable } from '../actions/UpdateActions';
import { shell } from 'electron';

import '../../public/styles/Update.postcss';

const openLink = e => {
    e.preventDefault();
    shell.openExternal(e.currentTarget.href);
};

class Update extends React.PureComponent {
    componentWillMount = () => {
        const { checkAtAvailable } = this.props;
        checkAtAvailable();
    };

    render = () => {
        const { active, isAvailable, isChecking, info } = this.props;

        return (
            <div className={active ? (isChecking ? 'update-notify checking' : 'update-notify') : 'update-notify closed'}>
                <div className="lds-ripple">
                    <div />
                    <div />
                </div>
                {isAvailable && (
                    <div className="update-container">
                        <span className="section-name">Update is available</span>
                        <div className="release-notes">
                            {info.releaseNotes.map(note => (
                                <div className="note" key={note.version}>
                                    <span className="version">Release Notes for v{note.version}</span>
                                    <ReactMarkdown source={note.body} />
                                </div>
                            ))}
                        </div>
                        {info.isPortable ? (
                            <a className="download-update" onClick={openLink} href={info.portableAsset.browser_download_url}>
                                Download
                            </a>
                        ) : (
                            <p>Update is downloading and will be installed automatically in silent mode.</p>
                        )}
                    </div>
                )}
            </div>
        );
    };
}

const mapStateToProps = state => ({
    ...state.update
});

const mapDispatchToProps = {
    checkAtAvailable
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Update);
