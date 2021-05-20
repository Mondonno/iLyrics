process.title = "ilyrics";

const { musicUpdateTimeout, websiteLocalPort } = require("./lib/Configuration");
const chalk = require("chalk");

let lastArgv = process.argv[process.argv.length - 1];
let cliFlags = lastArgv ? (lastArgv.startsWith('-') ? lastArgv.replace('-', '') : lastArgv) : lastArgv;

if (cliFlags && (cliFlags === 't' || cliFlags === '-tab')) {
    console.log(chalk`{bold.grey --->} Support us on {grey ->} {bold.underline.white github.com/Mondonno/iLyrics}`);
    console.log(chalk`{bold.grey --->} iLyrics running on {bold.underline.white http://127.0.0.1:${websiteLocalPort}/}`);
    console.log(chalk`{bold.grey ->} Click {bold.grey ^C} to {red exit}\n`);

    try {
        (require("./www"));
    }
    catch (e) {
        console.error(e);
        console.log(chalk`{bold.grey ->} {bold.red ERROR} ilyrics already {bold.white RUNNING}`);
    }

    return;
}

const { iLyrics } = require('./ilyrics');

let ilyricsRun = true;
let ilyricsClient = null;

if (musicUpdateTimeout != null) ilyricsClient = new iLyrics(ilyricsRun, musicUpdateTimeout);
else ilyricsClient = new iLyrics(ilyricsRun);

module.exports = ilyricsClient;