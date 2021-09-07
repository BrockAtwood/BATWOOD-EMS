/* basic drop, create, & use boiler for schema*/
DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

USE business_db;
/* examples from activity #22 */
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);
/* Decimal from sql tutorial . net (p,s) p = total place values, s = place values to the right of the decimal*/
/* Foreign and reference lines from activity #20 */
CREATE TABLE roles (
    id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

/* last directions note about the manager and reference to employee id */
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);