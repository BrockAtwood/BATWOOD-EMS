//dependancies - from directions
//get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

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
  connection.query("SELECT * FROM department", (err, res) => {
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
  connection.query("SELECT * FROM role", (err, res) => {
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
    if (err) throw error;
    //display all departments in table
    console.table(res);
    //sends user back to the beginning or lets user quit and be done
    lastQuestion();
  });
}

//adding a new department to the db
async function addDepartment() {
  const newDepartmentInfo = await inquirer.prompt(addDepartmentQuestion);
  connection.query(
    "INSERT INTO department (name) VALUES (?)",
    {
      newDepartment: newDepartmentInfo.newDepartment,
    },
    function (err) {
      if (err) throw err;
      console.log("You successfully added a new Department");
      //sends user back to the beginning or lets user quit and be done
      lastQuestion();
    }
  );
}

//adding a new role to the db
function addRole() {
  const newRoleInfo = inquirer.prompt(addRoleQuestions);
  connection.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    {
      newRoleName: newRoleInfo.newRoleName,
      salary: newRoleInfo.salary,
      departmentName: newRoleInfo.departmentName,
    },
    function (err) {
      if (err) throw err;
      console.log("You successfully added a new role!");
      //sends user back to the beginning or lets user quit and be done
      lastQuestion();
    }
  );
}

//adding a new employee to the db
function addEmployee() {
  const newEmployeeInfo = inquirer.prompt(addEmployeeQuestions);
  connection.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    {
      first_name: newEmployeeInfo.first_name,
      last_name: newEmployeeInfo.last_name,
      role_id: newEmployeeInfo.role_id,
      manager_id: newEmployeeInfo.manager_id,
    },
    function (err) {
      if (err) throw err;
      console.log("You successfully added a new employee!");
      //sends user back to the beginning or lets user quit and be done
      lastQuestion();
    }
  );
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

//new department questions
function addDepartmentQuestion() {
  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of your new Dempartment?",
    },
  ]);
}

//new role questions
function addRoleQuestions() {
  inquirer.prompt([
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
      type: "input",
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
  ]);
}

//new employee questions
function addEmployeeQuestions() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is your new Employee's first name?",
    },
    {
      type: "inpuit",
      name: "last_name",
      message: "What is your new Employee's last name?",
    },
    {
      type: "input",
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
      type: "input",
      name: "manager_id",
      message: "Who is your new Employee's Manager?",
      choices: ["Brock Atwood", "No manager"],
    },
  ]);
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
        console.log("Thank you and Goodbye!");
        connection.end();
      }
    });
}

logo();
init();
