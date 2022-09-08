/**
 * resolve dns over https
 * using cloudflare dns
 * 
 */

const querystring = require('querystring')
const queryClient = require('./query-client')

const OPTIONS = {
    method: 'GET',
    host: 'cloudflare-dns.com',
    path: '/dns-query?',
    protocol: 'https:',
    headers: {
        accept: 'application/dns-json'
    }
}

/**
 * 
 * @param {object} params 
 */
const requestService = (params) => {
    let options = Object.assign({}, OPTIONS)
    options.path += querystring.stringify(params)
    return queryClient(options)
}

module.exports = {
    resolve4: name => {
        return requestService({name, type: 'A'})
            .then(data => data.Answer.map(item => item.data))
    },

    reverse: ip => {
        const name = ip.split('.').reverse().join('.') + '.in-addr.arpa'
        return requestService({name, type: 'PTR'})
            .then(data => data.Answer.map(item => item.data.slice(0, -1)))
    },

    resolveSrv: name => {
        return requestService({name, type: 'SRV'})
            .then(data => data.Answer.map(item => {
                let a = item.data.split(' ')
                return {
                    priority: a[0],
                    weight: a[1],
                    port: a[2],
                    name: a[3]
                }
                })
            )
    },

}
