let height = window.innerHeight;
let width = window.innerWidth;
let col = Math.floor(width / 31);
let row = Math.floor(height / 31) - 5;
let grid = document.getElementById("grid");
let currow;
let startset = false;
let startAddress = null,
  destAddress = null;
let q = [];
let queued = [];
let parent = [];
let r,
  c,
  dr,
  dc,
  clcksearch,
  pathtrace,
  currentpathnode,
  pathqlength,
  currentpathq = 0;
let pathq = [];
function clearListeners() {
  let cell;
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      cell = document.getElementById(i + " " + j);
      cell.removeEventListener("click", addsourcedest);
    }
  }

  var temp = document.getElementsByTagName("td");
  for (let i = 0; i < s.length; ++i) {
    s[i].addEventListener("click", addobstacle);
  }

  document.getElementById("play").addEventListener("click", bfs);
}
function addobstacle(e) {
  let index = e.target.id;
  document.getElementById(index).classList.add("obstacle");
  let spac = index.indexOf(" ");
  let or = parseInt(index.slice(0, spac));
  let oc = parseInt(index.slice(spac + 1));
  table[or][oc] = 0;
}
function addsourcedest(e) {
  let address = e.target.id;
  if (startset) {
    destAddress = address;
    console.log("dest", address);

    document.getElementById(destAddress).classList.add("destination");
    document.getElementById(destAddress).innerHTML =
      '<i class="material-icons small left">room</i>';
    clearListeners();
  } else {
    startAddress = address;
    console.log("sorce", address);

    document.getElementById(startAddress).classList.add("source");
    document.getElementById(startAddress).innerHTML =
      '<i class="material-icons small left">brightness_high</i>';

    startset = true;
  }
}
for (let i = 0; i < row; ++i) {
  currow = grid.insertRow(0);
  currow.id = i;
  let cell;
  for (let j = 0; j < col; ++j) {
    cell = currow.insertCell(j);
    cell.id = i + " " + j;
  }
}
var s = document.getElementsByTagName("td");
for (let i = 0; i < s.length; ++i) {
  s[i].addEventListener("click", addsourcedest);
}

let temprow = [];
for (let i = 0; i < col; ++i) temprow.push(-1);
let table = [];
for (let i = 0; i < row; ++i) table.push(temprow.slice());
for (let i = 0; i < table.length; ++i) queued[i] = table[i].slice();
// console.log(table);

async function bfs() {
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col; ++j) {
      cell = document.getElementById(i + " " + j);
      cell.removeEventListener("click", addobstacle);
    }
  }
  let space = startAddress.indexOf(" ");
  r = parseInt(startAddress.slice(0, space));
  c = parseInt(startAddress.slice(space + 1));
  q[q.length] = [r, c];
  space = destAddress.indexOf(" ");
  dr = parseInt(destAddress.slice(0, space));
  dc = parseInt(destAddress.slice(space + 1));
  clcksearch = setInterval(whileloop, 35);
}

function whileloop() {
  if (!(q.length > 0 && !(q[0][0] == dr && q[0][1] == dc))) {
    currentpathnode = [dr, dc];
    pathquecreator();
    //  queued[dr][dc]=
    pathtrace = setInterval(path, 35);
    clearInterval(clcksearch);
  }
  let currentCell = q.shift();
  // console.log(currentCell);
  let cr = currentCell[0];
  let cc = currentCell[1];
  // console.log('wh');
  table[cr][cc] = true;
  document.getElementById(cr + " " + cc).classList.add("visited");

  //down
  // console.log((cr+1)>=0,(cr+1) <row,cc>=0,cc<col,table[cr+1][cc]==false);
  // console.log(table[cr+1][cc]==false,table);
  // console.log(cr,cc,q[0],q);
  if (
    cr + 1 >= 0 &&
    cr + 1 < row &&
    cc >= 0 &&
    cc < col &&
    table[cr + 1][cc] == -1
  ) {
    if (queued[cr + 1][cc] == -1) {
      q.push([cr + 1, cc]);
      queued[cr + 1][cc] = [cr, cc];
    }

    //  q[q.length]=[cr+1,cc];
    //  console.log('down',q);
  }
  //left
  // console.log(table[cr+1][cc]==false,table);

  if (
    cr >= 0 &&
    cr < row &&
    cc + 1 >= 0 &&
    cc + 1 < col &&
    table[cr][cc + 1] == -1
  ) {
    if (queued[cr][cc + 1] == -1) {
      q.push([cr, cc + 1]);
      queued[cr][cc + 1] = [cr, cc];
    }

    // q[q.length]=[cr,(cc+1)];
    // console.log('left',q);
  }
  //up
  if (
    cr - 1 >= 0 &&
    cr - 1 < row &&
    cc >= 0 &&
    cc < col &&
    table[cr - 1][cc] == -1
  ) {
    if (queued[cr - 1][cc] == -1) {
      q.push([cr - 1, cc]);
      queued[cr - 1][cc] = [cr, cc];
    }

    //q[q.length]=[(cr-1),cc];
    // console.log('up',q);
  }
  //right
  if (
    cr >= 0 &&
    cr < row &&
    cc - 1 >= 0 &&
    cc - 1 < col &&
    table[cr][cc - 1] == -1
  ) {
    if (queued[cr][cc - 1] == -1) {
      q.push([cr, cc - 1]);
      queued[cr][cc - 1] = [cr, cc];
    }
    // q[q.length]=[cr,(cc-1)];
    // console.log('right',q);
  }
}

function path() {
  if (currentpathq <= pathqlength - 1) {
    document
      .getElementById(pathq[currentpathq][0] + " " + pathq[currentpathq][1])
      .classList.add("path");
    currentpathq++;
  } else clearInterval(pathtrace);
}

function pathquecreator() {
  pathq.push(currentpathnode);

  while (!(currentpathnode[0] == r && currentpathnode[1] == c)) {
    let cpn0 = currentpathnode[0],
      cpn1 = currentpathnode[1];
    currentpathnode = queued[cpn0][cpn1];
    pathq.push(currentpathnode);
  }
  pathqlength = pathq.length;
  return;
}

//visited shortest-path easeout https://easings.net/en easeOutCubic//

//@keyframes triangletwo {
//   0% {
//     transform: scale(.6);
//     background-color: rgb(255, 254, 106);
//   }

//   50% {
//     transform: scale(1.2);
//     background-color: rgb(255, 254, 106);
//   }

//   100% {
//     transform: scale(1.0);
//     background-color: rgb(255, 254, 106);
//   }
// }
