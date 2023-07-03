class MenuObject {
  constructor(name, cost, energycost, image) {
    this.name = name
    this.cost = cost
    this.energycost = energycost
    this.image = image
  }   
}
function Menu(menu) {
  var dialog = createDiv();
  dialog.position(20, 250);
  dialog.style("background-color", "lightblue");
  dialog.style("color", "rgba(255, 182, 193)");
  dialog.style("z-index", "1");

  var table = createElement("table");
  var headerRow = createElement("tr");
  var headerName = createElement("th", "Dish Name");
  var headerCost = createElement("th", "Dish Cost");
  var headerImage = createElement("th", "Dish Image");
  var headerEnergyCost = createElement("th", "Energy Cost");
  var headerUnlock = createElement("th", "Unlocked");
  headerRow.child(headerName);
  headerRow.child(headerCost);
  headerRow.child(headerImage);
  headerRow.child(headerEnergyCost);
  headerRow.child(headerUnlock);
  table.child(headerRow);

  for (var i = 0; i < menu.length; i++) {
    (function(menuItem) {
      var row = createElement("tr");
      row.style("height", "100px");
      row.style("width", "150px");

      var nameCell = createElement("td", menuItem.name);
      var costCell = createElement("td", menuItem.cost);
      var energyCostCell = createElement("td", menuItem.energycost);
      var unlockCell = createElement("td");

      energyCostCell.style("text-align", "center");
      costCell.style("text-align", "center");
      nameCell.style("text-align", "center");
      unlockCell.style("text-align", "center");

      if (!menuItem.unlocked) {
        var unlockBtn = createButton("Unlock");
        unlockBtn.mousePressed(function() {
          // Perform unlock action
          if (level >= menuItem.unlockNeededLevel && money >= menuItem.unlockNeededPrice) {
            var confirmUnlock = window.confirm("Are you sure you want to unlock this dish?");
            if (confirmUnlock) {
              // Perform unlock action
              console.log("Unlocking dish: ", menuItem.name);
            } else {
              console.log("Unlocking canceled.");
            }
          } else {
            console.log("Requirements not satisfied. Cannot unlock the dish.");
          }
        });
        unlockCell.child(unlockBtn);
        row.style("background-color", "lightgrey");
      } else {
        row.mousePressed(function() {
          console.log(menuItem.name + " clicked");
          energy -= menuItem.energycost;
          if (energy >= 0) {
            // Perform dish action
            console.log("Made a dish: ", menuItem.name);
            console.log("Current energy is: ", energy);
          } else {
            console.log("Energy is not enough, cannot make dish");
          }
        });
      }

      var imageCell = createElement("td");
      var image = createImg(menuItem.image, "dish-image");
      image.id = "dish-image";
      image.size(80, 60);
      imageCell.child(image);

      row.child(nameCell);
      row.child(costCell);
      row.child(imageCell);
      row.child(energyCostCell);
      row.child(unlockCell);
      table.child(row);
    })(menu[i]);
  }

  dialog.child(table);

  var closeBtn = createButton("Close");
  closeBtn.mousePressed(function() {
    dialog.remove();
  });
  dialog.child(closeBtn);
}


function drawdialogbutton(){

  var dialogbutton = createButton(" Menu Book ");
  dialogbutton.position(20, 100);
  dialogbutton.style("background-color", "green");
  dialogbutton.style("color", "blue");
  dialogbutton.style("z-index", "0");
  dialogbutton.mousePressed(function() {
    loadDish().then(function(dishes) {
      Menu(dishes);
    }).catch(function(error) {
      console.error("Error loading dishes:", error);
    });
  });
  
}

function loadDish() {
  return new Promise((resolve, reject) => {
    // Assuming you have initialized Firebase SDK and Firestore

    // Retrieve the collection data from Firestore
    db.collection("Menu").get().then((snapshot) => {
      // Create an empty array to store the transformed data
      var dishes = [];

      // Loop through each document in the collection
      snapshot.forEach((doc) => {
        // Get the document data
        var dishData = doc.data();

        // Transform the data into the desired format
        var dish = {
          name: dishData.name,
          cost: "$" + dishData.price,
          energycost: dishData.energy_cost,
          image: dishData.image_storage_path,
          unlockNeededLevel: dishData.levelRequirement, 
          unlockNeededPrice: dishData.unlock_price,
          special_id: dishData.special_id,
          unlocked: dishData.unlocked
        };

        // Add the transformed data to the dishes array
        dishes.push(dish);
      });

      // Resolve the promise with the dishes array
      resolve(dishes);
    }).catch((error) => {
      // Reject the promise with the error
      reject(error);
    });
  });
}

