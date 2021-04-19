var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed,fedtime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton(" Feed The Dog");
feed.position(700,100)
feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedtime = database.ref('FeedTime')
 fedtime.on("value",function(data){
   lastFed = data.val()
 })

  //write code to display text lastFed time here
fill("blue");
textSize(50);
if (lastFed>=12){
  text("lastFeed:"+lastFed%12+"PM",350,50)
}
 else if(lastFed==0){
   text("lastFeed:12 AM",350,50)
 }
 else{
   text("lastFeed:"+lastFed+"AM",350,50)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var  foodStockval=foodObj.getFoodStock();
  if (foodStockval<=0){
    foodObj.updateFoodStock(foodStockval*0);
    
  }
else{
  foodObj.updateFoodStock(foodStockval-1  );
}
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
