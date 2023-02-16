const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  password: "XXXX",
  user: "root",
  database: "database_db",
});
connection.connect((err) => {
  if (err) throw err;
});


module.exports = connection;
