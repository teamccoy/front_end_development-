// Assign the data from `data.js` to a variable
var tableData = data;
// console.log(tableData)

// Select the submit button
var submit = d3.select("#filter-btn");
// console.log(submit)

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // console.log(inputValue);
  // console.log(tableData);

  var filteredData = tableData.filter(date => date.datetime === inputValue);


  // console.log(filteredData);

// select the table body to input the data
 var tbody = d3.select("tbody");
// clear out table from prevous filter
 var table = tbody.html("");

// loop through data and append the data to the table body
 filteredData.forEach((info) => {
    	var row = table.append("tr");
   		Object.values(info).forEach((item) => {
      var cell = row.append("td");
        cell.text(item);
        });
});
});