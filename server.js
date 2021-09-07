//dependancies - from directions
//get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

//Neat starter font
var figlet = require("figlet");

//Connection to connection.js for creating connection to server
// const connection = require("./config/connection");

// ALL MOVED INTO CONNECT.JS //create the connection (shown in npmjs.com link in directions)
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

//Figlet display starter logo
function logo() {
  console.log(
    figlet.textSync("Atwood Entertainment", {
      font: "big",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  );
}

// //starter prompt
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "beginChoice",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      const userPick = answer.beginChoice;

      userPick === "View All Departments"
        ? viewAllDepartments()
        : userPick === "View All Roles"
        ? viewAllRoles()
        : userPick === "View All Employees"
        ? viewAllEmployees()
        : userPick === "Add a Department"
        ? addDepartment()
        : userPick === "Add a Role"
        ? addRole()
        : userPick === "Add Employee"
        ? addEmployee()
        : userPick === "Update Employee Role"
        ? updateEmployeeRole()
        : userPick === "Quit"
        ? console.log("Thank you, and Goodbye!")
        : console.end();
    });
}
//where it all begins!

//Viewing all departments
function viewAllDepartments() {
  //query data
  connection.query("SELECT * FROM departments", (err, res) => {
    console.log("\nDepartment Table\n");
    if (err) throw error;
    //display all departments in table
    console.table(res);
    //sends user back to the beginning or lets user quit and be done
    lastQuestion();
  });
}

//viewing all roles
function viewAllRoles() {
  //query data
  connection.query("SELECT * FROM roles", (err, res) => {
    console.log("\nRoles Table\n");
    if (err) throw error;
    //display all departments in table
    console.table(res);
    //sends user back to the beginning or lets user quit and be done
    lastQuestion();
  });
}

//viewing all employees
function viewAllEmployees() {
  //query data
  connection.query("SELECT * FROM employee", (err, res) => {
    console.log("\nEmployees Table\n");
    if (err) throw error;
    //display all departments in table
    console.table(res);
    //sends user back to the beginning or lets user quit and be done
    lastQuestion();
  });
}

// adding a new department with question to the db
async function addDepartment() {
  const newDepartmentInfo = await inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of your new Department?",
    },
  ]);
  connection.query(
    `INSERT INTO departments (department_name) VALUES ('${newDepartmentInfo.newDepartment}')`,

    function (err) {
      if (err) throw err;
      console.log("You successfully added a new Department");
      //sends user back to the beginning or lets user quit and be done
      lastQuestion();
    }
  );
}

//adding a new role with questions to the db
async function addRole() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "newRoleName",
        message: "What is the new Role name?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new Role?",
      },
      {
        type: "list",
        name: "departmentName",
        message: "What department is this new Role a part of?",
        choices: [
          "Manager",
          "Sales",
          "Finance",
          "Legal",
          "Engineering",
          "Accounting",
          "Human Resources",
        ],
      },
    ])
    .then((response) => {
      const department = response.departmentName;

      let departId;

      department === "Manager"
        ? (departId = 1)
        : department === "Sales"
        ? (departId = 2)
        : department === "Finance"
        ? (departId = 3)
        : department === "Legal"
        ? (departId = 4)
        : department === "Engineering"
        ? (departId = 5)
        : department === "Accounting"
        ? (departId = 6)
        : department === "Human Resources"
        ? (departId = 7)
        : console.log("Please choose a vaild option!");

      connection.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ('${response.newRoleName}', '${response.salary}', '${departId}')`,

        function (err) {
          if (err) throw err;
          console.log("You successfully added a new role!");
          //sends user back to the beginning or lets user quit and be done
          lastQuestion();
        }
      );
    });
}

//adding a new employee with questions to the db
async function addEmployee() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is your new Employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is your new Employee's last name?",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is your new Employee's Role?",
        choices: [
          "Manager",
          "Sales Representative",
          "Financial Analyst",
          "Lawyer",
          "Junior Engineer",
          "Senior Engineer",
          "Junior Accountant",
          "Senior Accountant",
          "Human Resources",
        ],
      },
      {
        type: "list",
        name: "managerId",
        message: "Who is your new Employee's Manager?",
        choices: ["Brock Atwood", "No Manager"],
      },
    ])
    .then((response) => {
      const roless = response.roleId;
      const managerr = response.managerId;

      let rolessId;
      let managerrId;

      roless === "Manager"
        ? (rolessId = 1)
        : roless === "Sales Representative"
        ? (rolessId = 2)
        : roless === "Financial Analyst"
        ? (rolessId = 3)
        : roless === "Lawyer"
        ? (rolessId = 4)
        : roless === "Junior Engineer"
        ? (rolessId = 5)
        : roless === "Senior Engineer"
        ? (rolessId = 6)
        : roless === "Junior Accountant"
        ? (rolessId = 7)
        : roless === "Senior Accountant"
        ? (rolessId = 8)
        : roless === "Human Resources"
        ? (rolessId = 9)
        : console.log("Please choose a vaild option!");

      managerr === "Brock Atwood"
        ? (managerrId = 1)
        : managerr === "No Manager"
        ? (managerrId = 2)
        : console.log("Please choose a vaild option!");

      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', '${rolessId}', '${managerrId}')`,

        function (err) {
          if (err) throw err;
          console.log("You successfully added a new employee!");
          //sends user back to the beginning or lets user quit and be done
          lastQuestion();
        }
      );
    });
}

//updating existing employee
async function updateEmployeeRole() {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "employ",
        message: "Which employee would you like to update?",
        choices: [
          "Brock Atwood",
          "Suzy Evans",
          "Jon Candy",
          "Bob Hope",
          "Lebron James",
          "Chris Paul",
          "Snoop Dogg",
        ],
      },
      {
        type: "list",
        name: "updatedRole",
        message: "What is the employee's updated role?",
        choices: [
          "Manager",
          "Sales Representative",
          "Financial Analyst",
          "Lawyer",
          "Junior Engineer",
          "Senior Engineer",
          "Junior Accountant",
          "Senior Accountant",
          "Human Resources",
        ],
      },
    ])
    .then((response) => {
      const person = response.employ;
      const rolesss = response.updatedRole;
      const idUpdate = response.employ;

      let rolesssId;
      let personUpdate;
      let idUpdatee;

      rolesss === "Manager"
        ? (rolesssId = 1)
        : rolesss === "Sales Representative"
        ? (rolesssId = 2)
        : rolesss === "Financial Analyst"
        ? (rolesssId = 3)
        : rolesss === "Lawyer"
        ? (rolesssId = 4)
        : rolesss === "Junior Engineer"
        ? (rolesssId = 5)
        : rolesss === "Senior Engineer"
        ? (rolesssId = 6)
        : rolesss === "Junior Accountant"
        ? (rolesssId = 7)
        : rolesss === "Senior Accountant"
        ? (rolesssId = 8)
        : rolesss === "Human Resources"
        ? (rolesssId = 9)
        : console.log("Please choose a vaild option!");

      person === "Brock Atwood"
        ? (personUpdate = "Brock")
        : person === "Suzy Evans"
        ? (personUpdate = "Suzy")
        : person === "Jon Candy"
        ? (personUpdate = "Jon")
        : person === "Bob Hope"
        ? (personUpdate = "Bob")
        : person === "Lebron James"
        ? (personUpdate = "Lebron")
        : person === "Chris Paul"
        ? (personUpdate = "Chris")
        : person === "Snoop Dogg"
        ? (personUpdate = "Snoop")
        : console.log("Please choose a vaild option!");

      idUpdate === "Brock Atwood"
        ? (idUpdatee = 1)
        : idUpdate === "Suzy Evans"
        ? (idUpdatee = 2)
        : idUpdate === "Jon Candy"
        ? (idUpdatee = 3)
        : idUpdate === "Bob Hope"
        ? (idUpdatee = 3)
        : idUpdate === "Lebron James"
        ? (idUpdatee = 5)
        : idUpdate === "Chris Paul"
        ? (idUpdatee = 6)
        : idUpdate === "Snoop Dogg"
        ? (idUpdatee = 7)
        : console.log("Please choose a vaild option!");

      //update new information from the user for first name and role id
      connection.query(
        `UPDATE employee SET first_name='${personUpdate}', role_id='${rolesssId}' WHERE id='${idUpdatee}'`,

        function (err, res) {
          if (err) throw err;
          console.log("You successfuly updated an employee!");
          lastQuestion();
        }
      );
    });
}
//end of every user walkthrough, eithere start over or quit
function lastQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do next?",
        choices: ["Go back to the Start", "Quit"],
        name: "lastQuestion",
      },
    ])
    .then((answer) => {
      if (answer.lastQuestion !== "Quit") {
        //goes back to the beginning
        init();
      } else {
        //clears, logs and ends connection
        console.clear();
        logo();
        console.log("Thank you and Goodbye!");
        connection.end();
      }
    });
}

logo();
init();
