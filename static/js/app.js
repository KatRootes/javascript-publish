// from data.js
var tableData = data;

// create a list of all filters
var filters = ["#datetime","#city","#state","#country","#shape","#comments"];

// Grab a reference to the table body
var tbody = d3.select("tbody");

// Create function to load table data
function loadTable(newData)
{
    // Clear all rows
    tbody.html("");

    // Enter new data
    newData.forEach(function(line)
    {
        // Create a row
        let row = tbody.append("tr");
        Object.entries(line).forEach(function([key,value])
        {
            // Create a data cell and input the value
            var cell = row.append("td");
            cell.text(value);
        })
    })
}

// Load table data initially
loadTable(tableData);

// Create event handler for Enter Key
function handleEnter(event)
{
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') 
    {
        filterTable();
    }
}

// Clear filters and restore all table data
d3.select("#clear-btn").on("click", function()
{
    // Clear all filters
    filters.forEach(filter => d3.select(filter).property("value",""));

    // Reset the table
    loadTable(tableData);
});

function filterTable() 
{
    // Set a flag to determine if any filters were entered
    let filtered = false;

    // Start with the full data set
    let filteredData = tableData;
    
    // Loop through filters and apply as necessary
    filters.forEach(function (filter) 
    {
        let val = d3.select(filter).property("value");
        if (val != "") 
        {
            filtered = true;
            switch (filter) 
            {
                case "#datetime": filteredData = filteredData.filter(item => item.datetime === val);          break;
                case "#city":     filteredData = filteredData.filter(item => item.city === val);              break;
                case "#state":    filteredData = filteredData.filter(item => item.state === val);             break;
                case "#country":  filteredData = filteredData.filter(item => item.country === val);           break;
                case "#shape":    filteredData = filteredData.filter(item => item.shape === val);             break;
                case "#comments": filteredData = filteredData.filter(item => item.comments.includes(val, 0)); break;
                default: break;
            }
        }
    });

    // If data was found, update the display otherwise display original data set
    loadTable(filteredData);
    
    // Display an alert if no filters were entered.
    if (!filtered)
        alert("No filters were entered.");
}
