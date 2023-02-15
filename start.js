var dialogbutton
var lightblue = "rgb(0, 153, 255,0.5)"
var lightpink = "rgba(255, 182, 193, 0.5)"
var lightgrey = "rgba(200, 200, 200, 0.5)"
var prepare = "True"

let randomIndex = -100
let index
let customercolor = -1
let ordersuccess = -1
let showShapes = true;
let fail
let img
let emptychairlocation


var startX = 0;
var startY = 0;
var endX = 9;
var endY = 9;
var objects = [];
let stop

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

  for (let i = 0; i < chairxarray.length; i++) {
    drawchairandtable(chairxarray[i][0],chairxarray[i][1])   
  }

  drawdialogbutton()
  drawpreparebutton()
  drawEnergyBar();

  if (prepare == "False" && (random(1) < 0.01 ) ){
    
  
    customercolor = random (0,255)
    // randomIndex = Math.floor(random(dishes.length));
    // console.log(" Customer entering....",randomIndex)
    emptychairlocation = checkemptychair()
    if (emptychairlocation != -1 )
    {

      objects.push( new Customer(emptychairlocation,  Math.floor(random(dishes.length)), -1));
      console.log("empty chair found : ", emptychairlocation)
      chairxarray[emptychairlocation][2] = 1
     
     stop = 1
    }
  }
  if (prepare == "False" )
  { 
    console.log("start drawing customer ...")   
    for (var i = 0; i < objects.length; i++){
      if (objects[i].invalid == 0)
      {movingCustomer( objects[i], i)}
    } 

  } 
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

