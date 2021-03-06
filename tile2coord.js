const constants = require('./constants.js');
const utils = require('./utils.js');
const proj = require('./reproject.js');
function getBboxForTile (tile, projection, buffer) {
  if (buffer !== undefined && projection !== 'EPSG:4326') {
    return 'NOT SUPPORTED';
  }
  if (buffer === undefined) {
    buffer = 0;
  }
  const lastChar = tile[tile.length - 1];
  const isSplit = lastChar === 'R' || lastChar === 'L';
  if (isSplit) tile = tile.slice(0, tile.length - 1);
  let x = constants.X0;
  let y = constants.Y0;
  let ans = [];
  let res = '';
  y += dyFromChar0(tile[0]);
  x += dxFromChar1(tile[1]);
  if (tile.length === 2) {
    ans = [x, y, x + constants.dx200k, y + constants.dx200k];
    res = '200k';
  }

  const tc2 = dxyFromChar2(tile[2]);
  x += tc2[0];
  y += tc2[1];
  if (tile.length === 3) {
    ans = [x, y, x + constants.dx100k, y + constants.dy100k];
    res = '100k';
  }

  const tc3 = dxyFromChar3(tile[3]);
  x += tc3[0];
  y += tc3[1];
  if (tile.length === 4) {
    ans = [x, y, x + constants.dx50k, y + constants.dy50k];
    res = '50k';
  }

  const tc4 = dxyFromChar4(tile[4]);
  x += tc4[0];
  y += tc4[1];
  if (tile.length === 5) {
    ans = [x, y, x + constants.dx25k, y + constants.dy25k];
    res = '25k';
  }

  const tc5 = dxyFromChar5(tile[5]);
  x += tc5[0];
  y += tc5[1];
  if (tile.length === 6) {
    ans = [x, y, x + constants.dx10k, y + constants.dy10k];
    res = '10k';
  }

  const tc6 = dxyFromChar6(tile[6]);
  x += tc6[0];
  y += tc6[1];
  if (tile.length === 7) {
    ans = [x, y, x + constants.dx5k, y + constants.dy5k];
    res = '5k';
  }

  const tc7 = dxyFromChar7(tile[7]);
  x += tc7[0];
  y += tc7[1];
  if (tile.length === 8 && !isSplit) {
    ans = [x, y, x + constants["dx2.5k"], y + constants["dy2.5k"]];
    res = '2.5k';
  }

  if (isSplit) {
    if (lastChar === 'L') {
      ans = [ans[0], ans[1], ans[2] - constants['dx' + res] / 2, ans[3]];
    } else {
      ans = [ans[0] + constants['dx' + res] / 2, ans[1], ans[2], ans[3]];
    }
  }

  if (projection === undefined || projection === 'EPSG:3067') {
    return ans;
  } else if (projection === 'EPSG:3857') {
    return [...proj.from3067to3857([ans[0], ans[1]]), ...proj.from3067to3857([ans[2], ans[3]])];
  } else if (projection === 'EPSG:4326') {
    const bboxIn4326 = [...proj.from3067to4326([ans[0], ans[1]]), ...proj.from3067to4326([ans[2], ans[3]])];
    const bboxWithBuffer = utils.addBufferToBbox(bboxIn4326, buffer);
    return bboxWithBuffer;
  } else {
    return [];
  }
}

function dyFromChar0 (c) {
  if (!c) return '';
  return constants.dy200k * constants.enum0.indexOf(c.toUpperCase());
}
function dxFromChar1 (c) {
  if (!c) return '';
  return (parseInt(c) - 2) * constants.dx200k;
}

function dxyFromChar2 (c) {
  if (!c) return '';
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx100k, c0[1] * constants.dy100k];
}

function dxyFromChar3 (c) {
  if (!c) return '';
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx50k, c0[1] * constants.dy50k];
}

function dxyFromChar4 (c) {
  if (!c) return '';
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx25k, c0[1] * constants.dy25k];
}

function dxyFromChar5 (c) {
  if (!c) return '';
  let t0 = 0;
  for (let i = 0; i < 4; i++) {
    if (constants.enum5[i].indexOf(c) !== -1) {
      t0 = i;
      break;
    }
  }
  const c0 = constants.enum5[t0];
  const c1 = c0.indexOf(c);
  return [t0 * constants.dx10k, c1 * constants.dy10k];
}

function dxyFromChar6 (c) {
  if (!c) return '';
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx5k, c0[1] * constants.dy5k];
}

function dxyFromChar7 (c) {
  if (!c) return '';
  let t0 = 0;
  for (let i = 0; i < 2; i++) {
    if (constants.enum6[i].indexOf(c) !== -1) {
      t0 = i;
      break;
    }
  }

  const c0 = constants.enum6[t0];
  const c1 = c0.indexOf(c);
  return [t0 * constants["dx2.5k"], c1 * constants["dy2.5k"]];
}

exports.getBboxForTile = getBboxForTile;
