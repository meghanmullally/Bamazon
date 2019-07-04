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
  // console.log("loading product sales...");

  // join department and products 
  // table needs to have depid, depName, overhead, productSales and totalProfits 


connection.query(`SELECT departments.department_id AS 'Department ID', 
departments.department_name AS 'Department Name', 
departments.over_head_costs as 'Overhead Costs', 
SUM(products.product_sales) AS 'Product Sales', 
(SUM(products.product_sales) - departments.over_head_costs) AS 'Total Profit'  
FROM departments
LEFT JOIN products on products.department_name=departments.department_name
GROUP BY departments.department_name, departments.department_id, departments.over_head_costs
ORDER BY departments.department_id ASC`, (err, res) => {
    if (err) throw err;
    console.log('\n ----------------------------------------------------- \n');
    console.table(res);

    startSuper();

  });


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
      message: "How much overhead?",
      default: 0
    }, 
    {
      name: "prodSales",
      type: 'input',
      message: "Product Sales: ",
      default: 0
    }

  ]).then(function (answer) {

    var depInput = [
      [
        answer.newDepName,
        answer.overHead,
        answer.prodSales
      ]
    ]

    var queryDep = "INSERT INTO departments (department_name, over_head_costs) VALUES ?";
    connection.query(queryDep, [depInput], function (err, data) {
      if (err) throw err;

      console.table(data);
    })
    // salesByDep();

  })

  // connection.end();

  // end } for newDep()
};