const express = require('express');
const app = express();
const port = process.env.port || 5000;
const path = require("path");

app.get('/my-route', (req, res) => {
	res.send('hello world')
})

// all requests that aren't caught by our other api endpoints should direct to the index html file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Your app is now running at ${port}`))
