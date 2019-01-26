import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { checkAtAvailable, close, download } from '../actions/UpdateActions';
import { bytesToSize } from '../misc/text';

import '../../public/styles/Update.postcss';

class Update extends React.PureComponent {
    componentWillMount = () => {
        const { checkAtAvailable } = this.props;
        checkAtAvailable();
    };

    render = () => {
        const { active, isAvailable, isChecking, onDownloading, downloadProgress, info, close, download } = this.props;
        const progress = {
            width: downloadProgress + '%'
        };

        return (
            <div className={active ? (onDownloading ? 'update-notify downloading' : isChecking ? 'update-notify checking' : 'update-notify') : 'update-notify closed'}>
                <div className="lds-ripple">
                    <div />
                    <div />
                </div>
                {isAvailable && (
                    <div className="update-container">
                        <span className="section-name">Update is available</span>
                        <div className="release-notes">
                            {info.releaseNotes.map(note => (
                                <div className="note">
                                    <span className="version">Release Notes for v{note.version}</span>
                                    <ReactMarkdown source={note.body} />
                                </div>
                            ))}
                        </div>
                        <span className="section-name">Downloads</span>
                        <div className="downloads">
                            <p>Windows</p>
                            {info.assets.windows.map(asset => (
                                <a key={asset.name} href={asset.browser_download_url} title={asset.name} onClick={download}>
                                    <span className="size">{bytesToSize(asset.size)}</span>
                                    {asset.name}
                                </a>
                            ))}
                            <p>Linux</p>
                            {info.assets.linux.map(asset => (
                                <a key={asset.name} href={asset.browser_download_url} title={asset.name} onClick={download}>
                                    <span className="size">{bytesToSize(asset.size)}</span>
                                    {asset.name}
                                </a>
                            ))}
                        </div>
                        <button onClick={close}>Ok</button>
                    </div>
                )}
                {onDownloading && (
                    <div className="download-progress">
                        <div className="download-progress-bar" style={progress} />
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
    checkAtAvailable,
    close,
    download
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Update);
