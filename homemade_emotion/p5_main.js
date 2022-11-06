// [currently WIP]

let table;

const PADDING = 50;
let ROWS = 6;
let COLUMNS = 11;
const CELL_SIZE = 100;
let imgs = [];
let total;

let CUISINES = [];
let state = 0;
let boundaries = [];
//
let loadeddata;
let loadedlist=[];
let loadedindex;
//fonts
let apple;


//
let picturelist = ["flour","avo","baking", "basil", "bean", "blackpepper","beef","butter" , "cachaca","carrot", "cajunseasoning", "cloves", 
									 "chilipowder", "coconutmilk", "corn", "driedoregano", "cumin", "driedthyme", "egg","fishsauce", 
									"fetacheese", "garammasala", "garlic", "greenbellpepper", "ginger","greenonion", "groundallspice",
									"grits", "groundcinnamon", "lentils", "groundtumeric", "jalapenochilies", "honey", "lemongrass", "lemons",
									"lime", "milk", "mirin", "miso", "mushroom", "mustard","oil", "olive", "oliveoil", "onion", "parmesancheese",
									"paprika", "pepper", "tomato", "ricevinegar","redbellpepper", "potato", "sake", "scallion", "salsa", 
									"sesameoil", "sesameseed", "shallot", "sourcream", "soysauce", "sugar", "water", "cornstarch"]

// labels
let labels = ["all-purpose flour","avocado","baking soda/powder", "basil", "bean", "black pepper","beef","butter" , "cachaca","carrot", "cajun seasoning", "cloves", 
									 "chili powder", "coconut milk", "corn", "dried oregano", "cumin", "dried thyme", "egg","fish sauce", 
									"feta cheese", "garam masala", "garlic", "green bell pepper", "ginger","green onion", "ground allspice",
									"grits", "ground cinnamon", "lentils", "ground turmeric", "jalapeno chilies", "honey", "lemongrass", "lemons",
									"lime", "milk", "mirin", "miso", "mushroom", "mustard","oil", "olive", "olive oil", "onion", "parmesan cheese",
									"paprika", "pepper", "tomato", "rice vinegar","red bell pepper", "potato", "sake", "scallion", "salsa", 
									"sesame oil", "sesame seed", "shallot", "sour cream", "soy sauce", "sugar", "water", "corn starch"]

//
function preload(){
	table = loadTable("processed_cuisines.csv", "csv", "header");

	for (let pic of picturelist){
		a = loadImage(pic+".png");
		imgs.push(a);
	}
	// fonts
	apple = loadFont('HomemadeApple-Regular.ttf');


}

//
function processCSV(){
	
  for(let i = 0; i < total; i++) {
        CUISINES.push([]);
  }
	// print(CUISINES);
	for (let r = 0; r < table.getRowCount(); r++){
			let currentRow = table.getRow(r);
			// print(currentRow);
			let c = currentRow.obj['Cuisine']
			let i = currentRow.obj['Ingredient']
			let p = parseFloat(currentRow.obj['Percentage']);
			// find index of ingredient
	
			let rightindex = labels.findIndex(function(e){ return e == i});
			// print(rightindex + i);
			CUISINES[rightindex].push([c,p]);
	}
}

// check mouse click
function contains(x,y,bounds){
	// left, top, sz+20, sz
	let left_b = bounds[0];
	let top_b = bounds[1];
	let w = bounds[2];
	let h = bounds[3];
	if ((x > left_b) && (x <left_b+w) && (y > top_b) && (y <top_b+h)){
		return true;
	}
	else{
		return false;
	}
}

//
function mousePressed() {

	for (let i = 0; i<total;i++){
		if (contains(mouseX, mouseY, boundaries[i]) && state == 0){
			loadedindex=i;
			loadeddata = picturelist[i];
			loadedlist = CUISINES[i];
			state ++;
			
		}
	}

}

// define boundaries
function defineBoundaries(){
	index = 0;
	for (let i = 0; i<ROWS;i++){
		for (let j = 0; j< COLUMNS;j ++){
			
			if (index >=total){
				break
			}
      let left = PADDING + (j*CELL_SIZE);
      let top = PADDING + (i*CELL_SIZE);
      let sz = CELL_SIZE - 2;
			//  the x-coordinate of the top-left corner of the image, y-coord, width, height
			let this_bound = [left+windowWidth/10, top, sz+20, sz];
			boundaries.push(this_bound);
			index +=1

		}
	}
}

//
function imageGrid(){
	translate(windowWidth/10,0);
	noStroke();
	
	index = 0;
	for (let i = 0; i<ROWS;i++){
		for (let j = 0; j< COLUMNS;j ++){
			
			if (index >=total){
				break
			}
      let left = PADDING + (j*CELL_SIZE);
      let top = PADDING + (i*CELL_SIZE);
      let sz = CELL_SIZE - 2;
			image(imgs[index], left, top, sz+20, sz);
			index +=1

		}
	}
}

//
function drawInfo(inn, data, lst){
	push();
	textAlign(LEFT);
	fill(color(6,57,112));
	textSize(40);

	text(data, windowWidth/8, windowHeight/5);
	pop();
	
	// render image
	push();
	let copy = imgs[inn]
	imageMode(CENTER);
	image(copy, windowWidth/2, windowHeight/3, CELL_SIZE*3+70,CELL_SIZE*3);	
	pop();
	
	// display list of top cuisines that use this ingredient
	let sortedlst = lst.sort((a,b) => b[1] - a[1])
	push();
  fill(255, 150, 200);
  textSize(13);
	fill('black');

	H = windowHeight/3
	W = windowWidth/2
	offset = 0
  for (let s of sortedlst){
		
		text(s[0]+ ": " + str(s[1]*100)+"%",W +10 ,H+20*(offset+1))
		offset +=1
	}
	pop();

}

function setup() {

  createCanvas(windowWidth, windowHeight);
	total = imgs.length;
	defineBoundaries();
	processCSV();

	
}
function drawtitle(){
		// draw bottom title
	push();
	textFont(apple);
	textSize(50)
	noStroke()
	fill(color(224, 96, 54))
	textAlign(CENTER);
	text('homemade',3.7*windowWidth/5, 18*windowHeight/20);
	pop();
}
// draw function
function draw(){
	  background("white");

	if (state == 0) {
		imageGrid();
		drawtitle();
	}
	
	if (state == 1) {
		drawInfo(loadedindex, loadeddata,loadedlist);
	}

	
}

// to go back
function keyPressed() {
	if(state != 0){
		state --;
		loadedlist=[];
		
	}
}