//dependancies - from directions
//get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

//Neat starter font
var figlet = require("figlet");

//Connection to connection.js for creating connection to server
const connection = require("./config/connection");
// ALL MOVED INTO CONNECT.JS //create the connection (shown in npmjs.com link in directions)
logo();
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
async function starterPrompt() {
  return inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "beginChoice",
      Choices: [
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
  ]);
}
//where it all begins!
async function homework() {
  const promptQuestions = await starterPrompt();

  switch (promptQuestions.beginChoice) {
    case "View All Departments": {
      viewAllDepartments();
      break;
    }

    case "View All Roles": {
      viewAllRoles();
      break;
    }

    case "View All Employees": {
      viewAllEmployees();
      break;
    }

    case "Add a Department": {
      addDepartment();
      break;
    }

    case "Add a Role": {
      addRole();
      break;
    }

    case "add an Employee": {
      addEmployee();
      break;
    }

    case "Update an Employee Role": {
      updateEmployeeRole();
      break;
    }

    case "Quit": {
      console.log("Thank you, and Goodbye!");
      break;
    }

    default:
      console.log("Please select one of the valid answers");
      starterPrompt();
      break;
  }
}

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
      starterPrompt();
    }
  );
}

async function addRole() {
  const newRoleInfo = await inquirer.prompt(addRoleQuestions);
  connection.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    {
      title: newRoleInfo.newRoleName,
      salary: newRoleInfo.salary,
      department_id: newRoleInfo.departmentName,
    },
    function (err) {
      if (err) throw err;
      console.log("You successfully added a new role!");
      starterPrompt();
    }
  );
}

// async function addEmployee() {
//     return inquirer.prompt ([
//         {
//             type: "input",
//             name: "first_name",
//             message: "What is your new Employee's first name?"
//         },
//         {
//             type: "inpuit",
//             name: "last_name",
//             message: "What is your new Employee's last name?"
//         },
//         {
//             type: "input",
//             name: "role",
//             message: "What is your new Employee's Role?",
//             choices: [
//                 "Manager",
//                 "Sales Representative",
//                 "Financial Analyst",
//                 "Lawyer",
//                 "Junior Engineer",
//                 "Senior Engineer",
//                 "Junior Accountant",
//                 "Senior Accountant",
//                 "Human Resources"
//             ],
//         },
//         {
//             type: "input",
//             name: "manager",
//             message: "Who is your new Employee's Manager?",
//             choices: [
//                 "Brock Atwood",
//                 "No manager"
//             ],
//         },
//     ])
// };

async function addDepartmentQuestion() {
  return inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of your new Dempartment?",
    },
  ]);
}

async function addRoleQuestions() {
  return inquirer.prompt([
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

//end of every user walkthrough, eithere start over or quit
function lastQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What you you like to do next?",
        choices: ["Go back to the Start", "Quit"],
        name: "lastQuestion",
      },
    ])
    .then((answer) => {
      if (answer.lastQuestion !== "Quit") {
        //goes back to the beginning
        beginChoice;
      } else {
        //clears, logs and ends connection
        console.clear();
        console.log("Thank you and Goodbye!");
        connection.end();
      }
    });
}
