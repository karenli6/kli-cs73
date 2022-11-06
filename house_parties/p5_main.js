// LINK to my data cleaning notebook: https://github.com/karenli6/kli-cs73/blob/main/cs73_nyc_data.ipynb
// LINK TO DATASET SOURCE: https://www.kaggle.com/datasets/somesnm/partynyc?resource=download&select=party_in_nyc.csv 

// Party Complaints in NYC
// Mapping between data and visuals: I found this interested dataset on the number of noise complaints calls (complaint type "Loud music/Party")
// made to police in 2016. There was a total of 225414 entries, and I first filtered out complaints specific to residential houses. 
// After removing nan datapoints + calculating an aggregated count sum based on longitude and latitude location values, 
// I displayed approximately 3300 entries in this grid, where the horizontal axis iterates over latitude values and
// the vertical axis iterates over longitude values. The interpretation and functionality is similar
// to a heatmap, where the locations that received the most number of complaints have the greatest opacity and more "yellow" colors. 
// The locations that received no noise complaints are more purple and lighter in transparency. I tried to choose color-blind-friendly 
// combinations. The aggregationt ties together the data and color visuals nicely - I thought this would be
// a fun way to find the loudest/most obnoxioius/"best" house parties in NYC :). 
// 
let table;
let FREQ = [];


const PADDING = 50;
let ROWS = 52;
let COLUMNS = 65;
const CELL_SIZE = 12;

function preload(){
	table = loadTable("cleaned_data.csv", "csv", "header");
}

function processCSV(){
	
  for(let i = 0; i < ROWS; i++) {
        FREQ.push(new Array(COLUMNS));
  }
	for (let r = 0; r < table.getRowCount(); r++){
			let currentRow = table.getRow(r);
			// print(currentRow);
			let i = currentRow.obj['Row Number']
			let j = currentRow.obj['Column Number']
			FREQ[i][j] =parseInt(currentRow.obj['Frequency']);
	}
}


function setup() {

  createCanvas(windowWidth, windowHeight);
  background("#ced1e0");
	processCSV();
}

// draw function
function draw(){
	// print(FREQ);
	translate(windowWidth/5,0);
	noStroke();

	for (let i = 0; i<ROWS;i++){
		for (let j = 0; j< COLUMNS;j ++){
				
			fill(10+FREQ[i][j]*2, FREQ[i][j],130-FREQ[i][j]*2, 30 +FREQ[i][j]*5);
			// print(FREQ[i][j]);
      let left = PADDING + (j*CELL_SIZE);
      let top = PADDING + (i*CELL_SIZE);
      let sz = CELL_SIZE - 2;
      rect(left,top,sz,sz);
			if (i == 0 && j == 0){
				fill('#382b54');
				text("Latitude: 40.50°", left, top-10);
				text("Longitude: -74.25°", left-110, top+10);

			}
			if (i == ROWS-1 && j == COLUMNS-1){
				fill('#382b54');
				text("Latitude: 40.91°", left+20, top+10);
				text("Longitude: -73.70°", left-80, top+30);

			}
		}
	}
  noLoop();
}