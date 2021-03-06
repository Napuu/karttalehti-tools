const proj4 = require('proj4');
proj4.defs([['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'],
  ['EPSG:3067', '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'], ['EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs']]);
proj4.defs();

const convert3857to3067 = proj4(proj4('EPSG:3857'), proj4('EPSG:3067'));
const convert4326to3067 = proj4(proj4('EPSG:4326'), proj4('EPSG:3067'));
const convert3857to4326 = proj4(proj4('EPSG:3857'), proj4('EPSG:4326'));

module.exports = {
  from3857to3067: (coords) => {
    return convert3857to3067.forward(coords.map(a => parseFloat(a)));
  },
  from3067to3857: (coords) => {
    return convert3857to3067.inverse(coords);
  },
  from4326to3067: (coords) => {
    return convert4326to3067.forward(coords.map(a => parseFloat(a)));
  },
  from3067to4326: (coords) => {
    return convert4326to3067.inverse(coords);
  },
  from3857to4326: (coords) => {
    return convert3857to4326.forward(coords.map(a => parseFloat(a)));
  },
  from4326to3857: (coords) => {
    return convert3857to4326.inverse(coords);
  }
};
