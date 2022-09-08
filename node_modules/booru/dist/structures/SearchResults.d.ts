/**
 * @packageDocumentation
 * @module Structures
 */
import Booru from '../boorus/Booru';
import Post from '../structures/Post';
import SearchParameters from './SearchParameters';
/**
 * Represents a page of search results, works like an array of {@link Post}
 * <p> Usable like an array and allows to easily get the next page
 *
 * @example
 * ```
 * const Booru = require('booru')
 * // Safebooru
 * const sb = new Booru('sb')
 *
 * const imgs = await sb.search('cat')
 *
 * // Log the images from the first page, then from the second
 * imgs.forEach(i => console.log(i.postView))
 * const imgs2 = await imgs.nextPage()
 * imgs2.forEach(i => console.log(i.postView))
 * ```
 */
export default class SearchResults extends Array<Post> {
    /** The booru used for this search */
    booru: Booru;
    /** The page of this search */
    page: number;
    /** The tags used for this search */
    readonly tags: string[];
    /** The options used for this search */
    readonly options: SearchParameters;
    /** The posts from this search result */
    readonly posts: Post[];
    /** @private */
    constructor(posts: Post[], tags: string[], options: SearchParameters, booru: Booru);
    /**
     * Get the first post in this result set
     * @return {Post}
     */
    get first(): Post;
    /**
     * Get the last post in this result set
     * @return {Post}
     */
    get last(): Post;
    /**
     * Get the next page
     * <p>Works like <code>sb.search('cat', {page: 1}); sb.search('cat', {page: 2})</code>
     * @return {Promise<SearchResults>}
     */
    nextPage(): Promise<SearchResults>;
    /**
     * Create a new SearchResults with just images with the matching tags
     *
     * @param {String[]|String} tags The tags (or tag) to search for
     * @param {Object} options The extra options for the search
     * @param {Boolean} [options.invert=false] If the results should be inverted and
     *                                         return images *not* tagged
     * @return {SearchResults}
     */
    tagged(tags: string[] | string, { invert }?: {
        invert?: boolean | undefined;
    }): SearchResults;
    /**
     * Returns a SearchResults with images *not* tagged with any of the specified tags (or tag)
     * @param {String[]|String} tags The tags (or tag) to blacklist
     * @return {SearchResults} The results without any images with the specified tags
     */
    blacklist(tags: string[] | string): SearchResults;
}
