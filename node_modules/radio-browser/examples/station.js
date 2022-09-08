'use strict'

module.exports = function(station)
{
    console.log(`${station.name}\nStation UUID: ${station.stationuuid}\nStream: ${station.url}\nTags : ${station.tags}\nVotes: ${station.votes}\nClicks: ${station.clickcount}\n`)
}