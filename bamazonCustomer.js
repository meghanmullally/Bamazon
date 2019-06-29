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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

 // INQUIRER 

inquirer.prompt([
  
{
  name: "whatID",
  message: "What is the ID of the item you would like to purchase?",
  type: "number"
},

{
  name: "howMuch",
  message: "How many would you like?",
  type: "number"
}

]).then(function (response) {

console.table(response);



}) 

});


// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
    
//   });
//   connection.end();
// }



