function Score() {
  	this.score = 0;
  
    this.show = function() {
     	textFont('Consolas');
        textSize(18);
        fill(255);
        text("Score : " + this.score, width - 125, 50);
    }
}