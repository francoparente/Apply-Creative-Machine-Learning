var learner = new Learner(); //initialise the learner object
learner.addGUI(document.getElementById("dataset")); //append the Learner.js GUI
learner.addRegression(4); //Declaring a Model

const whenYouReceiveNewInputs = (newInputs)=> {
    //Use the current values of the GUI as output labels
    learner.newExample(newInputs, learner.y);
}

learner.onOutput = (data)=> {
    console.log(data)
});

