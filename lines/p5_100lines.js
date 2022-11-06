// sonder --> motion of passing by
let background_i;
function setup() {
	createCanvas(windowWidth, windowHeight);

  background_i = loadImage('city.jpg');
}

function draw() {
	background(background_i);
	let midx =windowWidth/2;
	let midy = windowHeight/2;
	for(let i = 0; i< 100; i++){
		let endx = random(0, windowWidth);
		let end_weight = random(3,10);
		gradientLine(midx, midy, endx, windowHeight, 1, end_weight, 50);
	}
	redraw();
}


function gradientLine(startx,starty,endx,endy,startw,endw, segments) {
  let prevx = startx;
  let prevy = starty;
	i = 1;
	while (i<=segments){
		// lerp: interpolation transition
		let x = lerp(startx, endx, i / segments);
    let y = lerp(starty, endy, i / segments);
		//
		push();
		// establish black/white gradient
		stroke(i*10);
		strokeWeight(lerp(startw, endw, i/segments));
		line(prevx, prevy, x,y);
		pop();
		prevx = x;
		prevy = y;
		i +=1;
	}

}