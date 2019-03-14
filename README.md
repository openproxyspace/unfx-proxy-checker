<p align="center">
    <img width="64px" src="https://i.ibb.co/pyQn5sJ/rocket-ship.png">
</p>

![](https://i.ibb.co/yP9q1Tt/0.png)
![](https://i.ibb.co/f02WP2H/3.png)

## Features
- Support protocols: `http`, `https`, `socks4`, `socks5`
- Data capturing:
  - All data
  - Server data
- Retry
- Multiple judges support:
  - Response validation
  - Swap
- Blacklists support:
  - Single ips
  - Ips with mask
- Country checking: `city`, `name`
- Keep-Alive checking
- Anonymity detection: `transparent`, `anonymous`, `elite`
- Sort by: `ip`, `port`, `protocols`, `anon`, `country`, `blacklists`, `keep-alive`, `server`, `timeout`
- Filter by: `port`, `protocols`, `anon`, `country`, `blacklists`, `keep-alive`, `server`, `timeout`
- Search by: `ip`, `port`, `server`
  - Country: `city`, `name`
- Export formats:
  - `ip` : `port`
  - `protocol` :// `ip` : `port`
- Auto updates support

## Core
Threads:
- Min `1`
- Max `500`

Timeout:
- Min `1000` ms
- Max `60000` ms

Data capturing:
- `Capture Full Data` - Capture and save all response data (`judge`, `body`, `timings`, `headers`) for looking at the results page
- `Capture Server` - Parses response body at server signatures:
  - Squid
  - Mikrotik
  - Tinyproxy
  - Litespeed
  - Varnish
  - Haproxy

Options:

`Retry` - Retries the check once, for each protocol separately.

## Judges
If judge URL starts with 'https://' will be used for HTTPS requests, with 'http://' for HTTP, SOCKS4, SOCKS5. 

**Validate Field:**  
If not empty - Enable response validation by text which you type. Response will be valid is this string was found in response body. Also support Regexes (Regex builds through Javascript RegExp).

Options:

`Swap` - Swaps the judge url after each request, for acceleration and keep min server busy. If disabled - uses judge with min response timeout.

Add new:

`Url` - Must be an unique.

## Ip
Ip address lookup:

`Url` - External server, which returned your `ip` in a raw data. Uses for proxy anon detection.

Your `ip` address will be cached before start the checking. Lookup starts only once. If you are changed `ip` address, press the `check` button for re-lookup.

## Blacklist
**If you really no need filtering through blacklist, don't enable this feature**. Loads CPU, and needs more time for prepare results.

Options:

`Filtering` - Enable filter through blacklists.

Add new:
- `Title` - Must be an unique
- `Url` or `Path` - Must be an unique

Ip addresses can be as `single` (127.0.0.1) or with `mask` (127.0.0.0/24).

Lists loads every time before start the checking (**Without progress overlay!**).

## Results
Ports:
- `Allow` - Allow only `input` ports
- `Disallow` - Remove `input` ports

**TIPS**:
- Export in `protocol` :// `ip` : `port`, always return proxies with protocols priority:
`socks5` -> `socks4` -> `http`
```
Example:
127.0.0.1:1337 is socks4, socks5 proxy.

Will saved as:
socks5://127.0.0.1:1337
```
- `Double click` - select or deselect all countries
- `Search` - may contain multi words, separated by `space`

## Updates
Checking for updates on each start and notification if latest version is available.  
For installed application update will be downloaded automatically and installed when app was closed or by click on 'Install' button.  
If you use portable application, download update is available manually (will download through your browser).

## Open Proxy Space Resource
- [Real-time Proxy List](https://openproxy.space) - It's Largest open proxy list database. Our proxy list updated in real-time.
- [Daily Fresh Proxy Lists](https://openproxy.space/lists/) - Daily fresh proxy lists archive. Easy sorting by countries. Dump alive proxies in 24 hour, splitted by protocols: socks4/5, http/s.
- [API](https://openproxy.space/api) - API documentation. Build own app based on our open proxy space.

## Unfx Proxy Tools
- [Unfx Proxy Checker](https://openproxy.space/software/proxy-checker) - Powerful proxy checker with huge features and beautiful design. Easy sorting and filtering by all parameters.
- [Unfx Proxy Parser](https://openproxy.space/software/proxy-parser) - Nextgen proxy parser with deep links crawler. Follow to internal links, third-party links. Sorting results by countries.
- [Unfx Proxy to Country](https://openproxy.space/software/proxy-to-country) - Tool for split your proxy list from ip:port format to countries. Simple sorting and exporting.

## IP Location database
This product includes GeoLite2 data created by MaxMind, available [here](https://dev.maxmind.com/geoip/geoip2/geolite2/).
