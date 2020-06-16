let w = 3,
  h = 1,
  svg;
let delaycounter = 1;
let index = 0;
let Data = [];
let size = 20;
let time = 2000 / size;


for (let i = 0; i < size; ++i)
  Data[i] =10+ Math.floor(Math.random() * (size - 1)) + 1;
let Data1=[];
Data1 = JSON.parse(JSON.stringify(Data));

let backup = Data;
let hl = [0, 1];
let hl1= [0,1];



svg = d3
  .select("#graph1")
  .append("svg")
  .attr("overflow", "visible");
let rects = svg
  .selectAll("rect")
  .data(Data)
  .enter()
  .append("rect");
let rects1 = d3.select("#graph2")
	.append("svg")
  	.attr("overflow", "visible")
  	.selectAll("rect")
  	.data(Data1)
  	.enter()
  	.append("rect");

rects
  .attr("x", function (d, i) {
    return 100+(i * 23);
  })
  .attr("y", h)
  .attr("width", 20)
  .attr("height", function (d, i) {
    return d * 10;
  })
  .style("fill", d3.color("steelblue"));



rects1
	.attr("x", function (d, i) {
		return 500+(i * 23);
	})
	.attr("y", h)
	.attr("width", 20)
	.attr("height", function (d, i) {
		return d * 10;
	})
	.style("fill", d3.color("steelblue"));




function start() {
  for (let i = 0; i < Data.length - 1; ++i) {
    for (let j = 0; j < Data.length - 1; ++j) {
      if (Data[j] > Data[j + 1]) {
        let temp = Data[j];
        Data[j] = Data[j + 1];
        Data[j + 1] = temp;
        hl = [j, j + 1];
        redraw(Data, hl);
      }
    }
  }
  hl=[size,size];
  redraw(Data, hl);
}
function start1(){	for (let k = 0; k < Data1.length - 1; ++k) {
		for (let l = 0; l < Data1.length - 1; ++l) {
			if (Data1[l] > Data1[l + 1]) {
				let temp1 = Data1[l];
				Data1[l] = Data1[l + 1];
				Data1[l + 1] = temp1;
				hl1 = [l, l + 1];
				redraw1(Data1, hl1);
			}
		}
	}
	redraw1(Data1, hl1);



}

function redraw(Data, hl) {
  svg
    .selectAll("rect")
    .data(Data)
    .transition()
    .duration(time)
    .delay(delaycounter * time)
    .attr("x", function (d, i) {
      return 100+( i * 23);
    })
    .attr("y", h)
    .attr("width", 20)
    .attr("height", function (d, i) {
      return d * 10;
    })
    .style("fill", function (d, i) {
      if (hl[0] == i || hl[1] == i) return d3.color("red");
      return d3.color("steelblue");
    });

  ++delaycounter;
}
function redraw1(Data1, hl1) {
rects1
		.data(Data1)
		.transition()
		.duration(time)
		.delay(delaycounter * time)
		.attr("x", function (d, i) {
			return 500 + (i * 23);
		})
		.attr("y", h)
		.attr("width", 20)
		.attr("height", function (d, i) {
			return d * 10;
		})
		.style("fill", function (d, i) {
			if (hl1[0] == i || hl1[1] == i) return d3.color("red");
			return d3.color("steelblue");
		});

	++delaycounter;
}

