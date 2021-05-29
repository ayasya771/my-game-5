var shrub1,shrub1Img,shrub2Img, shrub2;
var ambulanceImg,ambulance;
var player, girl, boy, girlImg, boyImg;
var timeLimit, hospital;
var canvas;
var gameState="wait";
var playbutton, playbuttonImg;
var timer=180;
var patient, patientImg, patientImg2;

var daytrack, nighttrack;

var track,trackImg;

function preload(){

  patientImg = loadImage("images/patient1.png");
  
  patientImg2 = loadImage("images/patient.png");

  ambulanceImg = loadImage("images/ambulance1.png");

    shrub1Img  = loadImage("images/shrub1.png");
    shrub2Img = loadImage("images/shrub2.png");
    
    girlImg = loadAnimation("images/girl1.png","images/girl2.png","images/girl3.png",
    "images/girl4.png","images/girl5.png","images/girl6.png",
    "images/girl7.png","images/girl8.png");
    
    
    
    boyImg = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png",
    "images/boy4.png","images/boy5.png","images/boy6.png","images/boy7.png",
    "images/boy8.png","images/boy9.png","images/boy10.png","images/boy11.png","images/boy12.png");

    hospital = loadImage("images/hospital.jpg");

    playbuttonImg = loadImage("images/start.jpg");


    daytrack = loadAnimation("images/day track.gif");

    nighttrack = loadImage("images/night track.gif");

    trackImg  = loadImage("images/track.jpg");
}




function setup(){
    canvas=createCanvas(windowWidth-10,windowHeight-20);

    shrub1 = createSprite(displayWidth/7, displayHeight/2,50,50);
    shrub1.addImage(shrub1Img);
    shrub1.scale=0.4;
    shrub1.visible = false;
    
    shrub2 = createSprite(displayWidth/2, displayHeight/6,50,50);
    shrub2.addImage(shrub2Img);
    shrub2.scale=0.5;
    shrub2.visible = false;
        
    // creating the button for start 
    playbutton=createSprite(windowWidth/1.45,windowHeight/2,30,30);
    playbutton.addImage(playbuttonImg);

    girl=createSprite(windowWidth/4-100,windowHeight/2+50,30,30);
    girl.addAnimation("walk",girlImg);
    girl.scale = 0.3;
    
    boy=createSprite(windowWidth/4,windowHeight/2+50,30,30);
    boy.addAnimation("Walk",boyImg);
    boy.scale=1.5;
 
    player=createSprite(displayWidth/8, displayHeight/1.5, 50,50);
    player.visible = false;
    player.setCollider("rectangle",10,0, 20,80);
    //player.debug=true;

    patient=createSprite(displayWidth -150, displayHeight/1.5, 50,50);
    patient.addImage(patientImg);
   // patient.debug=true;
    patient.setCollider("rectangle",0,0, 250,60);
    patient.visible = false;

    ambulance = createSprite(displayWidth/2-100,displayHeight-400,100,100);
    ambulance.addImage(ambulanceImg);
    ambulance.visible = false;
    ambulance.scale = 1.8;

    track = createSprite(700,300,500,500);
    track.addImage(trackImg);
    track.scale= 3;
    track.visible = false;
    track.velocityY = 0;
    
  }
 function draw(){
     background("#f2bf32");

//Displaying the rules
     if(gameState==="wait"){
         fill("blue");
        
         textSize(30);
        text("Saving the Patient", windowWidth/2-50, 40);
        
        fill("black");
        textSize(20);
        
        text("1) Take patient to hospital via ambulance .",windowWidth/11-50,windowHeight/4);
        text("2) Avoid obstacles, traffic.",windowWidth/11-50,windowHeight/3);
        text("3) Press Arrow keys to control player",windowWidth/11-50,windowHeight/2.5);
        text("4) Choose Your Character To Play" ,windowWidth/11-50,windowHeight/2.25);

        fill("red");
        textSize(25);
        text("TIME IS LIMITED!!",windowWidth/6-60,480);
       
        if(mousePressedOver(girl)){
         player.addAnimation("walk", girlImg);
         player.scale = 0.3;
        }
        if(mousePressedOver(boy)){
         player.addAnimation("walk", boyImg);
         player.scale = 1.5;
        }
        
        if(mousePressedOver(playbutton)){
            gameState="start";
          }
     }

if(gameState==="start"){
  
  background(daytrack);
  player.visible = true;
  patient.visible=true;
  playbutton.visible=false;
  boy.visible=false;
  girl.visible=false;

  if(keyDown(RIGHT_ARROW)){
    player.x += 4;
  }
  if(keyDown(LEFT_ARROW)){
    player.x -= 4;
  }
  player.rotation=-10;
    textSize(16);
  fill("black")
  text("TIMER:"+Math.round(timer),windowWidth-300,50);
}

  if(player.isTouching(patient))
  {
    patient.x=2000;
    player.destroy();
    gameState= "play"
    ambulance.visible =true;
  }

if(gameState==="play"){
  //ambulance.collide(track);
  background(daytrack);
  track.visible=false;
 // track.visible = true;
 fill("white")
  text("TIMER: "+Math.round(timer),windowWidth-300,50);
 
 shrub1.visible = true;
 shrub2.visible = true;
 
 timer=timer-0.02;
  track.velocityY = 5;

  if(frameCount % 500 === 0){
    
  shrub1.x = random(400,1000);
  shrub1.y= random(50,700);
}
if(frameCount % 300 === 0){
  
  shrub2.y = random(500,100);
  shrub2.x = random(900,1200);
}

if(ambulance.isTouching(shrub1)){
    timer = timer - 0.5;
}

if(ambulance.isTouching(shrub2)){
  timer = timer - 0.07;
}

if (timer < 0){
 gameState = "end";
}
  ambulance.visible = true;
  ambulance.depth=10000;
  shrub1.depth=20000;
  shrub2.depth=30000;
  if(keyIsDown(RIGHT_ARROW)){
    ambulance.x +=2;
  }
  if(keyIsDown(LEFT_ARROW)){
    ambulance.x -=2;
  }

  if(track.y<200){
    track.y=300;
  }
}

if (gameState === "end"){
  ambulance.visible = false;
  shrub1.visible= false;
  shrub2.visible = false;
  timer = timer - 0;
  background("black")
  textSize(40);
  fill("white");
  text("You Were Not Able to save the patient in due time",400,400);
}


if (gameState === "win"){
  
  ambulance.visible = false;
  timer = timer - 0;
  background(hospital);
  
  shrub1.visible = false;
  
  shrub2.visible = false;
    textSize(40);
    fill("Black");
    text("You Saved The Patient's Life ",400,400);
  }

 


     drawSprites();
 }

 async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=0600 && hour<=1600)
  {
       background(dayTrack);
  }
  else
  {
    background(nighttrack);   
  }
}
