function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
}

function draw() {
	background(color('#1E2020'));
	let m = minute();
	let s = second();
	let h = hour();
	// hour value goes from 1 to 12 inclusive
	let converted_h = h%13;
	if (h >=13){
		h +=1;
	}
	
	// set x values
	width_h = -windowWidth/3;
	width_m =  -windowWidth/8;
	width_s = windowWidth/5;
	// draw sin wave components
	drawWave(width_h,0,converted_h,'#FF005E');
	drawWave(width_m,0,m, '#04DB23');
	drawWave(width_s,0,s,'#04DBC6');
}

// function to draw sine wave
function drawWave(x,y,i_limit, c){
	push();
	
	translate(x,y);
	rotateY(60);
	noFill();
	// define color components
	lineColor = color(c);
  lineColor.setAlpha(100 + 100 * sin(frameCount/100));
	
	stroke(lineColor);
	strokeWeight(2);
	for (var i = 0;i <=i_limit;i++){
		// define max radii to be based on i_limit
		var radii = i*i_limit/2;
		beginShape();
		// create hexagonal shape
		for (var k = 0; k<=360; k+=60){
			// define points
			var pointx = radii * cos(k);
			var pointy = radii * sin(k);
			// use same period pattern for hour/min/seconds because the growing shape is already visually a lot
			var pointz = sin(frameCount + i*10) * i_limit*5;
			vertex(pointx,pointy,pointz);
		}			
		endShape();
	}
	pop();
}