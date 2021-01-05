var PLAY = 1;
var END = 0;
var monkey , monkey_running,monkey_stand;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var score=0;
var survivalTime=0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkey_stand = loadImage("sprite_0.png");
}



function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,140,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,170,1600,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
 background("lightblue");
  monkey.collide(ground);
  if (gameState === PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     if(keyDown("space") && monkey.y >=- 159) {
      monkey.velocityY = -5;
    }
   monkey.velocityY = monkey.velocityY + 0.8

  
  spawnObstacle();
  spawnbanana();
    
    if(bananaGroup.isTouching(monkey)){
    score=score+1;
      bananaGroup.destroyEach();
      score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
      
    }
       if (obstacleGroup.isTouching(monkey)){
    gameState = END;
   survivalTime = survivalTime;
    }
    if (keyDown("R")){
    reset();
    }
  }else if (gameState === END){
   monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  
  ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation(monkey_stand);
         monkey.scale = 0.2;

  }
 stroke ("white");
  textSize(20);
  fill ("white");
  text ("Score: "+score,400,20);
  
  stroke ("black");
  textSize(20);
  fill ("black");
  survivalTime =Math.ceil(frameCount/frameRate())
  text ("Survival Time: "+survivalTime,100,20);
  
  
  drawSprites();
}

function spawnObstacle() {
  if(frameCount % 300 === 0) {
     obstacle = createSprite(600,150,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
     obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -(5 + 2*score/100);
    

  }
}
 
function spawnbanana() {
  if (frameCount % 200 === 0) {
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(30,60));
   banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 250;
    bananaGroup.add(banana);
    switch(score) {
      case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
      case 40: monkey.scale = 0.18;
              break;
      default: break;
    }
  }
  
}

function reset(){
  
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  if(survivalTime<score){
    survivalTime = score;
  }
  console.log(survivalTime);
  
  score = 0;
  
}