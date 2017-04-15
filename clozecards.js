var inquirer = require("inquirer"),
    fs = require("fs");


function basicCard(frontValue, backValue){
    this.frontProperty = frontValue;
    this.backProperty = backValue;
}

function clozeCard(textValue, clozeValue){
    this.textProperty = textValue;
    this.clozeProperty = clozeValue;
}

clozeCard.prototype.partialProperty = function(){

    if(this.textProperty.includes(this.clozeProperty)){
        return this.textProperty.replace(this.clozeProperty, "...");
    }else{
        return "Sorry, the value doesn't exist";
    }
};


inquirer.prompt({
    type: "list",
    name: "cards",
    message: "Choose type of cards:",
    choices: ["Basic Card", "Cloze Card"]
})
.then(function(data){
    if(data.cards === "Basic Card"){
        return inquirer.prompt([
            {
                type: "input",
                name: "front",
                message: "Input question:"
            },
            {
                type: "input",
                name: "back",
                message: "Input answer:"
            }
        ]);
    }
    else{
        return inquirer.prompt([
            {
                type: "input",
                name: "front",
                message: "Input question:"
            },
            {
                type: "input",
                name: "back",
                message: "Input answer:"
            }
        ]);
    }
}).then(function(data){
    console.log(data);
    addCards(data);
})
.catch(function(err){
    console.log(err);
});

var addCards = function (add){


fs.readFile("./data.json", "utf8",function(error, data){
   if(error) throw error;

   var arr = JSON.parse(data);

   arr.cards.push(add);
   
   fs.writeFile("./data.json", JSON.stringify(arr), "utf8", function(err){
       if(err) throw err;
       console.log("process completed");
   })
});
};
