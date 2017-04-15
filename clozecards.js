//dependencies
var inquirer = require("inquirer"),
    fs = require("fs");


//basic card constructor 
function basicCard(frontValue, backValue){
    this.frontProperty = frontValue;
    this.backProperty = backValue;
}

//cloze card constructor
function clozeCard(textValue, clozeValue){
    this.textProperty = textValue;
    this.clozeProperty = clozeValue;
}

//replace the answer with ...
clozeCard.prototype.partialProperty = function(){

    if(this.textProperty.includes(this.clozeProperty)){
        return this.textProperty.replace(this.clozeProperty, "...");
    }else{
        return "Sorry, the value doesn't exist";
    }
};


//asking user to make a choice
inquirer.prompt({
    type: "list",
    name: "cards",
    message: "Choose type of cards:",
    choices: ["Create Flashcards", "Review Basic Card", "Review Cloze Card"]
})

//creates flashcards
.then(function(data){
    if(data.cards === "Create Flashcards"){
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
    // else{
    //     return inquirer.prompt([
    //         {
    //             type: "input",
    //             name: "front",
    //             message: "Input question:"
    //         },
    //         {
    //             type: "input",
    //             name: "back",
    //             message: "Input answer:"
    //         }
    //     ]);
    // }

    //If this worked, then it would have picked random cards that's in the data.json file and ask questions
    else if (data.cards === "Review Basic Card"){
            fs.readFile("./data.json", "utf8", function(err, data){
            var flashcard = JSON.parse(data);  
            console.log(flashcard.cards[Math.floor(Math.random())].front);             
            })
    }

    //If this worked, then it would have picked random cards that's in the data.json file and ask questions with answer being replaced by ...  
    else{
            fs.readFile("./data.json", "utf8", function(err, data){
            var flashcard = JSON.parse(data);  
            console.log(flashcard.cards[Math.floor(Math.random()*cards.length)].front);  
        });
    };
}).then(function(data){
    // console.log(data);
    addCards(data);
})
.catch(function(err){
    // console.log(err);
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
