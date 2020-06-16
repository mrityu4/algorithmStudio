let w = 3,
  h = 1,
  svg;
let delaycounter = 1;
let index = 0;
let Data = [];
let size = document.getElementById("size").value;
let time = (1000 / size)*3;


for (let i = 0; i < size; ++i) {
  let k = Math.floor(Math.random() * (size - 1)) + 1;
  Data[i] = k;
}
let backup = Data;


console.log(backup);

let hl = [0, 1,1];//hl[2]=>1-red
let Timeline = [[]];
let hltl = [[]];
Timeline[0] = Data;
hltl[0] = hl;

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
let txt = svg.selectAll("text")
  .data(Data)
  .enter().append("text")
  .text(function (d) { return d; })
  .attr("class", "text")
  .attr("x", function (d, i) { return (i * 23) })
  .attr("y", function (d, i) { return d * 10 });


function sizechange(val) {
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

  size = val;
  time = (1000 / size)*3;
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

function merge(start, mid, end) {
  let start2 = mid + 1;

  if (Data[mid] <= Data[start2]) {
    return;
  }

  while (start <= mid && start2 <= end) {
       hl = [start, start2,1];
  Timeline[Timeline.length] = JSON.parse(JSON.stringify(Data));
  hltl[hltl.length] = JSON.parse(JSON.stringify(hl));

    redraw(Data,hl)
    if (Data[start] <= Data[start2]) {
      start++;
    }
    else {
      let value = Data[start2];
      let index = start2;
      while (index != start) {
        Data[index] = Data[index - 1];
        index--;
      }
      Data[start] = value;
      start++;
      mid++;
      start2++;
    }
    hl = [start-1, start2-1,0];
    Timeline[Timeline.length] = JSON.parse(JSON.stringify(Data));
    hltl[hltl.length] = JSON.parse(JSON.stringify(hl));

    redraw(Data,hl);
  }
  hl = [Data.length, Data.length,0];
  Timeline[Timeline.length] = JSON.parse(JSON.stringify(Data));
  hltl[hltl.length] = JSON.parse(JSON.stringify(hl));

  redraw(Data, hl);
}
function mergeSort(l, r) {
  if (l < r) {
    let m = Math.floor(l + (r - l) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);

    merge(l, m, r);
  }
}





function start() {
  mergeSort(0, Data.length - 1);
  console.log(Data);
  Timeline[0] = backup;
  document.getElementById("time").step = 1000 / Timeline.length;
}

function redraw(Data, hl) {
  svg
    .selectAll("rect")
    .data(Data)
    .transition()
    .duration(time)
    .delay(delaycounter * time)
    .attr("x", function (d, i) {
      return i * 23;
    })
    .attr("y", h)
    .attr("width", 20)
    // .attr("stroke-width", 5)
    .attr("height", function (d, i) {
      return d * 10;
    })
   .style("fill", function (d, i) {
      if (hl[0] == i || hl[1]==i) {if(hl[2]==1)  return d3.color("red") ;return d3.color("green");}

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
    .attr('height', function (d) {
      return d * 10;
    })
  .style("fill", function (d, i) {
    console.log()
    if (hltl[Math.floor(index)][0] == i || hltl[Math.floor(index)][1] == i) { if (hltl[Math.floor(index)][2] == 1) return d3.color("red"); return d3.color("green"); }

  return d3.color("steelblue");
} );

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
  rawdata = inputs.split(" ");
  c = 0;
  for (let p = 0; p < rawdata.length; ++p) {
    if (parseInt(rawdata[p]) <= 40 && parseInt(rawdata[p]) > -1) {
      Data[c] = parseInt(rawdata[p]);
      c = c + 1;
    }
  }
  Data.splice(c, Data.length);
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
