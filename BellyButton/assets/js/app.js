// @TODO: YOUR CODE HERE!
d3.csv("/data/data.csv", function(d){
	return {
		state : d.state,
		abbr : d.abbr,
		poverty: +d.poverty,
		age: +d.age,
		income: +d.income,
		healthcare: +d.healthcare,
		healthcareLow: +d.healthcareLow,
		healthcareHigh: +d.healthcareHigh,
		obesity: +d.obesity,
		obesityLow: +d.obesityLow,
		obesityHigh: +d.obesityHigh,
		smokes: +d.smokes,
		smokesLow: +d.smokesLow,
		smokesHigh: +d.smokesHigh

	};
}, function (d) {
	console.log(d[0])
	// body...
});


// var margin = {top: 20, right:20, bottom: 30, left:40},
// 	width = 960 - margin.left - margin.right,
// 	height = 500 - margin.top - margin.bottom;

// var x = d3.scaleLinear().range([0,width]);
// var y = d3.scaleLinear().range([height,0]);

// Steps

//   * Set up chart parameters: height, width, margins.

// var margin = {top: 20, right:20, bottom: 30, left:40},
// 	width = 960 - margin.left - margin.right,
// 	height = 500 - margin.top - margin.bottom;

// var x = d3.scaleLinear().range([0,width]);
// var y = d3.scaleLinear().range([height,0]);



//   * Create a SVG container.

//   * Read the CSV using `d3.csv()`.

//     * Parse the data. Cast all necessary data as numbers or datetime objects.

//     * Create scales.

//     * Create axes.

// update domains

//     * Append axes to SVG group and place appropriately using  translate and `transform`.

//     * Create line generator functions.

//     * Use line generator functions to create an SVG path.

// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("donuts.csv", function(error, donutData) {
  if (error) throw error;

  // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  // Create a function to parse date and time
  var parseTime = d3.timeParse("%d-%b");

  // Format the data
  donutData.forEach(function(data) {
    data.date = parseTime(data.date);
    data.morning = +data.morning;
    data.evening = +data.evening;
  });

  // Step 5: Create the scales for the chart
  // =================================
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(donutData, d => d.date))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 0]);

  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the morning data
  var morningMax = d3.max(donutData, d => d.morning);

  // find the max of the evening data
  var eveningMax = d3.max(donutData, d => d.evening);

  var yMax;
  if (morningMax > eveningMax) {
    yMax = morningMax;
  }
  else {
    yMax = eveningMax;
  }

  // var yMax = morningMax > eveningMax ? morningMax : eveningMax;

  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([0, yMax]);


  // Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for morning data
  var line1 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.morning));

  // Line generator for evening data
  var line2 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.evening));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(donutData))
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .data([donutData])
    .append("path")
    .attr("d", line2)
    .classed("line orange", true);

});
