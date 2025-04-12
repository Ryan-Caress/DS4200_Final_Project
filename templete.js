
// Prepare you data and load the data again. 

const trueShootingByAge = d3.csv("average_true_shooting_by_age_2017_v2.csv");

trueShootingByAge.then(function(data) {
    // Convert string values to numbers using a forEach function:
    data.forEach(function(d) {
        d['TS%'] = +d['TS%']; // Convert 'TS%' to a number
        d['Age'] = +d['Age']; // Convert 'Age' to a number
        d['3P%'] = +d['3P%']; // Convert '3P%' to a number
        d['2P%'] = +d['2P%']; // Convert '2P%' to a number
        d['FT%'] = +d['FT%']; // Convert 'FT%' to a number

    });

    // Define the dimensions and margins for the SVG as done above:
    let width = 800, height = 600;
    let margin = { top: 50, bottom: 50, left: 50, right: 50 }

    // Create the SVG container:
    let svg = d3.select('#lineplot')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background', '#F5F5F5')

    // Add scales
    let yscale = d3.scaleLinear()
                   .domain([0, 1])
                   .range([height - margin.bottom, margin.top])

    let xscale = d3.scaleLinear()
                   .domain(d3.extent(data, d => d['Age']))
                   .range([margin.left, width - margin.right]);

    // Add x-axis
    let xaxis = svg.append('g')
                   .call(d3.axisBottom().scale(xscale))
                   .attr('transform', `translate(0, ${height - margin.bottom})`)

    // Add x-axis Text label
    svg.append('text')
        .attr('x', width / 2)  // Position horizontally in the middle of the SVG
        .attr('y', height - margin.bottom + 40)  // Position just below the X-axis
        .style('text-anchor', 'middle')  // Center the text horizontally
        .text('Ages');  // X-axis label text

    // Add y-axis to the SVG
    let yaxis = svg.append('g')
                    .call(d3.axisLeft().scale(yscale))
                    .attr('transform', `translate(${margin.left} , 0)`)

    // Add x-axis label
    svg.append('text')
        .attr('x', -height / 2)  // Position it vertically in the middle of the SVG
        .attr('y', margin.left - 34)  // Position it to the left of the Y-Axis
        .attr('transform', 'rotate(-90)')  // Rotate the label
        .style('text-anchor', 'middle')  // Center the text
        .text('Average True Shooting %');  // Y-axis label text

    // Draw the line and path. Remember to use curveNatural. 
    let line = d3.line()
                 .x(d => xscale(d['Age']))  // Use the middle of each band
                 .y(d => yscale(d['TS%']))
                 .curve(d3.curveNatural);  // Smooth curve
    
    let line_2 = d3.line()
                 .x(d => xscale(d['Age']))  // Use the middle of each band
                 .y(d => yscale(d['3P%']))
                 .curve(d3.curveNatural);  // Smooth curve

    let line_3 = d3.line()
                 .x(d => xscale(d['Age']))  // Use the middle of each band
                 .y(d => yscale(d['2P%']))
                 .curve(d3.curveNatural);  // Smooth curve

    let line_4 = d3.line()
                 .x(d => xscale(d['Age']))  // Use the middle of each band
                 .y(d => yscale(d['FT%']))
                 .curve(d3.curveNatural);  // Smooth curve

    // Draw the line path
    svg.append('path')
       .data([data])  // Pass data to the path
       .attr('d', line)  // Define the path using the line function
       .attr('fill', 'none')  // No fill, just the line
       .attr('stroke', 'steelblue')  // Line color
       .attr('stroke-width', 2);  // Line width

        // Draw the line path
    svg.append('path')
        .data([data])  // Pass data to the path
        .attr('d', line_2)  // Define the path using the line function
        .attr('fill', 'none')  // No fill, just the line
        .attr('stroke', 'Teal')  // Line color
        .attr('stroke-width', 2);  // Line width

    // Draw the line path
    svg.append('path')
       .data([data])  // Pass data to the path
       .attr('d', line_3)  // Define the path using the line function
       .attr('fill', 'none')  // No fill, just the line
       .attr('stroke', '#FF4136')  // Line color
       .attr('stroke-width', 2);  // Line width

    // Draw the line path
    svg.append('path')
       .data([data])  // Pass data to the path
       .attr('d', line_4)  // Define the path using the line function
       .attr('fill', 'none')  // No fill, just the line
       .attr('stroke', '#B10DC9')  // Line color
       .attr('stroke-width', 2);  // Line width

       const legendData = [
        { label: 'FT%', color: '#B10DC9' },
        { label: 'True Shooting %', color: 'steelblue' },
        { label: '2P%', color: '#FF4136' },
        { label: '3P%', color: 'teal' },  
    ];
    
    // Starting vertical position for the first legend item
    const legendTop = 20;
    
    const legend = svg.selectAll('.legend')
        .data(legendData)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(0, ${legendTop + i * 25})`);  // Increased space for better alignment
    
    // Colored rectangles
    legend.append('rect')
        .attr('x', width - margin.right - 90)  // Horizontal position for the legend box
        .attr('y', 0)  // Vertically aligned with the text
        .attr('width', 20)
        .attr('height', 10)
        .attr('fill', d => d.color);
    
    // Text labels
    legend.append('text')
        .attr('x', width - margin.right - 60)  // Position text after the box
        .attr('y', 5)  // Vertically center the text with the box
        .style('font-size', '12px')
        .style('alignment-baseline', 'middle')  // Center the text vertically
        .text(d => d.label);
    

});
