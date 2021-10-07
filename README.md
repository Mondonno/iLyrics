![iLyrics presentation baner](https://i.imgur.com/eNGMh1M.png)

![iLyrics core version](https://img.shields.io/npm/v/ilyrics-core)
![ilyrics package](https://img.shields.io/github/package-json/v/mondonno/ilyrics/master/ilyrics)
![ilyrics core deps](https://img.shields.io/librariesio/release/npm/ilyrics-core)
![ilyrics node version min.](https://img.shields.io/badge/node-%3E%3D13.0.0-for%20me%3F)
![iLyrics speed](https://img.shields.io/badge/iLyrics%20av.%20speed-0.24--0.34-i)


**iLyrics is a new way to get lyrics fast**

Downloads lyrics for currently playing song on your computer from Spotify, iTunes, QuickTime Player.
On **MacOS**.

It is blazingly **fast** and **powerfull**, that gaurantees the best user exprience.<bt>
It refreshes after the song changes in the player, so lyrics are 100% accurate.

## Why iLyrics ?
    
iLyrics is Crossplatform app that fast and refreshes really quickly (measured).
It first supports this bunch of players, and first app like this is avaible on all platforms<a href="#foot_notes"><sup>1</sup></a>.

This app was developed by me for personal usage, beacause any of the lyrics downloaded does not seems to work on iTunes or it need an API token.

iLyrics does not requires any user interaction, or configuration. It does all on it side.
User don't need to generate ANY api token for spotify or genius servieces. Our app detecting all players offline, and then fetches lyrics, if it is possible.

It perfectly integrates iTunes, if you play the song, and it's lyrics are not avaible on iTunes, it changes in-player lyrics to the downloaded.
Singing offline is possible!

## Installation and running
To install ilyrics you need latest `npm` and `node`. 
After installing `node` and `npm` clone our repository, go into `ilyrics` folder and then you're able to run it.

**Running**:
- **Web**<br>
    To run it in web mode, so it is accesible from the browser you need to type `node . -t` or `node . --tab`
- **Console**<br>
    To run ilyrics in console-line mode write into console just `node .` and that will run console-in version.

Website, getting refreshed after the song changes, so you don't need to care about it.

### Improvments planned
- [ ] Add `Windows` and `Linux` to supported systems.
- [ ] Create tiny Electron app, wich will be accesible on the desktop.
- [ ] Documentate `Ilyrics` and `ilyrics-core`
- [ ] Create websocket communication bettween server and website instead of loop

<h3 id="foot_notes">Footnotes</h3>
    
1. Currently there is supported MacOS only but we are planning add Windows and Linux soon.
