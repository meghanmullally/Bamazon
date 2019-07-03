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
        "Add New Product",
        "Exit"
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
      case "Exit":
        console.log("Good Bye.");
        connection.end();
        break;

      default:
        break;
    }
  });
}

// if a manager selects VIEW PRODUCTS FOR SALE 

function viewSale() {
  // console.log("view product....")

  connection.query("SELECT * FROM products", (err, data) => {
    if (err) throw err;
    console.table(data);
    connection.end();
  })
}

// if a manager selects VIEW LOW INVENTORY
function lowInv() {
  // console.log("view low inventory....")
  connection.query("SELECT * FROM products WHERE stock_quantity < 5 ", (err, data) => {
    if (err) throw err;
    console.table(data);
  })
}
// if a manager selects ADD TO INVENTORY 
function addInv() {
  // console.log("add to inventory....")
  inquirer.prompt([{
      name: "whichID",
      type: 'input',
      message: "Which ID would you like to add to?"

    },
    {
      name: "howMuchAdd",
      type: "number",
      message: "How much would you like to add?"
    }
  ]).then(function (answer) {

    var stockQ = "SELECT * FROM products WHERE ?";

    connection.query(stockQ, {
      item_id: answer.whichID
    }, (err, data) => {
      if (err) throw err;
      // console.table(data);



      var addInventory = data[0].stock_quantity + parseInt(answer.howMuchAdd);

      connection.query("UPDATE products SET ? WHERE ?", [


        {
          stock_quantity: addInventory
        },
        {
          item_id: answer.whichID
        }

      ])
      viewSale();
    })

  });


}
// if a manager selects ADD NEW PRODUCT 

function addNewProduct() {
  // console.log("add new product....")
  inquirer.prompt([{
      name: "newProductName",
      type: "input",
      message: "What is the name of the new product?"
    },
    {
      name: "newDepName",
      type: "input",
      message: "What is the department name of the new product?"
    },
    {
      name: "newProductPrice",
      type: "input",
      message: "What is the price of the new product?"
    },
    {
      name: "newProductStockQ",
      type: "input",
      message: "What is the stock quantity of the new product?"
    },

  ]).then(function (answer) {

    var productInput = [
      [
        answer.newProductName,
        answer.newDepName,
        parseInt(answer.newProductPrice),
        parseInt(answer.newProductStockQ)
      ]
    ];

    var query = "INSERT INTO products  (product_name, department_name, price, stock_quantity) VALUES ?";
    connection.query(query, [productInput], function (err) {
      if (err) throw err;

      // console.log(data);
    })
    viewSale();
  })

}

//     }

//   })

// };