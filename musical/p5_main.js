let space = 60;
let frame = 10;
let vertices = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

	background(color(133, 22, 5));
	let border2 = space * 0.2;
	let border3 = space * 0.4;
	let witems = floor((width - frame * 2) / space) + 1;

	for (y = frame; y < height - frame + 1; y += space) {
		for (x = frame; x < width - frame; x += space) {
			vertices.push(createVector(x + random(-4, 4), y + random(-20, 20)));
			if (y > space + frame && x > space + frame) {
				last_one = vertices.length - 1;
				strokeWeight(3);
				fill(color(171, 132, 60));
				// used quad reference from https://editor.p5js.org/StevesMakerspace/sketches/pOgfjjJ4k
				quad(
					vertices[last_one].x,
					vertices[last_one].y,
					vertices[last_one - 1].x,
					vertices[last_one - 1].y,
					vertices[last_one - witems - 1].x,
					vertices[last_one - witems - 1].y,
					vertices[last_one - witems].x,
					vertices[last_one - witems].y
				);


				fill(color(104, 130, 127));
				quad(
					vertices[last_one].x - border2,
					vertices[last_one].y - border2,
					vertices[last_one - 1].x + border2,
					vertices[last_one - 1].y - border2,
					vertices[last_one - witems - 1].x + border2,
					vertices[last_one - witems - 1].y + border2,
					vertices[last_one - witems].x - border2,
					vertices[last_one - witems].y + border2
				);

				fill(color(133, 22, 5));
				quad(
					vertices[last_one].x - border3,
					vertices[last_one].y - border3,
					vertices[last_one - 1].x + border3,
					vertices[last_one - 1].y - border3,
					vertices[last_one - witems - 1].x + border3,
					vertices[last_one - witems - 1].y + border3,
					vertices[last_one - witems].x - border3,
					vertices[last_one - witems].y + border3
				);
			}
		}
	}
	noLoop();
}