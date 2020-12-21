// d3 = require("d3@5")
data = d3.json("./CompareBar/data.json", function(data) {
    console.log(data);
    });
    
    
    margin = ({top: 10, right: 40, bottom: 20, left: 30});
    
    height = data.length * 25 + margin.top + margin.bottom;
    
    width = 10;
    
    
    xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(g => g.append("g").call(d3.axisBottom(x).ticks(width / 80, "s")))
    .call(g => g.selectAll(".domain").remove())
    
    
    yAxis = g => g
    .attr("transform", `translate(${x(0)},0)`)
    .call(d3.axisLeft(y).ticks(20).tickSizeOuter(0))
    .call(g => g.selectAll(".tick:last-of-type").remove())
    .call(g => g.selectAll(".tick:last-of-type text").clone()
        .attr("dy", "-1.1em").style("font-weight", "bold").text("Age"))
    
    x = d3.scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d.F, d.M))]).nice()
    .range([margin.left, width - margin.right])
    
    
    y = d3.scaleLinear()
    // .domain([0, data[data.length - 1].age[1]])
    .range([height - margin.bottom, margin.top])
    
    
    
    
    
      var svg = d3.select("svg")
      .style("font", "10px sans-serif");
    
      
    
    svg.append("g")
      .attr("fill", "#ddd")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", x(0))
      .attr("y", d => y(d.age[1]) + 1)
      .attr("width", d => x(Math.min(d.M, d.F)) - x(0))
      .attr("height", d => y(d.age[0]) - y(d.age[1]) - 1);
    
    svg.append("g")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("fill", d => d3.schemeSet1[d.M < d.F ? 0 : 1])
      .attr("x", d => x(Math.min(d.M, d.F)))
      .attr("y", d => y(d.age[1]) + 1)
      .attr("width", d => x(Math.max(d.M, d.F)) - x(Math.min(d.M, d.F)))
      .attr("height", d => y(d.age[0]) - y(d.age[1]) - 1);
    
    svg.append("g")
    .selectAll("text")
    .data(data)
    .enter().append("text")
      .attr("fill", d => d3.schemeSet1[d.M < d.F ? 0 : 1])
      .attr("x", d => x(Math.max(d.M, d.F)) + 4)
      .attr("y", d => y((d.age[0] + d.age[1]) / 2) + 0.5)
      .attr("dy", "0.35em")
      .text(d => Math.max(d.M, d.F).toLocaleString());
    
    svg.append("g")
      .attr("text-anchor", "end")
    .selectAll("text")
    .data(data)
    .enter().append("text")
      .attr("fill", d => d3.schemeSet1[d.M < d.F ? 1 : 0])
      .attr("x", d => x(Math.min(d.M, d.F)) - 4)
      .attr("y", d => y((d.age[0] + d.age[1]) / 2) + 0.5)
      .attr("dy", "0.35em")
      .text(d => Math.min(d.M, d.F).toLocaleString());
    
    svg.append("g")
      .call(xAxis);
    
    svg.append("g")
      .call(yAxis);
    
     return svg;
    