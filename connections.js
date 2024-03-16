//it should connect parents and children(main-branch,branch-leaf) with lines (svg)
document.addEventListener("DOMContentLoaded", drawAllLines);
window.addEventListener("resize", drawAllLines);

function drawLineBetween(parent, child, delta = 0, color = "grey") {
  setSVGHeight();
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  const scrollY = window.scrollY || window.pageYOffset;
  // const shift = Math.pow(-1, delta) * delta;
  const shift = 0;
  const parentXstart = parentRect.left + parentRect.width / 2 + shift;
  const parentYstart = parentRect.bottom + scrollY;
  const childXmid = childRect.left + childRect.width / 2;

  const verticalStartLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  verticalStartLine.setAttribute("x1", parentXstart);
  verticalStartLine.setAttribute("y1", parentYstart);
  verticalStartLine.setAttribute("x2", parentXstart);
  verticalStartLine.setAttribute("y2", 20 + parentYstart);
  verticalStartLine.setAttribute("stroke", color);

  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  horizontalLine.setAttribute("x1", parentXstart);
  horizontalLine.setAttribute("y1", 20 + parentYstart + shift);
  horizontalLine.setAttribute("x2", childXmid);
  horizontalLine.setAttribute("y2", 20 + parentYstart + shift);
  horizontalLine.setAttribute("stroke", color);

  const verticalEndLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  verticalEndLine.setAttribute("x1", childXmid);
  verticalEndLine.setAttribute("y1", 20 + parentYstart + shift);
  verticalEndLine.setAttribute("x2", childXmid);
  verticalEndLine.setAttribute("y2", childRect.top + scrollY);
  verticalEndLine.setAttribute("stroke", color);

  // Append SVG lines to SVG container
  const svgContainer = document.getElementById("svg-container");
  svgContainer.appendChild(verticalStartLine);
  svgContainer.appendChild(horizontalLine);
  svgContainer.appendChild(verticalEndLine);
}

function drawAllLines() {
  //clean all lines
  const svgContainer = document.getElementById("svg-container");
  svgContainer.innerHTML = "";

  //the following 2 need to change to recursion for any depth
  //need to rethink HTML structure to be more universal, not just main,branch,leaf
  //or nest branches infinitely if needed
  const allMain = document.querySelectorAll(".main");
  allMain.forEach((par) => {
    let parTitle = par.querySelector(".main-title");
    let children = par.querySelectorAll(".branch-title");
    children.forEach((child, ind) => {
      drawLineBetween(parTitle, child, ind, "green");
    });
  });

  const allBranches = document.querySelectorAll(".branch");
  allBranches.forEach((par) => {
    let parTitle = par.querySelector(".branch-title");
    let children = par.querySelectorAll(".leaf-title");
    children.forEach((child, ind) => {
      drawLineBetween(parTitle, child, ind, "blue");
    });
  });
}
// Function to set SVG height dynamically
//otherwise no lines drawn under scroll area
function setSVGHeight() {
  const svgContainer = document.getElementById("svg-container");
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  svgContainer.setAttribute("height", documentHeight);
}
