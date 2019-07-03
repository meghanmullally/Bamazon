var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startSuper();
});


function startSuper() {

  inquirer.prompt([{
    name: "viewProduct",
    type: "list",
    choices: [
      "View Product Sales by Department",
      "Create New Department",
      "Exit"
    ]
  }]).then(function (response) {

    switch (response.viewProduct) {
      case "View Product Sales by Department":
        salesByDep();
        break;
      case "Create New Department":
        newDep();
        break;

        case "Exit":
          console.log("Goodbye.");
          connection.end();
          break;
  
      default:
        break;
    }
  });

  // function startSuper end }
}

// VIEW PRODUCT SALES BY DEP
function salesByDep() {
  console.log("loading product sales...");

inquirer.prompt([
{

},



])


}


// CREATE NEW DEP 
function newDep() {
  // console.log("loading new department...");
  inquirer.prompt([{
      name: "newDepName",
      type: "input",
      message: "What is the name of the new Department?"
    },
    {
      name: "overHead",
      type: 'input',
      message: "How much overhead?"
    }

  ]).then(function (answer) {

    var depInput = [
      [
        answer.newDepName,
        answer.overHead

      ]
    ]

    var queryDep = "INSERT INTO departments  (department_name, over_head_costs) VALUES ?";
    connection.query(queryDep, [depInput], function (err, data) {
      if (err) throw err;

     console.table(data);
    })
    // salesByDep();

  })

  // connection.end();

  // end } for newDep()
};