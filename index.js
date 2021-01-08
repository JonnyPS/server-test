const express = require('express');
const app = express();
const port = process.env.port || 5000;
const path = require("path");
const CronJob = require('cron').CronJob;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('abcd');

db.serialize(function() {
	let create = `
		CREATE TABLE IF NOT EXISTS Persons (
			id INTEGER PRIMARY KEY,
			LastName varchar(255) NOT NULL,
			FirstName varchar(255),
			Age int
		);
	`;

	let insert = `
		INSERT INTO Persons (LastName, FirstName, Age) VALUES (
			'someone',
			'jon',
			30
		);
	`;

	db.run(create, (error) => {
		error ? console.log( 'TABLE CREATION Error ------', error ) : console.log('Table successfully created');

		db.run(insert, (error) => {
			error ? console.log( 'Error ------', error ) : console.log('Data successfully inserted into table');
			// db.close();
			// let sqlQuery = `SELECT * FROM Persons`;
			// db.each(sqlQuery, [], (err, row) => {
			// 	if (err) {
			// 		throw err;
			// 	}
			// 	console.log(row.id + ' ' + row.FirstName);
			// });
		});
		})
});

const task = new CronJob('* * * * * *', () => {
	let insert = `
		INSERT INTO Persons (LastName, FirstName, Age) VALUES (
			'someone',
			'jon',
			30
		);
	`;
	console.log('Running CRON job now: ');
	db.run(insert, (error) => {
		error ? console.log( 'Error ------', error ) : console.log('Data successfully inserted into table');
	});
}, true, "Europe/London")
task.start();


	
	
	
  // db.each("SELECT id, dt FROM user", function(err, row) {
  //     console.log("User id : "+row.id, row.dt);
  // });


app.get('/', (req, res) => {
	let sqlQuery = `SELECT * FROM Persons`;
	db.all(sqlQuery, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.json({
			"data": rows
		})
	});
})

// all requests that aren't caught by our other api endpoints should direct to the index html file
app.get('/my-route', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Your app is now running at ${port}`))
