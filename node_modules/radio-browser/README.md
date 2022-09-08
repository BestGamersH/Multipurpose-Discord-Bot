# RadioBrowser API Client

Nodejs module for [Radio-browser API](https://de1.api.radio-browser.info/)

## Install

```bash
npm install radio-browser
```

## Usage

Every method returns a promise so you have to use `then` and `catch` or `async` and `await`.

```js
const RadioBrowser = require('radio-browser')

let filter = {
    limit: 5,          // list max 5 items
    by: 'tag',         // search in tag
    searchterm: 'jazz' // term in tag
}
RadioBrowser.getStations(filter)
    .then(data => console.log(data))
    .catch(error => console.error(error))
```

## Methods

* `addStation(<params>)` [Add radio station](https://de1.api.radio-browser.info/#Add_radio_station)
* `clickStation(<stationuuid>)` [Station click counter](https://de1.api.radio-browser.info/#Count_station_click)
* `getCategory(<category>[, filter])` Get a list of [codecs](https://de1.api.radio-browser.info/#List_of_codecs), [countries](https://de1.api.radio-browser.info/#List_of_countries), [countrycodes](https://de1.api.radio-browser.info/#List_of_countrycodes), [languages](https://de1.api.radio-browser.info/#List_of_languages), [states](https://de1.api.radio-browser.info/#List_of_states), [tags](https://de1.api.radio-browser.info/#List_of_tags)
* `getChecks([stationuuid][, seconds])` [List of station check results](https://de1.api.radio-browser.info/#List_of_station_check_results)
* `getChecksteps(<uuids>)` [List of station check steps](https://de1.api.radio-browser.info/#List_of_station_check_steps)
* `getClicks([stationuuid][, seconds])` [List of station clicks](https://de1.api.radio-browser.info/#List_of_station_clicks)
* `getRandomHost()` Convenience function to get a random host without api request.
* `getServerConfig()` [Server config](https://de1.api.radio-browser.info/#Server_config)
* `getServerMirrors()` [Server mirrors](https://de1.api.radio-browser.info/#Server_mirrors)
* `getServerStats()` [Server stats](https://de1.api.radio-browser.info/#Server_stats)
* `getStations([filter])` [List of radio stations](https://de1.api.radio-browser.info/#List_of_radio_stations), Stations by [clicks](https://de1.api.radio-browser.info/#Stations_by_clicks), [Url](https://de1.api.radio-browser.info/#Search_radio_stations_by_url),  [vote](https://de1.api.radio-browser.info/#Stations_by_votes), [recent click](https://de1.api.radio-browser.info/#Stations_by_recent_click), [recent changed](https://de1.api.radio-browser.info/#Stations_by_recently_changed), [deleted](https://de1.api.radio-browser.info/#Stations_that_got_deleted), [need improvements](https://de1.api.radio-browser.info/#Stations_that_need_improvements), [broken](https://de1.api.radio-browser.info/#Broken_stations)
* `searchStations([params])` [Advanced station search](https://de1.api.radio-browser.info/#Advanced_station_search)
* `voteStation(<stationuuid>)` [Vote for station](https://de1.api.radio-browser.info/#Vote_for_station)

## Properties

* `filter_by_types` list of types using in getStations({by: {type}, ...})
* `category_types` list of categories using in getCategory({type} ...)
* `service_url` get or set the api-url. Default is `null` to get a random API host at first request.

## Examples:

Get Server Stats from a random API-Host by using async/await

```js
// file: examples/server-stats.js

const RadioBrowser = require('radio-browser')

const start = async () => {
    try {
        let data = await RadioBrowser.getServerStats()
        console.log(`API Server: ${RadioBrowser.service_url}`)
        console.log('stats', data)
    }
    catch (e) {
        console.error(e)
    }
}

start()
```

```bash
// example output
API Server: https://de1.api.radio-browser.info/
stats { supported_version: 1,
  software_version: '0.6.14',
  status: 'OK',
  stations: 25603,
  stations_broken: 767,
  tags: 6757,
  clicks_last_hour: 2707,
  clicks_last_day: 59547,
  languages: 374,
  countries: 246 }
```

Get the 5 top voted station 

```js
let filter = {
	by: 'topvote', // stations by topvote
	limit: 5    // top 5 stations
}
RadioBrowser.getStations(filter)
    .then(data => console.log(data))
    .catch(err => console.error(err))
```

`data` looks like [this](https://de1.api.radio-browser.info/json/stations/topvote/5)
