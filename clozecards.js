function basicCard(front, back){
    this.frontProperty = front;
    this.backProperty = back;
}

var child = new basicCard('testingFront', "testingBack")

// console.log(child.frontProperty);

function clozeCard(text, cloze){
    this.textProperty = text;
    this.clozeProperty = cloze;
    this.partialProperty = function(){
        return "hello";
    }
}

var clozeChild = new clozeCard("George Washington was the first president of the United States.", "George Washington");
   console.log( clozeChild.partialProperty() );

