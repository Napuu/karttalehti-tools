const proj = require('./reproject.js');

const addNegative1mBufferToBbox(bbox, epsg) => {
  const earthCircumferenceInMeters = 40007863000;
  const isAlready4326 = epsg == 'EPSG:4326';
  let bboxIn4326 = [];
  if (!isAlready4326) {
    if (epsg == 'EPSG:3857') {
      bboxIn4326 = [...proj.from3857to4326[bbox[0], bbox[1]], ...proj.from3857to4326[bbox[2], bbox[3]]];
    } else if (epsg == 'EPSG:3067') {
      bboxIn4326 = [...proj.from3067to4326[bbox[0], bbox[1]], ...proj.from3067to4326[bbox[2], bbox[3]]];
    }
  }
}
