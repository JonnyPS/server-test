const express = require('express');
const app = express();
const port = process.env.port || 5000;

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(port, () => console.log(`Your app is now running at ${port}`))