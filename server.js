const inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");

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
