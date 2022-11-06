
let font
let text_size 
				
let simplicity
let complexity
let msg

let pts = [];
let pts2 = [];
let pts3 = [];

function preload() {
	font = loadFont('JosefinSlab-Light.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight)
            
	text_size = 200
	textFont(font)
	textSize(text_size)
	simplicity = 'more'
	pts = font.textToPoints(simplicity, 0, 0, text_size, {
    sampleFactor: 9,
    simplifyThreshold: 0.0 
	})

	stroke(255)
 	strokeWeight(0.1)
	noFill();
					
	complexity = 'than it'
	pts2 = font.textToPoints(complexity, 0, 0, text_size, {
		sampleFactor: 10, 
		simplifyThreshold: 0.0 
	})
	stroke(255)
	strokeWeight(0.01)
	noFill();
						
	msg = 'seems.'
	pts3 = font.textToPoints(msg, 0, 0, text_size, {
		sampleFactor: 10, 
		simplifyThreshold: 0.0 
	})
	stroke(255)
	strokeWeight(0.01)
	noFill();
}

function draw() {
	background(51)

	drawText(pts, windowWidth/3, windowHeight/4);
	drawText(pts2, windowWidth/4, windowHeight/4*2.3);
	drawText(pts3, windowWidth/4, windowHeight/4*3.5);

	noLoop();

}

function drawText(array, x, y) {
	let d = 10 + frameCount/300;
	push();
	translate(x,y);
	for (let i = 0; i < array.length; i++) {
		let p = array[i];
		push();
		translate(p.x, p.y);
		line(-d, -d, +d, +d);
		pop();
	}
	pop();
}
