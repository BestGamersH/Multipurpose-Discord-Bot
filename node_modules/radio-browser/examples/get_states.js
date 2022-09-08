'use strict'

const RadioBrowser = require('..')

let filter = {
    searchterm: 'aus',
    reverse: true,
    order: 'stationcount'
}
RadioBrowser.getCategory('states', filter)
    .then(data => console.log(data))
    .catch(err => console.error(err))
