const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const userRoute = require("./routes/user");
const dbConfig = require('./config/database');
const { Pool } = require("pg");

const pool = new Pool(dbConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", (req, res, next) => {
  req.pool = pool;
  next();
}, userRoute);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
