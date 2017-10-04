import * as d3 from 'd3';
const Bar = (nodeData) => {

  // var vis = d3.select('#bar-graph'),
  //   WIDTH = 1000,
  //   HEIGHT = 500,
  //   MARGINS = {
  //     top: 20,
  //     right: 20,
  //     bottom: 20,
  //     left: 50
  //   },
  //   xRange = d3.scaleOrdinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(nodeData.map(function (d) {
  //     return d.x;
  //   })),
  //
  //
  //   yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
  //     d3.max(nodeData, function (d) {
  //       return d.y;
  //     })
  //   ]),
  //
  //   xAxis = d3.svg.axis()
  //     .scale(xRange)
  //     .tickSize(5)
  //     .tickSubdivide(true),
  //
  //   yAxis = d3.svg.axis()
  //     .scale(yRange)
  //     .tickSize(5)
  //     .orient("left")
  //     .tickSubdivide(true);
  //
  //
  // vis.append('svg:g')
  //   .attr('class', 'x axis')
  //   .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
  //   .call(xAxis);
  //
  // vis.append('svg:g')
  //   .attr('class', 'y axis')
  //   .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  //   .call(yAxis);
  //
  // vis.selectAll('rect')
  //   .data(nodeData)
  //   .enter()
  //   .append('rect')
  //   .attr('x', function (d) {
  //     return xRange(d.x);
  //   })
  //   .attr('y', function (d) {
  //     return yRange(d.y);
  //   })
  //   .attr('width', xRange.rangeBand())
  //   .attr('height', function (d) {
  //     return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
  //   })
  //   .attr('fill', 'grey');
}
export default Bar;
