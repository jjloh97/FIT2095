let express = require('express');
let app = express();
//instance of Express app 
let url = require('url');

let db = [];
//Define the database 

app.get("/newItem/:name/:quantity/:price", function(req, res){
    //Creating the app with /newItem as query and :name/:quantity/:price as the parameters 
    let theId = getnewRandomId();
    //Retrieve the getNewRandomID function 
    let obj = {id:theId, name:req.params.name, quantity:parseInt(req.params.quantity), price:parseInt(req.params.price)};
    //We retrieve the obj variables of the id, name, quantity, price
    //Id is a random Id hence we initiate the randomId function 
    //Parameters are parsed through, some as int and some default
    db.push(obj);
    //push to the database
    console.log(obj);
    res.send("Your item have been added!");

});

app.get("/listAllItems", function(req, res){
//listAllItems query 
    let st="";
    //declare the variable st
    for(let i=0; i<db.length; i++){
        let result = db[i].quantity * db[i].price;
        //result is the cost of the item quantity * price 
        st+=" | id: " + db[i].id+ " | "+ "name: " + db[i].name+ ", "+ "quantity: " + db[i].quantity+ ", "+ "price: "  + db[i].price + ", " + "cost: " + result;
    }
    //take the id of each query and parameters whilst using for loop 
    res.send(st);

});

app.get("/deleteItem/:item2delete", function (req, res){

    for(let i = 0; i<db.length; i++){
        if(db[i].id === parseInt(req.params.item2delete)){
            //check the id match with the id of the item that should be deleted
            db.splice(i,1);
            //splice takes out the specific array and the amount of arrays
            found = true;
        }
        else {
            found = false;
        }
    }

let msg = "";
if (found) {
    msg = "Your item have been deleted";
} else {
    msg = "Nothing been deleted";
}
res.send(msg);

});

app.get("/totalValue", function (req,res){
    let result = 0;
    let total = "";

    if (db.length === undefined || db.length == 0){
        //check if the array exists 
        total = "There is no value to show";
    } else {
        for(let i = 0; i<db.length; i++){
            result += db[i].quantity * db[i].price;
            //adds the total result using the += operator 
            total = "Total Value: " + result; 
    }
}
res.send(total);

});

// function cost(){
//     let result = 0; 
//     for(let i = 0; i<db.length; i++){
//         result += db[i].quantity * db[i].price;
//         console.log(result);
//     }
//     return result;
// }


function getnewRandomId(){
    let id;
    id = Math.round(Math.random()*1000);
    //we need a random ID from 1 - 1000 not 1 - 10 
    return id;
}

app.listen(8080);