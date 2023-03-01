class Customer {
    constructor(seatNumber, orderNumber, leave, intimate, bodyx=50, bodyy=100) {
      this.orderNumber = orderNumber;
      this.seatNumber = seatNumber;
      this.leave = leave;
      this.intimate = intimate;
      this.bodyx = bodyx;
      this.bodyy = bodyy;
      this.distance = Math.sqrt(((chairxarray[seatNumber][0] - bodyx)*(chairxarray[seatNumber][0] - bodyx)) +  ((chairxarray[seatNumber][1]-bodyy)*(chairxarray[seatNumber][1]-bodyy)))
      this.vx = (chairxarray[seatNumber][0]+ 80- bodyx)/this.distance 
      this.vy = (chairxarray[seatNumber][1] -40- bodyy)/this.distance
      this.dishdelay = 0
      this.invalid = 0
      this.orderSuccess = 0
    }   
}


function generateCustomer(customer){

    // console.log ("start generating customer .. walking to ", customer.seatNumber)
    
    image(kgymImg, 12.5 + customer.bodyx, customer.bodyy-25, 100,250)
    image(dishescopy[customer.orderNumber].image, customer.bodyx-10, customer.bodyy-100, 100, 70);

    // console.log("x y  :",bodyx, bodyy)
  
  }
  
  function generatesitCustomer(customer){
    
    chairxarray[customer.seatNumber][2] = 1
    // console.log ("start generating customer .. sit down  ", customer.seatNumber)


    image(kgymSitImg, chairxarray[customer.seatNumber][0]+20,chairxarray[customer.seatNumber][1]-50 , 200,200)
  
    if (customer.dishdelay <=250)
    { 
      if (customer.orderSuccess == 0 ){
        value = order(dishescopy[customer.orderNumber].name)
        // console.log("ordered " + dishescopy[customer.orderNumber].name)
        console.log("price is" , dishescopy[customer.orderNumber].cost)
        updateMoney(parseInt(dishescopy[customer.orderNumber].cost))
        
        localStorage.setItem("kgym", parseInt(customer.intimate) + 5)
        localStorage.setItem("exp", parseInt(exp)+5)
        showpopupmsg("Order succeed Intimate Increased 5", customer)
      }
      if (value == 1){
        customer.orderSuccess = 1
        // console.log("set to original !", ordersuccess)

        image(dishescopy[customer.orderNumber].image, chairxarray[customer.seatNumber][0], chairxarray[customer.seatNumber][1]+80, 50, 40);

      }      
    }
    else{
      customer.leave = 1
      if (value == -1 ){
        mood = "angry"
      }  
      generateLeaveCustomer(customer, mood)
    }
    customer.dishdelay  += 1
    // console.log(customer.seatNumber, " dishdelay is : ", customer.dishdelay)
  }
  
  function generateLeaveCustomer(customer, mood){
    // console.log("Customer starting leaving")
    if (customer.bodyx - 10 <=0 || customer.bodyy<=0){
        customer.invalid = 1
        chairxarray[customer.seatNumber][2] = 0
    }
    image(kgymImg, customer.bodyx, customer.bodyy, 100,250)

    customer.bodyx -= 1


  }
  
  function movingCustomer( customer ){
    // console.log(chairxarray[customer.seatNumber][0]+60 , 50+chairxarray[customer.seatNumber][1] + 50)
  
    if (((customer.bodyx >= chairxarray[customer.seatNumber][0]+115 || chairxarray[customer.seatNumber][1]-5 <= 25+customer.bodyy + 50)) && customer.leave == -1){
        customer.vx= 1
        customer.vy =1
        generatesitCustomer(customer)
    }
    else if(customer.leave == 1){generateLeaveCustomer(customer, mood)}
    else{
      generateCustomer(customer)
      customer.bodyx = customer.vx+customer.bodyx
      customer.bodyy = customer.vy+customer.bodyy
  
    }
  }