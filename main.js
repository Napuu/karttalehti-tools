const express = require('express');
const app = express();
const port = 3262;
const path = require('path');
const { fromCoordinatesToTile } = require('./coord2tile.js');
const { getBboxForTile } = require('./tile2coord.js');

app.get('/', (req, res) => {
  const p = req.query;
  try {
    if (
      p.action === 'gettile' &&
      p.x !== undefined &&
      p.y !== undefined &&
      p.resolution !== undefined
    ) {
      res.send(fromCoordinatesToTile(p.x, p.y, p.resolution, p.splitted, p.projection));
    } else if (p.action === 'getbbox' && p.lehti !== undefined) {
      res.send(JSON.stringify(getBboxForTile(p.lehti, p.projection)));
    } else if (p.action === 'getall25ktiles') {
      res.sendFile(path.resolve('/all25ktiles'));
    } else {
      res.send('not supported');
    }
  } catch (e) {
    console.error(e);
    res.send('illegal tilename or something');
  }
});

app.listen(port, () => console.log('running'));
