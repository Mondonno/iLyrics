![iLyrics presentation baner](https://i.imgur.com/eNGMh1M.png)

![iLyrics core version](https://img.shields.io/npm/v/ilyrics-core)
![ilyrics package](https://img.shields.io/github/package-json/v/mondonno/ilyrics/master/ilyrics)
![ilyrics core deps](https://img.shields.io/librariesio/release/npm/ilyrics-core)
![ilyrics node version min.](https://img.shields.io/badge/node-%3E%3D13.0.0-for%20me%3F)
![iLyrics speed](https://img.shields.io/badge/iLyrics%20av.%20speed-0.24--0.34-i)


**iLyrics is a new way to get lyrics fast**

Downloads lyrics for currently playing song on your computer from **Spotify**, **iTunes** and **QuickTime Player**.
On **MacOS**.

It is blazingly **fast** and **powerfull**, that gaurantees the best user exprience.<bt>
It refreshes after the song changes in the player, so lyrics are always accurate for your usage.

## Why iLyrics ?
    
iLyrics is x-platform app that fast and refreshes really quickly (measured).
It supports a wide range of music players, and first app like this is avaible on all platforms<a href="#foot_notes"><sup>1</sup></a>.

This app was developed by me for personal usage, beacause any of the lyrics-gathering apps werent working with iTunes or required an API token.

iLyrics does not requires any user interaction, or configuration. It does all the magic for you.
User doesn't need to generate any API token for Spotify or Genius servieces. Our app is detecting all players offline, and then fetches lyrics online, if it is possible.

It perfectly integrates iTunes, if you play a song, and it's lyrics are not avaible on iTunes, it changes the lyrics visible in iTunes to these ones that were downloaded.
Singing offline is now totally possible!

## Installation and running
To install ilyrics you need latest `npm` and `node`. 
After installing `node` and `npm` clone our repository, go into `ilyrics` folder and then you're able to run it.

**Running**:
- **Web**<br>
    To run it in web mode, so it is accesible from the browser you need to type `node . -t` or `node . --tab`
- **Console**<br>
    To run ilyrics in console-line mode write into console just `node .` and that will run console-in version.

Website, getting refreshed after the song changes, so you don't need to care about it.

### Improvements planned
- [ ] Add `Windows` and `Linux` to supported systems.
- [ ] Create a tiny Electron app, that will be accesible from the menubar.
- [ ] Create websocket/SSE communication bettween server and website instead of pooling to improve performance.

<h3 id="foot_notes">Footnotes</h3>
    
1. Currently there is only MacOS supported but we are planning to add Windows and Linux soon.
