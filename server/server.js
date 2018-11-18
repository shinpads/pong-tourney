require('babel-polyfill');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');

const gssDoc = new GoogleSpreadsheet('12i_sptiBNC4ESZ2h_yDX6e1s1q2Ufq49zc8RpSw5OpE');
let sheet;
gssDoc.getInfo((err, info) => {
  if (err) console.log('err loading sheets', err);
  else console.log('loaded sheet');
  sheet = info.worksheets[0];
});


const app = express();
const html = path.join(__dirname, 'index.html');

app.use(express.static(__dirname));
app.use('/static', express.static(__dirname));


app.get('/data', async (req, res) => {
  sheet.getCells({
    'min-row': 3,
    'max-row': 150,
    'min-col': 2,
    'max-col': 6,
    'return-empty': true,
  }, (err, cells) => {
    res.send(cells);
  });
});

app.get('*', (req, res) => {
  res.sendFile(html);
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});
