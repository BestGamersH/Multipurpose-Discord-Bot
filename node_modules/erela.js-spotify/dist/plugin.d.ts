import { Manager, Plugin, UnresolvedTrack, UnresolvedQuery } from "erela.js";
export declare class Spotify extends Plugin {
    private readonly authorization;
    private token;
    private readonly axiosOptions;
    private _search;
    private manager;
    private readonly functions;
    private readonly options;
    constructor(options: SpotifyOptions);
    load(manager: Manager): void;
    private search;
    private getAlbumTracks;
    private getPlaylistTracks;
    private getTrack;
    private static convertToUnresolved;
    private renewToken;
    private renew;
}
export interface SpotifyOptions {
    clientID: string;
    clientSecret: string;
    /** Amount of pages to load, each page having 100 tracks. */
    playlistLimit?: number;
    /** Amount of pages to load, each page having 50 tracks. */
    albumLimit?: number;
    /**
     * Whether to convert UnresolvedTracks to Track. Defaults to false.
     * **Note: This is** ***not*** **recommended as it spams YouTube and takes a while if a large playlist is loaded.**
     */
    convertUnresolved?: boolean;
}
export interface Result {
    tracks: UnresolvedQuery[];
    name?: string;
}
export interface Album {
    name: string;
    tracks: AlbumTracks;
}
export interface AlbumTracks {
    items: SpotifyTrack[];
    next: string | null;
}
export interface Artist {
    name: string;
}
export interface Playlist {
    tracks: PlaylistTracks;
    name: string;
}
export interface PlaylistTracks {
    items: [
        {
            track: SpotifyTrack;
        }
    ];
    next: string | null;
}
export interface SpotifyTrack {
    artists: Artist[];
    name: string;
    duration_ms: number;
}
export interface SearchResult {
    exception?: {
        severity: string;
        message: string;
    };
    loadType: string;
    playlist?: {
        duration: number;
        name: string;
    };
    tracks: UnresolvedTrack[];
}
