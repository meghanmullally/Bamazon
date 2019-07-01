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
  startManager();
});

function startManager() {
  inquirer.prompt([
    // list of menu options 
    {
      name: "options",
      type: "list",
      message: "Menu Options",
      choices: [
        "View Product for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ]).then(function (response) {

    switch (response.options) {
      case "View Product for Sale":
        viewSale();
        break;
      case "View Low Inventory":
        lowInv();
        break;
      case "Add to Inventory":
        addInv();
        break;
      case "Add New Product":
        addNewProduct();
        break;

      default:
        break;
    }

    // if a manager selects VIEW PRODUCTS FOR SALE 

    function viewSale() {
      console.log("view product....")
    }

    // if a manager selects VIEW LOW INVENTORY
    function lowInv() {
      console.log("view low inventory....")
    }
    // if a manager selects ADD TO INVENTORY 
    function addInv() {
      console.log("add to inventory....")
    }
    // if a manager selects ADD NEW PRODUCT 

    function addNewProduct() {
      console.log("add new product....")
    }


  })

};