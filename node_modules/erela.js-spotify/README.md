<div align = "center">
    <a href="https://discord.gg/D6FXw55">
<img src="https://img.shields.io/discord/653436871858454538?color=7289DA&label=Support&logo=discord&style=for-the-badge" alt="Discord">
</a> 

<a href="https://www.npmjs.com/package/erela.js-spotify">
<img src="https://img.shields.io/npm/dw/erela.js-spotify?color=CC3534&logo=npm&style=for-the-badge" alt="Downloads">
</a>

<a href="https://www.npmjs.com/package/erela.js-spotify">
<img src="https://img.shields.io/npm/v/erela.js-spotify?color=red&label=Version&logo=npm&style=for-the-badge" alt="Npm version">
</a>

<br>

<a href="https://github.com/Solaris9/erela.js-spotify">
<img src="https://img.shields.io/github/stars/Solaris9/erela.js-spotify?color=333&logo=github&style=for-the-badge" alt="Github stars">
</a>

<a href="https://github.com/Solaris9/erela.js-spotify/blob/master/LICENSE">
<img src="https://img.shields.io/github/license/Solaris9/erela.js-spotify?color=6e5494&logo=github&style=for-the-badge" alt="License">
</a>
<hr>
</div>

This a plugin for Erela.JS to allow the use of Spotify URL's, it uses direct URL's being tracks, albums, and playlists and gets the YouTube equivalent.

- https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
- https://open.spotify.com/album/6N9PS4QXF1D0OWPk0Sxtb4
- https://open.spotify.com/playlist/37i9dQZF1DZ06evO05tE88

## Documentation & Guides

It is recommended to read the documentation to start, and the guides to use the plugin.

- [Documentation](http://projects.solaris.codes/erelajs/docs/gettingstarted.html 'Erela.js Documentation') 

- [Guides](http://projects.solaris.codes/erelajs/guides/introduction.html 'Erela.js Guides')

## Prerequisites

- [Spotify App](https://developer.spotify.com/dashboard) for the **clientID** & **clientSecret**

## Installation

**NPM** :
```sh
npm install erela.js-spotify
```

**Yarn** :
```sh
yarn add erela.js-spotify
```

## Options

- ### clientID
> The Spotify client ID. \
> This is **required** to use this plugin.

- ### clientSecret
> The Spotify client secret. \
> This is **required** to use this plugin.

- ### playlistLimit
> The amount of pages to load when a playlist is searched with each page having 100 tracks. \
> By default this retrieves all tracks in the playlist. \
> Note: This must be 1 or higher, 0 will load all.

- ### albumLimit
> The amount of pages to load when an album is searched with each page having 50 tracks. \
> By default this retrieves all tracks on the album. \
> Note: This must be 1 or higher, 0 will load all.

- ### convertUnresolved
> Converts all UnresolvedTracks into a Track. \
> **NOTE: THIS IS NOT RECOMMENDED AS IT WILL ATTEMPT TO CONVERT EVERY TRACK, INCLUDING ALBUMS AND PLAYLISTS TRACKS.** \
> **DEPENDING ON THE AMOUNT THIS WILL TAKE A WHILE AND MAY RATELIMIT YOUR LAVALINK NODE.**

## Example Usage

```javascript
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");

const clientID = "example ID"; // clientID from your Spotify app
const clientSecret = "example secret"; // clientSecret from your Spotify app

const manager = new Manager({
  plugins: [
    // Initiate the plugin and pass the two required options.
    new Spotify({
      clientID,
      clientSecret
    })
  ]
});

manager.search("https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC");
```