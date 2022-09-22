
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
            choices: ['View All Departments', 'View All Roles', 'View All Employees','Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit Employee Tracker'],
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
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployee();
                break;
            case 'Quit Employee Tracker':
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
// FUNCTIONS FOR ADDING DEPARTMENTS,ROLES & EMPLOYEES
addDepartment = () => {
    console.log(`
    =================
    Add a New Department
    =================
    `);
    inquirer.prompt([
      {
        type: 'input', 
        name: 'department',
        message: "What department do you want to add today?",
        validate: department => {
          if (department) {
              return true;
          } else {
              console.log('Please enter a new department');
              return false;
          }
        }
      }
    ])
      .then(answer => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        connection.query(sql, answer.department, (err, result) => {
          if (err) throw err;
          console.log(answer.department + " has been added " + " to departments."); 
  
          viewDepartments();
      });
    });
};

addRole = () => {
    console.log(`
    =================
    Add a New Role
    =================
    `);
    inquirer.prompt([
      {
        type: 'input', 
        name: 'role',
        message: "What role do you want to add today?",
        validate: role => {
          if (role) {
              return true;
          } else {
              console.log('Please enter a new role');
              return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'salary',
        message: "What salary is being paid to this role?",
        /*validate: salary => {
            if (isNaN(salary)) {
                return true;
          } else {
              console.log('Please enter a valid salary figure!');
              return false;
          }
        }*/
      },
    ])
        .then(answer => {
            const params = [answer.role, answer.salary];
    
            const roleData = `SELECT name, id FROM department`; 
    
            connection.query(roleData, (err, data) => {
            if (err) throw err; 
        
            const dept = data.map(({ name, id }) => ({ name: name, value: id }));
    
            inquirer.prompt([
            {
                type: 'list', 
                name: 'dept',
                message: "What department does this role belong to?",
                choices: dept
            }
            ])
                .then(deptChoice => {
                const dept = deptChoice.dept;
                params.push(dept);
    
                const sql = `INSERT INTO role (title, salary, department_id)
                            VALUES (?, ?, ?)`;
    

            connection.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log(answer.role + " has been added " + " to roles."); 
    
            viewRoles();
        });
        });
    })
});
};

addEmployee = () => {
    console.log(`
    =================
    Add a New Employee
    =================
    `);
    inquirer.prompt([
      {
        type: 'input', 
        name: 'employee_firstName',
        message: "What is the first name of the employee you would like to add?",
        validate: employee_firstName => {
          if (employee_firstName) {
              return true;
          } else {
              console.log('Please enter a first name');
              return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'employee_lastName',
        message: "What is the last name of the employee you would like to add?",
        validate: employee_lastName => {
          if (employee_lastName) {
              return true;
          } else {
              console.log('Please enter a first name');
              return false;
          }
        }
      },
    ])
        .then(answer => {
            const params = [answer.employee_firstName, answer.employee_lastName];
    
            const roleData = `SELECT role.id, role.title FROM role`; 
    
            connection.query(roleData, (err, data) => {
            if (err) throw err; 
        
            const roles = data.map(({ id, title }) => ({ name: title, value: id }));
    
            inquirer.prompt([
            {
                type: 'list', 
                name: 'role',
                message: "What is this new employee's role?",
                choices: roles
            }
            ])
                .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role);
    
                const managerData = `SELECT * FROM employee`;

              connection.query(managerData, (err, data) => {
                if (err) throw err;

                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                  }
                ])
                  .then(managerChoice => {
                    const manager = managerChoice.manager;
                    params.push(manager);

                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;


            connection.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log(answer.first_name + answer.last_name + " has been added " + " to roles."); 
    
            viewRoles();
            });
          });
        })
      });
    });
  });
};

// function to update an employee 
updateEmployee = () => {
    console.log(`
    =================
    Add a New Employee
    =================
    `);
    const employeeData = `SELECT * FROM employee`;
  
    connection.query(employeeData, (err, data) => {
      if (err) throw err; 
  
    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
  
      inquirer.prompt([
        {
          type: 'list',
          name: 'name',
          message: "Which current employee would you like to update today?",
          choices: employees
        }
      ])
        .then(employeeChoice => {
          const employee = employeeChoice.name;
          const params = []; 
          params.push(employee);
  
          const roleSql = `SELECT * FROM role`;
  
          connection.query(roleSql, (err, data) => {
            if (err) throw err; 
  
            const roles = data.map(({ id, title }) => ({ name: title, value: id }));
            
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'role',
                  message: "What is the employee's new role?",
                  choices: roles
                }
              ])
                  .then(roleChoice => {
                  const role = roleChoice.role;
                  params.push(role); 
                  
                  let employee = params[0]
                  params[0] = role
                  params[1] = employee 
                  
  
                  // console.log(params)
  
                  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  
                  connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                  console.log("Employee has been updated!");
                
                  viewEmployees();
            });
          });
        });
      });
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