/* basic drop, create, & use boiler for schema*/
DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

USE business_db;
/* examples from activity #22 */
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);
/* Decimal from sql tutorial . net (p,s) p = total place values, s = place values to the right of the decimal*/
/* Foreign and reference lines from activity #20 */
CREATE TABLE role (
    id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES manager(id)
);