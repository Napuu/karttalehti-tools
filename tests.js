const { test } = require('zora');
const fetch = require('node-fetch');

class TestCase {
  constructor (query, expectedAnswer, message) {
    this.query = query;
    this.expectedAnswer = expectedAnswer;
    this.message = message;
    this.baseURL = 'http://localhost:3262/';
  }

  async executeTestAndReturnResultStatus () {
    const answer = await fetch(this.baseURL + this.query);
    const answerAsString = await answer.text();
    console.log('was ' + answerAsString + ', expected ' + this.expectedAnswer);
    return answerAsString === this.expectedAnswer;
  }
}

const testCases = [
  new TestCase('ping', 'pong', 'should start correctly'),
  new TestCase('?action=getbbox&lehti=S4311R', '[416000,7242000,428000,7254000]', 'should return correct bbox in EPSG:3067'),
  new TestCase('?action=getbbox&lehti=S4311R&projection=EPSG:3857', '[2805134.0788165894,9685237.32529313,2833057.8943653647,9714721.10885959]', 'should return correct bbox in EPSG:3857'),
  new TestCase('?action=getbbox&lehti=S4311R&projection=EPSG:4326', '[25.198948170054766,65.29022768006281,25.449792073038758,65.40071166582779]', 'should return correct bbox in EPSG:3857'),
  new TestCase('?action=gettile&x=422000&y=7250000&resolution=25k', 'S4311', 'should return correct 25k tile from EPSG:3067 coordinates'),
  new TestCase('?action=gettile&x=422000&y=7250000&resolution=25k&splitted=true', 'S4311R', 'should return correct 25k tile from EPSG:3067 coordinates'),
  new TestCase('?action=gettile&x=2762587&y=8440635&resolution=10k&projection=EPSG:3857', 'L4131H', 'should return correct 10k tile from EPSG:3857 coordinates'),
  new TestCase('?action=gettile&x=2770000&y=8440000&resolution=5k&projection=EPSG:3857', 'L4133B1', 'should return correct 5k tile from EPSG:3857 coordinates'),
  new TestCase('?action=gettile&x=24&y=64&resolution=5k&projection=EPSG:4326', 'Q4213G3', 'should return correct 5k tile from EPSG:4326 coordinates')
];

test('starting tests', t => {
  testCases.forEach(individualTestCase => {
    t.test(individualTestCase.message, async t => {
      const success = await individualTestCase.executeTestAndReturnResultStatus();
      t.ok(success);
    });
  });
});
