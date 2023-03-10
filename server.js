const inquirer = require("inquirer");
// require("console.table");
const util = require("util");
const db = require("./config/connection");

// const store = require("./config/queries");
db.query = util.promisify(db.query);

const firstQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee's role",
    ],
    name: "response",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please select an option and hit return!");
      }
      return true;
    },
  },
];


function askFirstQuestion() {
  inquirer.prompt(firstQuestion).then(({ response }) => {
    if (response == "View all departments") {
      viewAlldepartment();
    } else if (response == "View all roles") {
      viewAllrole();
    } else if (response == "View all employees") {
      viewAllemployee();
    } else if (response == "Add a department") {
      addDepartment();
    } else if (response == "Add a role") {
      addRole();
    } else if (response == "Add an employee") {
      addEmployee();
    } else if (response == "Update an employee's role") {
      updateEmployee();
    }
  });
}

async function viewAlldepartment() {
  try {
    var results = await db.query("SELECT * FROM department;");
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function viewAllrole() {
  try {
    var results = await db.query("SELECT * FROM role;");
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function viewAllemployee() {
  try {
    var results = await db.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.job_title, department.name, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name 
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department ON employee.department_id = department.id 
        LEFT JOIN employee managers ON employee.manager_id = managers.id;`);
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function addDepartment() {
  const { department } = await inquirer.prompt([
    {
      type: "input",
      message: "Enter a name for the department you wish to add!",
      name: "department",
      validate: function (answer) {
        if (answer.length < 3) {
          return console.log(
            "Please enter a name for the department you wish to add!"
          );
        }
        return true;
      },
    },
  ]);
  try {
    db.query(
      `INSERT INTO department (name) VALUES ("${department}")`
    );
    console.log(`${department} added to department.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function addRole() {
  let department = await db.query("SELECT * FROM department;");

  let departmentList = department.map((department) => {
    return { name: department.name, value: department.id };
  });

  const { job_title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the job title of the new role you wish to add!",
      name: "job_title",
      validate: function (answer) {
        if (answer.length < 3) {
          return console.log(
            "Please enter the job title of the new role you wish to add!"
          );
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the salary of the new role you wish to add!",
      name: "salary",
      validate: function (answer) {
        if (answer.length < 3) {
          return console.log(
            "Please enter the salary of the new role you wish to add!"
          );
        }
        return true;
      },
    },
    {
      type: "list",
      message: "Select a department for the new role you wish to add!",
      choices: departmentList,
      name: "department_id",
      validate: function (answer) {
        if (!answer) {
          return console.log(
            "Please select a department for the new role you wish to add!"
          );
        }
        return true;
      },
    },
  ]);
  try {
    await db.query(
      `INSERT INTO role (job_title, salary, department_id) VALUES ("${job_title}", "${salary}", "${department_id}")`
    );
    console.log(`${job_title} added to role.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function addEmployee() {

  let role = await db.query("SELECT id, job_title FROM role;");
  let roleList = role.map((role) => {
    return { name: role.job_title, value: role.id };
  });

  let department = await db.query("SELECT * FROM department;");
  let departmentList = department.map((department) => {
    return { name: department.name, value: department.id };
  });


  let managers = await db.query(
    "SELECT id, first_name, last_name FROM employee;"
  );


  let managerList = managers.map((manager) => {
    return {
      name: manager.first_name + " " + manager.last_name,
      value: manager.id,
    };
  });

  const { first_name, last_name, role_id, department_id, manager_id } =
    await inquirer.prompt([
      {
        type: "input",
        message: "Enter the first name of the employee you wish to add!",
        name: "first_name",
        validate: function (answer) {
          if (answer.length < 2) {
            return console.log(
              "Please enter the first name of the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Enter the last name of the employee you wish to add!",
        name: "last_name",
        validate: function (answer) {
          if (answer.length < 2) {
            return console.log(
              "Please enter the last name of the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Select a role for the employee you wish to add!",
        choices: roleList,
        name: "role_id",
        validate: function (answer) {
          if (!answer) {
            return console.log(
              "Please select a role for the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Select a department for the employee you wish to add!",
        choices: departmentList,
        name: "department_id",
        validate: function (answer) {
          if (!answer) {
            return console.log(
              "Please select a department for the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Select a manager for the employee you wish to add!",
        choices: managerList,
        name: "manager_id",
        validate: function (answer) {
          if (!answer) {
            return console.log(
              "Please select a manager for the employee you wish to add!"
            );
          }
          return true;
        },
      },
    ]);

  try {
    await db.query(
      `INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${department_id}", "${manager_id}");`
    );
    console.log(`${first_name} ${last_name} added to employee.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function updateEmployee() {

  let employee = await db.query(
    "SELECT id, first_name, last_name FROM employee;"
  );


  let employeeList = employee.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });


  let role = await db.query("SELECT id, job_title FROM role;");

  let roleList = role.map((role) => {
    return { name: role.job_title, value: role.id };
  });

  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose the employee who's role you wish to update!",
      choices: employeeList,
      name: "employee_id",
      validate: function (answer) {
        if (answer.length < 3) {
          return console.log(
            "Please choose the employee who's role you wish to update!"
          );
        }
        return true;
      },
    },
    {
      type: "list",
      message: "Choose the employee's new role.",
      choices: roleList,
      name: "role_id",
      validate: function (answer) {
        if (answer.length < 3) {
          return console.log("Please choose the employee's new role!");
        }
        return true;
      },
    },
  ]);

  try {
    await db.query(
      `UPDATE employee SET role_id = ("${role_id}") WHERE id = "${employee_id}";`
    );
    console.log(`${employee_id} updated.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}

askFirstQuestion();