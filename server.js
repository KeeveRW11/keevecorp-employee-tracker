
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "go-hoM3!",
  database: "employee",
});

const questions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do today?',
            choices: ['View All Departments', 'View All Roles', 'View all Employees','Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
            pageSize: 12
        }
    ]).then((answers) => {
        switch(answers.questions) {
            case 'View all Departments':
                viewDepartments();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View all Employees':
                viewEmployees();
                break;    
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'Exit Tracker':
                connection.end();
                console.log('Goodbye');
                break;    
        }
    })
};

connection.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    afterConnection();
});

afterConnection = () => {
    console.log("***********************************")
    console.log("*      WELCOME TO KEEVECORP       *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")
    questions();
};