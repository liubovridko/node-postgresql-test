const pool = require("../db");

const gamerController = {
	createGamer: async (req, res) => {
		try {
			const { name, score } = req.body;
			const query =
				"INSERT INTO gamer (name, score) VALUES ($1, $2) RETURNING *";

			const result = await pool.query(query, [name, score]);
			res.status(201).json(result.rows[0]);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to save gamer" });
		}
	},

	update: async (req, res) => {
		try {
			const { score, name } = req.body;
			const query = "UPDATE gamer set score=$1 where name=$2 RETURNING *";
			const result = await pool.query(query, [score, name]);
			res.json(result.rows[0]);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to update the score" });
		}
	},

	getLeaders: async (req, res) => {
		try {
			const query =
				"SELECT name, score FROM gamer ORDER BY score DESC LIMIT 5";
			const result = await pool.query(query);
			res.json(result.rows);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "Failed to retrieve the leaderboard",
			});
		}
	},
};

module.exports = gamerController;
