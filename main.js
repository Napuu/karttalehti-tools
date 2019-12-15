const express = require('express');
const app = express();
const port = 3262;

const enum0 = ['K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];
const enum1 = [
  ['1', '2'],
  ['3', '4'],
];
const enum2 = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];
const X0 = -76000;
const Y0 = 6570000;

const dx200k = 192000;
const dy200k = 96000;
const dx100k = 96000;
const dy100k = 48000;
const dx50k = 48000;
const dy50k = 24000;
const dx25k = 24000;
const dy25k = 12000;

app.get('/', (req, res) => {
  const p = req.query;
  try {
    if (p.action === 'gettile' && (p.x !== undefined && p.y !== undefined)) {
      res.send(fromCoordinatesToTile(p.x, p.y));
    } else if (p.action === 'getbbox' && p.lehti !== undefined) {
      res.send(JSON.stringify(getBboxForTile(p.lehti)));
    } else if (p.action === "getmtktiles") {
      res.sendFile(__dirname + "/mtk-tiles");
    } else {
      res.send('not supported');
    }
  } catch (e) {
    console.error(e)
    res.send('illegal tilename or something');
  }
});

app.listen(port);

function fromCoordinatesToTile(x, y) {
  return char0(y) + char1(x) + char2(x, y) + char3(x, y) + char4(x, y);
}

function getBboxForTile(tile) {
  let x = X0,
    y = Y0;

  y += dyFromChar0(tile[0]);
  x += dxFromChar1(tile[1]);

  const tc2 = dxyFromChar2(tile[2]);
  x += tc2[0];
  y += tc2[1];

  const tc3 = dxyFromChar3(tile[3]);
  x += tc3[0];
  y += tc3[1];

  const tc4 = dxyFromChar4(tile[4]);
  x += tc4[0];
  y += tc4[1];

  const ans = [x, y, x + dx25k, y + dy25k];
  if (tile.length === 5) {
    return ans;
  } else if (tile.length === 6) {
    return handleSplittedTile(ans, tile);
  }
}

function handleSplittedTile(ans, tile) {
  if (tile[5].toUpperCase() === 'L') {
    return [ans[0], ans[1], ans[2] - dx25k / 2, ans[3]];
  } else if (tile[5].toUpperCase() === 'R') {
    return [ans[0] + dx25k / 2, ans[1], ans[2], ans[3]];
  } else return [-1, -1, -1, -1];
}

function char0(y) {
  return enum0[Math.floor((y - Y0) / dy200k)];
}
function dyFromChar0(c) {
  return dy200k * enum0.indexOf(c.toUpperCase());
}

function char1(x) {
  return Math.floor((x - X0) / dx200k) + 2;
}
function dxFromChar1(c) {
  return (parseInt(c) - 2) * dx200k;
}

function char2(x, y) {
  const c20 = Math.floor((x - X0) / dx100k) % 2;
  const c21 = Math.floor((y - Y0) / dy100k) % 2;
  return enum1[c20][c21];
}
function dxyFromChar2(c) {
  const c0 = enum2[parseInt(c) - 1];
  return [c0[0] * dx100k, c0[1] * dy100k];
}

function char3(x, y) {
  const c30 = Math.floor((x - X0) / dx50k) % 2;
  const c31 = Math.floor((y - Y0) / dy50k) % 2;
  return enum1[c30][c31];
}
function dxyFromChar3(c) {
  const c0 = enum2[parseInt(c) - 1];
  return [c0[0] * dx50k, c0[1] * dy50k];
}

function char4(x, y) {
  const c40 = Math.floor((x - X0) / dx25k) % 2;
  const c41 = Math.floor((y - Y0) / dy25k) % 2;
  return enum1[c40][c41];
}
function dxyFromChar4(c) {
  const c0 = enum2[parseInt(c) - 1];
  return [c0[0] * dx25k, c0[1] * dy25k];
}
