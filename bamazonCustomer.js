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
      console.table(data);

      if (answer.howMuch > data[0].stock_quantity) {
        console.log("Insufficient quantity!");
      } else {
        var stockUpdate = data[0].stock_quantity - parseInt(answer.howMuch);
        connection.query("UPDATE products SET ? WHERE ?", [

            {
              stock_quantity: stockUpdate
            },

            {
              item_id: answer.whatID
            }

          ],

        );
        console.table(data);
        checkProducts();

      }

    })

  })

};

function checkProducts() {

  connection.query("SELECT * FROM products", function (err, data) {
    if (err) throw err;
    console.log("\n");
    console.table(data);
  })

};




// Update SQL DB 
// Total cost of order 





// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);

//   });
//   connection.end();
// }