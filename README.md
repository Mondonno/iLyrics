<img src="https://i.imgur.com/CaR5NMg.png" height="149" width="447">

# iLyrics
Downloads lyrics for currently playing song on your computer from Spotify, iTunes, QuickTime Player.
on MacOS, Windows (soon) and Linux (soon). Can be used in the command-line, browser, or in normal app.
It is blazingly fast and powerfull, that gaurantees the best user exprience. It refreshes after the song changes in the player, so lyrics are 100% accurate.
Lyrics are downloaded/fetched from Genius.

This project using the `ilyrics-core` from another repository, that can be used by other developers, to use it in their own apps.
I love creating this project and i'm thinking that everyone love to use it too.

## Why iLyrics is diffrent?
iLyrics is X-Platform, fast and refreshes really quickly (measured).
It first supports this bunch of players, and first app like this is avaible on all platforms (soon).

This app was developed by me for personal usage, beacause any of the lyrics downloaded does not seems to work on iTunes or it need an API token.
iLyrics does not requires any user interaction, or configuration. It does all on it side.
User don't need to generate ANY api token for spotify or genius servieces. Our app detecting all players offline, and then fetches lyrics, if it is possible.

It perfectly integrates iTunes, if you play the song, and it's lyrics are not avaible on iTunes, it changes in-player lyrics to the downloaded.
Singing offline is possible!

## How to?
To install ilyrics you need latest `npm` and `node`. 

After installing `node` and `npm` clone our repository, go into ilyrics and then you're able to run it.

To run it in web mode, so it is accesible from the browser you need to type `node . -t` or `node . -tab`

To run ilyrics in console-line mode write into console just `node .` and that will run console-in version.

Website, getting refreshed after the song changes, so you don't need to refresh site.

## Improvment To-do
- Add `Windows` and `Linux` to supported systems.
- Create tiny Electron app, wich will be accesible on the desktop.
- Documentate `Ilyrics` and `ilyrics-core`