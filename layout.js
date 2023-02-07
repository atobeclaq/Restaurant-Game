function drawpreparebutton(){
  var prepareButton = createButton("Prepare");
  prepareButton.position(150, 100);
  prepareButton.mousePressed(function() {
    // Remove the dialog when the button is clicked
    prepare = "True"
    console.log("Start Preparing")
  });
  var stopButton = createButton("Stop Prepare")
  stopButton.mousePressed(function() {
    // Remove the dialog when the button is clicked
    prepare = "False"
    console.log("Stop Preparing")
  });
  stopButton.position(250, 100);
}