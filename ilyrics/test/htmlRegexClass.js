const cheerio = require("cheerio");

const doesMatch = (string, regex) => {
    if ((typeof string !== "string") || !(regex instanceof RegExp)) return;

    let match = string.match(regex);
    return match !== null;
}

const matchByRegexGetContent = ($, throwedElements, regex) => {
    let textContent = '';
    throwedElements.each((i, e) => {
        if (!e.attribs) return;

        if (!e.attribs.class) return;

        let check = doesMatch(e.attribs.class, regex);
        if (!check) return;

        let text = $(e).html();
        textContent += text + "\n";
    })

    return textContent
}

const main = () => {
    let testHtml = `
    <html>
        <head></head>
        <body>
            <div class="lyrics">some test content :O</div>
            <div class="lyrics test">some test content v2</div>
            <div class="example">some example :)</div>
        </body>
    </html>
    `
    let $ = cheerio.load(testHtml);
    let e = $("*");
    console.log(e);

    if (!e) return console.log("match not found");

    let regex = /lyrics/g;

    console.log(matchByRegexGetContent($, e, regex));
}

main();


/*
const matchByRegex = (throwedElements, regex) => {
    let elements = Array.from(throwedElements);
    elements = elements.filter(e => {
        if (!e.attribs) return false;
        if (!e.attribs.class) return false;

        let htmlClass = e.attribs.class;
        let matching = doesMatch(htmlClass, regex);

        return matching;
    })

    return elements;
}
*/