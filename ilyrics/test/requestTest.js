(require("../src/www/index"));

const RawRequest = require("../src/modules/util/ConnectRequest");

const Request = new RawRequest("http://127.0.0.1:1234/api/insert", "POST", {
    headers: {
        songName: "idk what i'am doing",
        songUrl: "https://idk.com",
        songLyrics: "idk",
        songImageUrl: "/apple.png"
    }
});

const main = async () => {
    let Response = null;
    try {
        Response = await Request.make();
    } catch (e) {
        console.log(e);
    }
    console.log(Response);
}

main();