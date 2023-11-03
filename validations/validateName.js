const pool = require("../db");

function validateName(name) {
  return /^[a-zA-Z0-9\s]+$/.test(name) && name.length <= 50;
}

const validateNameMiddleware = async (req, res, next) => {
  const { name } = req.body;

  if (!name || !validateName(name)) {
    return res.status(400).json({ message: "Invalid name format" });
  }

  const existingNameQuery = "SELECT name FROM gamer WHERE name = $1";
  const result = await pool.query(existingNameQuery, [name]);

  if (result.rows.length > 0) {
    return res.status(400).json({ message: "Name already in use" });
  }

  next();
};

module.exports = validateNameMiddleware;
