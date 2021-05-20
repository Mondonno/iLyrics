// test passed 

const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res, next) => {
    if (!req.body) console.log('does the request does not have body property?')

    console.log(req.body);
    console.log('new post request registred');

    res.send('the test get passed')
})

app.listen(3003, () => console.log('the test server get launched on http://localhost:3003'));

module.exports = app;
