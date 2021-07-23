// currently the web version does not support's the unsupported handling

const { websiteLocalPort, musicUpdateTimeout } = require("../lib/Configuration");
const iLyricsLib = require('../lib/libBridge');
const library = new iLyricsLib();

const express = require('express');
const path = require('path');
const app = express();

const getCurrentDir = p => path.join(__dirname, p);

app.set('view engine', 'ejs');
app.set('views', getCurrentDir('views'));
app.use(express.static(getCurrentDir('public')));

let lastPaused = true;
let lastUnchecked = true;

const doesRepeated = async lib => {
    let data = await getData(lib);

    if (!data && !lastUnchecked) {
        lastUnchecked = true;
        return false;
    } else if (!data && lastUnchecked) {
        return true;
    } else if (data) {
        lastUnchecked = false
    };

    if (data && data.paused() && lastPaused === false) {
        lastPaused = true;
        return false;
    } else if (data && data.data) {
        lastPaused = false;
    }

    if (!data.data && !data.cached) return true;
    else if (!data.data && data.cached) return false;
    else if (data.cached && data.data) return true;
    else if (!data.cached && data.data) return false;
    else return true;
}

const getData = async lib => {
    let data;
    try {
        data = await lib.checkMusic();
    } catch (error) {
        let { name } = error;

        if (name === 'MusicGetReapeted') return {
            data: lib.lastCachedSong,
            cached: true,
            paused: function () {
                return !this.data;
            }
        };
        else if (name === 'NoEnoughAttributes') return null;
    }

    return {
        data,
        cached: false,
        paused: function () {
            return !this.data;
        }
    }
}

app.get("/musicChanged", async (req, res) => {
    res.json({
        summary: !(await doesRepeated(library))
    });
})

app.get('/', async (req, res) => {
    let utilObject = { refreshTime: musicUpdateTimeout };
    let rawData = await getData(library);

    if (!rawData) {
        console.log("---> Music can not get resolved")
        return res.render("pause", utilObject)
    }

    let { data } = rawData;

    if (!data) {
        res.render("pause", utilObject);
    } else if (data && data.lyrics) {
        res.render("main", {
            lyrics: data.lyrics,
            song: {
                name: data.details.name,
                author: data.details.author,
                player: data.details.player.name
            },
            ...utilObject
        })
    } else {
        res.render("pause", utilObject)
    };
});

app.on('error', () => {
    console.log("Server side error occurned");
})

app.listen(websiteLocalPort, () => app);

module.exports = app;