INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Business Development Lead', 90000, 1),
('Full Stack Developer', 80000, 2),
('Accountant', 10000, 3), 
('Chief Finanical Officer', 150000, 3),
('Chief Compliance Officer', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Steve', 'Jobs', 2, null),
('Jeff', 'Bezos', 1, 1),
('Elon', 'Musk', 4, null),
('Warren', 'Buffet', 3, 3),
('Oprah', 'Winfrey', 5, null);