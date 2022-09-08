/**
 * get random api host
 * 
 * thanks to segler-alex <https://github.com/segler-alex>
 * issue: https://github.com/nepodev/radio-browser/issues/1
 */
'use strict'

const dns = require('dns')
const util = require('util')
const resolve4 = util.promisify(dns.resolve4)
const reverse = util.promisify(dns.reverse)

module.exports = {
    resolve4,
    reverse,
    resolveSrv: util.promisify(dns.resolveSrv)
}