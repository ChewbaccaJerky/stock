import * as d3 from 'd3';
const Sunburst = function(nodeData) {

  const width = 500,
      height = 500,
      radius = (Math.min(width, height) / 2) - 10;

  const b = {
      w: 75,
      h: 30,
      s: 3,
      t: 10
  };

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

  // setup sunburst
  const svg = d3.select("#sunburst").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  d3.select('#sunburst')
     .on("mouseleave", mouseleave);

  const root = d3.hierarchy(nodeData);
  root.sum(function(d) { return d.size; });

  svg.selectAll("path")
      .data(partition(root).descendants())
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        if(d.parent === null) {
          return "#FFF";
        }
        else {
          return color((d.children ? d : d.parent).data.name);
        }
      })
      .on("click", click)
      .on("mouseover", mouseover)
    .append("title")
      .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

  // setup breadcrumbs
  // initializeBreadcrumbs();

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
    d3.selectAll('h1').remove();
    // getAncestors Array sequence
    let parents = getParents(d);
    updateBreadcrumbs(parents);
    // drop opacity of all paths
    d3.selectAll('path')
      .style('opacity', 0.3);

    svg.selectAll('path')
      .filter(function(node) {
        return (parents.indexOf(node) >= 0);
      })
      .style("opacity", 1);
  }

  function mouseleave(d) {
    // d3.select('#trail')
    // .attr('visibility', 'hidden');

    d3.selectAll('h1').remove();

    d3.selectAll('path')
      .style('opacity', 1);

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
  //   const trail = d3.select('.sunburst-container #breadcrumbs').append('svg:svg')
  //                   .attr('width', width)
  //                   .attr('height', 60)
  //                   .attr('id', 'trail');
  // }

  function breadcrumbPoints(d, i) {
    const points = [];
    const widthForThisLabel = b.w;

    points.push("0,0");
    points.push(widthForThisLabel + ",0");
    points.push(widthForThisLabel + b.t + "," + (b.h / 2));
    points.push(widthForThisLabel + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) {
      points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
  }

  function updateBreadcrumbs(nodeArray) {
    let selector = d3.select('#breadcrumbs');
    let text = "";
    for(let i in nodeArray) {
      text = nodeArray[i].data.size ? `${nodeArray[i].data.name} $${nodeArray[i].data.size}` : `${nodeArray[i].data.name}`;
      selector.append('h1')
              .text(text);
    }
    // const g = d3.select('#trail')
    //             .selectAll("g")
    //             .data(nodeArray, function(d){
    //               return d.data.name + d.depth;
    //             });
    //
    // const entering = g.enter().append("svg:g");
    //
    // entering.append("svg:polygon")
    //   .attr("points", breadcrumbPoints)
    //   .style("fill", function(d){
    //     return color(d.data.name);
    // });
    //
    // // add attributes
    // entering.append("svg:text")
    //   .attr("x", (b.w + b.t) / 2)
    //   .attr("y", b.h / 2)
    //   .attr("dy", "0.35em")
    //   .attr("text-anchor", "middle")
    //   .text(function(d) {
    //     return d.name;
    // });
    //
    // d3.select("#trail").style("visibility", "");
  }

  d3.select(self.frameElement).style("height", height + "px");
}

export default Sunburst;
