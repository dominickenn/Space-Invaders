function alienBullet(x, y, rgb) {
  this.d = 9;
  this.r = this.d / 2;
  this.x = x;
  this.y = y;
  this.rgb = rgb;
  this.moveSpeed = 7;
  
  this.show = function() {
  	push();
    translate(this.x, this.y);
    noStroke();
    fill(rgb[0], rgb[1], rgb[2]);
    ellipseMode(CENTER);
    ellipse(0, 0, this.d);
    pop();
  }
  
  this.move = function() {
  	 this.y += this.moveSpeed;
  }
}