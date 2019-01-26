var inquirer = require("inquirer");

var mysql = require("mysql");

var dbItem_Id = 0;
var dbStockQuantity = 0;

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "NewJ@b$Prgrm18",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  
    mainMenu();
  
  });



function mainMenu(){



inquirer.prompt([
    {
        type: "list",
        message: "Main Menu. Please select an option below: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
        name: "menu"
    }
  ]).then(function(answers) {

    switch (answers.menu) {
        case "View Products for Sale":
        listItems();
        break;
        
        case "View Low Inventory":
        lowInventory();
        break;
        
        case "Add to Inventory":
        addMore();
        break;
        
        case "Add New Product":
        addProduct();
        break;

        case "Exit":
        endConnection();
        break;

        default :
        conosole.log("Sorry that's not a valid option.");
        endConnection();
        }
});

}

function endConnection(){
    console.log("Thank you for visiting!");
    connection.end();
}

function listItems() {
    console.log("Here is a list of all items...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

    for(var i= 0; i < res.length; i++){

        console.log(res[i].item_id + ": Product: " + res[i].product_name + "| Department: " + res[i].department_name + "| Price: " + res[i].price +"| Quantity: " + res[i].stock_quantity);
        //choiceArray.push(res[i]);
    }

    mainMenu();
    });
  }

  function lowInventory() {
    console.log("Here is a list of all items that need to be restocked...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
      if (err) throw err;

    for(var i= 0; i < res.length; i++){

        console.log(res[i].item_id + ": Product: " + res[i].product_name + "| Department: " + res[i].department_name + "| Price: " + res[i].price +"| Quantity: " + res[i].stock_quantity);
        //choiceArray.push(res[i]);
    }
    mainMenu();
    });
  }

  function addMore(){

    console.log("Here is a list of all items...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

    for(var i= 0; i < res.length; i++){

        console.log(res[i].item_id + ": Product: " + res[i].product_name + "| Department: " + res[i].department_name + "| Price: " + res[i].price +"| Quantity: " + res[i].stock_quantity);
        //choiceArray.push(res[i]);
        }

        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the number of the item you would like to restock?",
                name: "product"
          
            },
            {
                type: "input",
                message: "How many more of this item would you like to add?",
                name: "product_quantity"
          
            }
          ]).then(function(answers) {

            for(var i= 0; i < res.length; i++){
                if(res[i].item_id == answers.product){
                   dbItem_Id = res[i].item_id;
                   dbStockQuantity = parseInt(res[i].stock_quantity) + parseInt(answers.product_quantity);

                   connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: dbStockQuantity
                      },
                      {
                        item_id: dbItem_Id
                      }
                    ],
                    function(error) {
                      if (error) throw err;
                      console.log("Item updated successfully!");
                      mainMenu();
                    }
                  );
                        
                        
                    }
                    else{
                        //do nothning
                    }
    
                }

          });

    });



  }

  function addProduct() {
      
        inquirer
        .prompt([
            {
            name: "name",
            type: "input",
            message: "What is the name of the item you would like to submit?"
            },
            {
            name: "category",
            type: "input",
            message: "What category would you like to place your item in?"
            },
            {
            name: "price",
            type: "input",
            message: "What is the price of this item?"
            },
            {
            name: "quantity",
            type: "input",
            message: "How many of this item would you like to add?"
            }
        ])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.category,
                price: answer.price,
                stock_quantity: answer.quantity
            },
            function(err) {
                if (err) throw err;
                console.log("Your item was added successfully!");
                // re-prompt the user for if they want to bid or post
                mainMenu();
            }
            );
        });


  }