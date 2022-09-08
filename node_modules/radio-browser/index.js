'use strice'

const apiClient = require('./lib/api-client')

const PARAM_TYPES = {
    hidebroken: 'boolean',
    limit: 'number',
    offset: 'number',
    order: 'string',
    reverse: 'boolean',
    seconds: 'number',
    url: 'string',
    lastchangeuuid: 'string'
}

/**
 * parts can be in route
 * order is importent
 */
const ROUTE_KEYS = [
    'country',     // 1st
    'by',          // 1st
    'stationuuid', // 1st
    'searchterm',  // 1st or 2nd
    'rowcount'     // 2nd
]

const FILTER_BY = {
    uuid: 'by',
    name: 'by',
    nameexact: 'by',
    codec: 'by',
    codecexact: 'by',
    country: 'by',
    countryexact: 'by',
    countrycodeexact: 'by',
    state: 'by',
    stateexact: 'by',
    language: 'by',
    languageexact: 'by',
    tag: 'by',
    tagexact: 'by',
    url: 'by',
    topclick: '',
    topvote: '',
    lastclick: '',
    lastchange: '',
    improvable: '',
    broken: ''
}

const CATEGORY_TYPES = [
    'countries',
    'countrycodes',
    'codecs',
    'states',
    'languages',
    'tags'
]

/**
 * extract params from filter
 * 
 * @param {object} filter 
 * @returns {object}
 */
const extractParams = function(filter)
{
    let params = {}
    Object.keys(PARAM_TYPES).forEach((name) => {
        if (filter[name] && typeof filter[name] === PARAM_TYPES[name]) {
            params[name] = filter[name]
        }
    })
    return params
}

/**
 * extend route with parts from filter
 * 
 * @example
 * let filter = {
 *  country: 'Germany'
 *  searchterm: 'ber'
 * }
 * let route = extractRoute('states', filter)
 * // route is: states/Germany/ber
 * 
 * @param {string} route 
 * @param {object} filter 
 */
const extractRoute = function (route, filter)
{
    ROUTE_KEYS.forEach((name) => {
        if (filter[name]) {
            route += '/' + encodeURI(filter[name])
        }
    })
    return route
}

/**
 * complete route and set params if any
 * 
 * @param {string} route 
 * @param {object} filter 
 * @returns {object} {route:<string>, params:<object>}
 */
const parseFilter = function(route, filter={})
{
    return {
        route: extractRoute(route, filter),
        params: extractParams(filter)
    }
}

const RadioBrowser = module.exports = {
    
    get service_url() 
    {
        return apiClient.service_url
    },

    set service_url(url)
    {
        apiClient.service_url = url
    },

    /**
     * get a radio-browser host
     * 
     * @returns {string}
     */
    getRandomHost: apiClient.getRandomHost,

    /**
     * returns a list of category.
     * https://de1.api.radio-browser.info/#List_of_countries
     * https://de1.api.radio-browser.info/#List_of_countrycodes
     * https://de1.api.radio-browser.info/#List_of_codecs
     * https://de1.api.radio-browser.info/#List_of_languages
     * https://de1.api.radio-browser.info/#List_of_states
     * https://de1.api.radio-browser.info/#List_of_tags
     * 
     * @param {string} category  <countries|countrycodes|codecs|states|languages|tags>
     * @param {object} filter {country: <string>, searchterm: <string>, order: <string>, reverse: <boolean>, hidebroken: <boolean>}
     * @returns {promise}
     */
    getCategory: (category, filter) => {
        let {route, params} = parseFilter(category, filter)
        return apiClient.request(route, params)
    },

    /**
     * Get a list of countries
     * @deprecated use getCategory('countries', filter)
     * @param {object} filter {searchterm: <string>, order: <string>, reverse: <boolean>, hidebroken: <boolean>}
     * @returns {promise} 
     */
    getCountries: (filter) => RadioBrowser.getCategory('countries', filter),

    /**
     * get a list of codecs
     * @deprecated use getCategory('codecs', filter)
     * @param {object} filter {searchterm: <string>, order: <string>, reverse: <boolean>, hidebroken: <boolean>}
     * @returns {promise}
     */
    getCodecs: (filter) => RadioBrowser.getCategory('codecs', filter),

    /**
     * Get a list of states
     * @deprecated use getCategory('states', filter)
     * @example
     * let filter = {
     *  country: 'germany',
     *  searchterm: 'ber'
     * }
     * @param {object} filter {country: <string>, searchterm: <string>, order: <string>, reverse: <boolean>, hidebroken: <boolean>}
     * @returns {promise}
     */
    getStates: (filter) => RadioBrowser.getCategory('states', filter),

    /**
     * get a list of languages
     * @deprecated use getCategory('languages', filter)
     * @param {object} filter {searchterm: <string>, order: <string>, reverse: <boolean>, hidebroken: <boolean>}
     * @returns {promise}
     */
    getLanguages: (filter) => RadioBrowser.getCategory('languages', filter),

    /**
     * get list of tags
     * @deprecated use getCategory('tags', filter)
     * @param {object} filter {searchterm: <string>, order: <string>, reverse: <boolean>, hidebroken: <boolean>}
     * @returns {promise}
     */
    getTags: (filter) => RadioBrowser.getCategory('tags', filter),

    /**
     * List of radio stations
     * https://de1.api.radio-browser.info/#List_of_radio_stations
     * https://de1.api.radio-browser.info/#Search_radio_stations_by_url
     * https://de1.api.radio-browser.info/#Stations_by_clicks
     * https://de1.api.radio-browser.info/#Stations_by_votes
     * https://de1.api.radio-browser.info/#Stations_by_recent_click
     * https://de1.api.radio-browser.info/#Stations_by_recently_changed
     * https://de1.api.radio-browser.info/#Stations_that_got_deleted
     * https://de1.api.radio-browser.info/#Old_versions_of_stations
     * https://de1.api.radio-browser.info/#Stations_that_need_improvement
     * https://de1.api.radio-browser.info/#Broken_stations
     * 
     * @param {object} filter {by: <string>, searchterm: <string>, order: <string>, reverse: <boolean>, offset: <integer>, limit: <integer>}
     * @returns {promise}
     * @example
     * let filter = {
     *  by: "tag",         // will search in tags. for possible values see links above
     *  searchterm: "ska", // searchterm. possible values see links above
     *  order: "name",     // sort list by name
     *  limit: 5,          // returns a list of max. 5 stations
     *  offset: 0          // starting value of list
     * }
     * RadioBrowser.getStations(filter).then(...).catch(...)
     */
    getStations: (filter={}) => {

        if (filter.by) {
            let by = filter.by
            if (FILTER_BY[by]) {
                filter.by = FILTER_BY[by] + by
            }

            if (['broken', 'improvable', 'topclick', 'topvote', 'lastclick', 'lastchange'].indexOf(filter.by) !== -1 && filter.limit) 
            {
                filter.rowcount = filter.limit
                delete filter.limit
            }
            else if (filter.by === 'byurl' && filter.searchterm) {
                filter.url = filter.searchterm
                delete filter.searchterm
            }
        }

        let {route, params} = parseFilter('stations', filter)

        return apiClient.request(route, params)
    },
    
    /**
     * Get a list of station check results
     * https://de1.api.radio-browser.info/#Get_a_list_of_station_check_results
     * 
     * @param {string} stationuuid
     * @param {number} seconds
     */
    getChecks: (stationuuid, seconds=0) => {
        let route = 'checks',
            params = false

        if (stationuuid) {
            route += '/' + stationuuid
        }
        if (seconds > 0) {
            params = {seconds: seconds}
        }
        return apiClient.request(route, params)
    },

    /**
     * List of station check steps
     * https://de1.api.radio-browser.info/#List_of_station_check_steps
     * 
     * @param {array} uuids array of station uuids
     */
    getChecksteps: (uuids) => {
        let route = 'checksteps',
            params = {uuids: uuids.join(',')}

        return apiClient.request(route, params)
    },

    /**
     * List of station clicks
     * <https://de1.api.radio-browser.info/#List_of_station_clicks>
     * 
     * @param {string} stationuuid
     * @param {integer} seconds
     */
    getClicks: (stationuuid, seconds=0) => {
        let route = 'clicks',
            params = false

        if (stationuuid) {
            route += '/' + stationuuid
        }
        if (seconds > 0) {
            params = {seconds: seconds}
        }

        return apiClient.request(route, params)
    },

    /**
     * Station click counter
     * <https://de1.api.radio-browser.info/#Count_station_click>
     * 
     * @param {string} stationuuid
     */
    clickStation: (stationuuid) => {
        return apiClient.request('url/' + stationuuid)
    },

    /**
     * Advanced Search Stations
     * https://de1.api.radio-browser.info/#Advanced_station_search
     * 
     * @param {object} params for parameters see link above
     * @returns {promise}
     */
    searchStations: (params) => apiClient.request('stations/search', params),
    
    /**
     * Vote for station
     * https://de1.api.radio-browser.info/#Vote_for_station
     * 
     * @param {number} stationuuid 
     */
    voteStation: (stationuuid) => apiClient.request('vote/' + stationuuid),

    /**
     * delete a station by staionuuid
     * https://de1.api.radio-browser.info/#Delete_a_station
     * 
     * @param {string} stationuuid 
     */
    deleteStation: stationuuid => apiClient.request('delete/' + encodeURI(stationuuid)),

    /**
     * undelete a station by staionid
     * https://de1.api.radio-browser.info/#UnDelete_a_station
     * @depracted not suported by radio-browser.info 
     * @param {number} stationuuid 
     */
    undeleteStation: (stationuuid) => apiClient.request('undelete/' + stationuuid),

    /**
     * Add radio station. 
     * https://de1.api.radio-browser.info/#Add_radio_station
     * 
     * @param {object} params See link above for parameters
     */
    addStation: (params) => apiClient.request('add', params),

    /**
     * edit a station by stationid
     * https://de1.api.radio-browser.info/#Edit_a_radio_station
     * 
     * @deprecated not suported by radio-browser.info 
     * @param {number} stationuuid See link above for parameters
     * @param {object} params
     */
    editStation: (stationuuid, params) => apiClient.request('edit/' + stationuuid, params),

    /**
     * Server stats
     * https://de1.api.radio-browser.info/#Server_stats
     */
    getServerStats: () => apiClient.request('stats'),

    /**
     * Server mirrors
     * https://de1.api.radio-browser.info/#Server_mirrors
     */
    getServerMirrors: () => apiClient.request('servers'),

    /**
     * Server config
     * <https://de1.api.radio-browser.info/#Server_config>
     */
    getServerConfig: () => apiClient.request('config'),

    /**
     * list of types used in getStations({by: <string>})
     * 
     * @var {array}
     */
    get filter_by_types() {
        return Object.keys(FILTER_BY);
    },

    /**
     * list of categories using in getCategory({category}[, filter])
     * 
     * @returns {array}
     */
    get category_types() {
        return CATEGORY_TYPES.slice(0);
    }
}
