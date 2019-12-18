const constants = require('./constants.js');
function getBboxForTile(tile) {
  const lastChar = tile[tile.length - 1];
  const isSplit = lastChar === 'R' || lastChar === 'L';
  if (isSplit) tile = tile.slice(0, tile.length - 1);
  let x = constants.X0,
    y = constants.Y0;
  let ans = [];
  let res = '';
  y += dyFromChar0(tile[0]);
  x += dxFromChar1(tile[1]);
  if (tile.length == 2) {
    ans = [x, y, x + constants.dx200k, y + constants.dx200k];
    res = '200k';
  }

  const tc2 = dxyFromChar2(tile[2]);
  x += tc2[0];
  y += tc2[1];
  if (tile.length == 3) {
    ans = [x, y, x + constants.dx100k, y + constants.dy100k];
    res = '100k';
  }

  const tc3 = dxyFromChar3(tile[3]);
  x += tc3[0];
  y += tc3[1];
  if (tile.length == 4) {
    ans = [x, y, x + constants.dx50k, y + constants.dy50k];
    res = '50k';
  }

  const tc4 = dxyFromChar4(tile[4]);
  x += tc4[0];
  y += tc4[1];
  if (tile.length == 5) {
    ans = [x, y, x + constants.dx25k, y + constants.dy25k];
    res = '25k';
  }

  const tc5 = dxyFromChar5(tile[5]);
  x += tc5[0];
  y += tc5[1];
  if (tile.length == 6) {
    ans = [x, y, x + constants.dx10k, y + constants.dy10k];
    res = '10k';
  }

  const tc6 = dxyFromChar6(tile[6]);
  x += tc6[0];
  y += tc6[1];
  if (tile.length == 7) {
    ans = [x, y, x + constants.dx5k, y + constants.dy5k];
    res = '5k';
  }

  if (isSplit) {
    if (lastChar === 'L') {
      return [ans[0], ans[1], ans[2] - constants['dx' + res] / 2, ans[3]];
    } else {
      return [ans[0] + constants['dx' + res] / 2, ans[1], ans[2], ans[3]];
    }
  } else {
    return ans;
  }
}

function dyFromChar0(c) {
  if (!c) return "";
  return constants.dy200k * constants.enum0.indexOf(c.toUpperCase());
}
function dxFromChar1(c) {
  if (!c) return "";
  return (parseInt(c) - 2) * constants.dx200k;
}

function dxyFromChar2(c) {
  if (!c) return "";
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx100k, c0[1] * constants.dy100k];
}

function dxyFromChar3(c) {
  if (!c) return "";
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx50k, c0[1] * constants.dy50k];
}

function dxyFromChar4(c) {
  if (!c) return "";
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx25k, c0[1] * constants.dy25k];
}

function dxyFromChar5(c) {
  if (!c) return "";
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

function dxyFromChar6(c) {
  if (!c) return "";
  const c0 = constants.enum2[parseInt(c) - 1];
  return [c0[0] * constants.dx5k, c0[1] * constants.dy5k];
}

exports.getBboxForTile = getBboxForTile;
