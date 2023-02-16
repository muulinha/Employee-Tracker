const connection = require("./connection");

class Store {
  constructor(connection) {
    this.connection = connection;
  }
  getAlldepartment() {
    return this.connection.promise().query("SELECT * from department;");
  }
  getAllrole() {
    return this.connection.promise().query("SELECT * from role;");
  }

  getAllemployee() {
    return this.connection.promise().query("SELECT * from employee;");
  }
  createNewdepartment(departmentName) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", departmentName);
  }
  createNewEmployee(employeeData) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employeeData);
  }
  createNewRole(RoleData) {
    return this.connection.promise().query("INSERT INTO role SET ?", RoleData);
  }
  updateRole(employeeid, roleid) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleid, employeeid]
    );
  }
}

module.exports = new Store(connection);
