'use strict'

const RadioBrowser = require('..')

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
