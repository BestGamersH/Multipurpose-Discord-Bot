/**
 * api-client.js
 * 
 */
'use strict'

const { isBrowser } = require('./env')
const URL = isBrowser ? window.URL : require('url').URL
const querystring = require('querystring')
const apiHost = require('./api-host')
const queryClient = require('./query-client')

//var HttpRequest = null

const DEFAULT_OPTIONS = {
    host: null,           // default is null to get random api-host
    protocol: 'https:',
    path: '/',           // base path. will extend on request.
    method: 'POST',      // default is POST because GET request at radiobrowser-api dosen't work as expected.
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-requested-with': 'nodejs radio-browser (https://gitlab.com/nepodev/radio-browser)'
    }
}

var request_options = {
    host: null
}

/**
 * set api-host options.
 * 
 * @param {object} options {host: <string>, protocol: '<string>, path: <string>, port: <number>, hostname: <string>}
 * @returns {void}
 */
const setService = function(options)
{
    request_options = Object.assign({}, DEFAULT_OPTIONS);

    ['host', 'hostname', 'port', 'protocol'].forEach((key) => {
        request_options[key] = options[key]
    })
    request_options.path = options.pathname

    if (typeof request_options.path === 'string' && request_options.path.substr(-1) !== '/') {
        request_options.path += '/'
    }
}

const requestService = (route, param={}, option={}) => {
    let options = Object.assign({}, request_options, option)
    let query = querystring.stringify(param)

    options.path += 'json/' + route
    if (query) {
        options.path += '?' + query
    }

    return queryClient(options)
}

const ApiClient = {

    get service_url()
    {
        return request_options.host === null ? null : [
                request_options.protocol,
                '//',
                request_options.host,
                request_options.path
            ].join('')
    },

    set service_url(service_url)
    {
        if (service_url === null) {
            service_url = ''
        }
        let opt = new URL(service_url)
        setService(opt)
    },

    getRandomHost: apiHost,

    /**
     * send request to radiobrowser-api.
     * 
     * @param {string} route
     * @param {object} param
     * @param {object} option
     * @returns {promise}
     */
    request: (route, param={}, option={}) => {
        if (request_options.host === null) {
            return apiHost()
                .then(host => ApiClient.service_url = 'https://' + host + '/')
                .then(() => requestService(route, param, option))
        }
        else {
            return requestService(route, param, option)
        }
    }
}

module.exports = ApiClient
