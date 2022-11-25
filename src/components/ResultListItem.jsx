import React from 'react';
import ResultItemData from './ResultItemData';
import { splitByKK } from '../misc/text';

export default class ResultListItem extends React.PureComponent {
    state = {
        isDataOpened: false
    };

    toggleOpenData = e => {
        e.stopPropagation();

        if (!e.ctrlKey) {
            this.setState({ isDataOpened: !this.state.isDataOpened });
        }
    };

    getClass = ([protocol]) => (protocol.match(/http/) ? 'http' : 'socks');

    render = () => {
        const { host, ip, port, protocols, anon, country, timeout, keepAlive, server, data, blacklist } = this.props;

        return (
            <div className={`list-item ${this.getClass(protocols)}`}>
                <div className={`main-block ${data ? 'with-data' : 'no-data'}`} onClick={this.toggleOpenData}>
                    <div className='count'>
                        <span />
                    </div>
                    <div className='ip'>
                        {host} {host !== ip ? <span title='Real IP'>{ip}</span> : null}
                    </div>
                    <div className='port'>{port}</div>
                    <div className='protocols'>
                        {protocols.map(protocol => (
                            <span key={protocol}>{protocol}</span>
                        ))}
                    </div>
                    <div className='anon'>
                        <span>{anon}</span>
                    </div>
                    <div className='country'>
                        <div className='ico-wrap'>
                            <div className={`ico ${country.flag} png`} />
                        </div>
                        <div className='merged'>
                            <div className='name'>{country.name}</div>
                            <div className='city' title={country.city}>
                                {country.city}
                            </div>
                        </div>
                    </div>
                    <div className='blacklists'>
                        {blacklist && (
                            <div className='counts' title={blacklist.join('\n')}>
                                {blacklist.length}
                            </div>
                        )}
                    </div>
                    <div className='k-a'>{keepAlive && <span title='Connection: Keep-Alive'>K-A</span>}</div>
                    <div className='server'>{server && <span>{server}</span>}</div>
                    <div className='timeout'>{splitByKK(timeout)} ms</div>
                </div>
                {this.state.isDataOpened && <ResultItemData data={data} />}
            </div>
        );
    };
}
