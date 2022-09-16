import React from 'react';
import ResultListItem from '../components/ResultListItem';
import ResultCountries from '../components/ResultCountries';
import ResultBlacklist from '../components/ResultBlacklist';
import ResultItemsHeader from '../components/ResultItemsHeader';
import Footer from '../components/Footer';
import ResultExport from '../components/ResultExport';
import Checkbox from '../components/ui/Checkbox';
import { connect } from 'react-redux';
import {
    save,
    copy,
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
    changeExportType,
    changeExportAuthType
} from '../actions/ResultActions';
import { getFilteredProxies } from '../store/selectors/getFilteredProxies';
import { splitByKK } from '../misc/text';

import '../../public/styles/Result.postcss';
import '../../public/styles/Icons.postcss';

class Result extends React.PureComponent {
    isMoreAvailable = () => this.props.state.countOfResults < this.props.filteredItems.length;

    render = () => {
        const {
            state: { isOpened, anons, protocols, misc, search, countries, items, countOfResults, inBlacklists, timeout, ports, sorting, exporting },
            stats,
            captureServer,
            keepAlive,
            close,
            save,
            copy,
            onSearchInput,
            toggleAnon,
            toggleProtocol,
            toggleMisc,
            toggleCountry,
            loadMore,
            filteredItems,
            toggleBlacklist,
            toggleCountries,
            maxTimeoutRange,
            setMaxTimeout,
            changePortsInput,
            allowPorts,
            disallowPorts,
            sortResults,
            toggleExport,
            changeExportType,
            changeExportAuthType
        } = this.props;

        // if (!filteredItems) return;

        const activeCountries = countries.items.filter(item => item.active);
        const displayActiveCountries = activeCountries.length == 0 ? 'Select countries' : countries.items.length == activeCountries.length ? 'All' : activeCountries.map(item => item.name).join(', ');

        return (
            <div className={`result-container ${isOpened ? 'opened' : ''}`}>
                <div className='result-content-pre'>
                    <div className='result-content'>
                        <input type='text' name='search' className='field search' onChange={onSearchInput} value={search} placeholder='Search' />
                        <div className='filters'>
                            <div className='block middle'>
                                <div className='title'>
                                    <span className='name'>Anons</span>
                                </div>
                                <div className='content'>
                                    <Checkbox id='anon-transparent' name='transparent' checked={anons.transparent} onChange={toggleAnon} text='Transparent' />
                                    <Checkbox id='anon-anonymous' name='anonymous' checked={anons.anonymous} onChange={toggleAnon} text='Anonymous' />
                                    <Checkbox id='anon-elite' name='elite' checked={anons.elite} onChange={toggleAnon} text='Elite' />
                                </div>
                            </div>
                            <div className='block middle'>
                                <div className='title'>
                                    <span className='name'>Protocols</span>
                                </div>
                                <div className='content'>
                                    <Checkbox id='protocol-http' name='http' checked={protocols.http} onChange={toggleProtocol} text='Http' />
                                    <Checkbox id='protocol-https' name='https' checked={protocols.https} onChange={toggleProtocol} text='Https' />
                                    <Checkbox id='protocol-socks4' name='socks4' checked={protocols.socks4} onChange={toggleProtocol} text='Socks4' />
                                    <Checkbox id='protocol-socks5' name='socks5' checked={protocols.socks5} onChange={toggleProtocol} text='Socks5' />
                                </div>
                            </div>
                            {keepAlive && (
                                <div className='block middle'>
                                    <div className='title'>
                                        <span className='name'>Misc</span>
                                    </div>
                                    <div className='content'>
                                        <Checkbox id='misc-onlyKeepAlive' name='onlyKeepAlive' checked={misc.onlyKeepAlive} onChange={toggleMisc} text='Only Keep-Alive' />
                                    </div>
                                </div>
                            )}
                            {inBlacklists && inBlacklists.length > 0 && (
                                <div className='block middle'>
                                    <div className='title'>
                                        <span className='name'>Blacklists</span>
                                    </div>
                                    <div className='content'>
                                        <ResultBlacklist inBlacklists={inBlacklists} toggle={toggleBlacklist} />
                                    </div>
                                </div>
                            )}
                            <div className='block middle ports-filter slider'>
                                <div className='title'>
                                    <span className='name'>Ports</span>
                                    <span className={`states ${ports.allow ? 'allow' : 'disallow'}`}>
                                        <span className='allow-key' onClick={allowPorts}>
                                            Allow
                                        </span>
                                        <span className='disallow-key' onClick={disallowPorts}>
                                            Disallow
                                        </span>
                                    </span>
                                </div>
                                <div className='content no-bot'>
                                    <input type='text' className='field' placeholder='8080, 80, 3128' onChange={changePortsInput} value={ports.input} />
                                </div>
                            </div>
                            <div className='block middle slider'>
                                <div className='title'>
                                    <span className='name'>Max timeout</span>
                                    <span className='value'>{splitByKK(timeout)} ms</span>
                                </div>
                                <div className='content'>
                                    <input type='range' name='max-timeout' min='1000' max={maxTimeoutRange} step='100' onChange={setMaxTimeout} value={timeout} />
                                </div>
                            </div>
                        </div>
                        <div className='up-panel'>
                            <button className='open-countries-button' onClick={toggleCountries}>
                                {displayActiveCountries}
                            </button>
                            <div className='counters'>
                                <div className='counter'>Filtered: {splitByKK(filteredItems.length)}</div>
                                <div className='counter'>Total: {splitByKK(items.length)}</div>
                            </div>
                        </div>
                        <ResultItemsHeader sortResults={sortResults} keepAlive={keepAlive} captureServer={captureServer} inBlacklists={inBlacklists} sorting={sorting} />
                        <div className='result-list'>
                            {filteredItems.slice(0, countOfResults).map(item => (
                                <ResultListItem key={`${item.auth}@${item.host}:${item.port}`} {...item} />
                            ))}
                        </div>
                        {this.isMoreAvailable() && (
                            <button className='button-two load-more-button' onClick={loadMore}>
                                Load more
                            </button>
                        )}
                    </div>
                    <Footer stats={stats} />
                    <div className='bottom-block'>
                        <button className='button-two save-button' onClick={toggleExport}>
                            Export
                        </button>
                        <button className='button-two new-check-button' onClick={close}>
                            Close
                        </button>
                    </div>
                </div>
                <ResultCountries {...countries} toggleCountries={toggleCountries} activeCount={activeCountries.length} toggle={toggleCountry} />
                <ResultExport
                    {...exporting}
                    items={filteredItems.slice(0, 3)}
                    toggleExport={toggleExport}
                    changeExportType={changeExportType}
                    changeExportAuthType={changeExportAuthType}
                    save={save}
                    copy={copy}
                />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    filteredItems: getFilteredProxies(state),
    state: state.result,
    stats: state.main.stats,
    captureServer: state.core.captureServer,
    keepAlive: state.core.keepAlive,
    maxTimeoutRange: state.core.timeout
});

const mapDispatchToProps = {
    close,
    save,
    copy,
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
    changeExportType,
    changeExportAuthType
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
