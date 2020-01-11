const constants = require('./constants.js');

const addBufferToBbox = (bbox, buffer) => {
  const xDiff = metersToLongitude(Math.abs(buffer), bbox[1]);
  const yDiff = metersToLatitude(Math.abs(buffer));
  if (buffer < 0) {
    return [bbox[0] + xDiff, bbox[1] + yDiff, bbox[2] - xDiff, bbox[3] - yDiff];
  } else {
    return [bbox[0] - xDiff, bbox[1] - yDiff, bbox[2] + xDiff, bbox[3] + yDiff];
  }
};

const metersToLatitude = (meters) => {
  const percentageOfFull = meters / (constants.earthCircumferenceInMeters / 4);
  return percentageOfFull * 90;
};

const metersToLongitude = (meters, latitude) => {
  const radiusAtThisLatitude = Math.cos(Math.abs(degToRad(latitude))) * constants.earthDiameterInMeters;
  const circumferenceAtThisLatitude = Math.PI * radiusAtThisLatitude * 2;
  const percentageOfFull = meters / (circumferenceAtThisLatitude / 2);
  return percentageOfFull * 180;
};

const degToRad = (deg) => Math.PI * deg / 180;

module.exports = {
  addBufferToBbox
};
