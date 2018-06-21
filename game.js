var score;
var ship;
var shipBullets;
var aliens;
var numAliens = 30;
var numAlienRows = 5;
var alienBullets;
var gameOver = false;

function setup() {
    createCanvas(1200, 520);
    score = new Score();
    ship = new Ship();
    shipBullets = new Array();
    aliens = new Array();
    alienBullets = new Array();

    // Set up aliens
    var xLimit = 100;
  	var xSpace = width - xLimit * 2;
    var xInterval = xSpace / ((numAliens / numAlienRows));
    var yLimit = 20;
  	var yInterval = (height / 2 - yLimit) / numAlienRows;
	var staggerValues = [0, 1];
  	
    for (var row = 0; row < numAlienRows; row++) {
         var stagger = staggerValues[row % staggerValues.length] * xInterval / 2;
      	for (var column = 0; column < numAliens / numAlienRows; column++) {
          	var fireRate = random() < 0.3 ? Number.MAX_SAFE_INTEGER : random(200, 500);
            aliens.push(new Alien(xLimit + column * xInterval + stagger, yLimit + row * yInterval, fireRate));
        }
    }
}

function draw() {  	
    background(0);
    score.show();
  	
  	// Game End Scenarios
  	if (gameOver) {
     	textFont('Consolas');
        textSize(30);
      	textAlign(CENTER);
        fill(255);
        text("GAME OVER", width / 2, height / 2);
      	noLoop();
    }else if (aliens.length == 0) {
      	textFont('Consolas');
        textSize(30);
      	textAlign(CENTER);
        fill(255);
        text("WIN", width / 2, height / 2);
      	noLoop();
    }
  
  	// Draw ships and aliens
    ship.show();
    ship.move();
    for (var i = 0; i < aliens.length; i++) {
        aliens[i].show();
      	aliens[i].move();
    }
  
    // Firing sequence
    var bullet = ship.fire();
    if (bullet != null) {
        shipBullets.push(bullet);
    }
    for (var i = 0; i < aliens.length; i++) {
        bullet = aliens[i].fire();
        if (bullet != null) {
            alienBullets.push(bullet);
        }
    }

  	// Bullet movement
    for (var i = 0; i < shipBullets.length; i++) {
        shipBullets[i].show();
        shipBullets[i].move();
    }
    for (var i = 0; i < alienBullets.length; i++) {
        alienBullets[i].show();
        alienBullets[i].move();
    }
  	
  	// Elimination sequence
  	for (var i = 0; i < shipBullets.length; i++) {
    	for (var a = 0; a < aliens.length; a++) {
          	bullet = shipBullets[i];
          	alien = aliens[a];
        	if (dist(bullet.x, bullet.y, alien.x, alien.y) < bullet.r + alien.r - 3) {
            	shipBullets.splice(i, 1);
              	aliens.splice(a, 1);
              	score.score++;
              	break;
            }
        }
    }
  	for (var i = 0; i < alienBullets.length; i++) {
      	bullet = alienBullets[i];
      	if (dist(bullet.x, bullet.y, ship.x, ship.y) < bullet.r + ship.h) {
            gameOver = true;
           	break;
        }
    }
	for (var i = 0; i < aliens.length; i++) {
     	alien = aliens[i];
      	if (dist(alien.x, alien.y, ship.x, ship.y) < ship.h + alien.r) {
        	gameOver = true;
          	break;
        }
    }
  
    // Counters
    ship.shipBulletTimer[0]++;
    for (var i = 0; i < aliens.length; i++) {
        aliens[i].alienBulletTimer[0]++;
    }
}