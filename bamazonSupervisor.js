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

inquirer.prompt([
{
  name: "viewProduct",
  type: "list",
  choices: [
    "View Product Sales bye Department",
    "Create New Department"
  ]
}
]).then(function(response) {

switch (key) {
  case value:
    
    break;

  default:
    break;
}





})


}

// VIEW PRODUCT SALES BY DEP




// CREATE NEW DEP 