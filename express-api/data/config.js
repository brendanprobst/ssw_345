const mysql = require("mysql");

const config = {
	host: "162.243.235.211",
	user: "user345",
	password: "Password1@",
	database: "db345",
};

const pool = mysql.createPool(config);

module.exports = pool;
