let express = require('express');
let app = express();

//localhost:8080/addNo/80 : Add a new number to the database
//locahost:8080/deleteNo/80 : To delete a number // the first occ
//localhost:8080/deleteById/123 : delete a number by its ID
//localhost:8080/listAll : to get all the numbers and their IDs

let db = [];
//let db into an inter array 

app.get("/addNo/:number", function(req, res){
    let theId = getnewRandomId();
    let obj={id:theId,no:parseInt(req.params.number)};
    //Pase give the 80 as a string
    //The object simply become a container of two attribute 
    //The random Id and the number I provided from localhost:8080/addNo/80 -- the 80
    console.log(obj);
    db.push(obj);
    //push the object tot he database 
    res.send("Thank You");
});

app.get("/listAll", function(req, res){
    
    let st="";
    for(let i=0; i<db.length; i++){
        st+=(i)+" - "+ db[i].id+" | "+ db[i].no;
    }
    res.send(st);
});

app.get("/deleteNo/:number2delete", function(req, res){

    for (let i = 0; i<db.length;i++){
        if(db[i].no === parseInt(req.params.number2delete)){
            db.splice(i,1);
            found=true;
        }
    }

let msg = "";
if(found){
    msg="We deleted your number!!";
} else {
    msg="Sorry! We could not find it!"
}
res.send(msg);

});


function getnewRandomId(){
    let id;
    id = Math.round(Math.random()*1000);
    return id;
}

app.listen(8080);

//git init
//git remote add origin https://github.com/jjloh97/week4tute1.git
//right click to push 