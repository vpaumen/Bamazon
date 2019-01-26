var inquirer = require("inquirer");

var mysql = require("mysql");

var choiceArray = [];
var totalPrice = 0;
var dbitem_id = 0;
var dbquantity = 0;

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
  
    listItems();
  
  });

  function listItems() {
    console.log("Welcome to Bamazon! Here is a list of all items...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

    for(var i= 0; i < res.length; i++){

        console.log(res[i].item_id + ": Product: " + res[i].product_name + "| Department: " + res[i].department_name + "| Price: " + res[i].price +"| Quantity: " + res[i].stock_quantity);
        choiceArray.push(res[i]);
    }
      //connection.end();
      getCustomerRequest();
    });
  }


  function getCustomerRequest() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the number of the item you would like to purchase?",
            name: "product"
      
        },
        {
            type: "input",
            message: "How many of this item would you like to buy?",
            name: "product_quantity"
      
        }
      ]).then(function(answers) {

       // console.log(choiceArray);
    
        for(var i= 0; i < choiceArray.length; i++){
            if(choiceArray[i].item_id == answers.product){
                if(choiceArray[i].stock_quantity < answers.product_quantity){
                    console.log("Sorry we don't have enough of this product!");
                    callback2("Thank you for visiting!", endConnection);
                }
                else{
                    totalPrice = choiceArray[i].price * answers.product_quantity;
                    console.log("Let's get it for you! That will be $" + totalPrice);
                    dbitem_id = choiceArray[i].item_id;
                    dbquantity = choiceArray[i].stock_quantity - answers.product_quantity;
                    updateItems();
                    
                }

            }
            else{
              //  console.log("Sorry that doesn't seem to be a valid selection");
            }
        }
      });

  }

  function updateItems() {
    console.log("Updating selected Item...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: dbquantity
        },
        {
          item_id: dbitem_id
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " item updated!\n");
        choiceArray = [];
        callback("Let's go back to the updated inventory",listItems);

      }
    );
    }

    function callback(phrase,passedFunc){
        console.log(phrase);
        passedFunc();
    
    }

    function callback2(phrase,passedFunc){
        console.log(phrase);
        passedFunc();
    }

    function endConnection(){
        connection.end();
    }