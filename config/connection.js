const mysql = require("mysql2");

//create the connection (shown in npmjs.com link in directions)
var connection = mysql.createConnection({
  //mySQLworkbench
  host: "localhost",
  port: 3306,
  //username
  user: "root",
  //password
  password: "password",
  //database name (from schema.sql)
  database: "business_db",
});

//w3schools node.js with mysql
connection.connect(function (err) {
  if (err) throw err;
  console.log("You are Connected, Lets begin!");
});

module.exports = connection;
