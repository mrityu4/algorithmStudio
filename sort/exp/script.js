let w = 3,
  h = 1,
  svg;
let delaycounter = 1;
let time=1000;
let scale=3;
let index=0;
let Data = [ 3, 2, 1];
let hl=[0,1];//highlighter
let Timeline = [[]];
let hltl=[[]];
Timeline[0] = Data;
hltl[0]=hl;



svg = d3
  .select("#graph")
  .append("svg")
  .attr("overflow", "visible");
let rects = svg
  .selectAll("rect")
  .data(Data)
  .enter()
  .append("rect");


rects
  .attr("x", function(d, i) {
    return i * 25*scale;
  })
  .attr("y",h*scale)
  .attr("width", 20*scale)
  // .attr("stroke", "black")
  // .attr('stroke-width',5)
  .attr("height", function(d, i) {
    return d * 10*scale;
  })
  .style("fill", d3.color("steelblue"));


          // .attr("d", valueline(data));

      swap(0);
      let temp=Data[1];
      Data[1]=Data[0];
      Data[0]=temp;
rects.selectAll("rect").order();  
     swap(1);
      console.log()
     



function swap(i) {
  d3.select(rects.nodes()[i])
    .style("fill", d3.color("red"))
    .transition()
    .duration(1000)
    .delay(delaycounter * time)
    .attr("transform", "translate("+(scale*25)+")")
    .transition().duration(1)
    .style("fill", d3.color("steelblue"));
   


  d3.select(rects.nodes()[i+1])
    .style("fill", d3.color("red"))
    .transition()
    .duration(1000)
    .delay(delaycounter * time)
    .attr("transform", "translate(" + ((-1)*scale * 25) + ")")
    .transition().duration(1)
    .style("fill", d3.color("steelblue"));
   

  ++delaycounter;

}



