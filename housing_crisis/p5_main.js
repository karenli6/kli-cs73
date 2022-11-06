// perspectives: housing over multiple years (2012-2016)
// housing crisis is one of the biggest problems in the Bay Area --> focused on SF

// dataset source: https://raw.githubusercontent.com/RuiChang123/Regression_for_house_price_estimation/master/final_data.csv

// press key to start --> moves from 2012 to 2016
let data;
let points = [[],[],[],[],[]];
let ratio_array = [[],[],[],[],[]];
// CPIs in CA:https://www.dir.ca.gov/oprl/CPI/EntireCCPI.PDF
let CPI = [238.2, 241.62, 246.06, 249.67, 255.303]

//
let top_bound;
// color
let from;
let to;
//
let index = 0;
// length of animation
let gameState = 'WAITING'; 
let gameLengthInSeconds = 4;
let gameStartTime;
// font
let rubik;
let mont;

function preload() {

  data = loadTable("sf_info.csv", "csv", "header");
	rubik = loadFont('RubikDirt-Regular.ttf');
	mont = loadFont('Montserrat-VariableFont_wght.ttf');

}

// credit for quartile calculation: https://snippets.bentasker.co.uk/page-1907020841-Calculating-Mean,-Median,-Mode,-Range-and-Percentiles-with-Javascript-Javascript.html
function sortArr(arr){
    var ary = arr.slice();
    ary.sort(function(a,b){ return parseFloat(a) - parseFloat(b);});
    return ary;
}
function calcQuartile(arr,q){
    var a = arr.slice();
    // Turn q into a decimal (e.g. 95 becomes 0.95)
    q = q/100;

    // Sort the array into ascending order
    data = sortArr(a);

    // Work out the position in the array of the percentile point
    var p = ((data.length) - 1) * q;
    var b = Math.floor(p);

    // Work out what we rounded off (if anything)
    var remainder = p - b;

    // See whether that data exists directly
    if (data[b+1]!==undefined){
        return parseFloat(data[b]) + remainder * (parseFloat(data[b+1]) - parseFloat(data[b]));
    }else{
        return parseFloat(data[b]);
    }
}

//
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  let numRows = data.getRowCount();

  let lng = data.getColumn("longitude");
  let lat = data.getColumn("latitude");
  let z_add = data.getColumn("z_address");
  let info = data.getColumn("info");
	let date = data.getColumn("lastsolddate");
	let price = data.getColumn("lastsoldprice");
	let sqft = data.getColumn("finishedsqft");
	let neighborhoods = data.getColumn("neighborhood");


	for (let i = 0; i < numRows; i++) {
		if (z_add[i] != "LANDMARK"){
			// note: prices adjusted for CPI
	
			let this_ratio = price[i]/sqft[i];
			
			if (date[i].includes("2012")){
				ratio_array[0].push(this_ratio);

			}
			if (date[i].includes("2013")){
				ratio_array[1].push(this_ratio*(CPI[0]/CPI[1]));

			}
			if (date[i].includes("2014")){
				ratio_array[2].push(this_ratio*(CPI[0]/CPI[2]));

			}
			if (date[i].includes("2015")){
				ratio_array[3].push(this_ratio*(CPI[0]/CPI[3]));

			}
			if (date[i].includes("2016") ){
				ratio_array[4].push(this_ratio*(CPI[0]/CPI[4]));

			}

		}
	}
	

	top_bound = calcQuartile(ratio_array[0],99.7)
		


	
  let maxLng = max(lng);
  let minLng = min(lng);

  let maxLat = max(lat);
  let minLat = min(lat);
	// determine color
	// initialize color

	from = color(92, 189, 230);
	to = color(236, 84, 46);
	//
  for (let i = 0; i < numRows; i++) {
			let mapLng = map(lng[i], minLng, maxLng, 50, width-50);
			let mapLat = map(lat[i], minLat, maxLat, height-50, 50);
			// determine color
			let l = false;
			if (z_add[i] == "LANDMARK"){
				l = true;

			}
			
			// insert
			if (date[i].includes("2012") || z_add[i] == "LANDMARK"){
				
				let ratio_value = ((price[i]/sqft[i])/top_bound) 
				let c = lerpColor(from, to, ratio_value);
				c.setAlpha(170 + 128 * sin(millis() / 1000));
				let radius = ratio_value * 25;
				radius = min(radius, 20);
				let newp = new Point(mapLng, mapLat, l, info[i], c, z_add[i],radius)
				points[0].push(newp)
			}
			if (date[i].includes("2013") || z_add[i] == "LANDMARK"){
				let ratio_value = ((price[i]/sqft[i]*(CPI[0]/CPI[1]))/top_bound) 
				let c = lerpColor(from, to, ratio_value);
				c.setAlpha(170 + 128 * sin(millis() / 1000));
				let radius = ratio_value * 25;
				radius = min(radius, 20);

				let newp = new Point(mapLng, mapLat, l, info[i], c,z_add[i], radius)
				points[1].push(newp)

			}
			if (date[i].includes("2014") || z_add[i] == "LANDMARK"){
				let ratio_value = ((price[i]/sqft[i]*(CPI[0]/CPI[2]))/top_bound) 
				let c = lerpColor(from, to, ratio_value);
				c.setAlpha(170 + 128 * sin(millis() / 1000));
				let radius = ratio_value * 25;
				radius = min(radius, 20);

				let newp = new Point(mapLng, mapLat, l, info[i], c,z_add[i], radius)
				points[2].push(newp)

			}
			if (date[i].includes("2015") || z_add[i] == "LANDMARK"){
				let ratio_value = ((price[i]/sqft[i]*(CPI[0]/CPI[3]))/top_bound) 
				let c = lerpColor(from, to, ratio_value);
				c.setAlpha(170 + 128 * sin(millis() / 1000));
				let radius = ratio_value * 25;
				radius = min(radius, 20);

				let newp = new Point(mapLng, mapLat, l, info[i], c,z_add[i], radius)
				points[3].push(newp)

			}
			if (date[i].includes("2016") || z_add[i] == "LANDMARK"){
				let ratio_value = ((price[i]/sqft[i]*(CPI[0]/CPI[4]))/top_bound) 
				let c = lerpColor(from, to, ratio_value);
				c.setAlpha(170 + 128 * sin(millis() / 1000));
				let radius = ratio_value * 25;
				radius = min(radius, 20);

				let newp = new Point(mapLng, mapLat, l, info[i], c,z_add[i], radius)
				points[4].push(newp)	

			}
  }
}

// draw function
function draw() {

	background('white');
	if (gameState == 'PLAYING'){

			push();
			textAlign(LEFT);
			fill(color(6,57,112));
			textSize(40);
			textFont(rubik)

			text("San Francisco", windowWidth/8, windowHeight/5);
			pop();
			push();
			textAlign(LEFT);
			fill(color(236, 84, 46));
			textSize(40);
			textFont(rubik)
			s = "2012"
			if (index == 1){
				s = "2013"
			} else if (index == 2){
				s = "2014"
			} else if (index == 3){
				s = "2015"
			} else if (index == 4){
				s = "2016"
			}
			text(s, windowWidth/8, windowHeight/5+30);

			pop();
			push();
			textAlign(LEFT);
			stroke(color(6,57,112))
			fill(color(6,57,112));
			textSize(16);
			textFont(mont)
			
			text("ranges from low (blue) to high (coral) price/sqft relative to 2012 ", windowWidth/8, windowHeight/5+45);

			pop();
		
			points[index].forEach(p => p.show());
	}else{
		push();
		textAlign(LEFT);
		fill(color(6,57,112));
		textSize(40);
		textFont(rubik)

		text("Housing Crisis in San Francisco", windowWidth/3, windowHeight/2);
		pop();
		push();
		textAlign(LEFT);
		fill(color(6,57,112));
		textSize(13);
		textFont(mont)
		stroke(4);
		text("Press on any key to move through data by year (2012-2016). NOTE: prices adjusted according to CA CPI.", windowWidth/3, windowHeight/2+35);
		pop();
	}

}

// key pressed
function keyPressed() {
	if (gameState != 'PLAYING') {
		gameState = 'PLAYING';
		index = 0
	}else {
		if (index <4){
			index +=1;
		} else{
			index = 0
		}
		
	}
}


// Point class
class Point {
  constructor(x, y, landmark, textlabel, c, n, rad) {
    this.x = x;
    this.y = y;
		this.landmark = landmark
		this.textlabel=textlabel;
		this.r = rad;
		this.color=c;
		this.neighborhood = n;
  }
  
  show() {

		
		let d = dist(mouseX, mouseY, this.x, this.y)
		if (d < 3){
			push();
			
			stroke('black');
			// strokeWeight(1);
			if (this.landmark == false){
				text(this.neighborhood, this.x, this.y);

			}
			pop();

		}
			push();
			fill(this.color);
			stroke('white');
			circle(this.x, this.y, this.r)
			pop();

    if (this.landmark == true){
			push();
			fill(color(6,57,112));
			strokeWeight(1);
			stroke(color(6,57,112));
			textFont(mont)

			textSize(13);
			text(this.textlabel, this.x, this.y);
			pop();
		}

  }
  
  
}
