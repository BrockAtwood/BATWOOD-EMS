/* Activity #18 Seeds examples */
USE business_db;

INSERT INTO department (department_name) VALUES ("Manager"), ("Sales"), ("Finance"), ("Legal"), ("Engineering"), ("Accounting"), ("Human Resources");

INSERT INTO role (title, salary, department_id) VALUES ("Manager", 150000, 1), ("Sales Representative", 60000, 2), ("Financial Analyst", 100000, 3), ("Lawyer", 75000, 4), ("Junior Engineer", 45000, 5), ("Senior Engineer", 80000, 5), ("Junior Accountant", 50000, 6), ("Senior Accountant", 90000, 6), ("Human Resources", 25000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brock", "Atwood", 1, NULL), ("Suzy", "Evans", 2, 1), ("Jon", "Candy", 3, 1), ("Bob", "Hope", 4, 1), ("Lebron", "James", 5, 1), ("Chris", "Paul", 6, 1), ("Snoop", "Dogg", 7, NULL),;