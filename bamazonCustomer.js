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
  checkProducts();
  start();
});


function start() {
  // INQUIRER 
  inquirer.prompt([{
      name: "whatID",
      message: "What is the ID of the item you would like to purchase?"

    },

    {
      name: "howMuch",
      message: "How many would you like?"
    }

  ]).then(function (answer) {
    // console.table(answer);

    var stockQ = "SELECT * FROM products WHERE ?";

    connection.query(stockQ, {
      item_id: answer.whatID
    }, (err, data) => {
      if (err) throw err;
      // console.table(data);

      if (answer.howMuch > data[0].stock_quantity) {
        console.log("Insufficient quantity!");
      } else {
         //  stock update after user input 
        var stockUpdate = data[0].stock_quantity - parseInt(answer.howMuch);
        // cost of product after user input with 15% tax
        var stockPrice =data[0].price * parseInt(answer.howMuch);
        console.log("Total purchase: $" + stockPrice);

        connection.query("UPDATE products SET ? WHERE ?", [

            {
              stock_quantity: stockUpdate
            },

            {
              item_id: answer.whatID
            },
            //product sales 
            {
              product_sales: stockPrice
            }

          ],

        );
        // console.table(data);
        checkProducts();
        connection.end();
      }

    })

  })

};

function checkProducts() {

  connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, data) {
    if (err) throw err;
    console.log("\n");
    console.table(data);
  })

};