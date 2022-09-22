//console.log('node is on');
// Packages required for this application
const fs = require('fs');
const { writeFile } = require('fs/promises');
const inquirer = require('inquirer');
//const generateMarkdown = require('./utils/generateMarkdown');


const questions = () => {
    return inquirer.prompt(
    [   
        {
            type: 'list',
            name: 'license',
            message: 'What would you like to do?',
            choices:[
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]          
        },
        {
            type: 'input',
            name: 'project',
            message: 'What is the name of the department and that department is added to the database? ()Required',
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the department!');
                    return false;
                }
            }
        },
    // Function used to write README file    
    ])/*.then(answers => {
        writeToFile(answers)
        console.log('Successfully wrote to README.md!')
    }).catch((err) => console.error(err));*/

};

// The function used to initialize app
//const writeToFile = answers => {
//    writeFile('README.md', generateMarkdown(answers))
//}

// Function call used to initialize app
questions();
