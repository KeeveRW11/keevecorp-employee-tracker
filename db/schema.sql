CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30);
);


CREATE TABLE role_id (
    id INTEGER  PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

CREATE TABLE employee (
    id INTEGER  PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);

