var backImage,backgr;
var monkey, monkey_running;
var ground, groundImage;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacleImage

var gameOver;
var score = 0

function preload(){
// loading sound and animation also images
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg");
}

function setup() {
   createCanvas(500, 400);
// creating and modifying sprites
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage)
  backgr.scale = 1.5
  backgr.x = backgr.width/2
  backgr.velocityX = -4 
  
  //creating monkey
   monkey=createSprite(90,340,20,50);
   monkey.addAnimation("Running", monkey_running);
   monkey.scale=0.1
  
  //creating ground
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible=false
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  }

function draw() {
  
  background(255);
  // function draw
  
  if (backgr.x < 100)
    backgr.x = backgr.width/2;
   
  if(ground.x<0) {
    ground.x=ground.width/2;
    
  }
  
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
     
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
  
  if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
    score = score +2
     }
  
    switch(score){
      case 10: monkey.scale=0.12;
         break;
      case 20: monkey.scale=0.14;
        break;
      case 30: monkey.scale=0.16;
        break;
      case 40: monkey.scale=0.18;
        break;
        default:break;
        }
  
  
   monkey.collide(ground);   
   spawnFood();
   spawnObstacles();

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50); 

  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.08
   }
 }

function spawnFood() {
  // to spawn banana on different places
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
//assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
      //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}
//to spawn obstacles on different places
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
     obstacle.addImage(obstaceImage);
    obstacle.scale=0.2;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}