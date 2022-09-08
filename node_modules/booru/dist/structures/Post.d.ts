/**
 * @packageDocumentation
 * @module Structures
 */
import Booru from '../boorus/Booru';
/**
 * An image from a booru with a few common props
 *
 * @example
 * ```
 * Post {
 *  fileUrl: 'https://aaaa.com/image.jpg',
 *  id: '124125',
 *  tags: ['cat', 'cute'],
 *  score: 5,
 *  source: 'https://giraffeduck.com/aaaa.png',
 *  rating: 's'
 * }
 * ```
 */
export default class Post {
    /** The {@link Booru} it came from */
    booru: Booru;
    /** The direct link to the file */
    fileUrl: string | null;
    /** The height of the file */
    height: number;
    /** The width of the file */
    width: number;
    /** The url to the medium-sized image (if available) */
    sampleUrl: string | null;
    /** The height of the medium-sized image (if available) */
    sampleHeight: number | null;
    /** The width of the medium-sized image (if available) */
    sampleWidth: number | null;
    /** The url to the smallest image (if available) */
    previewUrl: string | null;
    /** The height of the smallest image (if available) */
    previewHeight: number | null;
    /** The width of the smallest image (if available) */
    previewWidth: number | null;
    /** The id of this post */
    id: string;
    /** If this post is available (ie. not deleted, not banned, has file url) */
    available: boolean;
    /** The tags of this post */
    tags: string[];
    /** The score of this post */
    score: number;
    /** The source of this post, if available */
    source?: string | string[];
    /**
     * The rating of the image, as just the first letter
     * (s/q/e/u) => safe/questionable/explicit/unrated
     */
    rating: string;
    /** The Date this post was created at */
    createdAt?: Date | null;
    /** All the data given by the booru @private */
    protected data: any;
    /**
     * Create an image from a booru
     *
     * @param {Object} data The raw data from the Booru
     * @param {Booru} booru The booru that created the image
     */
    constructor(data: any, booru: Booru);
    /**
     * The direct link to the file
     * <p>It's prefered to use `.fileUrl` instead because camelCase
     */
    get file_url(): string | null;
    /**
     * The url to the medium-sized image (if available)
     * <p>It's prefered to use `.sampleUrl` instead because camelCase
     */
    get sample_url(): string | null;
    /**
     * The height of the medium-sized image (if available)
     * <p>It's prefered to use `.sampleHeight` instead because camelCase
     */
    get sample_height(): number | null;
    /**
     * The width of the medium-sized image (if available)
     * <p>It's prefered to use `.sampleWidth` instead because camelCase
     */
    get sample_width(): number | null;
    /**
     * The url to the smallest image (if available)
     * <p>It's prefered to use `.previewUrl` instead because camelCase
     */
    get preview_url(): string | null;
    /**
     * The height of the smallest image (if available)
     * <p>It's prefered to use `.previewHeight` instead because camelCase
     */
    get preview_height(): number | null;
    /**
     * The width of the smallest image (if available)
     * <p>It's prefered to use `.previewWidth` instead because camelCase
     */
    get preview_width(): number | null;
    /**
     * Get the post view (url to the post) of this image
     *
     * @type {String}
     * @example
     * ```
     * const e9 = Booru('e9')
     * const imgs = e9.search(['cat', 'dog'])
     *
     * // Log the post url of the first image
     * console.log(imgs[0].postView)
     * ```
     */
    get postView(): string;
    /**
     * Get some common props on the image
     *
     * @deprecated All common props are now attached directly to the image
     * @type {Object}
     *
     * @example
     * ```
     * image.id
     * // deprecated, use this instead
     * image.id
     *
     * // To access the post's raw data from the booru, do
     * image._data.id
     * ```
     */
    get common(): this;
}
