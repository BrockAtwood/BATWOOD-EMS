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
          "update Employee Role",
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
        : userPick === "add an Employee"
        ? addEmployee()
        : userPick === "Update an Employee Role"
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
        name: "first_name",
        message: "What is your new Employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is your new Employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
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
        name: "manager_id",
        message: "Who is your new Employee's Manager?",
        choices: ["Brock Atwood", "No Manager"],
      },
    ])
    .then((response) => {
      const roless = response.role_id;
      const managerr = response.manager_id;

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
        ? (mangerrId = 2)
        : console.log("Please choose a vaild option!");

      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${rolessId}, '${managerrId}')`,

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
function updateEmployeeRole() {
  connect.query("SELECT * FROM employee", (err, employee) => {
    const { employ, updatedRole } = inquirer.prompt([
      {
        type: "list",
        name: "employ",
        message: "Which employee would you like to update?",
        //show employee array to select from for updating
        choices: () => {
          return employee.map((employee) => employee.first_name);
        },
      },
      {
        type: "list",
        name: "updatedRole",
        message: "What is the employee's updated role?",
        choices: () => {
          return employee.map((employee) => employee.role_id);
        },
      },
    ]);
    //update new information from the user for first name and role id
    connection.query(
      "UPDATE employees SET role_id=? WHERE employee.first_name=?",
      [
        {
          role_id: updatedRole,
        },
        {
          first_name: employ,
        },
      ],
      function (err, res) {
        if (err) throw err;
        console.table(employee);
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
