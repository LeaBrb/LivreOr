let mysql = require('mysql');
let connection = mysql.createConnection({
	host: '192.168.30.74',
	user: 'root',
	password: 'nm',
	database: 'root'
});

connection.connect()

module.exports = connection


