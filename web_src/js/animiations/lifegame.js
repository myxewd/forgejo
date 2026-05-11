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
const maxBlockSize = 12;
let width = window.innerWidth,
  height = window.innerHeight,
  isRunning = !1,
  intervalId = null,
  scale = 1,
  generation = 0;
let ZOOM_SPEED = 0.1,
  MOVE_SPEED = 6,
  ZOOM_X_RIGHT_FOCUS = 0.71,
  ZOOM_X_LEFT_FOCUS = 0.29,
  ZOOM_FINESSE = 200,
  ZOOM_TRIGGER_POS = 0,
  cellSizeX = Math.min(maxBlockSize, Math.floor(width / matrix[0].length - 4)),
  cellSizeY = Math.min(maxBlockSize, Math.floor(height / matrix.length - 8)),
  deltas = generateBezierSteps(ZOOM_FINESSE / 2, 0.6);
let cellSize = Math.min(cellSizeX, cellSizeY);
for (let a = deltas.length - 1; a >= 0; a--) deltas.push(-deltas[a]);
window.addEventListener("resize", () => {
  resetWorld();
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
  /*
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
*/
  for (let [g] of cells) {
    const [h, k] = g.split(",").map(Number);
    h >= f &&
      h <= b &&
      k >= c &&
      k <= d &&
      ((ctx.fillStyle = "#4CAF50"),
      ctx.fillRect(h * a + offset.x, k * a + offset.y, a - 1, a - 1));
  }
  drawGeneration();
}
function drawGeneration() {
  if (width < 200) {
    return;
  }
  const text = `Epoch: ${generation}`;

  // 5x7 bitmap font
  const FONT = {
    0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    2: ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    3: ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
    4: ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    5: ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
    6: ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
    7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    8: ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    9: ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    p: ["00000", "11110", "10001", "11110", "10000", "10000", "10000"],
    o: ["00000", "01110", "10001", "10001", "10001", "10001", "01110"],
    c: ["00000", "01110", "10001", "10000", "10000", "10001", "01110"],
    h: ["10000", "10000", "11110", "10001", "10001", "10001", "10001"],
    ":": ["00000", "00100", "00100", "00000", "00100", "00100", "00000"],
    " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  };

  const pixelSize = 3;
  const charWidth = 5;
  const charHeight = 7;
  const spacing = 2;

  const totalWidth = text.length * (charWidth * pixelSize + spacing);

  const startX = width - totalWidth - 20;
  const startY = height - charHeight * pixelSize - 20;

  ctx.fillStyle = "#16191C";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const bitmap = FONT[char];

    if (!bitmap) continue;

    for (let y = 0; y < bitmap.length; y++) {
      for (let x = 0; x < bitmap[y].length; x++) {
        if (bitmap[y][x] === "1") {
          ctx.fillRect(
            startX + i * (charWidth * pixelSize + spacing) + x * pixelSize,
            startY + y * pixelSize,
            pixelSize,
            pixelSize,
          );
        }
      }
    }
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
      -ZOOM_TRIGGER_POS
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
            ((width * (deltas[c] > 0 ? ZOOM_X_RIGHT_FOCUS : ZOOM_X_LEFT_FOCUS) -
              offset.x) *
              e) /
            scale;
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
function resetWorld() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  cellSizeX = Math.min(maxBlockSize, Math.floor(width / matrix[0].length - 4));
  cellSizeY = Math.min(maxBlockSize, Math.floor(height / matrix.length - 8));
  cellSize = Math.min(cellSizeX, cellSizeY);
  scale = 1;
  generation = 0;
  offset = { x: 0, y: 0 };
  isZooming = false;
  cells = new Map();
  const initX = Math.ceil(
    width / (cellSize * scale) / 2 - matrix[0].length / 2 - 1,
  );
  const initY = Math.ceil(height / (cellSize * scale) / 2 - matrix.length / 2);
  if (width / (cellSize * scale) < 64) {
    ZOOM_TRIGGER_POS = 0;
  } else {
    ZOOM_TRIGGER_POS = 22;
  }
  setInitialStructure(initX, initY);
}
function setInitialStructure(a, f) {
  for (let c = 0; c < matrix.length; c++)
    for (let b = 0; b < matrix[c].length; b++)
      matrix[c][b] == 1 && cells.set(getCellKey(a + b, f + c), !0);
  draw();
}
resetWorld();
isRunning = !0;
intervalId = setInterval(update, 100);
