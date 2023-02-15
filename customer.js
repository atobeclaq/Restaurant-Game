class Customer {
    constructor(seatNumber, orderNumber, leave, bodyx=50, bodyy=100) {
      this.orderNumber = orderNumber;
      this.seatNumber = seatNumber;
      this.leave = leave;
      this.bodyx = bodyx;
      this.bodyy = bodyy;
      this.distance = Math.sqrt(((chairxarray[seatNumber][0] - bodyx)*(chairxarray[seatNumber][0] - bodyx)) +  ((chairxarray[seatNumber][1]-bodyy)*(chairxarray[seatNumber][1]-bodyy)))
      this.vx = (chairxarray[seatNumber][0] - bodyx)/this.distance 
      this.vy = (chairxarray[seatNumber][1] - bodyy)/this.distance
      this.dishdelay = 0
      this.invalid = 0
    }   
}


function generateCustomer(customer){
    fill(255)
    console.log ("start generating customer .. walking to ", customer.seatNumber)
    ellipse(10+customer.bodyx, customer.bodyy - 100, 150, 100)
    fill(customercolor)
    rect(customer.bodyx, customer.bodyy, 30, 80);  // body
    ellipse(12.5 + customer.bodyx, customer.bodyy-25, 50, 50); // head
    ellipse(40+customer.bodyx,30+customer.bodyy, 20, 60); // right hand
    ellipse(customer.bodyx-10, 30+customer.bodyy, 20, 60); // left hand
  
    ellipse(7.5+customer.bodyx, 100+customer.bodyy, 20, 50); // left foot
    ellipse(22.5+customer.bodyx, 100+customer.bodyy, 20, 50); // right foot
  
    image(dishescopy[customer.orderNumber].image, customer.bodyx-40, customer.bodyy-135, 100, 70);

    // console.log("x y  :",bodyx, bodyy)
  
  }
  
  function generatesitCustomer(customer){
    
    chairxarray[customer.seatNumber][2] = 1
    console.log ("start generating customer .. sit down  ", customer.seatNumber)
    fill(customercolor)
    ellipse(chairxarray[customer.seatNumber][0]+40, chairxarray[customer.seatNumber][1]-50, 45, 45)
    rect(chairxarray[customer.seatNumber][0]+25, chairxarray[customer.seatNumber][1]-25, 30,75)
    rect(chairxarray[customer.seatNumber][0]+25,chairxarray[customer.seatNumber][1]+30,60,26)
    rect(chairxarray[customer.seatNumber][0]+60, chairxarray[customer.seatNumber][1]+56,25,50)
  
    if (customer.dishdelay <=250)
    { 
      if (ordersuccess == -1 ){
        value = order(dishescopy[customer.orderNumber].name)
        console.log("ordered " + dishescopy[customer.orderNumber].name)
        
      }
      if (value == 1){
        ordersuccess = 1
        console.log("set to original !", ordersuccess)
        image(dishescopy[customer.orderNumber].image, chairxarray[customer.seatNumber][0]+105, chairxarray[customer.seatNumber][1]+15, 50, 50);
      }      
    }
    else{
      customer.leave = 1
      if (value == -1 ){
        mood = "angry"
      }  
      generateLeaveCustomer(customer, mood, index)
    }
    customer.dishdelay  += 1
    console.log(customer.seatNumber, " dishdelay is : ", customer.dishdelay)
  }
  
  function generateLeaveCustomer(customer, mood, index){
    console.log("Customer starting leaving")
    if (customer.bodyx - 10 <=0 || customer.bodyy<=0){
        // objects.pop(index)
        customer.invalid = 1
        chairxarray[customer.seatNumber][2] = 0
    }
    fill(customercolor)
    rect(customer.bodyx, customer.bodyy, 30, 80);  // body
    ellipse(12.5 + customer.bodyx, customer.bodyy-25, 50, 50); // head
    ellipse(40+customer.bodyx,30+customer.bodyy, 20, 60); // right hand
    ellipse(customer.bodyx-10, 30+customer.bodyy, 20, 60); // left hand
  
    ellipse(7.5+customer.bodyx, 100+customer.bodyy, 20, 50); // left foot
    ellipse(22.5+customer.bodyx, 100+customer.bodyy, 20, 50); // right foot
    if (mood == "angry"){
      console.log("customer is angry : ", mood)
    }
    customer.bodyx -= 1

    if (customer.bodyx < 0){


      value = -1
      ordersuccess = -1
  
    }
  }
  
  function movingCustomer( customer, index ){
    // console.log(chairxarray[customer.seatNumber][0]+60 , 50+chairxarray[customer.seatNumber][1] + 50)
  
    if (((customer.bodyx >= chairxarray[customer.seatNumber][0]+35 || chairxarray[customer.seatNumber][1]+35 <= 25+customer.bodyy + 50)) && customer.leave == -1){
        customer.vx= 1
        customer.vy =1
        generatesitCustomer(customer, index)
    }
    else if(customer.leave == 1){generateLeaveCustomer(customer, mood, index)}
    else{
      generateCustomer(customer)
      customer.bodyx = customer.vx+customer.bodyx
      customer.bodyy = customer.vy+customer.bodyy
  
    }


  
  
  
  }