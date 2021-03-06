let w = 3,
  h = 1,
  svg;
let delaycounter = 1;
let index=0;
let Data = [];
let rawdata=[];
let size = document.getElementById("size").value;
let time=2000/size;
let inputs="";
let c=0;

for (let i = 0; i < size; ++i)
  Data[i] = Math.floor(Math.random() * (size-1)) + 1;

let backup=Data;
let hl=[0,1];
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
    return i * 23;
  })
  .attr("y",h)
  .attr("width", 20)
  // .attr("stroke", "black")
  // .attr('stroke-width',5)
  .attr("height", function(d, i) {
    return d * 10;
  })
  .style("fill", d3.color("steelblue"));

let txt = svg.selectAll("text")
  .data(Data)
  .enter().append("text")
  .text(function (d) { return d; })
  .attr("class", "text")
  .attr("x", function (d, i) { return (i * 23) })
  .attr("y", function (d, i) { return d * 10 });



function sizechange(val) {
  Data.length=0;
  rects = svg
    .selectAll("rect")
    .data(Data).exit()
    .remove();


  txt = svg
    .selectAll("text")
    .data(Data)
    .exit()
    .remove();

  size = val;
  for (let i = 0; i < size; ++i)
    Data[i] = Math.floor(Math.random() * (size - 1)) + 1;
  backup = Data;

  rects = svg
    .selectAll("rect")
    .data(Data)
    .enter()
    .append("rect");


  rects
    .attr("x", function (d, i) {
      return i * 23;
    })
    .attr("y", h)
    .attr("width", 20)
    // .attr("stroke", "black")
    // .attr('stroke-width',5)
    .attr("height", function (d, i) {
      return d * 10;
    })
    .style("fill", d3.color("steelblue"));


  txt = svg.selectAll("text")
    .data(Data)
    .enter().append("text")
    .attr("x", function (d, i) { return (i * 23) })
    .attr("class", "text")
    .attr("y", function (d, i) { return d * 10 })
    .text(function (d) { return d; });



    
}
  function start(){
for (let i = 0; i < Data.length - 1; ++i) {
  for (let j = 0; j < Data.length - 1; ++j) {
    if (Data[j] > Data[j + 1]) {
      let temp = Data[j];
      Data[j] = Data[j + 1];
      Data[j + 1] = temp;
      hl=[j,j+1];
      Timeline[Timeline.length] = JSON.parse(JSON.stringify(Data));
      hltl[hltl.length] = JSON.parse(JSON.stringify(hl));
      redraw(Data,hl);
    }  
  }
}
hl=[Data.length,Data.length];
Timeline[Timeline.length] = JSON.parse(JSON.stringify(Data));
hltl[hltl.length] = JSON.parse(JSON.stringify(hl));
redraw(Data, hl);
Timeline[0] = backup;



    document.getElementById("time").step = 1000 / Timeline.length;


}

function redraw(Data,hl) {
 svg
    .selectAll("rect")
    .data(Data)
    .transition()
    .duration(time)
    .delay(delaycounter * time)
    .attr("x", function(d, i) {
      return i * 23 ;
    })
    .attr("y", h)
    .attr("width", 20)
   // .attr("stroke-width", 5)
 .attr("height", function(d, i) {
      return d * 10;
    })
   .style("fill", function (d, i) {
      if (hl[0] == i || hl[1] == i) return d3.color("red") ;
     return d3.color("steelblue");
    } );
  svg.selectAll("text")
    .data(Data)
    .transition()
    .duration(time)
    .delay(delaycounter * time)
    .attr("x", function (d, i) { return (i * 23) })
    .attr("class", "text")
    .attr("y", function (d) { return d * 10 })//13
    .text(function (d) { return d; });


  ++delaycounter;
}

function timeChange(val) {
     index = (val / 1000) * Timeline.length;
    
  redrawWithoutDelay();
}


function redrawWithoutDelay() {
  
  d3.selectAll("rect").data(Timeline[Math.floor(index)]);
 d3.selectAll('rect')
  .attr('height',function(d){
      return  d*10;
  })
   .style("fill", function (d, i) {
     console.log(hltl[index]);
     if (hltl[Math.floor(index)][0] == i || hltl[Math.floor(index)][1] == i) return d3.color("red");
     return d3.color("steelblue");
   });;
  svg.selectAll("text")
    .data(Timeline[Math.floor(index)])
    .text(function (d) { return d; })
    .attr("class", "text")
    .attr("x", function (d, i) { return (i * 23) })
    .attr("y", function (d, i) { return d * 10 });

}

function next() {
  document.getElementById("time-range").value = parseInt(document.getElementById("time-range").value) + (1000 / Timeline.length);
  index = ((document.getElementById("time-range").value / 1000) * Timeline.length);

  redrawWithoutDelay();
}
function prev() {

  document.getElementById("time-range").value = parseInt(document.getElementById("time-range").value) - (1000 / Timeline.length);
  index = ((document.getElementById("time-range").value / 1000) * Timeline.length);

  redrawWithoutDelay();
}

function popup() {
  Data.length = 0;
  rects = svg
    .selectAll("rect")
    .data(Data).exit()
    .remove();


  txt = svg
    .selectAll("text")
    .data(Data)
    .exit()
    .remove();

  inputs = prompt("Please enter values seprated by space");
  rawdata=inputs.split(" ");
  c=0;
  for(let p=0;p<rawdata.length;++p){
    if (parseInt(rawdata[p]) <= 40 && parseInt(rawdata[p]) >-1){
      Data[c] = parseInt(rawdata[p]);
      c=c+1;
    }
  }
  Data.splice(c,Data.length);
  size = c;
  rects = svg
    .selectAll("rect")
    .data(Data)
    .enter()
    .append("rect");


  rects
    .attr("x", function (d, i) {
      return i * 23;
    })
    .attr("y", h)
    .attr("width", 20)
    // .attr("stroke", "black")
    // .attr('stroke-width',5)
    .attr("height", function (d, i) {
      return d * 10;
    })
    .style("fill", d3.color("steelblue"));


  txt = svg.selectAll("text")
    .data(Data)
    .enter().append("text")
    .attr("x", function (d, i) { return (i * 23) })
    .attr("class", "text")
    .attr("y", function (d, i) { return d * 10 })
    .text(function (d) { return d; });



}
