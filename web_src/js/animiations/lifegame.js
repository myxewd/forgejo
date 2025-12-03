const matrix = [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0,
      0, 1, 1, 0,
    ],
    [
      0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0,
    ],
    [
      1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1,
      1, 0, 0, 1,
    ],
    [
      1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0,
      0, 0, 0, 0,
    ],
    [
      1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0,
    ],
    [
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 1,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 1,
    ],
    [
      1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0,
    ],
    [
      1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0,
      0, 0, 0, 0,
    ],
    [
      1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1,
      1, 0, 0, 1,
    ],
    [
      0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0,
      0, 1, 1, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0,
    ],
  ],
  canvas = document.getElementById("indexDesktopCanvas"),
  ctx = canvas.getContext("2d");
let width = window.innerWidth,
  height = window.innerHeight,
  isRunning = !1,
  intervalId = null,
  scale = 1,
  generation = 0;
const ZOOM_SPEED = 0.1,
  MOVE_SPEED = 6,
  ZOOM_FINESSE = 200,
  cellSizeX = Math.min(24, Math.floor(width / matrix[0].length - 4)),
  cellSizeY = Math.min(24, Math.floor(height / matrix.length - 8)),
  deltas = generateBezierSteps(ZOOM_FINESSE / 2, 0.6);
const cellSize = Math.min(cellSizeX, cellSizeY);
for (let a = deltas.length - 1; a >= 0; a--) deltas.push(-deltas[a]);
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});
function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#1d2934";
  ctx.lineWidth = 0.5;
  const a = cellSize * scale,
    f = Math.floor(-offset.x / a),
    c = Math.floor(-offset.y / a),
    b = f + Math.ceil(width / a) + 1,
    d = c + Math.ceil(height / a) + 1;
  for (var e = f; e <= b; e++)
    ctx.beginPath(),
      ctx.moveTo(e * a + offset.x, 0),
      ctx.lineTo(e * a + offset.x, height),
      ctx.stroke();
  for (e = c; e <= d; e++)
    ctx.beginPath(),
      ctx.moveTo(0, e * a + offset.y),
      ctx.lineTo(width, e * a + offset.y),
      ctx.stroke();
  for (let [g] of cells) {
    const [h, k] = g.split(",").map(Number);
    h >= f &&
      h <= b &&
      k >= c &&
      k <= d &&
      ((ctx.fillStyle = "#4CAF50"),
      ctx.fillRect(h * a + offset.x, k * a + offset.y, a - 1, a - 1));
  }
}
let cells = new Map(),
  offset = { x: 0, y: 0 },
  isZooming = !1,
  lastPos = { x: 0, y: 0 };
function getCellKey(a, f) {
  return `${a},${f}`;
}
function getNeighbors(a, f) {
  let c = 0;
  for (let b = -1; b <= 1; b++)
    for (let d = -1; d <= 1; d++)
      (b !== 0 || d !== 0) && cells.has(getCellKey(a + b, f + d)) && c++;
  return c;
}
function update() {
  const a = new Map();
  var f = new Set();
  for (var [c] of cells) {
    const [b, d] = c.split(",").map(Number);
    for (let e = -1; e <= 1; e++)
      for (let g = -1; g <= 1; g++) f.add(getCellKey(b + e, d + g));
  }
  for (let b of f) {
    const [d, e] = b.split(",").map(Number);
    f = getNeighbors(d, e);
    c = cells.has(b);
    !c || (f !== 2 && f !== 3) ? c || f !== 3 || a.set(b, !0) : a.set(b, !0);
  }
  cells = a;
  generation++;
  autoZoom();
  draw();
}
function generateBezierSteps(a, f) {
  const c = [];
  for (var b = 0; b < a; b++) {
    var d = b / (a - 1);
    c.push(3 * d * d - 2 * d * d * d);
  }
  b = [];
  for (d = 0; d < a; d++) d === 0 ? b.push(c[0]) : b.push(c[d] - c[d - 1]);
  const e = b.reduce((g, h) => g + h, 0);
  return b.map((g) => (g / e) * f);
}
function autoZoom() {
  if (!isZooming) {
    var a = cellSize * scale;
    if (
      Math.ceil(generation / MOVE_SPEED) -
        Math.floor(offset.x / a) -
        width / 2 / a >
      0
    ) {
      isZooming = !0;
      let f = 1,
        c = 0,
        b = 0;
      function d(e) {
        if (e - b < 10) requestAnimationFrame(d);
        else if (((b = e), c >= ZOOM_FINESSE)) isZooming = !1;
        else {
          f -= deltas[c];
          e = f - scale;
          var g = height / 2 - offset.y;
          offset.x -=
            ((width * (deltas[c] > 0 ? 0.8 : 0.2) - offset.x) * e) / scale;
          offset.y -= (g * e) / scale;
          scale = f;
          draw();
          c++;
          requestAnimationFrame(d);
        }
      }
      requestAnimationFrame(d);
    }
  }
}
canvas.width = width;
canvas.height = height;
const initX = Math.ceil(
    width / (cellSize * scale) / 2 - matrix[0].length / 2 - 1
  ),
  initY = Math.ceil(height / (cellSize * scale) / 2 - matrix.length / 2);
setInitialStructure(initX, initY);
function setInitialStructure(a, f) {
  for (let c = 0; c < matrix.length; c++)
    for (let b = 0; b < matrix[c].length; b++)
      matrix[c][b] == 1 && cells.set(getCellKey(a + b, f + c), !0);
  draw();
}
isRunning = !0;
intervalId = setInterval(update, 100);
