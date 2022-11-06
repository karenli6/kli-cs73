// dataset:  https://crime-data-explorer.fr.cloud.gov/pages/downloads#datasets 
// python data cleaning notebook: see data_processing folder

//1991-2020 
let state_names = ['Arkansas', 'Arizona', 'California', 'Colorado', 'Connecticut',
  'District of Columbia', 'Delaware', 'Georgia', 'Iowa', 'Idaho', 'Illinois',
  'Kansas', 'Massachusetts', 'Maryland', 'Minnesota', 'Missouri', 'Mississippi',
  'New Jersey', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Tennessee', 'Texas', 'Virginia', 'Washington', 'Wisconsin',
  'Alabama', 'Florida', 'Indiana', 'Kentucky', 'Louisiana', 'Maine', 'Michigan',
  'North Carolina', 'North Dakota', 'Rhode Island', 'South Carolina', 'Utah',
  'Wyoming', 'Alaska', 'Montana', 'New Mexico', 'South Dakota', 'Vermont',
  'New Hampshire', 'Nebraska', 'West Virginia', 'Guam', 'Federal', 'Hawaii']
let abbrev = ['AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'GA', 'IA', 'ID', 'IL', 'KS', 'MA', 'MD', 'MN', 'MO', 'MS',
  'NJ', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'TN', 'TX', 'VA', 'WA', 'WI', 'AL', 'FL', 'IN', 'KY',
  'LA', 'ME', 'MI', 'NC', 'ND', 'RI', 'SC', 'UT', 'WY', 'AK', 'MT', 'NM', 'SD', 'VT', 'NH', 'NE',
  'WV', 'GU', 'FED', 'HI']
let table;
let bias;
let info_dict = {}

let display_dict = {}
// max number of incidents per year
let max_amt_dict = {}

// store top bias
let bias_dict = {}

let total_count = {}
// preload data
function preload() {
  table = loadTable("circles_info.csv", "csv", "header");
  bias = loadTable("all_bias.csv", "csv", "header");
  rubik = loadFont('RubikDirt-Regular.ttf');
  mont = loadFont('Montserrat-VariableFont_wght.ttf');
}

// process data
function processCSV() {
  for (let i = 1991; i <= 2020; i++) {
    states_info = {}
    max_amt_dict[i] = 0
    for (let j = 0; j < state_names.length; j++) {
      states_info[state_names[j]] = 0
    }

    info_dict[i] = states_info
  }
  for (let r = 0; r < table.getRowCount(); r++) {
    let currentRow = table.getRow(r);
    // print(currentRow);
    let year = currentRow.obj['Year']
    let state = currentRow.obj['State']
    let sz = currentRow.obj['Radius_size']
    info_dict[year][state] = sz
    max_amt_dict[year] = max(max_amt_dict[year], sz)
  }
  // process bias info
  for (let j = 0; j < state_names.length; j++) {
    bias_dict[state_names[j]] = []
  }
  for (let r = 0; r < bias.getRowCount(); r++) {
    let currentRow = bias.getRow(r);
    // print(currentRow);
    let year = currentRow.obj['Year']
    let state = currentRow.obj['State']
    let b = currentRow.obj['Bias1']
    let p = currentRow.obj['Percent1']
    bias_dict[state].push([b, p])
  }
  // 
}

// setup
function setup() {
  createCanvas(windowWidth, windowHeight * 1.8);
  // slider
  slider = createSlider(1991, 2020, 1991);
  slider.position(windowWidth / 10, windowHeight / 9); // x and y
  slider.size(windowWidth / 5, 20); // width and height
  // csv
  noStroke()
  processCSV()
  // initialize color
  let from = color(235, 226, 226);
  let to = color(124, 19, 19);

  // iterate through years
  for (let y = 1991; y <= 2020; y++) {
    let circles = new Array(state_names.length);
    arr = []
    i = windowWidth / 12;
    j = windowHeight / 3;
    maxD = windowHeight / 7;
    states = 0
    while (states < state_names.length) {
      var diam = info_dict[y][state_names[states]] * 0.3;
      let d = min(diam, windowHeight / 3)
      var x = i + d / 2;
      maxD = max(d, maxD)
      arr.push(info_dict[y][state_names[states]])
      var c = lerpColor(from, to, ((info_dict[y][state_names[states]]) / (max_amt_dict[y])));


      // adjust diameter
      circles[states] = new DrawCircle(x, j, d, c, abbrev[states]);
      states += 1;
      // adjust i and j
      i = i + d;
      if (i > 5 * windowWidth / 11) {
        // move to next row
        j += maxD
        i = windowWidth / 10;
      }
    }
    // add to dictionary
    display_dict[y] = circles
    total_count[y] = arr
  }



}

function draw() {
  background(color('#f7f3f0'));
  let val = slider.value();
  push();
  fill(color(124, 19, 19));
  textSize(20);
  textFont(rubik)
  text("YEAR: " + val, windowWidth / 9, windowHeight / 11);
  pop();
  // title
  push();
  textAlign(LEFT);
  fill(color(124, 19, 19));
  textSize(30);
  textFont(rubik)
  text('HATE CRIME IN AMERICA', 6 * windowWidth / 9, windowHeight / 11);
  pop();
  //
  push();
  textAlign(LEFT);
  fill('black');
  textSize(14);
  textFont(mont)
  text('Why is it important to look at hate crime data?', 6 * windowWidth / 9, windowHeight / 11 + 30);
  pop();
  //
  push();
  textAlign(LEFT);
  fill('black');
  textSize(14);
  textFont(mont)
  text('What are the trends in your own home state, over time?', 6 * windowWidth / 9, windowHeight / 11 + 45);
  pop();
  //
  array = display_dict[val]
  for (var i = 0; i < array.length; i++) {
    array[i].display();

  }

  push();
  stroke('black');

  rect(8 * windowWidth / 12, windowHeight / 4, windowWidth / 4, 3 * windowHeight / 4);

  fill(255, 150, 200);
  textSize(13);
  fill('black');
  textFont(mont);
  H = windowHeight / 4
  W = 8 * windowWidth / 12
  text("Recorded Incidents", W, H - 10)
  offset = 0
  for (let s = 0; s < state_names.length; s++) {
    if ((H + 20 * (offset + 1)) >= windowHeight) {
      W = 11 * windowWidth / 14
      H = windowHeight / 4
      offset = 0
    }

    text(state_names[s] + ": " + str(total_count[val][s]), W + 10, H + 20 * (offset + 1))
    offset += 1

  }

  pop();

}


////
class DrawCircle {
  constructor(x, y, d, c, state) {
    this.xPos = x;
    this.yPos = y;
    this.diameter = d;
    this.color = c;
    this.label = state

  }
  display() {
    stroke(color(124, 19, 19));
    fill(this.color);


    ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
    if (this.diameter > 60) {
      push();
      stroke('black');
      fill('black');
      textAlign(CENTER, CENTER);
      textSize(14);
      textFont(mont)
      text(this.label, this.xPos, this.yPos);
      pop();
    }

  }

}
