//dependancies - from directions
//get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

//Neat starter font
var figlet = require("figlet");

//create the connection (shown in npmjs.com link in directions)
const connection = mysql.createConnection({
  //mySQLworkbench
  host: "localhost",
  PORT: 3306,
  //username
  user: "root",
  //password
  password: "password",
  //database name (from schema.sql)
  database: "business_db",
});
// w2schools demo help
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  console.clear(), begin();
});

//Figlet display and start of app
async function begin() {
  console.clear();
  console.log(
    figlet.textSync("Atwood Entertainment", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  );

  //start questions and prompts in here!
}

//Main menu selection options
const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      Choice: [
        "View All Employees",
        "Add Employee",
        "update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
      name: "main",
    })
    .then((selection) => {
      console.log(selection);
    });
};
//Veiw All Employees prompt
//Add Employee prompt
//Update Employee Role prompt
//View All Roles prompt
//Add Role prompt
//View All Departments prompt
//Add Department prompt
//quit and exit out prompt

//listener
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
