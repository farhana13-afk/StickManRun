var INFORMATION = 0; 
var HALLWAY = 1; 
var FRIEND = 2; 
var FOE = 3;
var WINFRIEND = 4; 
var FAILFRIEND = 5; 
var WINFOE = 6; 
var FAILFOE = 7; 
var END = 8; 
var HALLWAY1 = 9;
var FRIEND1 = 10;
var FOE1 = 11;
var WINFRIEND1 = 12;
var FAILFRIEND1 = 13; 
var WINFOE1 = 14;
var FAILFOE1 = 15;
var END =16;

var gameState = 0;
var score = 0;
var room = 0; 
var teacher, stickman, dog, witch, restart, potion, invisibleGround, backgroundHall;
var potionsGroup, starsGroup;
var rand, randF, randM; 

function preload() {

   backgroundImgHallWay = loadImage("sprites/lockers.jpg");
   backgroundImgClass = loadImage("sprites/classroom.jpg");

   potionImg = loadImage("sprites/potion.png");
   starImg = loadImage("sprites/star.png");
   teachImg = loadImage("sprites/teacher.png");

   stickmanStandingImg = loadAnimation("sprites/stop.png");
   stickmanWalkingImg = loadAnimation("sprites/walk1.png","sprites/walk2.png","sprites/walk3.png","sprites/walk4.png","sprites/walk5.png","sprites/walk6.png");
   stickmanFind = loadAnimation("sprites/walk4.png");

   restartImg = loadImage("sprites/restart.png");
   dogImgFind = loadImage("sprites/dogFind.png");
   dogSitImg = loadImage("sprites/dogSit.png");
   dogWalkImg = loadImage("sprites/dogWalking.png");

   witchImg = loadImage("sprites/witch.png");
   witchDefeatImg = loadImage("sprites/witchDefeated.png");

   girlImg = loadAnimation("sprites/girl.png");
   boyImg = loadAnimation("sprites/boy.png");
   
}

function setup(){
    var canvas = createCanvas(displayWidth-400,displayHeight-500);

    form = new Form();
    potionsGroup = new Group();
    starsGroup = new Group();

    backgroundHall = createSprite(width-350, height/2, width*2, height);
    backgroundHall.addImage(backgroundImgHallWay);
    backgroundHall.scale = 2.3;

    teacher = createSprite(100, height/2, 50,50);
    teacher.addImage(teachImg);
    teacher.scale = 0.4;

    stickman = createSprite(150, height/2+200, 40, 100);
    stickman.addAnimation("stop", stickmanStandingImg);
    stickman.addAnimation("walk", stickmanWalkingImg);
    stickman.addAnimation("find", stickmanFind);
    stickman.addAnimation("girl", girlImg);
    stickman.addAnimation("boy", boyImg);
    restart = createSprite(width/2, 150, 50, 50);
    restart.addImage(restartImg);
    restart.scale = 0.8;
    restart.visible = false;

    invisibleGround = createSprite(width/2, height-35, width, 30);
    invisibleGround.visible = false;
    
    dog = createSprite(width -300, height/2+200, 50, 50);
    dog.addImage(dogImgFind);
    dog.scale = 0.25;
    dog.visible = false;
     
    witch = createSprite(width -300, height/2+125, 50, 50);
    witch.addImage(witchImg);
    witch.scale = 0.5;
    witch.visible = false;
 
    continueb = createButton("Continue")
    continueb.position(width/2,height/2 + 150);
    continueb.mousePressed(changeStateTo1);

    restartb = createButton("Restart")
    restartb.position(width/2,height/2 + 150);
    restartb.mousePressed(changeStateTo2);

    score = 0;
    room = 0; 
}

function draw(){
  console.log(gameState);
    if(gameState === 0){

      form.display();
      background("lightgreen");
      teacher.visible = true; 
      stickman.visible = true; 
      restart.visible = false;
      room = 0; 
      stickman.x = width - 200;
      stickman.y = height/2;
      continueb.hide();
      score = 0;
      restartb.hide();
      dog.visible = false;
      stickman.changeAnimation("stop", stickmanStandingImg);
      stickman.scale = 3;
      witch.visible = false;
     backgroundHall.visible = false;
    } 
     if(gameState === 1){
      background(0);
      spawnPotion();
      if(room < 4){
      spawnStar();
    }
      teacher.visible = false; 
      stickman.visible = true;
      restart.visible = false;
      backgroundHall.visible = true;
      dog.visible = false;
      continueb.hide();
      restartb.hide();
      stickman.changeAnimation("walk", stickmanWalkingImg);
      witch.visible = false;
      stickman.x = width/2-100;

      backgroundHall.velocityX = -3;
      if(backgroundHall.x < 200){
        backgroundHall.x = width;
      }

      stickman.velocityY = stickman.velocityY + 0.8
      if(keyDown("space") && stickman.y > 100) {
        stickman.velocityY = -12;
      } 
      stickman.collide(invisibleGround);

      if(potionsGroup.isTouching(stickman)){
        score = score +1;
        potionsGroup.destroyEach();
        spawnPotion();
      }
      if(score === 30){
        gameState = 8;
      }

      if(starsGroup.isTouching(stickman)){
        starsGroup.destroyEach();
        room = room +1;
        StarSwitchF();
      }

    } 
    if(gameState === 2){
      background(backgroundImgClass);
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);
      potionsGroup.destroyEach();
      starsGroup.destroyEach();
      stickman.x = 150;
      dog.x = width -300;
      dog.visible = true; 
      backgroundHall.visible = false;

      textSize(30);
      fill ("white");
      text("Type in the Right Number to Make Him A Friend", width/2-300, height/2-25);
      text("On your Keyboard", width/2-75, height/2 +5);

      fill("red");
      textSize(50);
      text("1", width/2 -50, height -150 );
      text("2", width/2 -20, height -150);
      text("3", width/2 +15, height -150);
      text("4", width/2 +50, height -150); 
      
      dogPattern();
    }
    if(gameState === 3){
      background(backgroundImgClass);
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);
      potionsGroup.destroyEach();
      starsGroup.destroyEach();
      stickman.x = 150;
      continueb.hide();
      witch.addImage(witchImg);
      witch.visible = true; 
      backgroundHall.visible = false;

      textSize(30);
      fill ("white");
      text("Type in the Right Number to Defeat Her", width/2-200, height/2-25);
      text("On your Keyboard", width/2-75, height/2 +5);

      fill("red");
      textSize(50);
      text("1", width/2 -50, height -150 );
      text("2", width/2 -20, height -150);
      text("3", width/2 +15, height -150);
      text("4", width/2 +50, height -150); 
      
      witchPattern();
    }
    if(gameState === 4){
      background("lightblue");

      dog.visible = true;
      witch.visible = false; 
      continueb.show();
      dog.x = height/2;
      stickman.x = 150;
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      textSize(30);
      fill ("white");
      text("Yay clicked the right choice : " + rand, width/2, height/2);
      text("The dog is now your friend", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    }
    if(gameState === 5){
      background("red");

      dog.visible = true; 
      dog.x = width -300
      witch.visible = false;
      continueb.show();
      stickman.x = 150;
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      textSize(30);
      fill ("white");
      text("I'm sorry the right choice was : " + rand, width/2, height/2);
      text("You didn't friend the dog :( ", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    }
    if(gameState === 6){
      background("lightblue");
      textSize(30);

      witch.addImage(witchDefeatImg);
      dog.visible = false; 
      continueb.show();
      stickman.x = 150;
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      fill ("white");
      text("Yay you picked the right choice : " + rand, width/2, height/2);
      text("You have killed the Witch", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    }
    if(gameState === 7){
      background("red");

      witch.visible = true;
      dog.visible = false; 
      restartb.show();
      restartb.mousePressed(changeStateTo2);
      stickman.visible = false;
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      textSize(30);
      fill ("white");
      text("I'm sorry the right answer : " + rand, width/2, height/2);
      text("The Witch has killed you", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    }
    if(gameState === 8){
      background("lightblue");

      restart.visible = true;
      backgroundHall.visible = false;
      textSize(30);
      fill ("white");
      text("Thank you for helping me change back into my original body", 350, height/2);
      text("Press the Button above to help someone else", 400, height/2 + 50);
      stickman.changeAnimation("girl", girlImg);
      stickman.scale = 0.9;
      stickman.x = 200;
      stickman.y = height/2;

      if(mousePressedOver(restart)){
        gameState = 9;
        score = 0;
        room = 0;
        stickman.scale = 3;
      }

    }
    if(gameState === 9){
      background(backgroundImgHallWay);
      spawnPotion();
      if(room < 4){
      spawnStar();
    }
      teacher.visible = false; 
      stickman.visible = true;
      restart.visible = false;
      dog.visible = false;
      continueb.hide();
      restartb.hide();
      stickman.changeAnimation("walk", stickmanWalkingImg);
      witch.visible = false;
      backgroundHall.visible = true;
      stickman.x = width/2-100;

      stickman.velocityY = stickman.velocityY + 0.8
      if(keyDown("space") && stickman.y > 100) {
        stickman.velocityY = -12;
      } 
      stickman.collide(invisibleGround);

      if(potionsGroup.isTouching(stickman)){
        score = score +1;
        potionsGroup.destroyEach();
        spawnPotion();
      }
      backgroundHall.velocityX = -3;
      if(backgroundHall.x < 200){
        backgroundHall.x = width;
      }
      if(score === 30){
        gameState = 16;
      }

      if(starsGroup.isTouching(stickman)){
        starsGroup.destroyEach();
        room = room +1;
        StarSwitchM();
      }
    }
    if(gameState === 10){
      background(backgroundImgClass);
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);
      potionsGroup.destroyEach();
      starsGroup.destroyEach();
      stickman.x = 150;
      dog.visible = true; 
      dog.x = width -300;
      backgroundHall.visible = false;

      textSize(30);
      fill ("white");
      text("Type in the Right Number to Make Him A Friend", width/2-300, height/2-25);
      text("On your Keyboard", width/2-75, height/2 +5);

      fill("red");
      textSize(50);
      text("1", width/2 -50, height -150 );
      text("2", width/2 -20, height -150);
      text("3", width/2 +15, height -150);
      text("4", width/2 +50, height -150); 
      
      dogPatternM();
    } 
    if(gameState === 11){
      background(backgroundImgClass);
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);
      potionsGroup.destroyEach();
      starsGroup.destroyEach();
      stickman.x = 150;
      continueb.hide();

      witch.visible = true; 
      backgroundHall.visible = false;

      textSize(30);
      fill ("white");
      text("Type in the Right Number to Defeat Her", width/2-200, height/2-25);
      text("On your Keyboard", width/2-75, height/2 +5);

      fill("red");
      textSize(50);
      text("1", width/2 -50, height -150);
      text("2", width/2 -20, height -150);
      text("3", width/2 +15, height -150);
      text("4", width/2 +50, height -150); 
      
      witchPatternM();
    }
    if(gameState === 12){
      background("lightblue");

      dog.visible = true;
      witch.visible = false; 
      continueb.show();
      continueb.mousePressed(changeStateTo1M);
      dog.x = height/2;
      stickman.x = 150;
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      textSize(30);
      fill ("white");
      text("Yay clicked the right choice : " + rand, width/2, height/2);
      text("The dog is now your friend", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    }
    if(gameState === 13){
      background("red");

      dog.visible = true; 
      dog.x = width -300;
      witch.visible = false;
      continueb.show();
      continueb.mousePressed(changeStateTo1M);
      stickman.x = 150;
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      textSize(30);
      fill ("white");
      text("I'm sorry the right choice was : " + rand, width/2, height/2);
      text("You didn't friend the dog :( ", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    }
    if(gameState === 14){
      background("lightblue");
      textSize(30);

      witch.addImage(witchDefeatImg);
      dog.visible = false; 
      continueb.show();
      continueb.mousePressed(changeStateTo1M);
      stickman.x = 150;
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      fill ("white");
      text("Yay you picked the right choice : " + rand, width/2, height/2);
      text("You have killed the Witch", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    }
    if(gameState === 15){
      background("red");

      witch.visible = true;
      dog.visible = false; 
      restartb.show();
      restartb.mousePressed(changeStateTo2M);
      stickman.x = 150;
      stickman.visible = false; 
      stickman.y = height/2 + 150;
      stickman.changeAnimation("find", stickmanFind);

      textSize(30);
      fill ("white");
      text("I'm sorry the right answer : " + rand, width/2, height/2);
      text("The Witch has killed you", width/2, height/2 + 50);
      text("49 = Digit 1", 50, 100);
      text("50 = Digit 2", 50, 150);
      text("51 = Digit 3", 50, 200);
      text("52 = Digit 4", 50, 250);
    } 
    if(gameState === 16){
      background("lightblue");

      restart.visible = true;
      backgroundHall.visible = false;
      textSize(30);
      fill ("white");
      text("Thank you for helping me change back into my original body", 350, height/2);
      text("Press the Button above to help someone else", 400, height/2 + 50);
      stickman.changeAnimation("boy", boyImg);
      stickman.scale = 0.6;
      stickman.x = 200;
      stickman.y = height/2;

      if(mousePressedOver(restart)){
        gameState = 1;
        score = 0;
        room = 0;
        stickman.scale = 3;
      }

    }
    drawSprites();
    textSize(30);
    fill ("black");
    text("Score: "+ score, 50,50);
}

function spawnPotion() {

    if (frameCount % 20 === 0) {
      potion = createSprite(width,50, 50,50);
      potion.y = Math.round(random(30,height/2));

      potion.velocityX = -(20 + 3*score/10);
      potion.addImage(potionImg);
      potion.scale = 0.2;
      potion.lifetime = 600;
      potion.depth = stickman.depth;
      
      potionsGroup.add(potion);
    }
    
  }

  function spawnStar() {

    if (frameCount % 260 === 0 ) {
      var star = createSprite(width,50, 50,50);
      star.y = Math.round(random(30,height/2-50));

      star.velocityX = -24;
      star.addImage(starImg);
      star.scale = 0.2;
      star.lifetime = 600;
      star.depth = stickman.depth;
      
      starsGroup.add(star);
    }
    
  }

function changeStateTo1(){
  gameState = 1; 
}

function changeStateTo2(){
  gameState = 1;
  score = 0; 
}

function changeStateTo1M(){
  gameState = 9; 
}
function changeStateTo2M(){
  gameState = 9;
  score = 0; 
}

function dogPattern(){
  // I am not sure if it will work
  if(keyCode === 49){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =4; score = score +5;
    break;
case 50: gameState =5;
    break;
case 51: gameState =5;
    break;
case 52: gameState =5;
    break;
default: break;
  }
  }
  if(keyCode === 50){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =5;
      break;
  case 50: gameState =4; score = score +5;
      break;
  case 51: gameState =5;
      break;
  case 52: gameState =5;
      break;
  default: break;
    }
    }
    if(keyCode === 51){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =5;
    break;
case 50: gameState =5;
    break;
case 51: gameState =4; score = score +5;
    break;
case 52: gameState =5;
    break;
default: break;
  }
  }
  if(keyCode === 52){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =5;
      break;
  case 50: gameState =5;
      break;
  case 51: gameState =5;
      break;
  case 52: gameState =4; score = score +5;
      break;
  default: break;
    }
    }
}

function witchPattern(){
  // I am not sure if it will work
  if(keyCode === 49){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =6; score = score +5;
    break;
case 50: gameState =7; score = 0;
    break;
case 51: gameState =7; score = 0;
    break;
case 52: gameState =7; score = 0;
    break;
default: break;
  }
  }
  if(keyCode === 50){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =7; score = 0;
      break;
  case 50: gameState =6; score = 0;
      break;
  case 51: gameState =7; score = score +5;
      break;
  case 52: gameState =7; score = 0;
      break;
  default: break;
    }
    }
    if(keyCode === 51){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =7; score = score +5;
    break;
case 50: gameState =7; score = 0;
    break;
case 51: gameState =6; score = 0;
    break;
case 52: gameState =7; score = 0;
    break;
default: break;
  }
  }
  if(keyCode === 52){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =7; score = 0;
      break;
  case 50: gameState =7; score = 0;
      break;
  case 51: gameState =7; score = 0;
      break;
  case 52: gameState =6; score = score +5;
      break;
  default: break;
    }
    }
}

function dogPatternM(){
  // I am not sure if it will work
  if(keyCode === 49){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =12; score = score +5;
    break;
case 50: gameState =13;
    break;
case 51: gameState =13;
    break;
case 52: gameState =13;
    break;
default: break;
  }
  }
  if(keyCode === 50){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =13;
      break;
  case 50: gameState =12; score = score +5;
      break;
  case 51: gameState =13;
      break;
  case 52: gameState =13;
      break;
  default: break;
    }
    }
    if(keyCode === 51){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =13;
    break;
case 50: gameState =13;
    break;
case 51: gameState =12; score = score +5;
    break;
case 52: gameState =13;
    break;
default: break;
  }
  }
  if(keyCode === 52){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =13;
      break;
  case 50: gameState =13;
      break;
  case 51: gameState =13;
      break;
  case 52: gameState =12; score = score +5;
      break;
  default: break;
    }
    }
}

function witchPatternM(){
  // I am not sure if it will work
  if(keyCode === 49){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =14; score = score +5;
    break;
case 50: gameState =15; score = 0;
    break;
case 51: gameState =15; score = 0;
    break;
case 52: gameState =15; score = 0;
    break;
default: break;
  }
  }
  if(keyCode === 50){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =15; score = 0;
      break;
  case 50: gameState =14; score = score +5;
      break;
  case 51: gameState =15; score = 0;
      break;
  case 52: gameState =15; score = 0;
      break;
  default: break;
    }
    }
    if(keyCode === 51){
  rand = Math.round(random(49,52))
  switch(rand){
case 49: gameState =15; score = 0;
    break;
case 50: gameState =15; score = 0;
    break;
case 51: gameState =14; score = score +5;
    break;
case 52: gameState =15; score = 0;
    break;
default: break;
  }
  }
  if(keyCode === 52){
    rand = Math.round(random(49,52))
    switch(rand){
  case 49: gameState =15; score = 0;
      break;
  case 50: gameState =15; score = 0;
      break;
  case 51: gameState =15; score = 0;
      break;
  case 52: gameState =14; score = score +5;
      break;
  default: break;
    }
    }
}

function StarSwitchF(){
  randF = Math.round(random(1,2)); 
  switch(randF){
    case 1: gameState = 2;
    break;
    case 2: gameState = 3;
    break; 
    default: break;
  }
}
function StarSwitchM(){
  randM = Math.round(random(1,2));
  switch(randM){
    case 1: gameState = 10;
    break;
    case 2: gameState = 11;
    break; 
    default: break;
  
}
}
