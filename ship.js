function Ship() {
    this.x = width / 2;
    this.y = height - 50;
    this.l = 36;
    this.h = 10;
    this.moveSpeed = 7;
    this.shipBulletTimer = [21, 20];

    this.show = function() {
        push();
        translate(this.x, this.y);
        fill(0, 255, 0);
        noStroke();
      	rectMode(CENTER);
        // Base
        rect(0, 0, this.l, this.h);
        // Cannon
      	translate(0, -this.h / 2);
        rect(0, 0, this.l / 4, -this.h / 2 * 3);
        pop();
    }

    this.move = function() {
        if (keyIsDown(LEFT_ARROW)) {
            if ((this.x - this.moveSpeed) > 0) {
                this.x -= this.moveSpeed;
            }
        }
        if (keyIsDown(RIGHT_ARROW)) {
            if ((this.x + this.moveSpeed) < width) {
                this.x += this.moveSpeed;
            }
        }
    }

    this.fire = function() {
        if (keyIsDown(32)) {
            if (this.shipBulletTimer[0] > this.shipBulletTimer[1]) {
                this.shipBulletTimer[0] = 0;
                return new shipBullet(this.x, this.y);
            }
        }
        return null;
    }
}