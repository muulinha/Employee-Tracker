const inquirer = require("inquirer");
// require("console.table");
const util = require("util");
const db = require("./config/queries");

const store = require("./config/queries");
db.query = util.promisify(db.query);

// function init() {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "selection",
//         message: "What would you like to do?",
//         choices: [
//           "View all departments",
//           "Add a department",
//           "View All Roles",
//           "View All Employees",
//           "Add New Role",
//           "Add New Employee",
//           "Update Employee Role",
//           "Quit",
//         ],
//       },
//     ])
//     .then((response) => {
//       switch (response.selection) {
//         case "View all departments":
//           viewAllDepartments();
//           break;
//         case "Add a department":
//           createNewdepartment();
//           break;
//         case "View All Roles":
//           viewAllRoles();
//           break;
//         case "View All Employees":
//           viewAllEmployees();
//           break;
//         case "Add New Role":
//           addNewRole();
//           break;
//         case "Add New Employee":
//           addNewEmployee();
//           break;
//         case "Update Employee Role":
//           updateEmployeeRole();
//           break;
//         case "Quit":
//           process.exit();
//       }
//     });
// }
// init();
// function viewAllDepartments() {
//   store.getAllDepartments().then(([department]) => {
//     console.table(department);
//     init();
//   });
// }
// function viewAllRoles() {
//   store.getAllRoles().then(([roles]) => {
//     console.table(roles);
//     init();
//   });
// }
// function viewAllEmployees() {
//   store.getAllEmployees().then(([employees]) => {
//     console.table(employees);
//     init();
//   });
// }
// function createNewdepartment() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "name",
//         message: "Whats is the new departments name?",
//       },
//     ])
//     .then(({ name }) => {
//       store
//         .createNewdepartment({ name })
//         .then(() => {
//           console.log(`Added ${name} to the db`);
//         })
//         .then(() => {
//           init();
//         });
//     });
// }

// function addNewRole() {
//   store.getAllDepartments().then(([departments]) => {
//     const choices = departments.map((department) => ({
//       name: department.name,
//       value: department.id,
//     }));

//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "title",
//           message: "What is the title of the role?",
//         },
//         {
//           type: "input",
//           name: "salary",
//           message: "What is the salary of the role?",
//         },
//         {
//           type: "list",
//           name: "department_id",
//           message: "Which department does this role belong to?",
//           choices: choices,
//         },
//       ])
//       .then(({ title, salary, department_id }) => {
//         store
//           .createNewRole({
//             title,
//             salary,
//             department_id,
//           })
//           .then(() => {
//             console.log(`Added ${title} to the db`);
//           })
//           .then(() => {
//             init();
//           });
//       });
//   });
// }

// function addNewEmployee() {
//   let roleChoices;
//   let managerChoices;

//   store.getAllRoles().then(([roles]) => {
//     roleChoices = roles.map((role) => ({
//       name: role.title,
//       value: role.id,
//     }));

//     store.getAllEmployees().then(([employees]) => {
//       managerChoices = employees.map((employee) => ({
//         name: employee.first_name + " " + employee.last_name,
//         value: employee.id,
//       }));

//       inquirer
//         .prompt([
//           {
//             name: "first_name",
//             message: "What is the employee's first name?"

//           },
//           {
//             name: "last_name",
//             message: "What is the employee's last name?"

//           },
//           {
//             name: "role_id",
//             message: "What is the employees role?",
//             choices: roleChoices,
//           },
//           {
//             name: "manager_id",
//             message: "What is this Employees manager",
//             choices: managerChoices,
//           },
//         ])
//         .then(({ first_name, last_name, role_id, manager_id }) => {
//           store
//             .createNewEmployee({
//               first_name,
//               last_name,
//               role_id,
//               manager_id,
//             })
//             .then(() => {
//               console.log(`Added ${first_name} ${last_name} to the db`);
//             })
//             .then(() => {
//               init();
//             });
//         });
//     });
//   });
// }

// function updateEmployeeRole() {
//   store.getAllEmployees().then(([employees]) => {
//     const employeeChoices = employees.map((employee) => ({
//       name: employee.first_name + " " + employee.last_name,
//       value: employee.id,
//     }));
//     store.getAllRoles().then(([roles]) => {
//       const roleChoices = roles.map((role) => ({
//         name: role.title,
//         value: role.id,
//       }));
//       inquirer.prompt([
//         {
//           type: "list",
//           name: "employeeid",
//           message: "Which employee would you like to update?",
//           choices: employeeChoices,
//         },
//         {
//           type: "list",
//           name: "roleid",
//           message: "Which role do you want to assign the selected employee",
//           choices: roleChoices,
//         },
//       ]).then(({employeeid, roleid}) => {
//         store.updateRole(employeeid, roleid).then (() => {
//           console.log("Success")
//           init()
//         })
//       })
//     });
//   });
// }

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
      viewAllDepartments();
    } else if (response == "View all roles") {
      viewAllRoles();
    } else if (response == "View all employees") {
      viewAllEmployees();
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

async function viewAllDepartments() {
  try {
    var results = await db.query("SELECT * FROM departments;");
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function viewAllRoles() {
  try {
    var results = await db.query("SELECT * FROM roles;");
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function viewAllEmployees() {
  try {
    var results = await db.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.salary, roles.job_title, departments.department_name, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name 
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id 
        LEFT JOIN departments ON employees.department_id = departments.id 
        LEFT JOIN employees managers ON employees.manager_id = managers.id;`);
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
      `INSERT INTO departments (department_name) VALUES ("${department}")`
    );
    console.log(`${department} added to Departments.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function addRole() {
  let departments = await db.query("SELECT * FROM departments;");

  let departmentList = departments.map((department) => {
    return { name: department.department_name, value: department.id };
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
      `INSERT INTO roles (job_title, salary, department_id) VALUES ("${job_title}", "${salary}", "${department_id}")`
    );
    console.log(`${job_title} added to Roles.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function addEmployee() {

  let roles = await db.query("SELECT id, job_title FROM roles;");
  let roleList = roles.map((role) => {
    return { name: role.job_title, value: role.id };
  });

  let departments = await db.query("SELECT * FROM departments;");
  let departmentList = departments.map((department) => {
    return { name: department.department_name, value: department.id };
  });


  let managers = await db.query(
    "SELECT id, first_name, last_name FROM employees;"
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
      `INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${department_id}", "${manager_id}");`
    );
    console.log(`${first_name} ${last_name} added to Employees.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}


async function updateEmployee() {

  let employees = await db.query(
    "SELECT id, first_name, last_name FROM employees;"
  );


  let employeesList = employees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });


  let roles = await db.query("SELECT id, job_title FROM roles;");

  let roleList = roles.map((role) => {
    return { name: role.job_title, value: role.id };
  });

  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose the employee who's role you wish to update!",
      choices: employeesList,
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
      `UPDATE employees SET role_id = ("${role_id}") WHERE id = "${employee_id}";`
    );
    console.log(`${employee_id} updated.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}

askFirstQuestion();