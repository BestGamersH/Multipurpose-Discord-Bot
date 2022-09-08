/**
 * @packageDocumentation
 * @module Structures
 */
import SiteApi from './SiteApi';
import SiteInfo from './SiteInfo';
/**
 * Represents a site, mostly used for JSDoc
 */
export default class Site {
    /** The domain of the Site (the "google.com" part of "https://google.com/foo") */
    domain: string;
    /** The type of this site (json/xml/derpi) */
    type: string;
    /** The aliases of this site */
    aliases: string[];
    /** If this site serves NSFW posts or not */
    nsfw: boolean;
    /** An object representing the api of this site */
    api: SiteApi;
    /** The url query param to paginate on the site */
    paginate: string;
    /**
     * If the site supports `order:random`.
     * If a string, this means a custom random system is used :/
     */
    random: boolean | string;
    /** The url query param for tags */
    tagQuery: string;
    /** The character to use to join tags when creating the search url */
    tagJoin: string;
    /** If this site supports only http:// */
    insecure: boolean;
    /** Tags to add to every request, if not included */
    defaultTags: string[];
    constructor(data: SiteInfo);
}
