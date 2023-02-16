USE database_db;

INSERT INTO department (name)
VALUES  ('R&D'), 
        ('Manufaturing'), 
        ('IT'), 
        ('HR'), 
        ('Logistics');


INSERT INTO role (job_title, salary, department_id)
VALUES  ('Engineer', 80000, 1),
        ('Web Developer', 30000, 3), 
        ('Help Desk', 250000, 3),
        ('HR Assistant', 700000, 4),
        ('Panner', 85000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Neymar', 'Junior', 1, 1),
        ('Roger', 'Federer', 3, null),
        ('Lebron', 'James', 2, 2),
        ('Felipe', 'Massa', 5, null),
        ('Cristiano', 'Ronaldo', 4, 2),
        ('Messi', 'Lionel', 3, 1),
        ('Pedro', 'Araujo', 5, null);


