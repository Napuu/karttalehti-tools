const constants = require('./constants.js');
const proj = require('./reproject.js');
function fromCoordinatesToTile (_x, _y, res, splitted, projection) {
  let x = _x;
  let y = _y;
  if (projection !== undefined) {
    if (projection === 'EPSG:3857') {
      const temp = proj.from3857to3067([_x, _y]);
      x = temp[0];
      y = temp[1];
    } else if (projection === 'EPSG:4326') {
      const temp = proj.from4326to3067([_x, _y]);
      x = temp[0];
      y = temp[1];
    }
  }
  switch (res) {
    case '200k':
      return char0(y) + char1(x) + charSplitted(x, res, splitted);
    case '100k':
      return char0(y) + char1(x) + char2(x, y) + charSplitted(x, res, splitted);
    case '50k':
      return (
        char0(y) +
        char1(x) +
        char2(x, y) +
        char3(x, y) +
        charSplitted(x, res, splitted)
      );
    case '25k':
      return (
        char0(y) +
        char1(x) +
        char2(x, y) +
        char3(x, y) +
        char4(x, y) +
        charSplitted(x, res, splitted)
      );
    case '10k':
      return (
        char0(y) +
        char1(x) +
        char2(x, y) +
        char3(x, y) +
        char4(x, y) +
        char5(x, y) +
        charSplitted(x, res, splitted)
      );
    case '5k':
      return (
        char0(y) +
        char1(x) +
        char2(x, y) +
        char3(x, y) +
        char4(x, y) +
        char5(x, y) +
        char6(x, y) +
        charSplitted(x, res, splitted)
      );
    default:
      console.error('juu');
  }

  return char0(y) + char1(x) + char2(x, y) + char3(x, y) + char4(x, y);
}
function char0 (y) {
  return constants.enum0[Math.floor((y - constants.Y0) / constants.dy200k)];
}

function char1 (x) {
  return Math.floor((x - constants.X0) / constants.dx200k) + 2;
}
function char2 (x, y) {
  const c20 = Math.floor((x - constants.X0) / constants.dx100k) % 2;
  const c21 = Math.floor((y - constants.Y0) / constants.dy100k) % 2;
  return constants.enum1[c20][c21];
}
function char3 (x, y) {
  const c30 = Math.floor((x - constants.X0) / constants.dx50k) % 2;
  const c31 = Math.floor((y - constants.Y0) / constants.dy50k) % 2;
  return constants.enum1[c30][c31];
}
function char4 (x, y) {
  const c40 = Math.floor((x - constants.X0) / constants.dx25k) % 2;
  const c41 = Math.floor((y - constants.Y0) / constants.dy25k) % 2;
  return constants.enum1[c40][c41];
}

function char5 (x, y) {
  return constants.enum5[Math.floor((x - constants.X0) / constants.dx10k) % 4][
    Math.floor((y - constants.Y0) / constants.dy10k) % 2
  ];
}

function char6 (x, y) {
  const c20 = Math.floor((x - constants.X0) / constants.dx5k) % 2;
  const c21 = Math.floor((y - constants.Y0) / constants.dy5k) % 2;
  return constants.enum1[c20][c21];
}

function charSplitted (x, res, splitted) {
  if (!splitted) return '';
  return constants.enum4[
    Math.floor(
      ((x - constants.X0) % constants['dx' + res]) /
        (constants['dx' + res] / 2)
    )
  ];
}

exports.fromCoordinatesToTile = fromCoordinatesToTile;
