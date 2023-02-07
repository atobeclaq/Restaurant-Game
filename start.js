var dialogbutton
var lightblue = "rgb(0, 153, 255,0.5)"
var lightpink = "rgba(255, 182, 193, 0.5)"
var lightgrey = "rgba(200, 200, 200, 0.5)"
var prepare = "True"
var imageDisplayed = "False";
let trigger = 0
let dig = -100
let randomIndex = -100
let customercolor = -1
let ordersuccess = -1
let showShapes = true;
let fail
let img
let chairx = 100;
let chairy = 200
let bodyx= 50
let bodyy =100
var grid = [];
var path = [];
var startX = 0;
var startY = 0;
var endX = 9;
var endY = 9;
let leave = 0
let chair = [(160, 250)]
let destx = 160
let desty = 250
let distance = Math.sqrt(((destx - bodyx)*(destx - bodyx)) +  ((desty-bodyy)*(desty-bodyy)))
let vx = (destx - bodyx)/distance 
let vy = (desty - bodyy)/distance
let randomVariable = -1
let dishdelay = 0
var currentStep = 0;
let mood = 'happy'
var dishes = [      
  {name: "Pizza", cost: "$10", energycost: 10, image: "images/pizza.jpeg"},      
  {name: "Sushi", cost: "$15", energycost: 10, image: "images/sushi.jpeg"},      
  {name: "Steak", cost: "$20", energycost: 10, image: "images/steak.jpeg"}    
];

var dishescopy = [      
  {name: "Pizza", cost: "$10", energycost: 10, image: "images/pizza.jpeg"},      
  {name: "Sushi", cost: "$15", energycost: 10, image: "images/sushi.jpeg"},      
  {name: "Steak", cost: "$20", energycost: 10, image: "images/steak.jpeg"}    
];
var energy = 100; // starting energy value
let energyMax = 100; // maximum energy value
let x = 0;
let y = 0;
let direction = 1;

function preload(){
  for(var i=0; i < dishes.length; i++){
    dishescopy[i].image=  loadImage( dishescopy[i].image)
  }
  img = loadImage("images/table.jpeg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(restoreEnergy, 600000);
  noStroke();
}

function draw() {
  background(250);


  drawfloor()
  drawtable()
  drawchair()
  drawdialogbutton()
  drawpreparebutton()
  drawEnergyBar();

  if (prepare == "False" && (random(1) < 0.01 ) ){
    
    showShapes = true
    customercolor = random (0,255)
    randomIndex = Math.floor(random(dishes.length));
    console.log(" Customer entering....")
  }
  if ((prepare == "False")  &&(randomIndex != -100))
  { console.log("start drawing customer ...", ordersuccess)
    movingCustomer(customercolor, randomIndex)}


}


function drawfloor(){

  fill(100)
  rect(0,0,windowWidth, 100)
  fill(0, 153, 255,50)
  rect(0,100,windowWidth, windowHeight - 100)


}

function drawdialogbutton(){

  var dialogbutton = createButton(" Menu Book ");
  dialogbutton.position(20, 100);
  dialogbutton.style("background-color", "green");
  dialogbutton.style("color", "blue");
  dialogbutton.style("z-index", "0");
  dialogbutton.mousePressed(function(){
    Menu(dishes)
  });
}

function Menu(dishes){
  var dialog = createDiv();
    dialog.position(20, 250);
    dialog.style("background-color", lightgrey);
    dialog.style("color", "rgba(255, 182, 193)");
    dialog.style("z-index", "1");
    // Create key-value pairs
    var table = createElement("table");
    var headerRow = createElement("tr");
    var headerName = createElement("th", "Dish Name");
    var headerCost = createElement("th", "Dish Cost");
    var headerImage = createElement("th", "Dish Image");
    var headerenergyCost = createElement("th", "Energy Cost");
    headerRow.child(headerName);
    headerRow.child(headerCost);
    headerRow.child(headerImage);
    headerRow.child(headerenergyCost);
    table.child(headerRow);

    for (var i = 0; i < dishes.length; i++) {
      (function(dish) {
        var row = createElement("tr");
        row.style("height", "100px");
        row.style("width", "150px");
        var nameCell = createElement("td", dish.name);
        var costCell = createElement("td", dish.cost);
        var energycostCell = createElement("td", dish.energycost);
        energycostCell.style("text-align", "center");
        costCell.style("text-align", "center");
        nameCell.style("text-align", "center");
        var imageCell = createElement("td");
        var image = createImg(dish.image, "dish-image");
        image.id = "dish-image";
        image.size(80,60);
        imageCell.child(image);

        row.child(nameCell);
        row.child(costCell);
        row.child(imageCell);
        row.child(energycostCell);
        table.child(row);
        row.mousePressed(function() {
          console.log(dish.name + " clicked");
          let dishStock = localStorage.getItem(dish.name) || 0;
    
          energy -= dish.energycost
          if (energy >= 0 ){
            localStorage.setItem(dish.name, parseInt(dishStock) + 5);
            console.log("Made a dish  : ", dish.name)
            console.log("current energy is : ", energy)
          }
          else{
            console.log("energy is not enough cannot make dish")
          }
        });
      })(dishes[i]);
  }
    dialog.child(table);
    
    // Create a close button
    var closeBtn = createButton("Close");
    closeBtn.mousePressed(function() {
      // Remove the dialog when the button is clicked
      dialog.remove();
    });
    dialog.child(closeBtn);
}

function generateCustomer(){
  fill(255)

  ellipse(10+bodyx, bodyy - 100, 150, 100)
  fill(customercolor)
  rect(bodyx, bodyy, 30, 80);  // body
  ellipse(12.5 + bodyx, bodyy-25, 50, 50); // head
  ellipse(40+bodyx,30+bodyy, 20, 60); // right hand
  ellipse(bodyx-10, 30+bodyy, 20, 60); // left hand

  ellipse(7.5+bodyx, 100+bodyy, 20, 50); // left foot
  ellipse(22.5+bodyx, 100+bodyy, 20, 50); // right foot

  if(dig!=-100 ) {
  image(dishescopy[dig].image, bodyx-40, bodyy-135, 100, 70);
  }

  console.log("x y  :",bodyx, bodyy)

}

function generatesitCustomer(){

  fill(customercolor)
  ellipse(140, 150, 45, 45)
  rect(125, 175, 30,75)
  rect(125,230,60,26)
  rect(160, 256,25,50)

  if (dishdelay <=250)
  {
    if (ordersuccess == -1 ){
      value = order(randomVariable)
      console.log("ordered " + randomVariable)
      
    }
    if (value == 1){
      ordersuccess = 1
      console.log("set to original !", ordersuccess)
      image(dishescopy[dig].image, chairx+105, chairy+15, 50, 50);
      
    }
      
  }
  else{
    leave = 1
    if (value ==0 ){
      mood = "angry"
    }  
    generateLeaveCustomer(mood)
  }
  dishdelay  += 1
  console.log("dishdelay is : ", dishdelay)
}

function generateLeaveCustomer(mood){

  fill(customercolor)
  rect(bodyx, bodyy, 30, 80);  // body
  ellipse(12.5 + bodyx, bodyy-25, 50, 50); // head
  ellipse(40+bodyx,30+bodyy, 20, 60); // right hand
  ellipse(bodyx-10, 30+bodyy, 20, 60); // left hand

  ellipse(7.5+bodyx, 100+bodyy, 20, 50); // left foot
  ellipse(22.5+bodyx, 100+bodyy, 20, 50); // right foot
  if (mood = "angry"){
    console.log("customer is angry : ", mood)
  }
  bodyx -= 1
  if (bodyx < 0){
    leave = 0
    bodyx= 50
    bodyy =100
    dig = -100
    dishdelay = 0
    value = -1
    ordersuccess = -1

  }
}

function movingCustomer(customercolor, randomIndex){

  if ((bodyx >= destx || 50+bodyy >= desty) && leave == 0){
    vx= 1
    vy =1
    generatesitCustomer()
  }
  else if ( leave == 1){
    generateLeaveCustomer()
  }
  else{
    generateCustomer()
    bodyx = vx+bodyx
    bodyy = vy+bodyy

  }

  randomVariable = dishes[randomIndex].name;
  if (dig == -100)
  {dig = randomIndex}



}


function order(dishname){
  let dishStock = localStorage.getItem(dishname) || 0;
  console.log("stock is " + dishStock)
  if (parseInt(dishStock)  >= 1){
    localStorage.setItem(dishname, parseInt(dishStock) -1 );
    console.log(dishname + " after order stock is : " + (parseInt(dishStock) -1))
    return 1
  }
  else{
    console.log(dishname + " is running out, cannot make a order.")
    return -1
  }
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


function drawchair(){

  fill(255, 229, 204);
  // noStroke()
  stroke(205, 170, 125)
  rect(chairx, chairy-20, 20, 120)
  rect(chairx+20,chairy+50,40,23)
  rect(chairx+60, chairy+50, 20,50)
}

function drawtable(){
  fill(205, 170, 125);
  stroke(255)
  strokeWeight(1);
  ellipse(chairx+ 130,chairy+40,100,60)
  rect(chairx + 125, chairy+70, 10, 30)
  
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