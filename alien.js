function Alien(x, y, bulletTime) {
    this.x = x;
    this.y = y;
    this.r = 11;
    this.moveSpeed = 1;
	this.moveY = false;
  	this.yDistanceMoved = 0;
    this.rgb = [random(266), random(266), random(266)];
    this.alienBulletTimer = [0, bulletTime];

    this.show = function() {
        push();
        translate(this.x, this.y);
        fill(this.rgb[0], this.rgb[1], this.rgb[2]);
        noStroke();
        arc(0, 0, this.r * 2, this.r * 2, -QUARTER_PI, PI + QUARTER_PI, PIE);
        triangle(-this.r / 5 * 4, this.r / 2,
            0, -this.r * 2 / 3,
            this.r / 5 * 4, this.r / 2)
        pop();
    }

    this.fire = function() {
        if (this.alienBulletTimer[0] > this.alienBulletTimer[1]) {
            this.alienBulletTimer[0] = 0;
            return new alienBullet(this.x, this.y, this.rgb);
        }
        return null;
    }
    
    this.move = function() {
      	if (this.moveY) {
          	if (this.yDistanceMoved <= this.r * 2) {
            	this.yDistanceMoved += abs(this.moveSpeed);
              	this.y += abs(this.moveSpeed);
            } else {
             	this.moveY = false;
              	this.yDistanceMoved = 0;
            }
        } else if (
           (this.x + this.moveSpeed) < (0 + this.r) ||
           (this.x + this.moveSpeed) > (width - this.r)) {
        	this.moveY = true;
            this.moveSpeed = -this.moveSpeed;
        } else {
            this.x += this.moveSpeed;
        }
    }
}