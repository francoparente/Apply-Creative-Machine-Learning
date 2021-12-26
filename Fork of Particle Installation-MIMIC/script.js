const learner = new Learner("53029bcb-7d63-4b7d-58c2-2874c9a1c225");
learner.addGUI(document.getElementById("dataset"));
learner.addClassifier(3);

learner.setCountIn(3);
learner.setRecordLimit(3);

let onNewSkeleton = (data)=> {
  learner.newExample(data, learner.y);
}


let prevClass = 0;
let v = 7;

learner.onOutput = (d)=> {
  //If we've changed pose
  if(prevClass !== d[0])
  {
    //Change direction 
    dx = (Math.random() * v) - v/2
    dy = (Math.random() * v) - v/2
    prevClass = d[0];
    //Change colour, these are defined in the "Particles" tab
    currentColor = colors[d[0]];
  }
}
