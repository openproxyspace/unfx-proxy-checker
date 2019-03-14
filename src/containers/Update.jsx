import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { checkAtAvailable } from '../actions/UpdateActions';
import { openLink } from '../misc/other';
import { ipcRenderer } from 'electron';

import '../../public/styles/Update.postcss';

class Update extends React.PureComponent {
    state = {
        downloadProgress: 0,
        isDownloaded: false
    };

    componentDidMount = () => {
        const { checkAtAvailable } = this.props;
        checkAtAvailable();

        ipcRenderer.on('update-download-progress', (event, percent) => {
            this.setState({ downloadProgress: Math.floor(percent) });
        });

        ipcRenderer.on('update-is-downloaded', () => {
            this.setState({ isDownloaded: true });
        });
    };

    install = () => {
        ipcRenderer.send('quit-and-install');
    };

    render = () => {
        const { active, isAvailable, isChecking, info } = this.props;

        const progressStyle = {
            width: this.state.downloadProgress + '%'
        };

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
                        ) : this.state.isDownloaded ? (
                            <button onClick={this.install}>Install</button>
                        ) : (
                            <div className="progress">
                                <div className="bar" style={progressStyle} />
                                <h1>Downloading {this.state.downloadProgress}%</h1>
                            </div>
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
