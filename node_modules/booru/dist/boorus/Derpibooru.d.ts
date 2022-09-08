/**
 * @packageDocumentation
 * @module Boorus
 */
import SearchParameters from '../structures/SearchParameters';
import SearchResults from '../structures/SearchResults';
import Site from '../structures/Site';
import Booru, { BooruCredentials } from './Booru';
/**
 * A class designed for Derpibooru
 * >:(
 * @private
 * @extends Booru
 * @inheritDoc
 */
export default class Derpibooru extends Booru {
    /**
     * Create a new booru for Derpibooru from a site
     * @param site The site to use
     * @param credentials Credentials for the API (Currently not used)
     */
    constructor(site: Site, credentials?: BooruCredentials);
    /** @inheritDoc */
    search(tags: string[] | string, { limit, random, page }?: SearchParameters): Promise<SearchResults>;
}
