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

console.log(response.whatID.type);
console.log("-------------");
console.log(response.howMuch.type); 

}) 

});



