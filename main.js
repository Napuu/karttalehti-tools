const { fromCoordinatesToTile } = require('./coord2tile.js');
const { getBboxForTile } = require('./tile2coord.js');
const { applyCoords } = require('./gdal.js');

const mode = process.argv[2];
const file = process.argv[3];
switch (mode) {
  case "apply":
    // assuming filenames are of format M4212G1.tif
    const tile = file.split(".")[0];
    const bbox = getBboxForTile(tile);
    applyCoords(file, bbox);
    break;
  default:
    console.log("not implemented");
}
