'use strict'

const RadioBrowser = require('../')
const station = require('./station')

let filter = {
    by: 'url', // stations by url,
    searchterm: 'http://stream.laut.fm/ruffneck-smille?ref=radiode'
}

RadioBrowser.getStations(filter)
    .then(data => data.forEach((item) => station(item)))
    .catch(err => console.error(err))
