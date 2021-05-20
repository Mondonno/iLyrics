

const appPort = 5000;

const http = require("http");
const express = require('express');
const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("working")
})

// server
server.on('error', () => {
    console.log("Our custom error message");
});
server.on('listening', () => {
    console.log("http server is rnning :)");
})

server.listen(appPort);