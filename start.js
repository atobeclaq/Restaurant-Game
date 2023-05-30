var dialogbutton
var lightblue = "rgb(0, 153, 255,0.5)"
var lightpink = "rgba(255, 182, 193, 0.5)"
var lightgrey = "rgba(200, 200, 200, 0.8)"
var prepare = "True"

// let ordersuccess = -1

let emptychairlocation


var startX = 0;
var startY = 0;
var endX = 9;
var endY = 9;
var objects = [];


let randomVariable = -1
let dishdelay = 0
var currentStep = 0;
let mood = 'happy'
let tableImg;
let chairImg;
let kgymImg;
let kgymSitImg;


function preload() {

  for (var i = 0; i < dishes.length; i++) {
    console.log(dishescopy[i].image);
    dishescopy[i].image = loadImage(dishescopy[i].image, onLoadImageSuccess, onLoadImageError);
  }
  
  tableImg = loadImage("images/table1-removebg-preview.png", onLoadImageSuccess, onLoadImageError);
  chairImg = loadImage("images/chair-removebg-preview.png", onLoadImageSuccess, onLoadImageError);
  kgymImg = loadImage("images/little_pricess-bkremove.png", onLoadImageSuccess, onLoadImageError);
  kgymSitImg = loadImage("images/little_princess_sit.png", onLoadImageSuccess, onLoadImageError);
}

function onLoadImageSuccess(image) {
  console.log("Image loaded successfully:", image);
}

function onLoadImageError(event) {
  console.error("Error loading image:", event);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(restoreEnergy, 600000);
  noStroke();
}

function draw() {
  background(250);
  drawfloor()
  // image(tableImg, 50, 50, 200, 200);

  for (let i = 0; i < chairxarray.length; i++) {
    drawchairandtable(chairxarray[i][0],chairxarray[i][1])   
  }

  drawdialogbutton()
  drawpreparebutton()
  drawEnergyBar();
  drawMoneyBox()

  if (prepare == "False" && (random(1) < 0.01 ) ){  
    emptychairlocation = checkemptychair()
    if (emptychairlocation != -1 )
    {
      intimate = localStorage.getItem("kgym")
      if( intimate == null )
      { intimate = 0
        localStorage.setItem("kgym", 0)
      }

      objects.push( new Customer(emptychairlocation,  Math.floor(random(dishes.length)), -1, intimate));
      console.log("empty chair found : ", emptychairlocation)
      chairxarray[emptychairlocation][2] = 1
    }
  }
  if (prepare == "False" )
  { 
    console.log("start drawing customer ...")   
    for (var i = 0; i < objects.length; i++){
      if (objects[i].invalid == 0)
      {console.log(dishes.length,"the order id is", objects[i].orderNumber)
        movingCustomer( objects[i])}
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

// function checkLocalStorage(nameOfStorage){
//   let check = localStorage.getItem(nameOfStorage)
//   if (check == null){
//     check = 
//   }
// }

// const foodConfig = {
//   pizza:{
//     level:1,
//     money:5
//   },
//   malatang:{
//     level:2,
//     money:15
//   }
// }
// foodConfig[foodtheywanttobyy].money;
// let playerstate = LoadPlayerState();
// // every 15 seconds: SavePlayerState(playerState);


// let playerState = {
//   unlocked:{
//     pizza:true,
//   }
// }

// function SavePlayerState(data) {
//   localStorage.setItem('playerState',JSON.stringify(data));
// }

function LoadPlayerState(){
  return JSON.parse(localStorage.getItem('playerState')??'{}');
}