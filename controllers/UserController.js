const { Pool } = require("pg");
const dbConfig = require("../config/database");
const { 
  responseNotFound, 
  responseSuccess 
} = require("../traits/ApiResponse");

const pool = new Pool(dbConfig);

const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching users" });
    }

    responseSuccess(res, results.rows, "Users successfully fetched");
  });
};

module.exports = {
  getUsers
};
