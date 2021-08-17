const { unsupportedPath } = require("./lib/Configuration");
const iLyricsLib = require('./lib/libBridge');
const chalk = require("chalk");

const waitSomeTime = async time => await new Promise(resolve => setTimeout(resolve, time));

const isiLyrics = obj => obj instanceof iLyrics;
const isiLyricsForce = obj => {
    if (!isiLyrics(obj)) throw new Error("The provided object is not an instance of the ilyrics object");
}

const dontIndentNS = str => ('' + str).replace(/(\n)\s+/g, '$1');
const makeLog = (text, dontIndent = true, clear = false) => {
    text = new String(text).toString();

    if (clear)
        console.clear();
    if (dontIndent)
        console.log(dontIndentNS(text));
    else console.log(text);
};

class iLyrics {
    constructor(run = true, timeout = 5000) {
        this.timeout = timeout;
        this.helper = new iLyricsHelper(this, this.timeout);

        if (run) this.run();
    }

    async run() {
        makeLog(chalk`
        _ _                _          
       (_) |              (_)         
        _| |    _   _ _ __ _  ___ ___ 
       | | |   | | | | '__| |/ __/ __|
       | | |___| |_| | |  | | (__\\__ \\
       |_|______\\__, |_|  |_|\\___|___/
                 __/ |                
                |___/ 

        {bold.white
        ⎡———————————————————————————————————————————————————————>
        ⎜ ILYRICS - The best lirycs for every audio file!
        ⎜ AUTHOR - github.com/Mondonno
        ⎣———————————————————————————————————————————————————————> }
       `, false, true);

        this.helper.checkMusicInterval();
    }
}

class iLyricsHelper {
    constructor(ilyrics, timeout) {
        isiLyricsForce(ilyrics);

        this.checker = new iLyricsLib(ilyrics);
        this.checkerTimeout = timeout;

        this.lastPaused = false;
    }

    async checkMusicInterval() {
        await this.checkMusic();
        setTimeout(this.checkMusicInterval.bind(this), this.checkerTimeout);
    }

    async checkMusic() {
        let musicData;
        try {
            musicData = await this.checker.checkMusic();
        } catch (error) {
            let { name } = error;

            if (name === 'MusicGetReapeted') return;
            else if (name === 'NoEnoughAttributes')
                return makeLog("Can not get the required attributes", false, true);
        }

        if (!musicData) {
            if (!this.lastPaused) iLyricsLogger.nothingPlaying()

            this.lastPaused = true;
            return;
        } else if (musicData) {
            this.lastPaused = false;
        }

        let { name, author, player } = musicData.details;
        player = player.name;

        let constructedMusicData = {
            name,
            author,
            player
        }

        if (!constructedMusicData) {
            return makeLog(`Can not get the song information.
            This error shouldn't happen
            Report it here --> https://github.com/Mondonno/iLyrics/issues`);
        }

        iLyricsLogger.logMusicData(constructedMusicData);

        if (musicData.lyrics.content) {
            await waitSomeTime(5000);
        }

        let unsupportedData;
        let doNotFailed = true;
        try {
            unsupportedData = require(unsupportedPath.substring(1, unsupportedPath.length));
        } catch {
            doNotFailed = false;
        }

        let aligibleToGetLyrics = !(doNotFailed
            && Array.isArray(unsupportedData)
            && unsupportedData.find(e => e.name === constructedMusicData.name
                && e.author === constructedMusicData.author));

        if (aligibleToGetLyrics && !musicData.newUnsupported) {
            iLyricsLogger.logLyrics(constructedMusicData, musicData.lyrics);
        } else {
            makeLog(chalk`{bold.grey ->} {bold.white DISPLAYING} only the {bold.white MUSIC INFORMATION}`);
        }
    }
}

class iLyricsLogger {
    constructor() {
        throw new Error("This class can not be initializated");
    }

    static async nothingPlaying() {
        return makeLog(chalk`{bold.grey ->} Currently {bold.white NOTHING} playing`, false, true);
    }

    static async logMusicData(songInfo) {
        let makeEscape = () => chalk`{bold.gray | }`
        let makeBold = (text, white = false) => chalk`{bold${white ? '.white' : ''} ${text}}`

        makeLog(chalk`
        {bold.grey | —————————————————————————> }
        ${makeEscape()}  ${makeBold("Music Name")}  {bold.grey ->}   ${songInfo.name}
        ${makeEscape()}  ${makeBold("Music Author")}   {bold.grey ->}   ${songInfo.author}
        ${makeEscape()}  ${makeBold("Player")}   {bold.grey ->}   ${songInfo.player}
        {bold.grey | —————————————————————————> }
        `, true, true);

        return;
    }

    static async logLyrics(songInfo, unConvertedLyrics) {
        const { name: musicName, author: musicAuthor } = songInfo;
        const apiLyrics = unConvertedLyrics.content;
        const musicUrl = unConvertedLyrics.url;

        const logUrl = url => url ? makeLog(chalk`{bold.white SONG URL} {grey ->} ${url}`) : null;

        if (!unConvertedLyrics.ok) {
            logUrl(musicUrl);
            makeLog(chalk`Can not {red download} the {bold.white lyrics} because of the {bold.underline.red ERROR}`);
        }
        else if (apiLyrics === null || apiLyrics === undefined) {
            logUrl(musicUrl);
            makeLog(chalk`{bold.white Lyrics} for this song wasn't {bold.underline.magenta FOUND}`);
        } else if (apiLyrics) {
            makeLog(chalk`\n{bold.grey ——————————————————————————————————————————————————}
            Lyrics for {bold.white ${musicName}  -  ${musicAuthor}}
            {bold.grey ——————————————————————————————————————————————————}\n`, true, true);
            makeLog(apiLyrics, true, false);
        } else {
            logUrl(musicUrl);
            makeLog(chalk`{bold.grey Unknown} lyrics download {bold.underline.red ERROR}`);
        }
    }
}

module.exports = {
    iLyrics,
    iLyricsHelper,
    Validator: {
        isiLyrics,
        isiLyricsForce
    }
}