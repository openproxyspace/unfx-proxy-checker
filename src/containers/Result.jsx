import React from 'react';
import ResultListItem from '../components/ResultListItem';
import ResultCountries from '../components/ResultCountries';
import ResultBlacklist from '../components/ResultBlacklist';
import ResultItemsHeader from '../components/ResultItemsHeader';
import ResultExport from '../components/ResultExport';
import Checkbox from '../components/ui/Checkbox';
import { connect } from 'react-redux';
import {
    save,
    close,
    toggleAnon,
    toggleProtocol,
    toggleMisc,
    toggleCountry,
    onSearchInput,
    loadMore,
    toggleBlacklist,
    toggleCountries,
    setMaxTimeout,
    changePortsInput,
    allowPorts,
    disallowPorts,
    sortResults,
    toggleExport,
    changeExportType
} from '../actions/ResultActions';
import { getFilteredProxies } from '../store/selectors/getFilteredProxies';

import '../../public/styles/Result.postcss';
import '../../public/styles/Icons.postcss';

class Result extends React.PureComponent {
    isMoreAvailable = () => this.props.state.countOfResults < this.props.filteredItems.length;

    render = () => {
        const {
            state: { isOpened, anons, protocols, misc, search, countries, items, countOfResults, inBlacklists, timeout, ports, sorting, exporting },
            captureExtraData,
            keepAlive,
            close,
            save,
            onSearchInput,
            toggleAnon,
            toggleProtocol,
            toggleMisc,
            toggleCountry,
            loadMore,
            filteredItems,
            toggleBlacklist,
            toggleCountries,
            setMaxTimeout,
            changePortsInput,
            allowPorts,
            disallowPorts,
            sortResults,
            toggleExport,
            changeExportType
        } = this.props;

        const activeCountries = countries.items.filter(item => item.active);
        const displayActiveCountries =
            activeCountries.length == 0 ? 'Select countries' : countries.items.length == activeCountries.length ? 'All' : activeCountries.map(item => item.name).join(', ');

        return (
            <div className={`result-container ${isOpened ? 'opened' : ''}`}>
                <div className="result-content-pre">
                    <div className="result-content">
                        <input type="text" name="search" className="field search" onChange={onSearchInput} value={search} placeholder="Search" />
                        <div className="filters">
                            <div className="block middle">
                                <div className="title">
                                    <span className="name">Anons</span>
                                </div>
                                <div className="content">
                                    <Checkbox id="anon-transparent" name="transparent" checked={anons.transparent} onChange={toggleAnon} text="Transparent" />
                                    <Checkbox id="anon-anonymous" name="anonymous" checked={anons.anonymous} onChange={toggleAnon} text="Anonymous" />
                                    <Checkbox id="anon-elite" name="elite" checked={anons.elite} onChange={toggleAnon} text="Elite" />
                                </div>
                            </div>
                            <div className="block middle">
                                <div className="title">
                                    <span className="name">Protocols</span>
                                </div>
                                <div className="content">
                                    <Checkbox id="protocol-http" name="http" checked={protocols.http} onChange={toggleProtocol} text="Http" />
                                    <Checkbox id="protocol-https" name="https" checked={protocols.https} onChange={toggleProtocol} text="Https" />
                                    <Checkbox id="protocol-socks4" name="socks4" checked={protocols.socks4} onChange={toggleProtocol} text="Socks4" />
                                    <Checkbox id="protocol-socks5" name="socks5" checked={protocols.socks5} onChange={toggleProtocol} text="Socks5" />
                                </div>
                            </div>
                            {keepAlive && (
                                <div className="block middle">
                                    <div className="title">
                                        <span className="name">Misc</span>
                                    </div>
                                    <div className="content">
                                        <Checkbox id="misc-onlyKeepAlive" name="onlyKeepAlive" checked={misc.onlyKeepAlive} onChange={toggleMisc} text="Only Keep-Alive" />
                                    </div>
                                </div>
                            )}
                            {inBlacklists && inBlacklists.length > 0 && (
                                <div className="block middle">
                                    <div className="title">
                                        <span className="name">Blacklists</span>
                                    </div>
                                    <div className="content">
                                        <ResultBlacklist inBlacklists={inBlacklists} toggle={toggleBlacklist} />
                                    </div>
                                </div>
                            )}
                            <div className="block middle ports-filter slider">
                                <div className="title">
                                    <span className="name">Ports</span>
                                    <span className={`states ${ports.allow ? 'allow' : 'disallow'}`}>
                                        <span className="allow-key" onClick={allowPorts}>
                                            Allow
                                        </span>
                                        <span className="disallow-key" onClick={disallowPorts}>
                                            Disallow
                                        </span>
                                    </span>
                                </div>
                                <div className="content no-bot">
                                    <input type="text" className="field" placeholder="8080, 80, 3128" onChange={changePortsInput} value={ports.input} />
                                </div>
                            </div>
                            <div className="block middle slider">
                                <div className="title">
                                    <span className="name">Max timeout</span>
                                    <span className="value">{timeout.max} ms</span>
                                </div>
                                <div className="content">
                                    <input type="range" name="max-timeout" min={timeout.ranges.from} max={timeout.ranges.to} onChange={setMaxTimeout} value={timeout.max} />
                                </div>
                            </div>
                        </div>
                        <div className="up-panel">
                            <button className="open-countries-button" onClick={toggleCountries}>
                                {displayActiveCountries}
                            </button>
                            <div className="counters">
                                <div className="counter">Filtered: {filteredItems.length}</div>
                                <div className="counter">Total: {items.length}</div>
                            </div>
                        </div>
                        <ResultItemsHeader sortResults={sortResults} keepAlive={keepAlive} captureExtraData={captureExtraData} inBlacklists={inBlacklists} sorting={sorting} />
                        <div className="result-list">
                            {filteredItems.slice(0, countOfResults).map(item => (
                                <ResultListItem key={`${item.ip}:${item.port}`} {...item} />
                            ))}
                        </div>
                        {this.isMoreAvailable() && (
                            <button className="button-two load-more-button" onClick={loadMore}>
                                Load more
                            </button>
                        )}
                    </div>
                    <svg className="bottom-rocket" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 396.821 396.821">
                        <path d="M394.583,8.054c-0.422-3.413-3.11-6.101-6.522-6.523c-30.748-3.803-62.477-0.488-91.767,9.583c-29.293,10.072-56.355,26.973-78.258,48.876l-49.983,49.983l-72.149,9.305c-1.645,0.212-3.172,0.963-4.345,2.135l-69.563,69.563c-1.969,1.969-2.685,4.868-1.858,7.528c0.825,2.66,3.058,4.643,5.796,5.15l52.597,9.742l10.335,10.335l-22.003,11.915c-2.082,1.127-3.51,3.172-3.851,5.515s0.444,4.709,2.118,6.383l83.438,83.438c1.417,1.417,3.329,2.197,5.304,2.197c0.358,0,0.72-0.026,1.08-0.078c2.343-0.341,4.388-1.769,5.515-3.851l11.916-22.003l10.335,10.335l9.742,52.597c0.508,2.739,2.49,4.971,5.15,5.797c0.731,0.227,1.48,0.337,2.224,0.337c1.96,0,3.876-0.769,5.305-2.197l69.563-69.563c1.172-1.172,1.923-2.7,2.135-4.344l9.306-72.15l49.983-49.984c21.903-21.903,38.804-48.964,48.876-78.257C395.072,70.528,398.385,38.795,394.583,8.054z M79.674,198.355l-36.989-6.851l57.673-57.675l50.332-6.491L79.674,198.355zM152.065,313.268L82.846,244.05l17.085-9.252l61.385,61.386L152.065,313.268z M262.285,295.756l-57.674,57.674l-6.852-36.988l71.017-71.017L262.285,295.756z M325.517,167.471l-135.85,135.85l-96.874-96.874l135.85-135.851c19.738-19.739,44.002-35.076,70.287-44.49c3.395,17.492,11.948,33.719,24.654,46.424c12.705,12.706,28.931,21.259,46.424,24.655C360.593,123.468,345.255,147.732,325.517,167.471z M374.523,82.774c-15.203-2.593-29.345-9.863-40.333-20.85c-10.988-10.987-18.257-25.13-20.85-40.333c21.741-5.859,44.579-7.857,66.99-5.807C382.381,38.195,380.382,61.033,374.523,82.774z" />
                        <path d="M221.325,110.443c-17.74,17.741-17.74,46.606,0,64.347c8.871,8.871,20.521,13.305,32.174,13.305c11.649,0,23.304-4.436,32.173-13.305h0.001c17.74-17.74,17.74-46.606-0.001-64.347C267.931,92.703,239.065,92.704,221.325,110.443z M275.066,164.183c-11.894,11.893-31.244,11.891-43.134,0c-11.893-11.892-11.893-31.242,0-43.134c5.945-5.946,13.756-8.918,21.566-8.918c7.811,0,15.621,2.973,21.566,8.918C286.957,132.941,286.957,152.291,275.066,164.183z" />
                        <path d="M98.365,299.165c-2.93-2.929-7.678-2.929-10.607,0L23.41,363.512c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197s3.839-0.732,5.304-2.197l64.347-64.347C101.293,306.843,101.293,302.094,98.365,299.165z" />
                        <path d="M108.263,319.671l-28.991,28.991c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197s3.839-0.732,5.304-2.197l28.991-28.991c2.929-2.929,2.929-7.678,0-10.606C115.941,316.742,111.193,316.742,108.263,319.671z" />
                        <path d="M69.123,361.919c-3.138,0-6.002,2.024-7.062,4.973c-1.078,2.998-0.075,6.441,2.416,8.416c2.547,2.02,6.266,2.13,8.928,0.265c2.84-1.99,3.992-5.81,2.639-9.024C74.931,363.774,72.099,361.919,69.123,361.919z" />
                        <path d="M76.044,366.549C76.234,367,75.864,366.099,76.044,366.549L76.044,366.549z" />
                        <path d="M47.91,380.025l-3.992,3.992c-2.93,2.929-2.93,7.678-0.001,10.607c1.465,1.464,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196l3.992-3.992c2.93-2.929,2.93-7.678,0.001-10.606C55.588,377.099,50.838,377.096,47.91,380.025z" />
                        <path d="M42.502,314.014c-2.93-2.929-7.678-2.929-10.607,0L2.904,343.005c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197s3.839-0.732,5.304-2.197l28.991-28.991C45.431,321.692,45.431,316.943,42.502,314.014z" />
                        <path d="M54.472,311.136c3.043-0.765,5.327-3.417,5.644-6.537c0.311-3.055-1.369-6.049-4.096-7.427c-2.895-1.464-6.523-0.853-8.769,1.494c-2.405,2.513-2.752,6.426-0.852,9.335c-0.06-0.09-0.106-0.156,0.015,0.029c0.126,0.185,0.083,0.118,0.023,0.029C48.204,310.626,51.429,311.901,54.472,311.136z" />
                        <path d="M73.867,293.257l3.991-3.992c2.929-2.929,2.929-7.678-0.001-10.606c-2.932-2.93-7.681-2.929-10.606,0.001l-3.991,3.992c-2.929,2.929-2.929,7.678,0.001,10.606c1.465,1.464,3.384,2.196,5.303,2.196C70.483,295.454,72.403,294.722,73.867,293.257z" />
                        <animate attributeName="fill" values="#31bc86; #5396d8; #31bc86" dur="6s" repeatCount="indefinite" />
                    </svg>
                    <div className="bottom-block">
                        <button className="button-two save-button" onClick={toggleExport}>
                            Export
                        </button>
                        <button className="button-two new-check-button" onClick={close}>
                            Close
                        </button>
                    </div>
                </div>
                <ResultCountries {...countries} toggleCountries={toggleCountries} activeCount={activeCountries.length} toggle={toggleCountry} />
                <ResultExport {...exporting} items={filteredItems.slice(0, 3)} toggleExport={toggleExport} changeExportType={changeExportType} save={save} />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    filteredItems: getFilteredProxies(state),
    state: state.result,
    captureExtraData: state.core.captureExtraData,
    keepAlive: state.core.keepAlive
});

const mapDispatchToProps = {
    close,
    save,
    onSearchInput,
    toggleAnon,
    toggleProtocol,
    toggleMisc,
    toggleCountry,
    loadMore,
    toggleBlacklist,
    toggleCountries,
    setMaxTimeout,
    changePortsInput,
    allowPorts,
    disallowPorts,
    sortResults,
    toggleExport,
    changeExportType
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Result);
