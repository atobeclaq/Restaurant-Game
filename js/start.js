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
var customer_array
var customer_new_array
let randomVariable = -1
let dishdelay = 0
var currentStep = 0;
let mood = 'happy'
let tableImg;
let chairImg;

var dishescopy;

function preload() {
  loadDish().then((resolvedDishes) => {
    dishescopy = resolvedDishes.filter((dish) => dish.unlocked); // Assign the value to the variable
    for (var i = 0; i < dishescopy.length; i++) {
      // console.log(dishescopy[i].image);
      dishescopy[i].image = loadImage(dishescopy[i].image, onLoadImageSuccess, onLoadImageError);
    }
  }).catch((error) => {
    console.error("Error loading dishes:", error);
  });
  
  tableImg = loadImage("images/table1-removebg-preview.png", onLoadImageSuccess, onLoadImageError);
  chairImg = loadImage("images/chair-removebg-preview.png", onLoadImageSuccess, onLoadImageError);

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
      retrieveCustomerInfo("customer_1")
        .then((customerInfo) => {
          customer_new_array = customerInfo
          // console.log("Customer Info:", customerInfo);
          objects.push( new Customer(
            seatNumber = emptychairlocation,  
            orderNumber = Math.floor(random(dishescopy.length)), 
            walk_img = loadImage(customer_new_array.walk_img),
            sit_img = loadImage(customer_new_array.sit_img),
            documentId = customer_new_array.documentId,
            user_id = customer_new_array.user_id,
            leave = -1, 
            intimate = customer_new_array.intimate
            ));
          // console.log("empty chair found : ", emptychairlocation)
          chairxarray[emptychairlocation][2] = 1
        })
        .catch((error) => {
          console.error("Error retrieving customer info:", error);
        });

      
    }
  }
  if (prepare == "False" )
  { 
    // console.log("start drawing customer ...")   
    for (var i = 0; i < objects.length; i++){
      if (objects[i].invalid == 0)
      {
        // console.log(dishescopy.length,"the order id is", objects[i].orderNumber)
        movingCustomer( objects[i])
      }
    } 

  } 

}

function order(dishname){
  let dishStock = localStorage.getItem(dishname) || 0;
  // console.log("stock is " + dishStock)
  if (parseInt(dishStock)  >= 1){
    localStorage.setItem(dishname, parseInt(dishStock) -1 );
    // console.log(dishname + " after order stock is : " + (parseInt(dishStock) -1))
    return 1
  }
  else{
    // console.log(dishname + " is running out, cannot make a order.")
    return -1
  }
}
