class Customer {
    constructor(seatNumber, orderNumber, walk_img, sit_img, documentId, user_id, leave, intimate, bodyx=50, bodyy=100) {
      this.orderNumber = orderNumber;
      this.seatNumber = seatNumber;
      this.walk_img = walk_img;
      this.sit_img = sit_img;
      this.documentId = documentId;
      this.user_id = user_id,
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

    // console.log ("start generating customer .. walking to ", customer.seatNumber,customer.orderNumber)
    
    image(customer.walk_img, 12.5 + customer.bodyx, customer.bodyy-25, 200,250)
    image(dishescopy[customer.orderNumber].image, customer.bodyx-10, customer.bodyy-100, 100, 70);

    // console.log("x y  :",bodyx, bodyy)
  
  }
  
function generatesitCustomer(customer){
  
  chairxarray[customer.seatNumber][2] = 1
  // console.log ("start generating customer .. sit down  ", customer.seatNumber)


  image(customer.sit_img, chairxarray[customer.seatNumber][0]+20,chairxarray[customer.seatNumber][1]-50 , 200,200)

  if (customer.dishdelay <=250)
  { 
    if (customer.orderSuccess == 0 ){
      value = order(dishescopy[customer.orderNumber].name)
      // console.log("ordered " + dishescopy[customer.orderNumber].name)
      // console.log("price is" , dishescopy[customer.orderNumber].cost)
      console.log("should just be once")
      updateMoney(parseInt(dishescopy[customer.orderNumber].cost))    
      showpopupmsg("Order succeed Intimate Increased 5", customer)
      var documentRef = db.collection("Profile").doc("profile_1");
      const collectionRef = db.collection('Customer');
    
      query = collectionRef.where("user_id", "==", customer.user_id);
      query = collectionRef.where('__name__', "==", customer.documentId);
      
      query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const documentRef = doc.ref;
          documentRef.update({ user_intimacy: firebase.firestore.FieldValue.increment(5) })
        });
      }).catch((error) => {
        console.error("Error retrieving documents:", error);
      });
      // Update the "exp" field and increment it by 5
      documentRef.update({ exp: firebase.firestore.FieldValue.increment(5) })
      var documentRef = db.collection("Profile").doc("profile_1");
      documentRef.update({ Money: firebase.firestore.FieldValue.increment(parseInt(dishescopy[customer.orderNumber].cost.slice(1)))  })
      
    }
    if (value == 1){
      customer.orderSuccess = 1
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
  image(customer.walk_img, customer.bodyx, customer.bodyy, 200,250)

  customer.bodyx -= 1


}

function movingCustomer( customer ){

  if (((customer.bodyx >= chairxarray[customer.seatNumber][0]+115 || chairxarray[customer.seatNumber][1]-5 <= 25+customer.bodyy + 50)) && customer.leave == -1){
      customer.vx= 1
      customer.vy =1
      generatesitCustomer(customer)
  }
  else if(customer.leave == 1){generateLeaveCustomer(customer, mood)}
  else{
    // console.log("before sending out", customer.orderNumber)
    generateCustomer(customer)
    customer.bodyx = customer.vx+customer.bodyx
    customer.bodyy = customer.vy+customer.bodyy

  }
}

function retrieveCustomerInfo(documentId = "customer_1", user_id = 1) {
  return new Promise((resolve, reject) => {
    const collectionRef = db.collection('Customer');
    const documentRef = collectionRef.doc(documentId);
    query = collectionRef.where("user_id", "==", user_id);
    query = collectionRef.where('__name__', "==", documentId);

    query.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const customerData = doc.data();
            const customerInfo = {
              sit_img: customerData.sit_image_path,
              walk_img: customerData.walk_image_path,
              intimate: customerData.user_intimacy,
              user_id: customerData.user_id,
              documentId: documentId
            };
            resolve(customerInfo);
          } else {
            reject(new Error("Document not found"));
          }
        }); // Added closing parenthesis here
      })
      .catch((error) => {
        reject(error);
      });
  });
}

