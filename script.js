let gameName = "Brave Carmela";
const gameNameNode = document.querySelector("#game-name");
gameNameNode.textContent = gameName;

// hide the next button 
const nextButtonNode = document.querySelector("#next-btn");
nextButtonNode.style.display = "none";

// set the nextState to null
let nextState = null;

let currentState = "start";

const questionNode = document.querySelector("#question");
const answersNode = document.querySelector("#answers");

function renderQuestion() {
    // clear the old buttons
    answersNode.textContent = "";
    nextButtonNode.style.display = "none";
    // use switch-case to control the flow fo the project
    switch (currentState){
        case "victory":
            const victoryText = "You defeated the monster, congratulations! You win!"
            questionNode.textContent =victoryText;
            nextState = "start";
            nextButtonNode.style.display = "block";
            break;

        case "defeat":
            const defeatText = "The monster defeated you. The End!";
            questionNode.textContent = defeatText;
            nextState = "start";
            nextButtonNode.style.display = "block";
            break;
        
        case "start":
            const startButton = {yes:"Yes, follow the monster", no: "No, I am scared of the monster"};
            const startText = "Search for the monster. You have found some clues about the monster. Do you follow the monster?";
            // set the question text
            questionNode.textContent = startText;

            for(const answer in startButton){
                if (answer === "yes"){
                    nextState = "lair";
                }else{
                    nextState = "defeat";
                }
                addAnswerButton(startButton[answer],nextState);
            }
           break;

        case "lair":
            const lairButton = {yes:"Yes", no: "No"};
            const lairText = "You reach the monster's icy lair. Do you use your sunglasses to block its freezing gaze?";
            questionNode.textContent = lairText;

            for(const answer in lairButton){
                if (answer === "yes"){
                    nextState = "battle";
                }else{
                    nextState = "defeat";
                }
                addAnswerButton(lairButton[answer],nextState);
            }
            break;

        case "battle":
            const battleButton = {yes:"Crow now" , no:"Wait for the moment"};
            const battleText = "You prepare to crow and defeat the monster. Do you crow immediately or wait for the right moment?";
            questionNode.textContent = battleText;

             for(const answer in battleButton){
                if (answer === "yes"){
                    nextState = "final";
                }else{
                    nextState = "defeat";
                }
                addAnswerButton(battleButton[answer],nextState);
            }
            break;

        case "final":
            const finalButton = {yes:"Stand your ground" , no:"Dodge"};
            const finalText = "The monster attacks! Do you dodge or stand your ground?";
            questionNode.textContent = finalText;

             for(const answer in finalButton){
                if (answer === "yes"){
                    nextState = "victory";
                }else{
                    nextState = "defeat";
                }
                addAnswerButton(finalButton[answer],nextState);
            }
            break;
    }
}

function addAnswerButton(buttonText, nextState) {
    // create new button and add the button text
    const newElementButton = document.createElement("button");
    newElementButton.textContent = buttonText;

    // add the button to the ul block in HTML 
    answersNode.appendChild(newElementButton);

    // set the currentState to the nextState when click the button
    newElementButton.addEventListener("click",() =>{
        currentState = nextState;
        renderQuestion();
    })
}

// create nextQuestion. Only when click the next button, it will be triggered.
function nextQuestion() {
    if(nextState === "start"){
        currentState = nextState;
        // restore the nexState to null;
        nextState = null;
        renderQuestion();
    }
}

// call the renderQuestion() to run the program
renderQuestion();