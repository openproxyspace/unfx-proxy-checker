<p align="center">
    <img width="120px" src="https://i.ibb.co/pyQn5sJ/rocket-ship.png">
</p>

![](https://openproxy.space/_nuxt/img/0631711.png)
![](https://openproxy.space/_nuxt/img/216e07b.png)
![](https://openproxy.space/_nuxt/img/63ff67a.png)

## Features
- Support protocols: `http`, `https`, `socks4`, `socks5`
- Data capturing:
  - Extra data
  - All data
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
- Sort by: `ip`, `port`, `protocols`, `anon`, `country`, `blacklists`, `keep-alive`, `extra`, `timeout`
- Filter by: `port`, `protocols`, `anon`, `country`, `blacklists`, `keep-alive`, `extra`, `timeout`
- Search by: `ip`, `port`
  - Country: `city`, `name`
- Export formats:
  - `ip` : `port`
  - `protocol` :// `ip` : `port`
- Automatically checking for updates

## Core
Threads:
- Min `1`
- Max `500`

Timeout:
- Min `1000` ms
- Max `60000` ms

Data capturing:
- `Capture full data` - Capture and save all response data (`judge`, `body`, `timings`, `headers`) for looking at the results page
- `Capture extra data` - Parses response body at server signatures:
  - Checking connection:
    - Keep-Alive
    - Close
  - Proxy types:
    - Mikrotik
    - Squid
  - Server:
    - Apache
    - Nginx
  - OS:
    - Ubuntu
    - CentOS

Options:

`Retry` - Retries the check once, for each protocol separately.

## Judges
Currently active:
- `SSL` - Use this judge only for HTTPS requests. If disabled - uses as 'usual' for HTTP/SOCKS4/SOCKS5
- `Validate` - Enable response validation
- `Validate String` - Response will be valid is this string was found in response body

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
Automatically checking for updates and notification if the latest version is available.

## Openproxy.space resource:
* [Open Proxy Space](https://openproxy.space) - It's Largest open proxy lists database. Our proxy lists updated in real-time.
* [Daily Proxy Lists](https://openproxy.space/lists/) - Daily updated proxy lists archive. Dump from database. Sorted by protocols.
* [API](https://openproxy.space/api) - Openproxy api, build own app based on our open proxy space.

## IP Location database
This product includes GeoLite2 data created by MaxMind, available [here](https://dev.maxmind.com/geoip/geoip2/geolite2/).
