/**
 * @packageDocumentation
 * @module Structures
 */
/**
 * Represents the api of a {@link Site}
 * <p>Each property is a path on the {@link Site}
 */
export default interface SiteApi {
    /** The path to search for posts */
    search: string;
    /** The path to view a post by ID */
    postView: string;
}
