var xhr = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
xhr.onload = success; // call success function if request is successful
xhr.onerror = error;  // call error function if request failed
xhr.open('GET','https://data.nepalcorona.info/api/v1/covid/timeline'); // open a GET request
xhr.send(); // send the request to the server.

// function to handle error
function error(err) {
    console.log('Request Failed', err); //error details will be in the "err" object
}

// function to handle success
function success() {
    var data = JSON.parse(this.responseText); //parse the string to JSON
    var sabai_dates= new Array();
    var harek_date_ko_infected = new Array();
    var i=0;
    data.forEach(()=>{  
        //Value display gareko tyo textarea ma
        sabai_dates[i]=data[i].date;
        harek_date_ko_infected[i]=data[i].totalCases;
        i++;
    });
    make_chart_bar_2(sabai_dates,harek_date_ko_infected);
// }

// function make_chart_bar_2(a,b){
    var svg = d3.select("#chart_bar_2"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin
    
        svg.append("text")
           .attr("transform", "translate(100,0)")
           .attr("x", 50)
           .attr("y", 50)
           .attr("font-size", "24px")
           .text("Bar chart")
    
        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);
    
        var g = svg.append("g")
                   .attr("transform", "translate(" + 100 + "," + 100 + ")");
    
        // d3.json("data/xyz.json", function(error, data) {
        //     if (error) {
        //         throw error;
        //     }
    function make_chart_bar_2(a,b){
            xScale.domain(data.map(a));
            yScale.domain([0, d3.max(b)]);
    
            g.append("g")
             .attr("transform", "translate(0," + height + ")")
             .call(d3.axisBottom(xScale))
             .append("text")
             .attr("y", height - 170)
             .attr("x", width - 20)
             .attr("text-anchor", "end")
             .attr("stroke", "black")
             .text("Time in month");
    
            g.append("g")
             .call(d3.axisLeft(yScale).tickFormat(function(d){
                 return "$" + d;
             })
             .ticks(10))
             .append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", "-5.1em")
             .attr("text-anchor", "end")
             .attr("stroke", "black")
             .text("No of cases");
    
            g.selectAll(".bar")
             .data(data)
             .enter().append("rect")
             .attr("class", "bar")
             .attr("x", a)
             .attr("y", b)
             .attr("width", xScale.bandwidth())
             .attr("height", function() { return height - yScale(b); });
        // });
            
    }
}