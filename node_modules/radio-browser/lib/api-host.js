/**
 * get random api host
 */
'use strict'

const { isNode } = require('./env')
const { resolveSrv } = isNode ? require('./dns-nativ') : require('./dns-https')

/**
 * https://api.radio-browser.info/examples/serverlist_fast.js
 */
const BASE_HOST = '_api._tcp.radio-browser.info'

module.exports = () => {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                let list = await resolveSrv(BASE_HOST)
                let item = list[Math.floor(Math.random() * list.length)]
                resolve(item.name)
            }
            catch(e) {
                reject(e)
            }
        })()
    })
}
