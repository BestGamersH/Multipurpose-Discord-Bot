/**
 * @packageDocumentation
 * @module Structures
 */
import SiteApi from './SiteApi';
/**
 * Represents the info needed to create a new {@link Site}
 * <p>Same properties as {@link Site}, but some optional</p>
 * <p>Mostly just here to reflect what sites.json should look like
 */
export default interface SiteInfo {
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
    paginate?: string;
    /** If the site supports `order:random` */
    random: boolean | string;
    /** The url query param for tags */
    tagQuery?: string;
    /** The character to use to join tags when creating the search url */
    tagJoin?: string;
    /** If this site supports only http:// */
    insecure?: boolean;
    /** Tags to add to every request, if not included */
    defaultTags?: string[];
}
