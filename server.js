
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
            choices: ['View All Departments', 'View All Roles', 'View All Employees','Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        }
    ]).then((answers) => {
        switch(answers.questions) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
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
// FUNCTIONS FOR VIEWING DEPARTMENTS,ROLES & EMPLOYEES
viewDepartments = () => {
    console.log('These are all the current departments');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`; 

    connection.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      questions();
    });
};

viewRoles = () => {
    console.log('These are all the current roles at Keevecorp');
    const sql = `SELECT role.id, role.title AS title, role.salary AS salary, department.name AS department FROM role
                INNER JOIN department ON role.department_id = department.id`; 

    connection.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      questions();
    });
};

viewEmployees = () => {
    console.log('These are all the current employees working at Keevecorp');
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
                role.title, department.name AS department, role.salary, 
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      questions();
    });
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