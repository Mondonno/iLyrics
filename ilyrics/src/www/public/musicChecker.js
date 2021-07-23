// addded support for the localhost netcat tunneling and other url's than the localhost (like hostname.local:port)

async function musicChecker() {
    let result;
    try {
        result = await fetch(`/musicChanged`, {
            method: "GET"
        })
    } catch {
        return;
    }

    let jsonResult = await result.json();
    if (!jsonResult) return;

    let changed = jsonResult.summary;
    if (changed === true) {
        window.location.reload();
    } else return;
}

setInterval(musicChecker, refreshTime);