var soldierWalk,soldierJump,soldierAttack,soldierDead;
var monsterWalk,monsterAttack;
var groundImg;
var coinImg;
var bombImg;
var explosionImg;
var backgroundImg;
var rock1Img,rock2Img,rock3Img,rock4Img;
var coinCollected = 0;
var life = 5;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var bullet;








function preload(){
	soldierWalk = loadAnimation("images/soldierJump1.png","images/soldierWalk2.png");
	soldierJump = loadAnimation("images/soldierJump1.png","images/soldierJump2.png","images/soldierJump3.png","images/soldierJump4.png",
	"images/soldierJump5.png","images/soldierJump6.png");
	soldierDead = loadImage("images/deadsoldier5.png")
	soldierAttack = loadAnimation("images/soldierAttack1.png","images/soldierAttack2.png","images/soldierAttack3.png");
	monsterWalk = loadAnimation("images/monster1.png","images/monster2.png","images/monster3.png",
	"images/monster4.png","images/monster5.png","images/monster6.png");
	monsterAttack = loadImage("images/monsterAttack.png");
	groundImg = loadImage("images/ground3.png");
	coinImg = loadImage("images/coin.png");
	bombImg = loadImage("images/bomb.png");
	backgroundImg = loadImage("images/bg.jpg");
	backgroundImg.scale = 2.0;
	explosionImg = loadImage("images/explosion.png");
	rock1Img = loadImage("images/rock1.png");
	rock2Img = loadImage("images/rock2.png");
	rock3Img = loadImage("images/rock3.png");
	rock4Img = loadImage("images/rock4.png");
	coinCollect = loadSound("coinCollect.mp3");
	jump = loadSound("jumpSound.mp3");
	lifeLost = loadSound("lifeLost.mp3")
	gameOverSound = loadSound("gameOver.mp3");
	gameOverImg = loadImage("images/gameOver.jpg");
	restartImg = loadImage("images/restart.png");
	bulletImg = loadImage("images/bullet.png");


}
function setup(){
	createCanvas(windowWidth,windowHeight);
	bg = createSprite(0,windowHeight/2,windowWidth,windowHeight);
	bg.addImage(backgroundImg);
	bg.scale = 2;
	
	
	invisibleGround = createSprite(windowWidth/2,windowHeight-10,windowWidth,30);
	invisibleGround.visible = false;
	soldier = createSprite(100,windowHeight-200,10,10);
	soldier.addAnimation("soldierWalking",soldierWalk);
	soldier.addAnimation("soldierDying",soldierDead);
	

	soldier.scale = 0.8;
	//soldier.debug = true;
	
	soldier.setCollider("circle",0,0,80);
	rock1 = createSprite(100,windowHeight-130,20,20);
	rock1.addImage(rock1Img);
	//rock1.debug = true;

	rock2 = createSprite(200,windowHeight-220,20,20);
	rock2.addImage(rock2Img);
	rock3 = createSprite(300,windowHeight-350,20,20);
	rock3.addImage(rock3Img);

	coin1 = createSprite(-125,windowHeight-300,20,20);
	coin1.addImage(coinImg);
	coin1.scale = 0.2;
	//coin1.debug = true;
	coin1.setCollider("circle",0,0,5);
	coin2 = createSprite(155,windowHeight-390,20,20);
	coin2.addImage(coinImg);

	coin2.scale = 0.2;
	coin3 = createSprite(415,windowHeight-490,20,20);
	coin3.addImage(coinImg);
	coin3.scale = 0.2;

	coinGround = createSprite(300,windowHeight-30,20,20);
	coinGround.addImage(coinImg);
	coinGround.scale = 0.2;

	
	
	//rock2.debug = true,
	//rock3.debug = true;
	rock1.setCollider("rectangle",-220,-115,80,20);
	rock2.setCollider("rectangle",-50,-120,90,30);
	rock3.setCollider("rectangle",105,-85,80,30);
	camera.on();
	bombGroup = new Group();
	coinGroup = new Group();
	coinGroup1 = new Group();
	coinGroup2 = new Group();
	coinGroup3 = new Group();
	bulletGroup = new Group();
	monsterGroup = new Group();
	coinGroup.add(coinGround);
	coinGroup1.add(coin1);
	coinGroup2.add(coin2);
	coinGroup3.add(coin3);

	gameOver = createSprite(0,windowHeight/2,windowWidth,windowHeight);
	gameOver.addImage(gameOverImg);
	gameOver.scale = 0.8;
	gameOver.visible = false;
	
	resetButton = createSprite((gameOver.x/2),gameOver.y/2,30,30);
	resetButton.addImage(restartImg);
	resetButton.scale = 0.2;
	
	resetButton.visible = false;
}
function draw(){

	background("white");
	
	
	if(gameState==PLAY){
camera.x = soldier.x;
/*if(camera.position.x + width/2 >ground.x + ground.width/2){
		ground.x = camera.position.x
		 invisibleGround.x = camera.position.x ;
	}
*/	score = score + Math.round(getFrameRate()/60);
if(keyWentDown("ENTER")){
	bullet = createSprite(soldier.x +70,soldier.y-10,20,20);
	bullet.addImage(bulletImg);
	bullet.scale = 0.2;
	bullet.velocityX = 5;
	bulletGroup.add(bullet);
}
	if(keyDown("SPACE")){
		soldier.velocityY = -10;
		jump.play();
		
	}
	if(keyDown("RIGHT")){
		soldier.x = soldier.x +10;
	}
	soldier.velocityY = soldier.velocityY+0.9;
	soldier.collide(invisibleGround);
	soldier.collide(rock1);
	soldier.collide(rock2);
	soldier.collide(rock3);
	
	if(soldier.x - rock1.x !== 0){
	if(soldier.x-rock1.x>400){
		rock1.x = soldier.x+500;
		
	
	}
}
if(soldier.x-rock2.x !== 0){
	if(soldier.x-rock2.x>400){
		rock2.x = soldier.x+500;
		
	}
}
	if(soldier.x-rock3.x>400){
		rock3.x = soldier.x+500;
	};
	if(soldier.x-bg.x>200){
		invisibleGround.x = soldier.x;
		bg.x = soldier.x+200;
	}
	if(soldier.isTouching(rock1)){
		soldier.velocityX = 0;
	}
	if(soldier.isTouching(rock2)){
		soldier.velocityX = 0;
	}
	if(soldier.isTouching(rock3)){
		soldier.velocityX = 0;
	}
		if(soldier.x - coin1.x>650){
		coin1.x = soldier.x +250;
		coinGroup1[0].visible = true;

	

	}
	if(soldier.x - coin2.x>570){
		coin2.x = soldier.x +320;
		coinGroup2[0].visible = true;

	}
	if(soldier.x - coin3.x>570){
		coin3.x = soldier.x +320;
		coinGroup3[0].visible = true;
	
	}
	if(soldier.x-coinGround.x>200){
		coinGround.x = soldier.x+150;

	}
	
	spawnBombs();
	spawnMonsters();
	if(bombGroup.isTouching(soldier)){
	
		life = life-1;
		lifeLost.play();
		bombGroup[0].destroy();
	
	}
	if(soldier.isTouching(coinGroup)){
		coinGroup[0].destroy();

	}

	
	if(soldier.isTouching(coinGroup2)&&coinGroup2[0].visible == true){
		
		coinCollected+=1;
		coinGroup2[0].visible = false;
		coinCollect.play();
		
	}
	if(soldier.isTouching(coinGroup3)&&coinGroup3[0].visible == true){
		coinCollected+=1;
		coinGroup3[0].visible = false;
		coinCollect.play();

	}
	if(soldier.isTouching(coinGroup1)&&coinGroup1[0].visible == true){
		coinCollected+=1;
		coinCollect.play();
		coinGroup1[0].visible = false;
		
		
	}

if(bulletGroup.isTouching(monsterGroup)){
	monsterGroup[0].destroy();
	bulletGroup[0].destroy();
}
if(coinCollected%100==0 && life<5){
	life = life+1;
}
	
}
if(soldier.x-gameOver.x>200){
	gameOver.x = soldier.x+200;
}
if(soldier.isTouching(monsterGroup)){
	soldier.changeAnimation("soldierDying",soldierDead);
	soldier.scale = 1.9;
	monsterGroup.setVelocityXEach(0);
	monsterGroup[0].changeAnimation("monster",monsterAttack);
	gameOverSound.play();
	gameState = END;
}
if(life==0){
	gameOverSound.play();
	gameState = END;
}
if(gameState==END){
	monsterGroup.destroyEach()
	bombGroup.destroyEach();
	bg.visible = false;
	resetButton.visible = true;
	gameOver.visible = true;

	rock1.visible = false;
	rock3.visible = false;
	coin1.visible = false;
	coin2.visible = false;
	coin3.visible = false;
	
}
if(mousePressedOver(resetButton)){
	reset();
}
	console.log("soldier : " + soldier.y);

	

	

	drawSprites();
	
	
	textSize(25);
	fill("gold")
	text("coins : " + coinCollected , bg.x,40);
	fill("red")
	text("lives :" + life , bg.x-300,40);
	textSize(25);
	fill("blue")
	text("Score :" + score,bg.x-500,40);
}
function spawnBombs(){
	var bombX = soldier.x + 80;
	var bombFactor = 100;
	if(score%100==0){
		bombFactor = bombFactor+10;
	}

	if(frameCount%bombFactor==0){
		
		bomb = createSprite(random(bombX,camera.x),0,20,20);
		bomb.addAnimation("bomb",bombImg);
		bomb.addAnimation("explosion",explosionImg);
		bomb.scale = 0.02;
		bomb.velocityY = 3;
		bombGroup.add(bomb);
		console.log(bomb.x); 
	}
	
}
function spawnMonsters(){
	var monsterX =  soldier.x+600;
	var monsterFactor = 300
	
	if(frameCount%monsterFactor==0){
		monster = createSprite(random(monsterX,camera.x),windowHeight-70,20,20);
		monster.addAnimation("monsterWalk",monsterWalk);
		monster.addAnimation("attack",monsterAttack);
		monster.velocityX = -5;
		//monster.debug = true;
		monster.setCollider("rectangle",0,0,100,150);
		monsterGroup.add(monster);
		console.log(frameCount%monsterFactor);
	}
}
function reset(){
	score = 0;
	life = 5;
	bg.visible = true;
	gameOver.visible = false;
	resetButton.visible = false;
	rock1.visible = true;
	rock3.visible = true;
	coin1.visible = true;
	coin2.visible = true;
	coin3.visible = true;
	soldier.changeAnimation("soldierWalking",soldierWalk);
	soldier.scale = 0.8;
	gameState = PLAY;
}

