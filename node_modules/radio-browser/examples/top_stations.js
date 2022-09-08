'use strict'

const RadioBrowser = require('../')
const station = require('./station')

let filter = {
    by: 'topvote', // stations by topvote,
	limit: 5    // top 5 stations
}

RadioBrowser.getStations(filter)
    .then(data => {
        data.forEach((item) => station(item));
    })
    .catch(err => console.error(err))

