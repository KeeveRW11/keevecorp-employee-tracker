# keevecorp-employee-tracker

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contribution Guidelines](#contribution)
  * [Test](#test)
  * [License](#license)
  * [For More Details](#questions)
  
  ## Description
  This is a a node application which leverages SQL to generate a CLI Database. The application allows users to retrieve and update information in the database from prompts using a popular npm.
  ## Installation 
  This app requires node.js, SQL as well as an NPM package called inquirer. The app can be cloned from the github repository below and can be deployed from the Heroku platform.
  ## Usage 
  This app can be used to keep track of a company's employee's, their roles and the departments. You have the option to retrieve, add, and update employee information.
  ## Contribution Guidelines
  Please contact below for further instructions if required.
  ## Test
  Follow user story below.
  ## License
  ![Unlicensed](https://img.shields.io/badge/license-Unlicense-blue.svg)
  ## For More Details
  Contact me:
  Github:[https://github.com/KeeveRW11/keevecorp-employee-tracker](https://github.com/KeeveRW11)
  Email:[keevewhyte+github@gmail.com](keevewhyte+github@gmail.com)
  Screencastify Link: [https://drive.google.com/file/d/1mjq1IHWUTefp2BT6pC90CKwmRd08QAaz/view]

  ## Story
  GIVEN a command-line application that accepts user input
  WHEN I start the application
  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  WHEN I choose to view all departments
  THEN I am presented with a formatted table showing department names and department ids
  WHEN I choose to view all roles
  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  WHEN I choose to view all employees
  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  WHEN I choose to add a department
  THEN I am prompted to enter the name of the department and that department is added to the database
  WHEN I choose to add a role
  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
  WHEN I choose to add an employee
  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  WHEN I choose to update an employee role
  THEN I am prompted to select an employee to update and their new role and this information is updated in the database

