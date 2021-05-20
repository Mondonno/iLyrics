const { iLyricsLib, IAppleScript } = require('../../../../ilyrics-core/core/src/');
const { unsupportedPath, unsupportedRawPath } = require("./Configuration");
const fileServe = require("fs");

const escapeString = str => {
    let escaper = '\\';
    return str.replace(/\"/g, `${escaper}"`)
}

const isEmpty = obj => !obj || obj === '';
const validLyricsUpdate = data => {
    let isNotEmpty = !isEmpty(data);
    let songLyrics = data.lyrics;

    let lyricsAvaible = songLyrics && !!songLyrics.content;
    let correctMusicPlayer = data && data.details && data.details.player.code === 1;

    return isNotEmpty && lyricsAvaible && correctMusicPlayer;
}

class iLyricsLibBridge {
    constructor() {
        this.lib = new iLyricsLib();
    }

    get lastCachedSong() {
        return this.lib.lastCachedSong;
    }

    async checkMusic() {
        let lyricsScript = `
        tell application "Music"
            if it is running then 
                set playerState to player state as text
                if playerState is "playing" then 
	                set currentTrack to current track
	                set musicLyrics to lyrics of currentTrack
	
                    return (musicLyrics)
                else if playerState is not "playing" then
                    return "."
                end if
            end if
        end tell`

        const updateLyrics = (newLyrics) => {
            let changeLyricsScript = `
            tell application "Music"
	            set currentTrack to current track
	            set lyrics of currentTrack to "${newLyrics}"
            end tell
            `
            return changeLyricsScript;
        }

        let data = await this.lib.checkMusic();
        let lyricsData = await IAppleScript.runString(lyricsScript);

        if (isEmpty(lyricsData) && validLyricsUpdate(data)) {
            await IAppleScript.runString(updateLyrics(escapeString(data.lyrics.content)));
        }

        if (data && data.lyrics.ok && !data.lyrics.content) {
            let handler = new UnexpectedLyricsHandler();
            let inputData = [data.details.name, data.details.author];

            if (!handler.Get(...inputData)) {
                handler.Add(...inputData);
                Object.assign(data, { newUnsupported: true });
            } else {
                Object.assign(data, { newUnsupported: false });
            }
        } else {
            Object.assign(data, { newUnsupported: false });
        }

        return data;
    }
}

class UnexpectedLyricsHandler {
    constructor(filePath, requirePath) {
        const deafultPath = unsupportedRawPath;
        const deafultRequirePath = unsupportedPath;

        this.filePath = filePath || deafultPath;
        this.requirePath = requirePath || deafultRequirePath;
    }

    _create() {
        fileServe.writeFileSync(this.filePath, '[]');
    }

    _isCreated() {
        try {
            (require(this.requirePath));
            return true;
        } catch {
            return false;
        }
    }

    _getData() {
        let isCreated = this._isCreated();
        if (!isCreated) {
            this._create();
            return require(this.requirePath);
        } else {
            let data;
            fileServe.create
            try {
                data = require(this.requirePath);
            } catch (e) {
                console.error(e);
                return;
            }
            return data;
        }
    }

    Add(name, author) {
        let fileData = this._getData();

        let songInformation = {
            name,
            author
        };

        fileData.push(songInformation);
        fileServe.writeFileSync(this.filePath, JSON.stringify(fileData, null, 4));

        return songInformation;
    }

    Get(name, author) {
        let fileData = this._getData();
        let entrie = fileData.find(e => e.name === name && e.author === author);

        if (!entrie) return null;
        else return entrie;
    }
}

module.exports = iLyricsLibBridge;