var dishes = [      
  {name: "Pork Curry", cost: "$10", energycost: 10, image: "images/porkcurry-removebg-preview.png", unlockNeeded: [1, 0]} ,      
  {name: "Sushi", cost: "$15", energycost: 10, image: "images/sushi-removebg-preview.png", unlockNeeded: [1, 0]},      
  {name: "Milk", cost: "$20", energycost: 10, image: "images/milk-removebg-preview.png", unlockNeeded: [1, 0]}

];

var dishescopy = [      
  {name: "Pork Curry", cost: 10, energycost: 10, image: "images/porkcurry-removebg-preview.png"},      
  {name: "Sushi", cost: 15, energycost: 10, image: "images/sushi-removebg-preview.png"},      
  {name: "Milk", cost: 20, energycost: 10, image: "images/milk-removebg-preview.png"}    
];

class MenuObject {
  constructor(name, cost, energycost, image) {
    this.name = name
    this.cost = cost
    this.energycost = energycost
    this.image = image
  }   
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

