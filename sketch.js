var monkey, monkey_moving, banana, bananaImage, obstacle, stoneImage, bground, groundImage;
score=0;
var lifetime=5;
var PLAY=1
var END=0
var gameState=PLAY
var canvas

function preload(){

 monkey_moving=loadAnimation("Monkey_01.png",'Monkey_02.png','Monkey_03.png','Monkey_04.png','Monkey_05.png','Monkey_06.png','Monkey_07.png','Monkey_08.png','Monkey_09.png','Monkey_10.png');
  groundImage=loadImage('jungle.jpg'); 
  bananaImage=loadImage('banana.png');
  stoneImage=loadImage('stone.png');
  monkey_still=loadAnimation("Monkey Still.png");
  youWinImage=loadImage('You Win.png');
  youLoseImage=loadImage('You Lose.png');

}


function setup() {
   canvas = createCanvas(displayWidth-20, displayHeight-150);
    
  monkey=createSprite(displayWidth/20, displayHeight-160, 40, 30);
  monkey.addAnimation('moving', monkey_moving);
  monkey.scale=0.25;

  
  ground = createSprite(displayWidth/2,displayHeight-150,displayWidth,10);
  ground.velocityX = -4;
  ground.visible=false
  
  youWin= createSprite(displayWidth/2, displayHeight/2, 30, 50);
  youWin.addImage(youWinImage);
  youWin.scale=4

  youLose =createSprite(displayWidth/2, displayHeight/2, 30, 50);
  youLose.addImage(youLoseImage);
  youLose.scale=4 
    
  bananaGroup= createGroup(); 
  obstacleGroup=createGroup();
  
  score=0;
}

function draw() {
  background(groundImage);
  if (ground.x< 0){
     ground.x= ground.width/2;
     
   }
   monkey.collide(ground); 
   monkey.velocityY = monkey.velocityY + 0.8
  
   if(gameState===PLAY){
    fill("White")
    textSize(30);
    stroke('White')
    text("Click on Space Key to Jump", 20, 45)

   
    youWin.visible=false;
    youLose.visible=false;
     
    if(keyDown("space")&&monkey.y>120) {
      monkey.velocityY = -14;
    } 

    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score=score+2
    }
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
      monkey.scale = 0.25
      lifetime= lifetime-1
    }


    switch(score){
      case 10:monkey.scale=0.26 ;
        break;
      case 20:monkey.scale= 0.27;
        break;
      case 30:monkey.scale=0.28;
        break;
      case 40:monkey.scale=0.29;
        break;
      case 50:monkey.scale=0.30;
        break ;
        default:break;  
    }
    if(score===50){
       gameState=END 
       youWin.visible=true;
    }else if(lifetime===0){
      gameState=END 
      youLose.visible=true;
   }

  food();
  obstacles();
   }
  if(gameState===END){

    monkey.visible=false;

    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1)   

    fill("White")
    textSize(30);
    stroke("White")
    text("Click on 'Ctrl+R' to restart", 15, 30)


     
  } 
  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(40);
  text("Score:"+ score, 1350, 50)
  text("LifeTime:"+ lifetime+"/", 1150, 50)
  

}
function food(){   
  if(frameCount%250===0){
    banana=createSprite(displayWidth+100, 300, 40, 50);
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-7 
    banana.y=round(random(400, 250));
    banana.lifetime=500;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(displayWidth+100, displayHeight-190, 40, 50);
    obstacle.addImage(stoneImage);
    obstacle.scale=0.3 
    obstacle.velocityX=-7   
    obstacleGroup.add(obstacle);    
    obstacle.lifetime=300;    
    obstacle.setCollider('rectangle',monkey.Width, monkey.Height,0,0);
    //obstacle.debug=true
  }

}
