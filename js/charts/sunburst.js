import * as d3 from 'd3';
const Sunburst = function(nodeData) {

  const width = 500,
      height = 500,
      radius = (Math.min(width, height) / 2) - 10;

  const formatNumber = d3.format(",d");

  const x = d3.scaleLinear()
      .range([0, 2 * Math.PI]);

  const y = d3.scaleSqrt()
      .range([0, radius]);

  const color = d3.scaleOrdinal(d3.schemeCategory20);

  const partition = d3.partition();

  const arc = d3.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

  const svg = d3.select("#sunburst").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  const root = d3.hierarchy(nodeData);
  root.sum(function(d) { return d.size; });

  svg.selectAll("path")
      .data(partition(root).descendants())
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
      .on("click", click)
      .on("mouseover", mouseover)
      .on("")
    .append("title")
      .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });


  function click(d) {
    svg.transition()
        .duration(750)
        .tween("scale", function() {
          const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
              yd = d3.interpolate(y.domain(), [d.y0, 1]),
              yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
          return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
        })
      .selectAll("path")
        .attrTween("d", function(d) { return function() { return arc(d); }; });
  }

  function mouseover(d) {

    d3.select('#breadcrumbs')
      .text("");

    d3.select('#breadcrumbs')
      .style('visibility', '');


    // getAncestors Array sequence
    let parents = getParents(d);

    // drop opacity of all paths
    d3.selectAll('path')
      .attr('opacity', '0.3');

    d3.selectAll('path')
      .filter(function(node) {
        console.log(node);
        return (parents.indexOf(node) >= 0);
      })
      .style("opacity", "1");
    updateBreadcrumbs(parents);
  }

  function mouseleave(d) {
    d3.selectAll('path')
      .attr('opacity', '1');
  }



  function getParents(node) {
    const path = [];
    let current = node;

    while(current.parent) {
      path.unshift(current);
      current = current.parent;
    }

    return path;
  }

  // function initializeBreadcrumbs() {
  //   const trail = d3.select('#breadcrumbs').append('svg:svg')
  //                   .attr('width', width)
  //                   .attr('height', 60)
  //                   .attr('id', 'trail');
  // }

  function updateBreadcrumbs(nodeArray) {
    const selector = d3.select('#breadcrumbs');
    let text = "";
    for(let i in nodeArray) {
      text = nodeArray[i].data.size ? `$${nodeArray[i].data.size}` : `${nodeArray[i].data.name} `;
      selector.append('h1')
              .text(text);
    }
  }

  d3.select(self.frameElement).style("height", height + "px");
}

export default Sunburst;
