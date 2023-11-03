const { Pool } = require("pg");

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
	if (err) {
		console.log(err);
	}
	console.log("Connect to PostgreSQL successfully!");
});

module.exports = pool;
