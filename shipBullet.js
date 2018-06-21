function shipBullet(x, y) {
  this.d = 9;
  this.r = this.d / 2;
  this.x = x;
  this.y = y;
  this.moveSpeed = 7;
  
  this.show = function() {
  	push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 0, 0);
    ellipseMode(CENTER);
    ellipse(0, 0, this.d);
    pop();
  }
  
  this.move = function() {
  	 this.y -= this.moveSpeed;
  }
}