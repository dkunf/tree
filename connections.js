//it should connect parents and children(main-branch,branch-leaf) with lines (svg)
document.addEventListener("DOMContentLoaded", drawAllLines);
window.addEventListener("resize", drawAllLines);

function drawLineBetween(parent, child, color = "black") {
  setSVGHeight();
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  const scrollY = window.scrollY || window.pageYOffset;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", parentRect.left + parentRect.width / 2);
  line.setAttribute("y1", parentRect.bottom + scrollY);
  line.setAttribute("x2", parentRect.left + parentRect.width / 2);
  line.setAttribute("y2", 20 + parentRect.bottom + scrollY);
  line.setAttribute("stroke", color);

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", parentRect.left + parentRect.width / 2);
  line2.setAttribute("y1", 20 + parentRect.bottom + scrollY);
  line2.setAttribute("x2", childRect.left + childRect.width / 2);
  line2.setAttribute("y2", 20 + parentRect.bottom + scrollY);
  line2.setAttribute("stroke", color);

  const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line3.setAttribute("x1", childRect.left + childRect.width / 2);
  line3.setAttribute("y1", 20 + parentRect.bottom + scrollY);
  line3.setAttribute("x2", childRect.left + childRect.width / 2);
  line3.setAttribute("y2", childRect.top + scrollY);
  line3.setAttribute("stroke", color);

  // Append SVG lines to SVG container
  const svgContainer = document.getElementById("svg-container");
  svgContainer.appendChild(line);
  svgContainer.appendChild(line2);
  svgContainer.appendChild(line3);
}

function drawAllLines() {
  //clean all lines
  const svgContainer = document.getElementById("svg-container");
  svgContainer.innerHTML = "";

  //the following 2 need to change to recursion for any depth
  const allMain = document.querySelectorAll(".main");
  allMain.forEach((par) => {
    let parTitle = par.querySelector(".main-title");
    let children = par.querySelectorAll(".branch-title");
    children.forEach((child) => {
      drawLineBetween(parTitle, child, "green");
    });
  });

  const allBranches = document.querySelectorAll(".branch");
  allBranches.forEach((par) => {
    let parTitle = par.querySelector(".branch-title");
    let children = par.querySelectorAll(".leaf-title");
    children.forEach((child) => {
      drawLineBetween(parTitle, child, "blue");
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
