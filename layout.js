let chairx = 100;
let chairy = 200
let chairxarray = [[100, 200,0],[400,200,0]]
let currentemptychair
var energy = 100; // starting energy value
let energyMax = 100; // maximum energy value
// let realstart = 0
function drawfloor(){

    fill(100)
    rect(0,0,windowWidth, 100)
    fill(0, 153, 255,50)
    rect(0,100,windowWidth, windowHeight - 100)
  
  }

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
  
function drawEnergyBar() {
  noStroke();
  fill(255, 0, 0); // red color for the empty part of the bar
  rect(10, 60, 320, 20); // draw the empty bar
  fill(0, 255, 0, 200); // green color for the filled part of the bar
  let energyWidth = map(energy, 0, energyMax, 0, 320); // calculate the width of the filled part of the bar
  rect(10, 60, energyWidth, 20); // draw the filled part of the bar
}
  
function restoreEnergy() {
  energy = min(energy + 10, energyMax); // increase energy by 10, but don't let it go over the maximum value
  console.log("energy restored ")
}

function drawchairandtable(chairx, chairy){

  // fill(255, 229, 204);
  // stroke(205, 170, 125)
  // rect(chairx, chairy-20, 20, 120)
  // rect(chairx+20,chairy+50,40,23)
  // rect(chairx+60, chairy+50, 20,50)
  // fill(205, 170, 125);
  // stroke(255)
  // strokeWeight(1);
  // ellipse(chairx+ 130,chairy+40,100,60)
  // rect(chairx + 125, chairy+70, 10, 30)
  image(chairImg, chairx+ 80, chairy, 100,180)
  image(tableImg, chairx-70, chairy+10, 200, 250);
  
  
}

function checkemptychair(){
  for (let i = 0; i < chairxarray.length; i++) {
      if (chairxarray[i][2] == 0){
          currentemptychair = i
          return currentemptychair
      }
  }
  return -1 
}

function drawMoneyBox(){
  fill(lightgrey);
  textSize(25);
  currentMoney = localStorage.getItem("profit")
  
  if (currentMoney)
  { text("Earnings: $" + currentMoney, 350, 80);}
  else
  {
    text("Earnings: $" + 0, 350, 80);
    localStorage.setItem("profit", 0)
  }

  text("Level: " + 0, 550, 80);
}

function showpopupmsg(msg, customer){
  let popup = createDiv(msg);
  console.log("should pop up")
  popup.position(chairxarray[customer.seatNumber][0]+40,chairxarray[customer.seatNumber][1]-20);
  popup.style("background-color", "#ffcc00");
  popup.style("padding", "10px");
  popup.style("border-radius", "5px");
  setTimeout(function() {
    popup.hide();
  }, 1000);
}
function updateMoney(amount) {
  currentMoney = parseInt(currentMoney) + amount;
  localStorage.setItem("profit", currentMoney);
  // console.log("amount is :", amount, "currentmoney : ", currentMoney)
}